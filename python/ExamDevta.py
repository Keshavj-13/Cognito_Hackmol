import os
import concurrent.futures
import torch
import time
import cv2
import numpy as np
from flask import Flask, request, jsonify, send_from_directory, url_for
from gtts import gTTS
from pydub import AudioSegment
from moviepy.editor import VideoFileClip, AudioFileClip
from pytube import YouTube
from transformers import pipeline
from youtube_transcript_api import YouTubeTranscriptApi
from sentence_transformers import SentenceTransformer
from sklearn.cluster import AgglomerativeClustering
from sklearn.feature_extraction.text import TfidfVectorizer
from flask_cors import CORS

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False  # Prevent ASCII encoding for JSON responses
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
UPLOAD_FOLDER = "generated_videos"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
CORS(app, supports_credentials=True)

# ========== VideoText.py Components ==========

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
    background_video = "C:\\Users\\ASUS\\Videos\\biology.mp4"

    # Load generated audio
    audio = AudioSegment.from_file(audio_file)
    sentences = split_text_into_sentences(text)
    sentence_durations = []

    for sentence in sentences:
        sentence_audio = generate_audio(sentence, "temp_audio.mp3")
        sentence_duration = len(AudioSegment.from_file(sentence_audio)) / 1000
        sentence_durations.append(sentence_duration)
        os.remove(sentence_audio)  # Cleanup temp audio

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

    # Release resources
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


# ========== ganeev3.py Components ==========
# Constants
MAX_CHUNK = 1000
SUMMARY_MAX_LENGTH = 150
SUMMARY_MIN_LENGTH = 50
NUM_KEYWORDS = 3
SEGMENT_SIZE = 5

# Load models
summarizer = pipeline("summarization", model="facebook/bart-large-cnn", device=0 if torch.cuda.is_available() else -1)
embedding_model = SentenceTransformer('all-MiniLM-L6-v2')

def extract_video_id(url):
    try:
        if "youtube.com" in url:
            return url.split("v=")[1].split("&")[0]
        elif "youtu.be" in url:
            return url.split("/")[-1]
    except Exception as e:
        print(f"Error extracting video ID: {e}")
    return None

def get_video_transcript(video_id):
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        return " ".join([entry['text'] for entry in transcript])
    except Exception as e:
        print(f"Error fetching transcript: {e}")
        return None

def chunk_based_summarization(text):
    chunks = [text[i:i+MAX_CHUNK] for i in range(0, len(text), MAX_CHUNK)]
    summaries = []
    for chunk in chunks:
        if len(chunk.strip()) > 10:
            summary = summarizer(chunk, max_length=SUMMARY_MAX_LENGTH, min_length=SUMMARY_MIN_LENGTH, do_sample=False)
            summaries.append(summary[0]['summary_text'])
    return " ".join(summaries)

def get_top_keywords(cluster_texts, num_keywords=NUM_KEYWORDS):
    vectorizer = TfidfVectorizer(stop_words='english', max_features=5000)
    X = vectorizer.fit_transform(cluster_texts)
    feature_names = vectorizer.get_feature_names_out()
    top_keywords = []
    for i in range(X.shape[0]):
        sorted_indices = X[i].toarray().argsort()[0][-num_keywords:][::-1]
        keywords = [feature_names[idx] for idx in sorted_indices]
        top_keywords.append(", ".join(keywords))
    return top_keywords

def group_correlated_topics(segments):
    if len(segments) < 2:
        return [0] * len(segments), []
    embeddings = embedding_model.encode(segments)
    clustering = AgglomerativeClustering(n_clusters=None, distance_threshold=1.0)
    clusters = clustering.fit_predict(embeddings)
    top_keywords = []
    for i in range(max(clusters) + 1):
        cluster_segments = [segments[j] for j in range(len(segments)) if clusters[j] == i]
        top_keywords.append(get_top_keywords(cluster_segments)[0])
    return clusters, top_keywords

