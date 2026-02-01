import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Admin-only page guard
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Prevent redirect loop if already on login page
    if (!window.location.pathname.endsWith("/login.html")) {
      window.location.href = "./login.html";
    }
  }
});
