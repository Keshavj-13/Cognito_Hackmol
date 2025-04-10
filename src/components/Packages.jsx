import React from 'react';
import HoverEffect from "./ui/HoverEffect.jsx";

// Plan data
const items = [
    {
        title: "BASIC PLAN",
        description: (
            <>
                <ul className="list-none space-y-1 flex flex-col items-start mx-auto w-fit">
                    <li className="flex items-center gap-2"><span>✔️</span> AI-powered learning</li>
                    <li className="flex items-center gap-2"><span>✔️</span> Summaries & Q&A</li>
                    <li className="flex items-center gap-2"><span>✔️</span> FlashCards & Quizzes</li>
                    <li className="flex items-center gap-2"><span>❌</span> Ad-free experience</li>
                    <li className="flex items-center gap-2"><span>❌</span> Personalized</li>
                    <li className="flex items-center gap-2"><span>❌</span> Advanced AI tools</li>
                    <li className="flex items-center gap-2"><span>❌</span> Exclusive study notes & insights</li>
                    <li className="flex items-center gap-2"><span>❌</span> Exam-focused AI coaching</li>
                    <li className="flex items-center gap-2"><span>❌</span> One-on-one AI tutoring</li>
                    <li className="flex items-center gap-2"><span>❌</span> Early access to new features</li>
                    <li className="flex items-center gap-2"><span>❌</span> Premium rewards & discounts</li>
                </ul>
            </>
        ),
        link: "https://example.com/1"
    },
    {
        title: "PREMIUM PLAN",
        description: (
            <>
                <ul className="list-none space-y-1 flex flex-col items-start mx-auto w-fit">
                    <li className="flex items-center gap-2"><span>✔️</span> AI-powered learning</li>
                    <li className="flex items-center gap-2"><span>✔️</span> Summaries & Q&A</li>
                    <li className="flex items-center gap-2"><span>✔️</span> FlashCards & Quizzes</li>
                    <li className="flex items-center gap-2"><span>✔️</span> Ad-free experience</li>
                    <li className="flex items-center gap-2"><span>✔️</span> Personalized</li>
                    <li className="flex items-center gap-2"><span>✔️</span> Advanced AI tools</li>
                    <li className="flex items-center gap-2"><span>✔️</span> Exclusive study notes & insights</li>
                    <li className="flex items-center gap-2"><span>❌</span> Exam-focused AI coaching</li>
                    <li className="flex items-center gap-2"><span>❌</span> One-on-one AI tutoring</li>
                    <li className="flex items-center gap-2"><span>❌</span> Early access to new features</li>
                    <li className="flex items-center gap-2"><span>❌</span> Premium rewards & discounts</li>
                </ul>
            </>
        ),
        link: "https://example.com/2"
    },
    {
        title: "ULTIMATE PLAN",
        description: (
            <>
                <ul className="list-none space-y-1 flex flex-col items-start mx-auto w-fit">
                    <li className="flex items-center gap-2"><span>✔️</span> AI-powered learning</li>
                    <li className="flex items-center gap-2"><span>✔️</span> Summaries & Q&A</li>
                    <li className="flex items-center gap-2"><span>✔️</span> FlashCards & Quizzes</li>
                    <li className="flex items-center gap-2"><span>✔️</span> Ad-free experience</li>
                    <li className="flex items-center gap-2"><span>✔️</span> Personalized</li>
                    <li className="flex items-center gap-2"><span>✔️</span> Advanced AI tools</li>
                    <li className="flex items-center gap-2"><span>✔️</span> Exclusive study notes & insights</li>
                    <li className="flex items-center gap-2"><span>✔️</span> Exam-focused AI coaching</li>
                    <li className="flex items-center gap-2"><span>✔️</span> One-on-one AI tutoring</li>
                    <li className="flex items-center gap-2"><span>✔️</span> Early access to new features</li>
                    <li className="flex items-center gap-2"><span>✔️</span> Premium rewards & discounts</li>
                </ul>
            </>
        ),
        link: "https://example.com/1"
    }
];

// Plan Card Component
const PlanCard = ({title, description, link}) => {
    return (
        <div
            className="plan-card border rounded-lg p-6 m-4 shadow-lg bg-white w-120 min-h-[500px] flex flex-col justify-between">
            <div>
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <div className="description mb-6">{description}</div>
            </div>
            <a href={link} className="text-blue-500 hover:underline mt-auto">Learn More</a>
        </div>
    );
};

// Main Pricing Page
const PricingPage = () => {
    return (
        <div className="pricing-page bg-gray-600 min-h-screen relative pt-16">
            {/* Cognito header at top-left */}
            <div className="absolute top-4 left-4 text-4xl font-bold text-gray-900 z-10">COGNITO</div>

            {/* Pricing Plans in Grid */}
            <div className="content mt-8 w-full text-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">

                {items.map((item, index) => (
                    <PlanCard
                        key={index}
                        title={item.title}
                        description={item.description}
                        link={item.link}
                    />
                ))}
            </div>

            {/* Buy Now Button at the bottom */}
            <div className="absolute bottom-10 w-full text-center">
                <button
                    className="buy-now-btn py-2 px-8 rounded-full bg-amber-500 text-white font-semibold hover:scale-125 transition-transform duration-300 shadow-lg shadow-golden">
                    BUY NOW
                </button>
            </div>
        </div>
    );
};



export default PricingPage;
