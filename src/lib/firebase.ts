// Initializing Firebase Services
// Using the standard modular SDK
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "", // Injected by environment
  authDomain: "vertex-fusion.firebaseapp.com",
  projectId: "vertex-fusion",
  storageBucket: "vertex-fusion.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// Singleton pattern for Next.js HMR
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };