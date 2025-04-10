import Login from "@/components/auth/loginPage.jsx";
import Register from "@/components/auth/RegisterPage.jsx";

import Header from "@/components/Header";
import Home from "@/components/Home";

import { AuthProvider } from "@/contexts/authContext";
import { useRoutes } from "react-router-dom";

function LoginEndPage() {
    const routesArray = [

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
            element: <Home />,
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

export default LoginEndPage;