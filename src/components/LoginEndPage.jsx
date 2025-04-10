import Login from "../components/auth/loginPage.jsx";
import Register from "../components/auth/RegisterPage.jsx";

import Header from "../components/Header";

import { AuthProvider } from "../contexts/authContext";
import { useRoutes } from "react-router-dom";
import Homepage from "./Homepage.jsx";

function App() {
    const routesArray = [
        {
            path: "*",
            element: <Login />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/home",
            element: <Homepage />,
        },
    ];
    let routesElement = useRoutes(routesArray);
    return (
        <AuthProvider>
            <Header />
            <div className="w-full h-screen flex flex-col">{routesElement}</div>
        </AuthProvider>
    );
}

export default App;