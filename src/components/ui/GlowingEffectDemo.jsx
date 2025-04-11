import React from "react";
import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import GlowingEffect from "@/components/ui/GlowingEffect.jsx";

export default function GlowingEffectDemo() {
    return (
        <>
            {/*<div className="w-full flex justify-center items-center gap-6 mt-8 mb-8">*/}

            {/*    <button className="relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:ring-4 hover:ring-pink-300/50 hover:shadow-2xl focus:outline-none">*/}
            {/*        Learn at your Pace*/}
            {/*    </button>*/}
            {/*    <p className="text-white text-lg font-medium">*/}
            {/*        This is the recommended Devta.*/}
            {/*    </p>*/}
            {/*</div>*/}
            <div className="w-full flex justify-center items-center gap-5 mt-8 mb-8">
                <a href="http://localhost:8506">
                    <button className="relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:ring-4 hover:ring-pink-300/50 hover:shadow-2xl focus:outline-none translate-x-[-10px]">
                        Learn at your Pace
                    </button>
                </a>

                <p className="text-white text-xl font-semibold">
                    (This is the recommended Devta.)
                </p>
            </div>
        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">

            <GridItem
                area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
                icon={<Box className="h-4 w-4 text-black dark:text-neutral-400" />}
                title="Junior Devta"
                description="Creating Fun Environment to learn and grow."
                href="http://localhost:8502"

            />

            <GridItem
                area="md:[grid-area:1/7/2/13] xl:[grid-area:1/5/2/9]"
                icon={<Settings className="h-4 w-4 text-black dark:text-neutral-400" />}
                title="Senior Devta"
                description="In every language for everyone's learning journey"
                href="http://localhost:8504"

            />
            <GridItem
                area="md:[grid-area:2/1/3/7] xl:[grid-area:1/9/3/13]"
                icon={<Lock className="h-4 w-4 text-black dark:text-neutral-400" />}
                title="Anthropomorphize Learning"
                description="This section highlights the recommended Devta: Learn at your Pace. It’s meant to draw attention to the most suitable or suggested option out of all the Devtas listed. The button encourages users to consider this Devta, while the accompanying text reinforces its importance or value. It’s a way to guide users toward a choice that might suit them best, especially if they’re unsure which path to take."
            />


            <GridItem
                area="md:[grid-area:2/7/3/13] xl:[grid-area:2/1/3/5]"
                icon={<Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />}
                title="Foundation Devta"
                description="Ready to learn the core concepts."
                href="http://localhost:8503"
            />

            <GridItem
                area="md:[grid-area:3/1/4/13] xl:[grid-area:2/5/3/9]"
                icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
                title="Exam Devta"
                description="Lets Start Preparing"
                href="http://localhost:8501"
            />


        </ul>

        </>
    );
}

// const GridItem = ({ area, icon, title, description }) => {
//     return (
//         <li className={`min-h-[14rem] list-none ${area}`}>
//             <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3 bg-neutral-700 border-black">
//                 <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
//                 <div className=" border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
//                     <div className="relative flex flex-1 flex-col justify-between gap-3">
//                         <div className="w-fit rounded-lg border border-white p-2 bg-neutral-400">{icon}</div>
//                         <div className="space-y-3">
//                             <h3 className="-tracking-4 pt-0.5 font-sans text-[1rem] font-semibold text-balance text-neutral-100 md:text-2xl/[1.875rem] dark:text-white">
//                                 {title}
//                             </h3>
//                             <h2 className="font-sans text-sm/[1.125rem] text-neutral-100 md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
//                                 {description}
//                             </h2>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </li>
//     );
// };
const GridItem = ({ area, icon, title, description, href }) => {
    const Content = (
        <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3 bg-neutral-700 border-black">
            <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
            <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
                <div className="relative flex flex-1 flex-col justify-between gap-3">
                    <div className="w-fit rounded-lg border border-white p-2 bg-neutral-400">{icon}</div>
                    <div className="space-y-3">
                        <h3 className="-tracking-4 pt-0.5 font-sans text-[1rem] font-semibold text-balance text-neutral-100 md:text-2xl/[1.875rem] dark:text-white">
                            {title}
                        </h3>
                        <h2 className="font-sans text-sm/[1.125rem] text-neutral-100 md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                            {description}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <li className={`min-h-[14rem] list-none ${area}`}>
            {href ? (
                <a href={href} className="block h-full w-full no-underline hover:no-underline">
                    {Content}
                </a>
            ) : (
                Content
            )}
        </li>
    );
};
