// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "vingo-a1c12.firebaseapp.com",
  projectId: "vingo-a1c12",
  storageBucket: "vingo-a1c12.firebasestorage.app",
  messagingSenderId: "271327025621",
  appId: "1:271327025621:web:d38fe6b1df6cb8edc3455c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { app, auth }