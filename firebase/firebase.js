// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9YnWNpyDlp9gDhSiLzeEm3eeu0DMu93s",
  authDomain: "letter-docs.firebaseapp.com",
  projectId: "letter-docs",
  storageBucket: "letter-docs.appspot.com",
  messagingSenderId: "451869869561",
  appId: "1:451869869561:web:38ac8b71a44582132e6928",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
