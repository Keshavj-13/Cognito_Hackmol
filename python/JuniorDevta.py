import os
import concurrent.futures
from flask import Flask, request, jsonify, url_for, send_from_directory
from youtube_transcript_api import YouTubeTranscriptApi
from google.generativeai import GenerativeModel, configure
from flask_cors import CORS
from gtts import gTTS
from pydub import AudioSegment
import cv2
import numpy as np
import time
from moviepy.editor import VideoFileClip, AudioFileClip

UPLOAD_FOLDER = "generated_videos"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Configure Google Gemini API
configure(api_key="AIzaSyCdM5KhU5s0s_LpxUntadXVo8L6SOLK1tA")

app = Flask(__name__)
CORS(app, supports_credentials=True)


def generate_audio(text, filename):
    text = (
        text.replace('???', "'")
        .replace('�', "'")  # Handle replacement characters
        .replace('’', "'")  # Replace smart apostrophes
        .replace('‘', "'")  # Replace left smart quote
        .encode('ascii', 'ignore').decode()  # Remove non-ASCII characters
    )
    tts = gTTS(text, lang="en")
    tts.save(filename)
    return filename

def split_text_into_sentences(text):
    # Handle multiple sentence-ending punctuations
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

    # Load generated audio
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

    # Load background video
    bg_cap = cv2.VideoCapture(background_video)

    while not bg_cap.isOpened():
        time.sleep(1)  # Wait until file is accessible
        bg_cap = cv2.VideoCapture(background_video)

    bg_fps = int(bg_cap.get(cv2.CAP_PROP_FPS))
    bg_total_frames = int(bg_cap.get(cv2.CAP_PROP_FRAME_COUNT))

    frame_idx = 0  # To loop background

    for sentence, duration in zip(sentences, sentence_durations):
        frame = np.zeros((height, width, 3), dtype=np.uint8)  
        words = sentence.split()
        lines = []
        current_line = []
        
        # Calculate maximum text width with padding
        max_width = width - 100  # 50px padding on each side
        
        for word in words:
            # Create test line to check width
            test_line = ' '.join(current_line + [word]) if current_line else word
            (text_width, _), _ = cv2.getTextSize(test_line, font, font_scale, font_thickness)
            
            if text_width <= max_width:
                current_line.append(word)
            else:
                lines.append(' '.join(current_line))
                current_line = [word]
        
        if current_line:
            lines.append(' '.join(current_line))

        # Calculate vertical positioning using actual text heights
        total_text_height = 0
        line_heights = []
        for line in lines:
            (_, text_height), _ = cv2.getTextSize(line, font, font_scale, font_thickness)
            line_heights.append(text_height + line_spacing)
            total_text_height += text_height + line_spacing
        
        # Adjust for last line's spacing
        total_text_height -= line_spacing
        start_y = (height - total_text_height) // 2
        
        for i, line in enumerate(lines):
            text_size = cv2.getTextSize(line, font, font_scale, font_thickness)[0]
            text_x = (width - text_size[0]) // 2
            text_y = start_y + i * (font_scale * 50 + line_spacing)
            cv2.putText(frame, line, (int(text_x), int(text_y)), font, font_scale, (255, 255, 255), font_thickness, cv2.LINE_AA)

        watermark_text = "ExamDevta"
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

            # Draw text with precise positioning
            y_pos = start_y
            for i, line in enumerate(lines):
                (text_width, text_height), _ = cv2.getTextSize(line, font, font_scale, font_thickness)
                text_x = (width - text_width) // 2
                cv2.putText(
                    frame, 
                    line, 
                    (int(text_x), int(y_pos + text_height)),  # Ensure integer coordinates
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

    # Combine with audio using ffmpeg
    #os.system(f"ffmpeg -i {output_file} -i {audio_file} -c:v libx264 -c:a aac -strict experimental -movflags +faststart final_output.mp4")

    #return "final_output.mp4"
    return output_file

def combine_audio_and_video(video_file, audio_file, output_file):
    # Explicit cleanup before creation
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
            logger=None  # Disable verbose logging
        )
    finally:
        video_clip.close()
        audio_clip.close()
        time.sleep(1)  # Allow OS to release file handles
    
    return output_file

# Helper Functions
def extract_video_id(url):
    """Extract YouTube video ID from URL."""
    import re
    match = re.search(r"(?:v=|youtu\.be/|embed/|shorts/)([\w-]{11})", url)
    return match.group(1) if match else None

def get_video_transcript(video_id):
    """Fetch transcript of a YouTube video."""
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        return " ".join([entry['text'] for entry in transcript])
    except Exception as e:
        return None

def summarize_text(text, prompt):
    """Generate summary using Google Gemini API."""
    try:
        model = GenerativeModel("gemini-1.5-pro")
        response = model.generate_content(prompt + text)
        return response.text if response else "Error in generating summary."
    except Exception as e:
        return f"Error: {str(e)}"

def simplify_summary(summary):
    """Simplify the summary for easier understanding."""
    return summarize_text(summary, "Simplify this summary so that even a senior citizen can understand: ")

# def translate_to_language(summary, language):
#     """Translate the summary into a specified language."""
#     return summarize_text(summary, f"Translate this summary into {language}: ")

def generate_story(summary):
    """Convert the summary into a story for children."""
    return summarize_text(summary, "Convert this summary into a fun and engaging story for kids with simple English:")

