// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGUkSppdOEck-ukBPX9l4YW0yPb3-0z-A",
  authDomain: "gpt-flix-abx.firebaseapp.com",
  projectId: "gpt-flix-abx",
  storageBucket: "gpt-flix-abx.firebasestorage.app",
  messagingSenderId: "875151371043",
  appId: "1:875151371043:web:f321a42f301aeeb9b1ba96",
  measurementId: "G-SWCG790KJN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();