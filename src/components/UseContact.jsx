import AnimatedTooltip from "./ui/AnimatedTooltip.jsx";

export default function UseContact() {
    const people = [
        {
            id: 1,
            name: "Ganeev Singh",
            designation: "CEO",
            image:
                "https://i.ibb.co/rfzyZSKP/Whats-App-Image-2025-01-22-at-12-58-40-668f6e3f.jpg",
        },
        {
            id: 2,
            name: "Aditya Gupta",
            designation: "CTO",
            image:
                "https://i.ibb.co/3YRs9jwh/Whats-App-Image-2025-01-22-at-13-00-50-be70da65.jpg",
        },
        {
            id: 3,
            name: "Keshav Juneja",
            designation: "Software Developer",
            image:
                "https://i.ibb.co/jPny69Nm/Whats-App-Image-2025-01-22-at-13-04-21-38f31d02.jpg",
        },
        {
            id: 5,
            name: "Chakki Shrivashtava",
            designation: "UI Designer",
            image:
                "https://i.ibb.co/MytYSBbY/Whats-App-Image-2025-01-22-at-13-19-08-400cbd5f.jpg",
        },
    ];
    return (
        <div className="flex justify-center items-center p-32 scale-[2]">
            <AnimatedTooltip items={people} />
        </div>
    );
}
