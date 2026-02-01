import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyCwu59KqnHnyk0kQ34zqL8Tjua7Cm2aZeY",
    authDomain: "shree-krishna-properties-8d26f.firebaseapp.com",
    projectId: "shree-krishna-properties-8d26f",
    storageBucket: "shree-krishna-properties-8d26f.firebasestorage.app",
    messagingSenderId: "431763201400",
    appId: "1:431763201400:web:b7153c11ea898372fa3c8d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

