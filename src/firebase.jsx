
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAfQXANAYSUwTyQIy7e3XxNkPc9Mn9qMSc",
    authDomain: "card-money-c683b.firebaseapp.com",
    projectId: "card-money-c683b",
    storageBucket: "card-money-c683b.firebasestorage.app",
    messagingSenderId: "697346141037",
    appId: "1:697346141037:web:424fb9932299e6df808864"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);






//////////////////////




