import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ExpandButton = ({ logo, name }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="flex items-center bg-[#d79921] opacity-90 text-black px-4 py-2 rounded-full cursor-pointer shadow-lg"
            initial={{ width: 50 }}
            animate={{ width: isHovered ? 160 : 50 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Logo */}
            <motion.img
                src={logo}
                alt="Logo"
                className="w-8 h-8"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}

            />

            {/* Name (only shows when hovering over the logo) */}
            <AnimatePresence>
                {isHovered && (
                    <motion.span
                        className="ml-2 whitespace-nowrap"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {name}
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ExpandButton;
