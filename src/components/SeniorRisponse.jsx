import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const SeniorDevtaResponse = () => {
    const location = useLocation();
    const { combined_summary, topic_wise_summary, individual_summaries } = location.state || {};
    const [fontSize, setFontSize] = useState(16);

    const handleFontSizeChange = (event) => {
        setFontSize(parseInt(event.target.value, 10));
    };

    const textStyle = {
        fontSize: `${fontSize}px`,
    };

    return (
        <div className="min-h-screen bg-gray-800 text-white p-6">
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-4 text-orange-400">Senior Devta Summary</h1>

                {/* Font Size Slider */}
                <div className="mb-4">
                    <label htmlFor="fontSize" className="block text-orange-300 text-sm font-bold mb-2">
                        Font Size: {fontSize}px
                    </label>
                    <input
                        type="range"
                        min="12"
                        max="24"
                        value={fontSize}
                        onChange={handleFontSizeChange}
                        className="w-full"
                        id="fontSize"
                    />
                </div>

                {combined_summary && (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-orange-300 mb-2">Combined Summary</h2>
                        <div className="ml-4">
                            <h3 className="text-lg text-orange-200">Simple:</h3>
                            <p className="mb-2" style={textStyle}>{combined_summary.simple}</p>
                            <h3 className="text-lg text-orange-200">Translated:</h3>
                            <p className="mb-2" style={textStyle}>{combined_summary.translated}</p>
                            <h3 className="text-lg text-orange-200">Story:</h3>
                            <p className="mb-2" style={textStyle}>{combined_summary.story}</p>
                        </div>
                    </div>
                )}

                {topic_wise_summary && (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-orange-300 mb-2">Topic-wise Summary</h2>
                        <div className="ml-4">
                            <h3 className="text-lg text-orange-200">Simple:</h3>
                            <p className="mb-2" style={textStyle}>{topic_wise_summary.simple}</p>
                            <h3 className="text-lg text-orange-200">Translated:</h3>
                            <p className="mb-2" style={textStyle}>{topic_wise_summary.translated}</p>
                        </div>
                    </div>
                )}

                {individual_summaries && (
                    <div>
                        <h2 className="text-xl font-semibold text-orange-300 mb-2">Individual Summaries</h2>
                        {Object.entries(individual_summaries).map(([url, summary], index) => (
                            <div key={index} className="mb-6 ml-4">
                                <h3 className="text-lg text-orange-200 mb-2">Summary for {url}</h3>
                                {summary.error ? (
                                    <p className="text-red-500">{summary.error}</p>
                                ) : (
                                    <div>
                                        <h4 className="text-md text-orange-100 mb-1">Simple Summary:</h4>
                                        <p className="mb-2" style={textStyle}>{summary.simple_summary}</p>
                                        <h4 className="text-md text-orange-100 mb-1">Translated Summary:</h4>
                                        <p className="mb-2" style={textStyle}>{summary.translated_summary}</p>
                                        <h4 className="text-md text-orange-100 mb-1">Story Summary:</h4>
                                        <p className="mb-2" style={textStyle}>{summary.story_summary}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {!combined_summary && !topic_wise_summary && !individual_summaries && (
                    <p>No data received.</p>
                )}
            </div>
        </div>
    );
};

export default SeniorDevtaResponse;
