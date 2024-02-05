// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbwdgmwZD8YJNpVRgEbVhVRNtiu9CY-8c",
  authDomain: "crud-img-upload-98f57.firebaseapp.com",
  projectId: "crud-img-upload-98f57",
  storageBucket: "crud-img-upload-98f57.appspot.com",
  messagingSenderId: "542162387291",
  appId: "1:542162387291:web:b628c2d62ffb63ed6e5a7e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
