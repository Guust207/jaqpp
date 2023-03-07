// This file is almost identical to the configuration given in the Firebase console when you create the app.
// Analytics have been disabled by commenting out the relevant lines.
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB9l56-8ipkeUb5sSMwuzav0PFwwrT5rfQ",
    authDomain: "jaqpp-d4c86.firebaseapp.com",
    projectId: "jaqpp-d4c86",
    storageBucket: "jaqpp-d4c86.appspot.com",
    messagingSenderId: "766637901593",
    appId: "1:766637901593:web:2abf17696860f5a81b6788"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// New
const auth = getAuth(app);
const db = getFirestore(app);

// New. Allows other modules to import the auth object
export { auth, db }