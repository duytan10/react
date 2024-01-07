// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6Z6dHbo9cTx7aJ2THm4vAit1QP8SgCog",
    authDomain: "monkey-blogging-5f3f9.firebaseapp.com",
    projectId: "monkey-blogging-5f3f9",
    storageBucket: "monkey-blogging-5f3f9.appspot.com",
    messagingSenderId: "42035592890",
    appId: "1:42035592890:web:bf1b89c57c44f4a0d94c83",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
