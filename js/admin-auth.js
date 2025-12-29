// Admin login module (Firebase Auth: Email/Password)
//
// Responsibilities:
// - Listen for admin login form submission
// - Sign in with Firebase Authentication
// - Redirect to the admin dashboard on success
// - Render a readable error message on failure

import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";


/**
 * Convert Firebase Auth errors into user-friendly messages.
 * @param {unknown} error
 * @returns {string}
 */
function getReadableAuthError(error) {
	const code = typeof error === "object" && error !== null && "code" in error ? String(error.code) : "";

	switch (code) {
		case "auth/invalid-email":
			return "Please enter a valid email address.";
		case "auth/missing-password":
			return "Please enter your password.";
		case "auth/invalid-credential":
		case "auth/user-not-found":
		case "auth/wrong-password":
			return "Invalid email or password.";
		case "auth/too-many-requests":
			return "Too many attempts. Please try again later.";
		default:
			return "Login failed. Please try again.";
	}
}

/**
 * Find or create the error message element shown below the form.
 * Note: This uses DOM APIs (no inline HTML strings).
 * @param {HTMLFormElement} form
 * @returns {HTMLElement}
 */
function getOrCreateErrorElement(form) {
	const existing = document.getElementById("login-error");
	if (existing) return existing;

	const message = document.createElement("p");
	message.id = "login-error";
	message.className = "login-form__error";
	message.setAttribute("role", "alert");
	message.setAttribute("aria-live", "polite");
	message.textContent = "";

	// Insert directly below the form.
	form.insertAdjacentElement("afterend", message);
	return message;
}

const loginForm = document.querySelector(".login-form");
if (loginForm instanceof HTMLFormElement) {
	const emailInput = loginForm.querySelector("#email");
	const passwordInput = loginForm.querySelector("#password");
	const errorEl = getOrCreateErrorElement(loginForm);

	loginForm.addEventListener("submit", async (event) => {
		event.preventDefault();
		errorEl.textContent = "";

		const email = emailInput instanceof HTMLInputElement ? emailInput.value.trim() : "";
		const password = passwordInput instanceof HTMLInputElement ? passwordInput.value : "";

		try {
			await signInWithEmailAndPassword(auth, email, password);

			// Redirect to admin/dashboard.html
			window.location.href = "./dashboard.html";
		} catch (error) {
			errorEl.textContent = getReadableAuthError(error);
		}
	});
}

