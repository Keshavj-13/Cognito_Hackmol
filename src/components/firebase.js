// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAkeKO7kAm9Qv0dR9mvD4AXthB5OKfiR0Y",
    authDomain: "cognito-hackmol.firebaseapp.com",
    projectId: "cognito-hackmol",
    storageBucket: "cognito-hackmol.firebasestorage.app",
    messagingSenderId: "491747592906",
    appId: "1:491747592906:web:884dc4fe122f36466a8233",
    measurementId: "G-RFHY1V2D68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export {analytics, auth, app};