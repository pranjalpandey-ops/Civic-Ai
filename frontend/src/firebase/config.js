import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCs0QZFc13ejfdFWSTyua4uOMNfjULPpcA",
  authDomain: "civic-ai-9df03.firebaseapp.com",
  projectId: "civic-ai-9df03",
  storageBucket: "civic-ai-9df03.firebasestorage.app",
  messagingSenderId: "1091436575333",
  appId: "1:1091436575333:web:61f96b442684b276e4248c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);