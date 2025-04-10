import React from 'react';

// Plan data
const items = [
    {
        title: "BASIC PLAN",
        description: (
            <>
                <ul className="list-none space-y-2 flex flex-col items-start mx-auto w-fit">
                    <li className="flex items-center gap-2 text-gray-300"><span className="text-[#d79921]">✓</span> AI-powered learning</li>
                    <li className="flex items-center gap-2 text-gray-300"><span className="text-[#d79921]">✓</span> Summaries & Q&A</li>
                    <li className="flex items-center gap-2 text-gray-300"><span className="text-[#d79921]">✓</span> FlashCards & Quizzes</li>
                    <li className="flex items-center gap-2 text-gray-500"><span>✕</span> Ad-free experience</li>
                    <li className="flex items-center gap-2 text-gray-500"><span>✕</span> Personalized</li>
                    <li className="flex items-center gap-2 text-gray-500"><span>✕</span> Advanced AI tools</li>
                    <li className="flex items-center gap-2 text-gray-500"><span>✕</span> Exclusive study notes & insights</li>
                    <li className="flex items-center gap-2 text-gray-500"><span>✕</span> Exam-focused AI coaching</li>
                    <li className="flex items-center gap-2 text-gray-500"><span>✕</span> One-on-one AI tutoring</li>
                    <li className="flex items-center gap-2 text-gray-500"><span>✕</span> Early access to new features</li>
                    <li className="flex items-center gap-2 text-gray-500"><span>✕</span> Premium rewards & discounts</li>
                </ul>
            </>
        ),
        link: "https://example.com/1"
    },
    {
        title: "PREMIUM PLAN",
        description: (
            <>
                <ul className="list-none space-y-2 flex flex-col items-start mx-auto w-fit">
                    <li className="flex items-center gap-2 text-gray-300"><span className="text-[#d79921]">✓</span> AI-powered learning</li>
                    <li className="flex items-center gap-2 text-gray-300"><span className="text-[#d79921]">✓</span> Summaries & Q&A</li>
                    <li className="flex items-center gap-2 text-gray-300"><span className="text-[#d79921]">✓</span> FlashCards & Quizzes</li>
                    <li className="flex items-center gap-2 text-gray-300"><span className="text-[#d79921]">✓</span> Ad-free experience</li>
                    <li className="flex items-center gap-2 text-gray-300"><span className="text-[#d79921]">✓</span> Personalized</li>
                    <li className="flex items-center gap-2 text-gray-300"><span className="text-[#d79921]">✓</span> Advanced AI tools</li>
                    <li className="flex items-center gap-2 text-gray-300"><span className="text-[#d79921]">✓</span> Exclusive study notes & insights</li>
                    <li className="flex items-center gap-2 text-gray-500"><span>✕</span> Exam-focused AI coaching</li>
                    <li className="flex items-center gap-2 text-gray-500"><span>✕</span> One-on-one AI tutoring</li>
                    <li className="flex items-center gap-2 text-gray-500"><span>✕</span> Early access to new features</li>
                    <li className="flex items-center gap-2 text-gray-500"><span>✕</span> Premium rewards & discounts</li>
                </ul>
            </>
        ),
        link: "https://example.com/2"
    },
    {
        title: "ULTIMATE PLAN",
        description: (
            <>
                <ul className="list-none space-y-2 flex flex-col items-start mx-auto w-fit">
                    <li className="flex items-center gap-2 text-gray-300"><span className="text-[#d79921]">✓</span> AI-powered learning</li>
                    <li className="flex items-center gap-2 text-gray-300"><span className="text-[#d79921]">✓</span> Summaries & Q&A</li>
                    <li className="flex items-center gap-2 text-gray-300"><span className="text-[#d79921]">✓</span> FlashCards & Quizzes</li>
                    <li className="flex items-center gap-2 text-gray-300"><span className="text-[#d79921]">✓</span> Ad-free experience</li>
                    <li className="flex items-center gap-2 text-gray-300"><span className="text-[#d79921]">✓</span> Personalized</li>
                    <li className="flex items-center gap-2 text-gray-300"><span className="text-[#d79921]">✓</span> Advanced AI tools</li>
                    <li className="flex items-center gap-2 text-gray-300"><span className="text-[#d79921]">✓</span> Exclusive study notes & insights</li>
                    <li className="flex items-center gap-2 text-gray-300"><span className="text-[#d79921]">✓</span> Exam-focused AI coaching</li>
                    <li className="flex items-center gap-2 text-gray-300"><span className="text-[#d79921]">✓</span> One-on-one AI tutoring</li>
                    <li className="flex items-center gap-2 text-gray-300"><span className="text-[#d79921]">✓</span> Early access to new features</li>
                    <li className="flex items-center gap-2 text-gray-300"><span className="text-[#d79921]">✓</span> Premium rewards & discounts</li>
                </ul>
            </>
        ),
        link: "https://example.com/1"
    }
];

// Plan Card Component
const PlanCard = ({ title, description, link }) => {
    return (
        <div className="plan-card border border-gray-700 rounded-lg p-6 bg-gray-800 min-h-[500px] flex flex-col justify-between transition-all duration-300 hover:border-[#d79921]/50 hover:shadow-xl hover:shadow-[#d79921]/10">
            <div>
                <h2 className="text-2xl font-bold mb-4 text-[#d79921]">{title}</h2>
                <div className="description mb-6 text-gray-300">
                    {React.cloneElement(description, {
                        className: "list-none space-y-2 flex flex-col items-start mx-auto w-fit"
                    })}
                </div>
            </div>
            <a href={link} className="text-[#d79921] hover:text-amber-600 font-medium mt-auto transition-colors">
                Learn More →
            </a>
        </div>
    );
};

const PricingPage = () => {
    return (
        <div className="pricing-page bg-gray-900 min-h-screen relative pb-24 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-[500px] h-[500px] bg-[#d79921]/10 blur-3xl -top-32 -left-32 animate-pulse"></div>
                <div className="absolute w-[500px] h-[500px] bg-[#d79921]/05 blur-3xl -bottom-32 -right-32 animate-pulse delay-1000"></div>
            </div>

            {/* Header */}
            <div className="absolute top-6 left-6 text-4xl font-bold text-[#d79921] z-10 font-mono tracking-wider">
                COGNITO
            </div>

            {/* Pricing Grid */}
            <div className="container mx-auto px-4 pt-16 z-20 relative">
                <h1 className="text-4xl font-bold text-center mb-8 text-white">
                    Choose Your Plan
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                    {items.map((item, index) => (
                        <PlanCard
                            key={index}
                            title={item.title}
                            description={item.description}
                            link={item.link}
                        />
                    ))}
                </div>
            </div>

            {/* Buy Now Button */}
            <div className="fixed bottom-8 w-full text-center z-20">
                <button className="py-3 px-12 rounded-full bg-[#d79921] text-gray-900 font-bold hover:bg-amber-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#d79921]/30">
                    BUY NOW
                </button>
            </div>
        </div>
    );
};

export default PricingPage;