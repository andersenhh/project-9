// This is for firebase config
// apikey etc

import { getFirestore  } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCe7iDXFaGh9Y9iFKLDrwMwDWHlK7ahvUY",
  authDomain: "fsw34-kelompok2-challenge9.firebaseapp.com",
  databaseURL: "https://fsw34-kelompok2-challenge9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fsw34-kelompok2-challenge9",
  storageBucket: "fsw34-kelompok2-challenge9.appspot.com",
  messagingSenderId: "377851811168",
  appId: "1:377851811168:web:fd5aa04f5a5d1d231a3a05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };