// import {useLocation} from "react-router-dom";
// import ReactPlayer from "react-player";
// import axios from "axios";
// import {useState} from "react";
//
// export default function ExamResponse() {
//     const location = useLocation();
//     const {summary, topic_summaries, video_url} = location.state || {};
//
//
//
//
//     return (
//         <div className={"bg-black text-white "}>
//             <div className={"border-solid border-purple-600 border-2 p-[10rem] flex flex-col justify-between items-center"}>
//                 <h1 className={"text-[2rem] text-bold"}>Summary</h1>
//                 <p>{summary}</p>
//             </div>
//             <div className={"flex flex-col justify-center items-center border-solid border-2 border-purple-600 p-[10rem]"}>
//                 <h2 className={"text-[2rem]"}>Topic Summaries</h2>
//
//                 {/*{Array.isArray({topic_summaries}) ? (*/}
//                 {/*    {topic_summaries}.map((topic, index) => (*/}
//                 {/*        <p key={index}>{JSON.stringify(topic)}</p>*/}
//                 {/*    ))*/}
//                 {/*) : (*/}
//                 {/*    Object.entries({topic_summaries}).map(([key, value]) => (*/}
//                 {/*        <div key={key}>*/}
//                 {/*            <h3>{key}</h3>*/}
//                 {/*            <p>{value}</p>*/}
//                 {/*        </div>*/}
//                 {/*    ))*/}
//                 {/*)}*/}
//
//                 {/*<ul>*/}
//                 {/*    {topic_summaries.map((value, index) => (*/}
//                 {/*        <li key={index}>{value}</li> // Only render values*/}
//                 {/*    ))}*/}
//                 {/*</ul>*/}
//
//                 {topic_summaries.map(([key, value], index) => (
//                     <li key={index}>
//                         <strong>{key}:</strong> {value}
//                     </li>
//                 ))}
//             </div>
//             <div className={"justify-center items-center w-full border-solid border-2 border-purple-600 p-[10rem] bg-gray-600"}>
//
//                 <video playsInline loop={true} src={video_url} controls/>
//
//
//
//             </div>
//         </div>
//     )
// }

import { useLocation } from "react-router-dom";

export default function ExamResponse() {
    const location = useLocation();
    const { summary, topic_summaries, video_url } = location.state || {};

    return (
        <div className="bg-black text-white">
            {/* Summary Section */}
            <div className="border-solid border-purple-600 border-2 p-[10rem] flex flex-col justify-between items-center">
                <h1 className="text-[2rem] font-bold">Summary</h1>
                <p>{summary}</p>
            </div>

            {/* Topic Summaries Section */}
            <div className="flex flex-col justify-center items-center border-solid border-2 border-purple-600 p-[10rem]">
                <h2 className="text-[2rem]">Topic Summaries</h2>

                {/* Check if topic_summaries is an object */}
                {topic_summaries && typeof topic_summaries === "object" ? (
                    <ul className="list-disc">
                        {Object.entries(topic_summaries).map(([key, value], index) => (
                            <li key={index}>
                                <strong>{key}:</strong> {JSON.stringify(value)}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No topic summaries available.</p>
                )}
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
