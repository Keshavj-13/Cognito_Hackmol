import os
import concurrent.futures
from flask import Flask, request, jsonify, url_for
from youtube_transcript_api import YouTubeTranscriptApi
from google.generativeai import GenerativeModel, configure
from flask_cors import CORS

# Configure Google Gemini API
configure(api_key="AIzaSyCdM5KhU5s0s_LpxUntadXVo8L6SOLK1tA")

app = Flask(__name__)
CORS(app, supports_credentials=True)


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
@app.route("/summarize", methods=["POST"])
def summarize_videos():
    data = request.get_json()
    youtube_urls = data.get("urls", [])
    language = data.get("language", "Hindi")
    
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

if __name__ == "__main__":
    app.run(debug=True)
