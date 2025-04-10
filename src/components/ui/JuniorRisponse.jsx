import { useLocation } from "react-router-dom";

export default function JuniorResponse() {
    const location = useLocation();
    const { summary, simple_summary, story_summary, video_url } = location.state || {};

    return (
        <div className="bg-black text-white">
            {/* Summary Section */}
            <div className="border-solid border-purple-600 border-2 p-[10rem] flex flex-col justify-between items-center">
                <h1 className="text-[2rem] font-bold">Summary</h1>
                <p>{summary}</p>
            </div>

            {/* Simple Summary Section */}
            <div className="flex flex-col justify-center items-center border-solid border-2 border-purple-600 p-[10rem]">
                <h2 className="text-[2rem]">Simple Summary</h2>
                <p>{simple_summary || "No simple summary available."}</p>
            </div>

            {/* Story Summary Section */}
            <div className="flex flex-col justify-center items-center border-solid border-2 border-purple-600 p-[10rem]">
                <h2 className="text-[2rem]">Story Summary</h2>
                <p>{story_summary || "No story summary available."}</p>
            </div>

            {/* Video Section */}
            <div className="justify-center items-center w-full border-solid border-2 border-purple-600 p-[10rem] bg-gray-600">
                {video_url ? (
                    <video playsInline loop={true} src={video_url} controls />
                ) : (
                    <p>No video available.</p>
                )}
            </div>
        </div>
    );
}
x