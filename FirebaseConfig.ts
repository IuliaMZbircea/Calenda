// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByrj3DStHHsSHBYCPqMlxupCfbl9ah4j8",
  authDomain: "calenda-app-5b218.firebaseapp.com",
  projectId: "calenda-app-5b218",
  storageBucket: "calenda-app-5b218.appspot.com",
  messagingSenderId: "620935855316",
  appId: "1:620935855316:web:24e7229b21b0dd47db0f41"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
