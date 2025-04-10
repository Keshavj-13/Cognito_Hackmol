import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";

const JuniorDevta = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
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

    const handleSubmit = async(event) => {
        event.preventDefault();
        setIsLoading(true); // Start loading
        try {
            const data = {
                "urls" : urls
            }
            const res = await axios.post("http://localhost:5000/junior_summarize_and_generate", data, {
                headers: {"Content-Type": "application/json" },
            })

            setResponse(res.data);
            navigate("/junior-devta/response", {state : {summary: res.data.summary, topic_summaries: res.data.topic_summaries, video_url: res.data.video_url}});

        } catch (err){
            console.error("Error:", err);
        }


        // Handle API request here
    };
    useEffect(() => {
        if (isLoading) {
            document.body.classList.add('loading');
        } else {
            document.body.classList.remove('loading');
        }

        return () => {
            document.body.classList.remove('loading');
        };
    }, [isLoading]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const colors = ["red", "pink", "green", "blue"];
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

                const formRect = document.querySelector("form").getBoundingClientRect();
                if (
                    beam.x > formRect.left &&
                    beam.x < formRect.right &&
                    beam.y + beam.height > formRect.top &&
                    beam.y < formRect.bottom
                ) {
                    beam.speed *= -1;
                }

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

        return () => {
            setAnimationRunning(false);
        };
    }, [animationRunning]);

    return (
        <div className="flex justify-center items-center h-screen bg-white overflow-hidden relative">
            {/* Light Beams Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 z-0"></canvas>

            {/* pink Planet */}
            <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-pink-900/10 to-pink-600/50 rounded-t-full shadow-lg">
                <div className="absolute top-[30%] left-[20%] w-[80px] h-[40px] bg-pink-800/50 rounded-full"></div>
                <div className="absolute top-[50%] left-[60%] w-[100px] h-[50px] bg-pink-700/50 rounded-full"></div>
                <div className="absolute top-[70%] left-[80%] w-[60px] h-[30px] bg-pink-800/50 rounded-full"></div>
            </div>

            {/* COGNITO Title */}
            <div className="absolute top-4 left-6 text-pink-500 text-3xl font-orbitron drop-shadow-lg">
                COGNITO
            </div>

            {/* Exam Devta Form */}
            <form
                onSubmit={handleSubmit}
                className="relative z-10 bg-pink-100 border-2 border-pink-700 p-6 rounded-lg shadow-lg w-full max-w-md transition-shadow duration-300 hover:shadow-pink-500/50"
            >
                <fieldset className="text-center">
                    <legend className="text-pink-400 text-2xl font-orbitron uppercase tracking-wide drop-shadow-md">
                        EXAM DEVTA
                    </legend>

                    {/* URL Inputs */}
                    <div id="urlContainer" className="space-y-3 mt-4">
                        {urls.map((url, index) => (
                            <div key={index} className="url-group flex items-center space-x-2 ">
                                <input
                                    type="url"
                                    placeholder="Enter URL"
                                    value={url}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    className="flex-1 px-3 py-2 border border-pink-500 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-pink-400"
                                />
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveUrl(index)}
                                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:shadow-lg hover:shadow-silver transition"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Add & Submit Buttons */}
                    <button
                        type="button"
                        onClick={handleAddUrl}
                        className="mt-3 px-4 py-2 bg-pink-700 text-white rounded-lg hover:shadow-lg hover:shadow-silver transition"
                        disabled={urls.length >= maxUrls}
                    >
                        Add +
                    </button>
                    <button
                        type="submit"
                        className="mt-3 px-4 py-2 bg-blue-700 text-white rounded-lg hover:shadow-lg hover:shadow-silver transition"
                    >
                        Submit
                    </button>
                </fieldset>
            </form>
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                    <div className="flex flex-col items-center justify-center">
                        {/* Pink spinner matching EXAM DEVTA theme */}
                        <div className="w-20 h-20 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>

                        {/* Pink text with matching styling */}
                        <p className="mt-6 text-pink-400 text-lg font-orbitron uppercase tracking-wide animate-pulse">
                            Processing your request...
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JuniorDevta;
