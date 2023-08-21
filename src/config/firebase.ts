import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getPerformance } from "firebase/performance";
import { getStorage } from "firebase/storage";

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyBvE4i-sVNzCGeM9w5NLS4NGsT8O6fkXq0",
    authDomain: "react-27-02-23.firebaseapp.com",
    projectId: "react-27-02-23",
    storageBucket: "react-27-02-23.appspot.com",
    messagingSenderId: "518528339148",
    appId: "1:518528339148:web:428c38d4c3e3bd69214669"
}

const app = initializeApp(FIREBASE_CONFIG);
const analytics = getAnalytics(app);
//type the auth and firestore functions
const auth = getAuth();
const firestore = getFirestore(app);
const performance = getPerformance(app);
const storage = getStorage(app);

export { analytics, auth, firestore, performance, storage };
