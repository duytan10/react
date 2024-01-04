import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD3tvjPlugh04XQF0OSR4h_xBA8tyldo7g",
    authDomain: "instagram-clone-33711.firebaseapp.com",
    projectId: "instagram-clone-33711",
    storageBucket: "instagram-clone-33711.appspot.com",
    messagingSenderId: "397815772130",
    appId: "1:397815772130:web:5a04287535daeaf47b7fbb",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
