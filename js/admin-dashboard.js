// Admin dashboard protection (Firebase Auth)
//
// This module guards the dashboard page by checking the Firebase auth state.
// - If no user is signed in, redirect to the admin login page.
// - If a user is signed in, do nothing (allow access).

import { auth, db, storage } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";


onAuthStateChanged(auth, (user) => {
	if (!user) {
		// Redirect to admin/login.html
		window.location.href = "./login.html";
	}
});

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

const propertyForm = document.querySelector(".admin-form");

// --- Firestore: add one property (text-only test) ---

import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  updateDoc,
  doc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

if (propertyForm) {
  propertyForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const formData = new FormData(propertyForm);

    const tags = [...propertyForm.querySelectorAll('input[name="tags"]:checked')]
    .map((input) => input.value);
  
  const propertyData = {
    title: formData.get("title"),
    price: formData.get("price"),
    location: formData.get("location"),
    locality: formData.get("locality"),
    type: formData.get("type"),
    area: formData.get("area"),
    description: formData.get("description"),
    tags,
    createdAt: serverTimestamp()
};


    const docRef = await addDoc(collection(db, "properties"), propertyData);
const propertyId = docRef.id;

console.log("Property created with ID:", propertyId);

// ---- MULTI IMAGE UPLOAD START ----
const imageInput = propertyForm.querySelector('input[name="images"]');
const imageFiles = imageInput ? imageInput.files : null;
const images = [];

if (imageFiles && imageFiles.length > 0) {
  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];

    const imageRef = ref(
      storage,
      `properties/${propertyId}/images/${Date.now()}-${file.name}`
    );

    await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);

    images.push({
      url,
      order: i
    });
  }

  await updateDoc(doc(db, "properties", propertyId), {
    images
  });
}
// ---- MULTI IMAGE UPLOAD END ----
alert("Property saved successfully");
propertyForm.reset();

  } catch (error) {
    console.error("Error saving property:", error);
    alert("Failed to save property. Check console.");
  }
});
}
// --- Firestore: read properties (admin verification step) ---

async function fetchPropertiesForAdmin() {
  try {
    const querySnapshot = await getDocs(collection(db, "properties"));
    const tableBody = document.querySelector(".admin-table__body");

    if (!tableBody) return;

    tableBody.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      const row = document.createElement("tr");

      const tagText = Array.isArray(data.tags) && data.tags.length
  ? data.tags.join(", ")
  : "-";
  
  row.innerHTML = `
  <td>${data.title || "-"}</td>
  <td>${data.location || "-"}</td>
  <td>${data.locality || "-"}</td>
  <td>${data.type || "-"}</td>
  <td>${data.price || "-"}</td>
  <td>${tagText}</td>
  <td>
  <a class="admin-btn admin-btn--small" href="edit-property.html?id=${doc.id}"> Edit</a>
  <button class="admin-btn admin-btn--small admin-btn--danger" data-id="${doc.id}">Delete</button>
  </td>
`;


      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
  }
}


fetchPropertiesForAdmin();
// --- Firestore: delete property ---

document.addEventListener("click", async (event) => {
  const deleteBtn = event.target.closest(".admin-btn--danger");
  if (!deleteBtn) return;

  const propertyId = deleteBtn.getAttribute("data-id");
  if (!propertyId) return;

  const confirmDelete = confirm("Are you sure you want to delete this property?");
  if (!confirmDelete) return;

  try {
    await deleteDoc(doc(db, "properties", propertyId));
    fetchPropertiesForAdmin(); // refresh table
  } catch (error) {
    console.error("Error deleting property:", error);
    alert("Failed to delete property.");
  }
});
