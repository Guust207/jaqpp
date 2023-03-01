// This file is almost identical to the configuration given in the Firebase console when you create the app.
// Analytics have been disabled by commenting out the relevant lines.

import { initializeApp } from "firebase/app";

// SDK's
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDuYiK4hUi_1j3qX9lDIOUf8_ynMaPvHtE",
    authDomain: "jaqpp-796c7.firebaseapp.com",
    projectId: "jaqpp-796c7",
    storageBucket: "jaqpp-796c7.appspot.com",
    messagingSenderId: "901775789414",
    appId: "1:901775789414:web:e22fc9cde22a13f739cca7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// New
const auth = getAuth(app);
const db = getFirestore(app);

// New. Allows other modules to import the auth object
export { auth, db }