# Routes
# ======= Video Generation Routes =======
@app.route("/generate", methods=["POST"])
def generate_video_from_text():
    data = request.json
    text = data.get("text")
    if not text:
        return jsonify({"error": "Text is required"}), 400
    
    unique_id = str(int(time.time()))
    audio_path = os.path.join(UPLOAD_FOLDER, f"audio_{unique_id}.mp3")
    video_path = os.path.join(UPLOAD_FOLDER, f"video_{unique_id}.mp4")
    final_output = os.path.join(UPLOAD_FOLDER, f"final_video_{unique_id}.mp4")

    generate_audio(text, audio_path)
    generate_video(text, audio_path, video_path)
    combine_audio_and_video(video_path, audio_path, final_output)

    return jsonify({"video_url": url_for("download", filename=f"final_video_{unique_id}.mp4", _external=True)})

@app.route("/download/<filename>")
def download(filename):
    return send_from_directory(
        os.path.abspath(UPLOAD_FOLDER),
        filename,
        mimetype='video/mp4',
        as_attachment=False
    )
# ======= Summerize Routes =======
@app.route("/summarize", methods=["POST"])
def summarize_videos():
    data = request.get_json()
    youtube_urls = data.get("urls", [])
    # language = data.get("language", "Hindi")
    
    if not youtube_urls or not isinstance(youtube_urls, list):
        return jsonify({"error": "Invalid YouTube URLs"}), 400

    all_transcripts = ""
    individual_summaries = {}

    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = {executor.submit(get_video_transcript, extract_video_id(url)): url for url in youtube_urls}
        for future in concurrent.futures.as_completed(futures):
            url = futures[future]
            transcript = future.result()
            if transcript:
                all_transcripts += transcript + " "
                summary = summarize_text(transcript, "Summarize this YouTube transcript: ")
                simple_summary = simplify_summary(summary)
                # translated_summary = translate_to_language(simple_summary, language)
                story_summary = generate_story(summary)
                individual_summaries[url] = {
                    "simple_summary": simple_summary,
                    # "translated_summary": translated_summary,
                    "story_summary": story_summary,
                }
            else:
                individual_summaries[url] = {"error": f"Could not retrieve transcript for {url}"}

    if all_transcripts:
        combined_summary = summarize_text(all_transcripts, "Provide a detailed combined summary of the following transcripts: ")
        topic_wise_summary = summarize_text(all_transcripts, "Extract and summarize common topics from these transcripts: ")
        
        response_data = {
            "combined_summary": {
                "simple": simplify_summary(combined_summary),
                # "translated": translate_to_language(simplify_summary(combined_summary), language),
                "story": generate_story(combined_summary),
            },
            "topic_wise_summary": {
                "simple": simplify_summary(topic_wise_summary),
                # "translated": translate_to_language(simplify_summary(topic_wise_summary), language),
            },
            "individual_summaries": individual_summaries,
        }
        return jsonify(response_data)
    
    return jsonify({"error": "Failed to process transcripts."}), 500

@app.route("/summarize_and_generate", methods=["POST"])
def summarize_and_generate():
    data = request.get_json()
    youtube_urls = data.get("urls", [])
    
    if not youtube_urls or not isinstance(youtube_urls, list):
        return jsonify({"error": "Missing or invalid YouTube URLs"}), 400

    # Generate summary and process topics
    combined_text = ""
    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = {executor.submit(get_video_transcript, extract_video_id(url)): url for url in youtube_urls}
        for future in concurrent.futures.as_completed(futures):
            transcript = future.result()
            if transcript:
                combined_text += transcript + " "

        if not combined_text.strip():
            return jsonify({"error": "No valid input text or transcripts found"}), 400

        # Generate summaries
        combined_summary = chunk_based_summarization(combined_text)
        segments = [combined_text[i:i+SEGMENT_SIZE*100] for i in range(0, len(combined_text), SEGMENT_SIZE*100)]
        clusters, keywords = group_correlated_topics(segments)
        
        topic_summaries = {}
        for idx, cluster in enumerate(clusters):
            if cluster not in topic_summaries:
                topic_summaries[cluster] = ""
            topic_summaries[cluster] += segments[idx] + " "
        
        topic_summaries = {keywords[i]: chunk_based_summarization(text) for i, text in topic_summaries.items()}

        # Generate video
        unique_id = str(int(time.time()))
        audio_path = os.path.join(UPLOAD_FOLDER, f"audio_{unique_id}.mp3")
        video_path = os.path.join(UPLOAD_FOLDER, f"video_{unique_id}.mp4")
        final_output = os.path.join(UPLOAD_FOLDER, f"final_video_{unique_id}.mp4")

        # Generate intermediate files with unique names
        generate_audio(combined_summary, audio_path)
        intermediate_video = generate_video(combined_summary, audio_path, video_path)
        
        # Create final output with unique filename
        combine_audio_and_video(intermediate_video, audio_path, final_output)

        time.sleep(2)

        # Robust file cleanup with retry logic
        def safe_delete(path):
            for _ in range(3):  # Max 3 attempts
                try:
                    if os.path.exists(path):
                        os.remove(path)
                        print(f"Deleted: {path}")
                        return True
                except PermissionError:
                    print(f"File busy: {path} - retrying in 2s...")
                    time.sleep(2)
            print(f"⚠️ Failed to delete: {path}")
            return False

        time.sleep(2)  # Allow file handles to release
        for path in [audio_path, video_path]:
            safe_delete(path)

        return jsonify({
        "summary": combined_summary,
        "topic_summaries": topic_summaries,
        "video_url": f"{url_for('download', filename=f'final_video_{unique_id}.mp4', _external=True)}?t={int(time.time())}"
    })   
    
if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')  