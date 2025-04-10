/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { cn } from "../../utils/cn.js";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

export const FloatingDock = ({ items, desktopClassName, mobileClassName }) => {
    return (
        <>
            <FloatingDockDesktop items={items} className={desktopClassName} />
            <FloatingDockMobile items={items} className={mobileClassName} />
        </>
    );
};

const FloatingDockMobile = ({ items, className }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={cn("relative block md:hidden", className)}>
            <AnimatePresence>
                {open && (
                    <motion.div layoutId="nav" className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2">
                        {items.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{
                                    opacity: 0,
                                    y: 10,
                                    transition: { delay: idx * 0.05 },
                                }}
                                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                            >
                                <Link
                                    to={item.href}
                                    className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-900 flex items-center justify-center
                                    shadow-[3px_3px_6px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_10px_rgba(0,0,0,0.35)]"
                                >
                                    <div className="h-4 w-4">{item.icon}</div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
            <button
                onClick={() => setOpen(!open)}
                className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-800 flex items-center justify-center
                shadow-[4px_4px_10px_rgba(0,0,0,0.15)] dark:shadow-[5px_5px_15px_rgba(0,0,0,0.4)] hover:shadow-[5px_5px_12px_rgba(0,0,0,0.2)]
                dark:hover:shadow-[6px_6px_16px_rgba(0,0,0,0.5)] transition-shadow"
            >
                <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
            </button>
        </div>
    );
};

const FloatingDockDesktop = ({ items, className }) => {
    let mouseX = useMotionValue(Infinity);
    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className={cn(
                "mx-auto hidden md:flex h-16 gap-4 items-end rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 pb-3",
                "shadow-[6px_6px_15px_rgba(0,0,0,0.15)] dark:shadow-[8px_8px_20px_rgba(0,0,0,0.35)]",
                className
            )}
        >
            {items.map((item) => (
                <IconContainer mouseX={mouseX} key={item.title} {...item} />
            ))}
        </motion.div>
    );
};

function IconContainer({ mouseX, title, icon, href }) {
    let ref = useRef(null);

    let distance = useTransform(mouseX, (val) => {
        let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

    let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
    let heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

    let width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
    let height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });

    let widthIcon = useSpring(widthTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 });
    let heightIcon = useSpring(heightTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 });

    const [hovered, setHovered] = useState(false);

    return (
        <Link to={href}>
            <motion.div
                ref={ref}
                style={{ width, height }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative
                shadow-[3px_3px_8px_rgba(0,0,0,0.15)] dark:shadow-[4px_4px_12px_rgba(0,0,0,0.4)] hover:shadow-[4px_4px_12px_rgba(0,0,0,0.2)]
                dark:hover:shadow-[5px_5px_15px_rgba(0,0,0,0.5)] transition-shadow"
            >
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, x: "-50%" }}
                            animate={{ opacity: 1, y: 0, x: "-50%" }}
                            exit={{ opacity: 0, y: 2, x: "-50%" }}
                            className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 dark:bg-neutral-800 dark:text-white
                            text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs
                            shadow-[2px_2px_5px_rgba(0,0,0,0.1)] dark:shadow-[3px_3px_8px_rgba(0,0,0,0.3)]"
                        >
                            {title}
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.div style={{ width: widthIcon, height: heightIcon }} className="flex items-center justify-center">
                    {icon}
                </motion.div>
            </motion.div>
        </Link>
    );
}