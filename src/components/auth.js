import { auth } from "./firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    updatePassword,
    signInWithRedirect,
    getRedirectResult,
    GoogleAuthProvider,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

// ✅ FIXED: Uses redirect instead of popup
export const doSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithRedirect(auth, provider);
};

// ✅ Handle the redirect result (call this in App or authContext)
export const handleGoogleRedirectResult = async () => {
    const result = await getRedirectResult(auth);
    if (result && result.user) {
        const user = result.user;

        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;

        console.log("Name:", displayName);
        console.log("Email:", email);
        console.log("Profile Picture URL:", photoURL);

        // optionally add to Firestore here

        return user;
    }
    return null;
};

export const doSignOut = () => {
    return auth.signOut();
};

export const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
    return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
    return sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`,
    });
};