# ========== Routes ==========
@app.route("/generate", methods=["POST"])
def generate_video_from_text():
    data = request.json
    text = data.get("text")
    if not text:
        return jsonify({"error": "Text is required"}), 400
    
    audio_path = os.path.join(UPLOAD_FOLDER, "audio.mp3")
    video_path = os.path.join(UPLOAD_FOLDER, "video.mp4")
    final_output = os.path.join(UPLOAD_FOLDER, "final_video.mp4")
    
    generate_audio(text, audio_path)
    generate_video(text, audio_path, video_path)
    combine_audio_and_video(video_path, audio_path, final_output)
    
    return jsonify({"video_url": url_for("download", filename="final_video.mp4", _external=True)})

@app.route("/summarize", methods=["POST"])
def summarize_videos():
    data = request.get_json(force=True)  # Force parse even if charset isn't specified
    youtube_urls = data.get("urls", [])
    text = data.get("text", "")
    
    # Ensure UTF-8 encoding at reception point
    if isinstance(text, bytes):
        text = text.decode('utf-8', errors='replace')
    
    if not youtube_urls or not isinstance(youtube_urls, list):
        return jsonify({"error": "Missing or invalid YouTube URLs"}), 400
    
    combined_text = ""
    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = {executor.submit(get_video_transcript, extract_video_id(url)): url for url in youtube_urls}
        for future in concurrent.futures.as_completed(futures):
            transcript = future.result()
            if transcript:
                combined_text += transcript + " "
    
    if not combined_text:
        return jsonify({"error": "Could not fetch transcripts"}), 500
    
    combined_summary = chunk_based_summarization(combined_text)
    segments = [combined_text[i:i+SEGMENT_SIZE*100] for i in range(0, len(combined_text), SEGMENT_SIZE*100)]
    clusters, keywords = group_correlated_topics(segments)
    
    topic_summaries = {}
    for idx, cluster in enumerate(clusters):
        if cluster not in topic_summaries:
            topic_summaries[cluster] = ""
        topic_summaries[cluster] += segments[idx] + " "
    
    topic_summaries = {keywords[i]: chunk_based_summarization(text) for i, text in topic_summaries.items()}
    
    return jsonify({"summary": combined_summary, "topic_summaries": topic_summaries})

@app.route("/download/<filename>")
def download(filename):
    return send_from_directory(
        os.path.abspath(UPLOAD_FOLDER),  # Absolute path
        filename,
        mimetype='video/mp4',
        as_attachment=False
    )

@app.route("/summarize_and_generate", methods=["POST"])
def summarize_and_generate():
    try:
        data = request.get_json(force=True)
        youtube_urls = data.get("urls", [])
        direct_text = data.get("text", "")

        # Handle text encoding for direct input
        if isinstance(direct_text, bytes):
            direct_text = direct_text.decode('utf-8', errors='replace')
        direct_text = direct_text.replace('???', "'").replace('�', "'")

        combined_text = direct_text

        # Process YouTube URLs if provided
        if youtube_urls:
            if not isinstance(youtube_urls, list):
                return jsonify({"error": "URLs must be provided as a list"}), 400

            with concurrent.futures.ThreadPoolExecutor() as executor:
                futures = {
                    executor.submit(get_video_transcript, extract_video_id(url)): url 
                    for url in youtube_urls
                }
                for future in concurrent.futures.as_completed(futures):
                    transcript = future.result()
                    if transcript:
                        # Clean transcript text
                        clean_transcript = transcript.replace('???', "'").replace('�', "'")
                        combined_text += " " + clean_transcript

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

    except Exception as e:
        # Emergency cleanup
        error_id = unique_id if 'unique_id' in locals() else 'unknown'
        final_output = os.path.join(UPLOAD_FOLDER, f"final_video_{error_id}.mp4")
        
        for path in [audio_path, video_path, final_output]:
            try:
                if path and os.path.exists(path):
                    os.remove(path)
            except Exception as cleanup_error:
                print(f"Cleanup failed for {path}: {cleanup_error}")

        return jsonify({
            "error": f"Video generation failed: {str(e)}",
            "details": "All temporary files have been cleaned up"
        }), 500

if __name__ == "__main__":
    app.run(debug=True)