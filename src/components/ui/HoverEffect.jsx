import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Utility function for conditional class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

const HoverEffect = ({ items, className }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10", className)}>
            {items.map((item, idx) => (
                <a
                    href={item?.link}
                    key={item?.link}
                    className="relative group block p-2 h-full w-full"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence>
                        {hoveredIndex === idx && (
                            <motion.span
                                className="absolute inset-0 h-full w-full bg-[#d79921] dark:bg-[#d79921]/[0.8] block rounded-3xl"
                                layoutId="hoverBackground"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    transition: { duration: 0.15 },
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: { duration: 0.15, delay: 0.2 },
                                }}
                            />
                        )}
                    </AnimatePresence>
                    <Card>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                    </Card>
                </a>
            ))}
        </div>
    );
};

const Card = ({ className, children }) => {
    return (
        <div
            className={cn(
                "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-[#d79921] relative z-20",
                className
            )}
        >
            <div className="relative z-50">
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
};

const CardTitle = ({ className, children }) => {
    return <h4 className={cn("text-zinc-100 tracking-wide mt-4 text-center text-[2rem]", className)}>{children}</h4>;
};

const CardDescription = ({ className, children }) => {
    return <p className={cn("mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm text-center", className)}>{children}</p>;
};

export default HoverEffect;
export { Card, CardTitle, CardDescription };
