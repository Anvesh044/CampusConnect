// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";   
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZhLK2pTUNasevmKDzYkgsv5tzwBYzHHo",
  authDomain: "campusconnect-85005.firebaseapp.com",
  projectId: "campusconnect-85005",
  storageBucket: "campusconnect-85005.firebasestorage.app",
  messagingSenderId: "305258114480",
  appId: "1:305258114480:web:3d8734c4d1626ca9d4fa75",
  measurementId: "G-S6P2CJ8MQK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);