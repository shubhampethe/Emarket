// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBz7QedGhZnWgXJYUwQRCAfOWI1PVxLtnM",
  authDomain: "euphoric-trendz-a1f68.firebaseapp.com",
  projectId: "euphoric-trendz-a1f68",
  storageBucket: "euphoric-trendz-a1f68.appspot.com",
  messagingSenderId: "1090299630560",
  appId: "1:1090299630560:web:f8e30720930c396f809185",
  measurementId: "G-4XM7PBDJXB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const fireDB = getFirestore(app);


const auth = getAuth(app)
export {fireDB,auth } ;