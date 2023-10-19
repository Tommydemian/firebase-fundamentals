import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3erJKdyosWTqplZub0zkwQvzGO_4YaC0",
  authDomain: "fir-fundamentals-1868b.firebaseapp.com",
  projectId: "fir-fundamentals-1868b",
  storageBucket: "fir-fundamentals-1868b.appspot.com",
  messagingSenderId: "1052800314608",
  appId: "1:1052800314608:web:258cc664cf1751de3fe635"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Auth 
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
// Db 
export const db = getFirestore(app);