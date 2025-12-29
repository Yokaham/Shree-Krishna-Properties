// Firebase initialization (v9+ Modular SDK)
//
// This file is intentionally limited to SDK setup only:
// - No UI logic
// - No event listeners
// - No real API keys
//
// Replace the placeholder values below with your own Firebase project config.

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Placeholder Firebase configuration (DO NOT use real secrets here).
// You can find your config in: Firebase Console → Project settings → Your apps
const firebaseConfig = {
    apiKey: "AIzaSyCwu59KqnHnyk0kQ34zqL8Tjua7Cm2aZeY",
    authDomain: "shree-krishna-properties-8d26f.firebaseapp.com",
    projectId: "shree-krishna-properties-8d26f",
    storageBucket: "shree-krishna-properties-8d26f.firebasestorage.app",
    messagingSenderId: "431763201400",
    appId: "1:431763201400:web:b7153c11ea898372fa3c8d"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export Firebase services used by the app
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

