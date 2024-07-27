// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7z9qdzYWiVur6oea2kmVcuCu765uCqRY",
  authDomain: "netflixclone-28320.firebaseapp.com",
  projectId: "netflixclone-28320",
  storageBucket: "netflixclone-28320.appspot.com",
  messagingSenderId: "178278466985",
  appId: "1:178278466985:web:fa5ee5ba52ab047aa1b0b8",
  measurementId: "G-0MFDR6E9RH"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Get auth from firebase 
export const auth = getAuth()