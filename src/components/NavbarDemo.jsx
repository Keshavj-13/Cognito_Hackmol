"use client";
import { useState } from "react";
import { HoveredLink, Menu, Navbar, ProductItem } from "./ui/Navbar.jsx";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function NavbarDemo() {
    return (
        <div className="relative w-full flex items-center justify-center text-black bg-white">
            <Nav className="top-2" />
            <p className="text-black dark:text-white">The Navbar will show on top of the page</p>
        </div>
    );
}

function Nav({ className }) {
    const [active, setActive] = useState(null);

    return (
        <div className={cn(
            "fixed top-10 inset-x-0 max-w-2xl mx-auto z-50",
            "shadow-[4px_4px_12px_rgba(0,0,0,0.08)] dark:shadow-[5px_5px_18px_rgba(0,0,0,0.25)]",
            "rounded-[37px] border border-gray-500 dark:border-neutral-700", // Grey borders
            "bg-gray-600/95 dark:bg-neutral-900/95 backdrop-blur-sm",
            className
        )}>
            <Menu setActive={setActive}>
                <Navbar setActive={setActive} active={active} item="About Us">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/ideation">IDIATION</HoveredLink>
                        <HoveredLink href="/modularity">MODULARITY</HoveredLink>
                        <HoveredLink href="/technology">TECHNOLOGYAA!</HoveredLink>
                    </div>
                </Navbar>

                <Navbar setActive={setActive} active={active} item="Loks">
                    <div className="text-sm grid grid-cols-2 gap-10 p-4">
                        <ProductItem
                            title="Junior Devta"
                            href="http://localhost:8502/"
                            src="https://i.ibb.co/23Q01vsM/juniornigga.jpg"
                            description="Prepare for tech interviews like never before."
                        />
                        <ProductItem
                            title="Exam Devta"
                            href="http://localhost:8501/"
                            src="https://i.ibb.co/FLndTbdj/exam.jpg"
                            description="Production-ready Tailwind CSS components for your next project."
                        />
                        <ProductItem
                            title="Senior Devta"
                            href="http://localhost:5173/senior-devta"
                            src="https://i.ibb.co/d0ZFmXh6/senior.jpg"
                            description="Never write from scratch again. Go from idea to blog in minutes."
                        />
                        <ProductItem
                            title="Foundation Devta"
                            href="http://localhost:8503/"
                            src={"https://i.ibb.co/PsvJNpYh/foundation.jpg"}
                            description="Respond to government RFPs, RFIs, and RFQs 10x faster using AI."
                        />
                    </div>
                </Navbar>

                <Navbar setActive={setActive} active={active} item="Sign Up ">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/login">PROFILE</HoveredLink>
                        <HoveredLink href="http://localhost:5173/quiz">PHYCOMETRICS</HoveredLink>
                        <HoveredLink href="/report">YOUR-REPORT</HoveredLink>
                        <HoveredLink href="/package">PACKAGE</HoveredLink>
                    </div>
                </Navbar>
            </Menu>
        </div>
    );
}