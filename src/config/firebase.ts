import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getPerformance } from "firebase/performance";
import { getStorage } from "firebase/storage";

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAMGWtetPyubyXaP6-bRT5sqAt6-_wbSgo",
    authDomain: "apptest-ecbb0.firebaseapp.com",
    projectId: "apptest-ecbb0",
    storageBucket: "apptest-ecbb0.appspot.com",
    messagingSenderId: "270148948509",
    appId: "1:270148948509:web:ff138880261e28ccb16cf4",
}

const app = initializeApp(FIREBASE_CONFIG);
const analytics = getAnalytics(app);
//type the auth and firestore functions
const auth = getAuth();
const firestore = getFirestore(app);
const performance = getPerformance(app);
const storage = getStorage(app);

export { analytics, auth, firestore, performance, storage };
