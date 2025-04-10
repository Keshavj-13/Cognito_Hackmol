import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ExamResponse from "./ExamResponse.jsx";

const ApiConnectUpdated = () => {
    const [urls, setUrls] = useState([""]);
    const [response, setResponse] = useState(null);
    const canvasRef = useRef(null);
    const [animationRunning, setAnimationRunning] = useState(true);
    const maxUrls = 5;

    const handleAddUrl = () => {
        if (urls.length < maxUrls) {
            setUrls([...urls, ""]);
        }
    };

    const handleRemoveUrl = (index) => {
        setUrls(urls.filter((_, i) => i !== index));
    };

    const handleChange = (index, value) => {
        const newUrls = [...urls];
        newUrls[index] = value;
        setUrls(newUrls);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setAnimationRunning(false);
        console.log("Submitted URLs:", urls);
        try {
            const res = await axios.post("http://localhost:5000/summarize_and_generate", { urls }, {
                headers: { "Content-Type": "application/json" },
            });
            setResponse(res.data);
            const data = await response.json()
            navigate("/exam-devta/response", {state : {summary: data.summary, topic_summaries: data.summary, video_url: data.video_url}});
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const colors = ["yellow", "purple", "green", "blue"];
        let beams = Array.from({ length: 30 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height * -1,
            speed: 2 + Math.random() * 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            width: 2,
            height: 20,
        }));

        const updateBeams = () => {
            if (!animationRunning) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            beams.forEach((beam, index) => {
                beam.y += beam.speed;
                if (beam.y > canvas.height + 50 || beam.y < -50) {
                    beams[index] = {
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height * -1,
                        speed: 2 + Math.random() * 2,
                        color: colors[Math.floor(Math.random() * colors.length)],
                        width: 2,
                        height: 20,
                    };
                }
                ctx.fillStyle = beam.color;
                ctx.fillRect(beam.x, beam.y, beam.width, beam.height);
            });
            requestAnimationFrame(updateBeams);
        };

        updateBeams();

        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        return () => setAnimationRunning(false);
    }, [animationRunning]);

    return (
        <div className="flex justify-center items-center h-screen bg-black overflow-hidden relative">
            <canvas ref={canvasRef} className="absolute inset-0 z-0"></canvas>
            <form onSubmit={handleSubmit} className="relative z-10 bg-gray-900 border-2 border-purple-700 p-6 rounded-lg shadow-lg w-full max-w-md">
                <fieldset className="text-center">
                    <legend className="text-purple-400 text-2xl font-orbitron uppercase tracking-wide">EXAM DEVTA</legend>
                    <div className="space-y-3 mt-4">
                        {urls.map((url, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <input
                                    type="url"
                                    placeholder="Enter URL"
                                    value={url}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    className="flex-1 px-3 py-2 border border-purple-500 rounded-md bg-gray-800 text-white"
                                />
                                {index > 0 && (
                                    <button type="button" onClick={() => handleRemoveUrl(index)} className="px-3 py-2 bg-red-600 text-white rounded-lg">Remove</button>
                                )}
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={handleAddUrl} disabled={urls.length >= maxUrls} className="mt-3 px-4 py-2 bg-purple-700 text-white rounded-lg">Add +</button>
                    <button type="submit" className="mt-3 px-4 py-2 bg-blue-700 text-white rounded-lg">Submit</button>
                </fieldset>
            </form>
            {response && (
                <div className="absolute top-16 bg-gray-800 text-white p-4 rounded-md max-w-md shadow-lg">
                    <h3 className="text-purple-400">Response:</h3>
                    <pre className="text-sm overflow-auto max-h-40">{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
            {/*{*/}
            {/*    response && (*/}
            {/*        <ExamResponse props={response} />*/}
            {/*    )*/}
            {/*}*/}
        </div>
    );
};

export default ApiConnectUpdated;
