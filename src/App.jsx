import Homepage from "./components/Homepage.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Backend from "./components/Backend.jsx";
import StayUpdated from "./components/StayUpdated.jsx";
import ExamResponse from "./components/ExamResponse.jsx";
import Quiz from "./components/Quiz.jsx";
import JuniorDevta from "./components/JuniorDevta.jsx";
import SeniorDevta from "./components/SeniorDevta.jsx";
import SeniorRisponse from "./components/SeniorRisponse.jsx";
import Packages from "./components/Packages.jsx";
import Ideation from "./components/Ideation.jsx";
import Modularity from "./components/Modularity.jsx";
import Technology from "./components/Technology.jsx";

export default function App() {
    return(
        <>
            <BrowserRouter location={history.location}>
                <Routes>
                    <Route path={"/"} element={<Homepage />} />
                    <Route path={"/exam-devta"} element={<Backend />} />
                    <Route path={"/junior-devta"} element={<JuniorDevta />} />
                    <Route path={"/senior-devta"} element={<SeniorDevta />} />
                    <Route path={"/foundation-devta"} element={<StayUpdated />} />
                    <Route path={"exam-devta/response"} element={<ExamResponse />} />
                    <Route path={"senior-devta/response"} element={<SeniorRisponse />} />
                    <Route path={"/quiz"} element={<Quiz/>} />
                    <Route path={"/package"} element={<Packages/>} />
                    <Route path={"/idation"} element={<Ideation />} />
                    <Route path={"/modularity"} element={<Modularity />} />
                    <Route path={"/technology"} element={<Technology />} />
                </Routes>

            </BrowserRouter>
        </>
    )
}