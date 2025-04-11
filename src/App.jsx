import React from "react";
import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";
import Homepage from "./components/Homepage.jsx";
import Backend from "./components/Backend.jsx";
import StayUpdated from "./components/StayUpdated.jsx";
import ExamResponse from "./components/ExamResponse.jsx";
import Quiz from "./components/Quiz.jsx";
import JuniorDevta from "./components/JuniorDevta.jsx";
import SeniorDevta from "./components/SeniorDevta.jsx";
import SeniorRisponse from "./components/SeniorRisponse.jsx";
import { Sidebar } from "@/components/ui/Sidebar.jsx";
import Home from "./components/Home/index.jsx";
import { AuthProvider } from "@/contexts/authContext/index.jsx";
import Header from "@/components/Header/index.jsx";
import Login from "@/components/auth/loginPage.jsx";
import Register from "@/components/auth/RegisterPage.jsx";
import { auth } from "@/components/firebase";
import Dashboard from "@/components/ui/Dashboard.jsx";
import Packages from "@/components/Packages.jsx";
import Ideation from "@/components/Ideation.jsx";
import Modularity from "@/components/Modularity.jsx";
import Technology from "@/components/Technology.jsx";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                {/*<Header />*/}
                <div className="w-full h-screen flex flex-col">
                    <Sidebar /> {/* Optional: Add Sidebar here if intended */}
                    <div className="flex-1">
                        <Routes>
                            <Route path="/" element={<Homepage />} />
                            <Route path="/exam-devta" element={<Backend />} />
                            {/*<Route path="/junior-devta" element={<JuniorDevta />} />*/}
                            <Route path="/senior-devta" element={<SeniorDevta />} />
                            {/*<Route path="/foundation-devta" element={<StayUpdated />} />*/}
                            <Route path="exam-devta/response" element={<ExamResponse />} />
                            <Route path="senior-devta/response" element={<SeniorRisponse />} />
                            <Route path="/quiz" element={<Quiz />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/home" element={<Dashboard />} />
                            <Route path="/package" element={<Packages />} />
                            <Route path="/ideation" element={<Ideation />} />
                            <Route path={"/modularity"} element={<Modularity />} />
                            <Route path={"/technology"} element={<Technology />} />
                            {/* Uncomment and adjust if you want Dashboard instead of Home */}
                            {/* <Route path="/home" element={<Dashboard />} /> */}
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}