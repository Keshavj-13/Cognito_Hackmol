import os
import concurrent.futures
import time
from flask import Flask, request, jsonify, send_from_directory, url_for
from flask_cors import CORS
from youtube_transcript_api import YouTubeTranscriptApi
from google.generativeai import GenerativeModel, configure
from gtts import gTTS
from pydub import AudioSegment
import cv2
import numpy as np
from moviepy.editor import VideoFileClip, AudioFileClip
import re

UPLOAD_FOLDER = "generated_videos"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Configure Google Gemini API
configure(api_key="AIzaSyCdM5KhU5s0s_LpxUntadXVo8L6SOLK1tA")

app = Flask(__name__)
CORS(app, supports_credentials=True)

def generate_audio(text, filename):
    text = (
        text.replace('???', "'")
        .replace('', "'")  # Handle replacement characters
        .replace('’', "'")  # Replace smart apostrophes
        .replace('‘', "'")  # Replace left smart quote
        .encode('ascii', 'ignore').decode()  # Remove non-ASCII characters
    )
    tts = gTTS(text, lang="en")
    tts.save(filename)
    return filename

def split_text_into_sentences(text):
    sentences = []
    current = []
    for char in text:
        current.append(char)
        if char in {'.', '!', '?'}:
            sentences.append(''.join(current).strip())
            current = []
    if current:
        sentences.append(''.join(current).strip())
    return sentences

def generate_video(text, audio_file, output_file="output.mp4"):
    width, height = 1280, 720  # Video dimensions
    fps = 30  # Frames per second
    background_video = "biology.mp4"

    audio = AudioSegment.from_file(audio_file)
    sentences = split_text_into_sentences(text)
    sentence_durations = []
    for sentence in sentences:
        sentence_audio = generate_audio(sentence, "temp_audio.mp3")
        sentence_duration = len(AudioSegment.from_file(sentence_audio)) / 1000
        sentence_durations.append(sentence_duration)
        os.remove(sentence_audio)

    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    video = cv2.VideoWriter(output_file, fourcc, fps, (width, height))
    font = cv2.FONT_HERSHEY_SIMPLEX
    font_scale = 1.5
    font_thickness = 3
    line_spacing = 50

    bg_cap = cv2.VideoCapture(background_video)
    while not bg_cap.isOpened():
        time.sleep(1)
        bg_cap = cv2.VideoCapture(background_video)

    bg_fps = int(bg_cap.get(cv2.CAP_PROP_FPS))
    bg_total_frames = int(bg_cap.get(cv2.CAP_PROP_FRAME_COUNT))
    frame_idx = 0

    for sentence, duration in zip(sentences, sentence_durations):
        frame = np.zeros((height, width, 3), dtype=np.uint8)
        words = sentence.split()
        lines = []
        current_line = []

        max_width = width - 100
        for word in words:
            test_line = ' '.join(current_line + [word]) if current_line else word
            (text_width, _), _ = cv2.getTextSize(test_line, font, font_scale, font_thickness)
            if text_width <= max_width:
                current_line.append(word)
            else:
                lines.append(' '.join(current_line))
                current_line = [word]
        if current_line:
            lines.append(' '.join(current_line))

        total_text_height = 0
        line_heights = []
        for line in lines:
            (_, text_height), _ = cv2.getTextSize(line, font, font_scale, font_thickness)
            line_heights.append(text_height + line_spacing)
            total_text_height += text_height + line_spacing

        total_text_height -= line_spacing
        start_y = (height - total_text_height) // 2

        for i, line in enumerate(lines):
            text_size = cv2.getTextSize(line, font, font_scale, font_thickness)[0]
            text_x = (width - text_size[0]) // 2
            text_y = start_y + i * (font_scale * 50 + line_spacing)
            cv2.putText(frame, line, (int(text_x), int(text_y)), font, font_scale, (255, 255, 255), font_thickness, cv2.LINE_AA)

        watermark_text = "JuniorDevta"
        watermark_font_scale = 0.8
        watermark_thickness = 2
        watermark_size = cv2.getTextSize(watermark_text, font, watermark_font_scale, watermark_thickness)[0]
        watermark_x = width - watermark_size[0] - 20
        watermark_y = 30
        cv2.putText(frame, watermark_text, (watermark_x, watermark_y), font, watermark_font_scale, (255, 255, 255), watermark_thickness, cv2.LINE_AA)

        for _ in range(int(fps * duration)):
            ret, frame = bg_cap.read()
            if not ret:
                bg_cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
                ret, frame = bg_cap.read()
            frame = cv2.resize(frame, (width, height))

            y_pos = start_y
            for i, line in enumerate(lines):
                (text_width, text_height), _ = cv2.getTextSize(line, font, font_scale, font_thickness)
                text_x = (width - text_width) // 2
                cv2.putText(
                    frame,
                    line,
                    (int(text_x), int(y_pos + text_height)),
                    font,
                    font_scale,
                    (255, 255, 255),
                    font_thickness,
                    cv2.LINE_AA
                )
                y_pos += line_heights[i]
            video.write(frame)

    video.release()
    bg_cap.release()
    return output_file

