import { useState } from "react";
import axios from "axios";

const ApiConnect = () => {
    const [url1, setUrl1] = useState("");
    const [url2, setUrl2] = useState("");
    const [response, setResponse] = useState(null);

    const sendUrls = async () => {
        try {
            const data = {
                "urls" : [url1, url2]
            }; // Create JSON object
            const res = await axios.post("http://localhost:5000/summarize_and_generate", data, {
                headers: { "Content-Type": "application/json" },
            });
            setResponse(res.data); // Store API response
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <h2>Enter URLs</h2>

            <label>URL 1:</label>
            <input
                type="text"
                value={url1}
                onChange={(e) => setUrl1(e.target.value)}
                placeholder="Enter first URL"
            />
            <br />

            <label>URL 2:</label>
            <input
                type="text"
                value={url2}
                onChange={(e) => setUrl2(e.target.value)}
                placeholder="Enter second URL"
            />
            <br />

            <button onClick={sendUrls}>Send</button>

            <div>
                <h3>Response:</h3>
                {response ? <pre>{JSON.stringify(response, null, 2)}</pre> : <p>No response yet</p>}
            </div>
        </div>
    );
};

export default ApiConnect;