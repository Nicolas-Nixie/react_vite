import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyBvE4i-sVNzCGeM9w5NLS4NGsT8O6fkXq0",
    authDomain: "react-27-02-23.firebaseapp.com",
    projectId: "react-27-02-23",
    storageBucket: "react-27-02-23.appspot.com",
    messagingSenderId: "518528339148",
    appId: "1:518528339148:web:428c38d4c3e3bd69214669"
}

const firebaseApp = initializeApp(FIREBASE_CONFIG)

export const auth = getAuth(firebaseApp)

export const getDB = () => {
    const app = initializeApp(FIREBASE_CONFIG);
    let db = getFirestore(app);
    return db;
}