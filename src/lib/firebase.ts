
// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  "projectId": "timetablesync-v5viv",
  "appId": "1:161283940380:web:52282401cd99c52b7d7fd9",
  "storageBucket": "timetablesync-v5viv.firebasestorage.app",
  "apiKey": "AIzaSyBuwWWWohTB0mjU_mQliaosJ3xyBxaz0bo",
  "authDomain": "timetablesync-v5viv.firebaseapp.com",
  "messagingSenderId": "161283940380",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
