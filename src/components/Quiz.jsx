import React, { useState } from "react";

const LearningStyleQuiz = () => {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Quiz Submitted! Your learning style will be analyzed.");
    };

    const questions = [
        { question: "What is your age?", name: "age", options: ["Under 13", "13-18", "19-25", "26+"] },
        { question: "Do you retain information long-term or learn quickly but forget easily?", name: "retention", options: ["Long-term retention", "Quick but forget", "Depends on subject", "Need frequent revision"] },
        { question: "How do you usually understand new concepts best?", name: "learning", options: ["Visuals", "Reading", "Practice", "Discussion"] },
        { question: "When faced with a difficult problem, what do you do first?", name: "problem", options: ["Self-solve", "Guides", "Ask for help", "Move on"] },
        { question: "How do you best remember information for exams or projects?", name: "memory", options: ["Mind maps & visuals", "Summarizing notes", "Practicing", "Teaching others"] },
        { question: "If you were given a new device with no instructions, how would you figure out how it works?", name: "new_device", options: ["Watch a tutorial", "Read the manual", "Experiment", "Ask someone"] },
        { question: "When you study, do you prefer:", name: "study_preference", options: ["Short sessions with breaks", "Long focused sessions", "Last-minute cramming", "Group study"] },
        { question: "What helps you retain information better?", name: "retention_method", options: ["Visual cues", "Rewriting notes", "Practice exercises", "Explaining to others"] },
        { question: "What kind of notes do you take?", name: "notes", options: ["Diagrams & highlights", "Detailed summaries", "Bullet points", "Minimal notes"] },
        { question: "If you forget something you studied, what do you do?", name: "forget_strategy", options: ["Look for visual cues", "Re-read material", "Practice problems", "Ask someone"] }
    ];

    return (
        <div style={{ backgroundColor: "#000000", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "16px", margin: 0 }}>
            <div style={{ position: "absolute", top: "10px", left: "20px", fontSize: "32px", fontWeight: "bold", color: "rgba(255, 255, 255, 0.2)", userSelect: "none", pointerEvents: "none" }}>Cognito</div>
            <div style={{ maxWidth: "900px", width: "90%", margin: "0 auto", padding: "32px", background: "linear-gradient(to bottom, #1a202c, #000000)", color: "white", borderRadius: "10px", boxShadow: "0 0 15px rgba(0, 191, 255, 0.6)", border: "2px solid rgba(0, 191, 255, 0.3)" }}>
                <h2 style={{ textAlign: "center", fontSize: "28px", fontWeight: "bold", marginBottom: "24px" }}>Study Lok Learning Style & Aptitude Test</h2>
                <form onSubmit={handleSubmit}>
                    {questions.map((item, index) => (
                        <div key={index} style={{ marginBottom: "24px" }}>
                            <p style={{ fontSize: "20px", fontWeight: "500" }}>{index + 1}. {item.question}</p>
                            {item.options.map((option) => (
                                <label key={option} style={{ display: "flex", alignItems: "center", fontSize: "16px", margin: "8px 0", cursor: "pointer", transition: "color 0.2s ease", color: "#cbd5e0", gap: "10px" }}>
                                    <input
                                        type="radio"
                                        name={item.name}
                                        value={option}
                                        checked={formData[item.name] === option}
                                        onChange={handleChange}
                                        style={{
                                            appearance: "none",
                                            width: "18px",
                                            height: "18px",
                                            borderRadius: "50%",
                                            border: "2px solid #718096",
                                            cursor: "pointer",
                                            transition: "background 0.2s ease, border-color 0.2s ease",
                                            display: "inline-block",
                                            position: "relative",
                                            background: formData[item.name] === option ? "#63b3ed" : "transparent"
                                        }}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    ))}
                    <button
                        type="submit"
                        style={{ width: "100%", padding: "12px", marginTop: "24px", borderRadius: "4px", background: "#3182ce", color: "white", fontSize: "18px", fontWeight: "bold", transition: "background 0.3s ease, transform 0.3s ease" }}
                        onMouseEnter={(e) => {
                            e.target.style.background = "#63b3ed";
                            e.target.style.boxShadow = "0 0 10px #00bfff, 0 0 20px #00bfff";
                            e.target.style.transform = "rotate(3deg)";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = "#3182ce";
                            e.target.style.boxShadow = "none";
                            e.target.style.transform = "rotate(0deg)";
                        }}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LearningStyleQuiz;
