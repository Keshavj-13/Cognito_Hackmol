import NavbarDemo from "./NavbarDemo.jsx";
import {HeroParallax} from "./HeroParallax.jsx";
import ExpandButton from "./ExpandButton.jsx";
import HoverEffect from "./ui/HoverEffect.jsx";
import UseContact from "./UseContact.jsx";

export default function Homepage() {
    const products = [
        {
            title: "Junior Devta",
            link: "https://gomoonbeam.com",
            thumbnail: "https://i.ibb.co/23Q01vsM/juniornigga.jpg",
        },
        {
            title: "Exam Devta",
            link: "https://cursor.so",
            thumbnail: "https://i.ibb.co/FLndTbdj/exam.jpg",
        },
        {
            title: "Senior Devta",
            link: "https://userogue.com",
            thumbnail: "https://i.ibb.co/d0ZFmXh6/senior.jpg",
        },

        {
            title: "Foundation Devta",
            link: "https://editorially.org",
            thumbnail: "https://i.ibb.co/PsvJNpYh/foundation.jpg" ,
        },
        {
            title: "Senior Devta",
            link: "https://algochurn.com",
            thumbnail: "https://i.ibb.co/d0ZFmXh6/senior.jpg",
        },
        {
            title: "AI Reward System",
            link: "https://app.pixelperfect.quest",
            thumbnail: "https://i.ibb.co/nqc8c8ys/Whats-App-Image-2025-02-08-at-21-48-03-307f19f8.jpg",
        },
        {
            title: "Sentimental Analysis",
            link: "https://editrix.ai",
            thumbnail: "https://i.ibb.co/3yBpb19h/Whats-App-Image-2025-02-08-at-21-34-55-8feba92e.jpg",
        },
        {
            title: "Harnessing & Updating Best Content",
            link: "https://ui.aceternity.com",
            thumbnail: "https://i.ibb.co/Xr8CH6fJ/Whats-App-Image-2025-02-08-at-21-58-48-923d3c50.jpg",
        },
        {
            title: "ΑΙ ALGORITHIUM TO CREATE PERSONALIZED LEARNING CURVE",
            link: "https://tailwindmasterkit.com",
            thumbnail: "https://i.ibb.co/fz3QXrFL/Whats-App-Image-2025-02-08-at-21-50-31-3a04205e.jpg",
        },
        {
            title: "Exam Devta",
            link: "https://smartbridgetech.com",
            thumbnail: "https://i.ibb.co/FLndTbdj/exam.jpg",
        },
        {
            title: "Senior Devta",
            link: "https://renderwork.studio",
            thumbnail: "https://i.ibb.co/d0ZFmXh6/senior.jpg",
        },

        {
            title: "Foundation Devta",
            link: "https://cremedigital.com",
            thumbnail: "https://i.ibb.co/PsvJNpYh/foundation.jpg",
        },
        {
            title: "Junior Devta",
            link: "https://goldenbellsacademy.com",
            thumbnail: "https://i.ibb.co/23Q01vsM/juniornigga.jpg",
        },
        {
            title: "Exam Devta",
            link: "https://invoker.lol",
            thumbnail: "https://i.ibb.co/FLndTbdj/exam.jpg",
        },
        {
            title: "Senior Devta",
            link: "https://efreeinvoice.com",
            thumbnail: "https://i.ibb.co/d0ZFmXh6/senior.jpg",
        },
    ]
    const items = [
        { title: "BASIC PLAN", description: (
                <>
                    <ul className="list-none space-y-1 flex flex-col items-start mx-auto w-fit">
                        <li className="flex items-center gap-2"><span>✔️</span> AI-powered learning</li>
                        <li className="flex items-center gap-2"><span>✔️</span> Summaries & Q&A</li>
                        <li className="flex items-center gap-2"><span>✔️</span> FlashCards & Quizzes</li>
                        <li className="flex items-center gap-2"><span>❌</span> Ad-free experience</li>
                        <li className="flex items-center gap-2"><span>❌</span> Personalized study recommendations</li>
                        <li className="flex items-center gap-2"><span>❌</span> Advanced AI tools</li>
                        <li className="flex items-center gap-2"><span>❌</span> Exclusive study notes & insights</li>
                        <li className="flex items-center gap-2"><span>❌</span> Exam-focused AI coaching</li>
                        <li className="flex items-center gap-2"><span>❌</span> One-on-one AI tutoring</li>
                        <li className="flex items-center gap-2"><span>❌</span> Early access to new features</li>
                        <li className="flex items-center gap-2"><span>❌</span> Premium rewards & discounts</li>
                    </ul>
                </>
            ), link: "https://example.com/1" },
        { title: "PREMIUM PLAN", description: (
                <>
                    <ul className="list-none space-y-1 flex flex-col items-start mx-auto w-fit">
                        <li className="flex items-center gap-2"><span>✔️</span> AI-powered learning</li>
                        <li className="flex items-center gap-2"><span>✔️</span> Summaries & Q&A</li>
                        <li className="flex items-center gap-2"><span>✔️</span> FlashCards & Quizzes</li>
                        <li className="flex items-center gap-2"><span>✔️</span> Ad-free experience</li>
                        <li className="flex items-center gap-2"><span>✔️</span> Personalized study recommendations</li>
                        <li className="flex items-center gap-2"><span>✔️</span> Advanced AI tools</li>
                        <li className="flex items-center gap-2"><span>✔️</span> Exclusive study notes & insights</li>
                        <li className="flex items-center gap-2"><span>❌</span> Exam-focused AI coaching</li>
                        <li className="flex items-center gap-2"><span>❌</span> One-on-one AI tutoring</li>
                        <li className="flex items-center gap-2"><span>❌</span> Early access to new features</li>
                        <li className="flex items-center gap-2"><span>❌</span> Premium rewards & discounts</li>
                    </ul>
                </>
            ), link: "https://example.com/2" },
        { title: "ULTIMATE PLAN", description: (
                <>
                    <ul className="list-none space-y-1 flex flex-col items-start mx-auto w-fit">
                        <li className="flex items-center gap-2"><span>✔️</span> AI-powered learning</li>
                        <li className="flex items-center gap-2"><span>✔️</span> Summaries & Q&A</li>
                        <li className="flex items-center gap-2"><span>✔️</span> FlashCards & Quizzes</li>
                        <li className="flex items-center gap-2"><span>✔️</span> Ad-free experience</li>
                        <li className="flex items-center gap-2"><span>✔️</span> Personalized study recommendations</li>
                        <li className="flex items-center gap-2"><span>✔️</span> Advanced AI tools</li>
                        <li className="flex items-center gap-2"><span>✔️</span> Exclusive study notes & insights</li>
                        <li className="flex items-center gap-2"><span>✔️</span> Exam-focused AI coaching</li>
                        <li className="flex items-center gap-2"><span>✔️</span> One-on-one AI tutoring</li>
                        <li className="flex items-center gap-2"><span>✔️</span> Early access to new features</li>
                        <li className="flex items-center gap-2"><span>✔️</span> Premium rewards & discounts</li>
                    </ul>
                </>
            ), link: "https://example.com/1"  },
    ];
    return (
        <>


            {/*</div>*/}
            <div className={"min-h-screen bg-black overflow-hidden"}>
                <div className={"mt-[-2rem]"}>
                    <NavbarDemo/>

                </div>


                <HeroParallax products={products}/>
                <div className="fixed bottom-5 right-5">
                    <ExpandButton
                        logo={"https://logosandtypes.com/wp-content/uploads/2022/03/cognito.svg"}
                        name="COGNITO"
                    />
                </div>
                <div className={"mt-[4rem] px-[6rem] leading-relaxed"}>
                    <HoverEffect items={items}/>

                </div>
                <div>
                    <UseContact />
                </div>

            </div>


        </>
    )
}