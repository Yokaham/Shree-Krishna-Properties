// Admin dashboard protection (Firebase Auth)
//
// This module guards the dashboard page by checking the Firebase auth state.
// - If no user is signed in, redirect to the admin login page.
// - If a user is signed in, do nothing (allow access).

import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";


onAuthStateChanged(auth, (user) => {
	if (!user) {
		// Redirect to admin/login.html
		window.location.href = "./login.html";
	}
});
import { signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    try {
      await signOut(auth);
      window.location.href = "login.html";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  });
}