def combine_audio_and_video(video_file, audio_file, output_file):
    if os.path.exists(output_file):
        os.remove(output_file)
    video_clip = VideoFileClip(video_file)
    audio_clip = AudioFileClip(audio_file)
    try:
        final_clip = video_clip.set_audio(audio_clip)
        final_clip.write_videofile(
            output_file,
            codec="libx264",
            audio_codec="aac",
            logger=None
        )
    finally:
        video_clip.close()
        audio_clip.close()
    time.sleep(1)
    return output_file

# Helper Functions
def extract_video_id(url):
    match = re.search(r"(?:v=|youtu\.be/|embed/|shorts/)([\w-]{11})", url)
    return match.group(1) if match else None

def get_video_transcript(video_id):
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        return " ".join([entry['text'] for entry in transcript])
    except Exception as e:
        return None

def summarize_text(text, prompt):
    try:
        model = GenerativeModel("gemini-1.5-pro")
        response = model.generate_content(prompt + text)
        return response.text if response else "Error in generating summary."
    except Exception as e:
        return f"Error: {str(e)}"

def simplify_summary(summary):
    return summarize_text(summary, "Simplify this summary so that even a senior citizen can understand: ")

def generate_story(summary):
    return summarize_text(summary, "Convert this summary into a fun and engaging story for kids with simple English:")

# New route combining summarize and generate
@app.route("/junior_summarize_and_generate", methods=["POST"])
def junior_summarize_and_generate():
    data = request.get_json()
    youtube_urls = data.get("urls", [])

    if not youtube_urls or not isinstance(youtube_urls, list):
        return jsonify({"error": "Missing or invalid YouTube URLs"}), 400

    combined_text = ""
    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = {executor.submit(get_video_transcript, extract_video_id(url)): url for url in youtube_urls}
        for future in concurrent.futures.as_completed(futures):
            transcript = future.result()
            if transcript:
                combined_text += transcript + " "

    if not combined_text.strip():
        return jsonify({"error": "No valid input text or transcripts found"}), 400

    # Generate summary using JuniorDevta's logic
    combined_summary = summarize_text(combined_text, "Summarize this YouTube transcript:")
    simple_summary = simplify_summary(combined_summary)
    story_summary = generate_story(combined_summary)

    # Generate video using ExamDevta's video generation functions
    unique_id = str(int(time.time()))
    audio_path = os.path.join(UPLOAD_FOLDER, f"audio_{unique_id}.mp3")
    video_path = os.path.join(UPLOAD_FOLDER, f"video_{unique_id}.mp4")
    final_output_path = os.path.join(UPLOAD_FOLDER, f"final_video_{unique_id}.mp4")

    generate_audio(combined_summary, audio_path)
    generate_video_file = generate_video(combined_summary, audio_path, video_path)
    combine_audio_and_video(generate_video_file, audio_path, final_output_path)

    # Clean up intermediate files
    os.remove(audio_path)
    os.remove(video_path)

    return jsonify({
        "summary": combined_summary,
        "simple_summary": simple_summary,
        "story_summary": story_summary,
        "video_url": url_for("download", filename=f"final_video_{unique_id}.mp4", _external=True)
    })

@app.route("/download/")
def download(filename):
    return send_from_directory(
        os.path.abspath(UPLOAD_FOLDER),
        filename,
        mimetype='video/mp4',
        as_attachment=False
    )

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
