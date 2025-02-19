import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_Yo99V7P0n3HdLTZ15cMzVbHvBcw0jTw",
  authDomain: "noshheaven.firebaseapp.com",
  projectId: "noshheaven",
  storageBucket: "noshheaven.firebasestorage.app",
  messagingSenderId: "352717441244",
  appId: "1:352717441244:web:1318c9debdd5535e1ecc19",
  measurementId: "G-F6GPH4CY8J",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };
