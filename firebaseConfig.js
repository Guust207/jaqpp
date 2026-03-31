// Import functions we need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Our web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB9l56-8ipkeUb5sSMwuzav0PFwwrT5rfQ", // This is outdated and no longer works :D
    authDomain: "jaqpp-d4c86.firebaseapp.com",
    projectId: "jaqpp-d4c86",
    storageBucket: "jaqpp-d4c86.appspot.com",
    messagingSenderId: "766637901593",
    appId: "1:766637901593:web:2abf17696860f5a81b6788"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// New. Allows other modules to import the auth object
export { db }
