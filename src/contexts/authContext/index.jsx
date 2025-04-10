// src/contexts/authContext/index.jsx
import { useState, useEffect, createContext, useContext } from "react";
import {
    getRedirectResult,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithRedirect,
} from "firebase/auth";
import { auth } from "@/components/firebase"; // Adjust if needed

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Check auth state (normal session persistence)
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        // 2. Handle Google redirect result (once, on mount)
        getRedirectResult(auth)
            .then((result) => {
                if (result && result.user) {
                    setCurrentUser(result.user);
                    // ✅ Optional: handle Firestore entry here
                }
            })
            .catch((error) => {
                console.error("Google redirect error:", error);
            });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userLoggedIn: !!currentUser,
        loginWithGoogle: () => {
            const provider = new GoogleAuthProvider();
            return signInWithRedirect(auth, provider);
        },
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
