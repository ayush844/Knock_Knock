/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "knock-knock-a62d7.firebaseapp.com",
  projectId: "knock-knock-a62d7",
  storageBucket: "knock-knock-a62d7.appspot.com",
  messagingSenderId: "452929143286",
  appId: "1:452929143286:web:f38d77f427cff0dff3c7d7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);



