// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// 1. Importa getFirestore
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQY6lvaUGlXNkh06m3_PkN5_VSmPnMD_M",
  authDomain: "tecnomas-8de15.firebaseapp.com",
  projectId: "tecnomas-8de15",
  storageBucket: "tecnomas-8de15.firebasestorage.app",
  messagingSenderId: "293390937332",
  appId: "1:293390937332:web:238fb8d5879735a8e402a1",
  measurementId: "G-TZW91GYQ8F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 2. Inicializa Firestore y expórtalo como "db"
export const db = getFirestore(app);