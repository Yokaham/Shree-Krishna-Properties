

import { auth, db, storage } from "./firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { LOCATIONS, PROPERTY_TYPES, TAGS } from "./constants.js";
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

import "./admin-guard.js";


// DOM references
const propertyForm = document.querySelector(".admin-form");
const submitBtn = propertyForm?.querySelector('button[type="submit"]');
const formMessage = document.getElementById("admin-form-message");
const tableBody = document.querySelector(".admin-table__body");
const tagContainer = document.querySelector(".admin-checklist");
const logoutBtn = document.getElementById("logoutBtn");

function renderTagCheckboxes(container) {
  container.innerHTML = "";

  TAGS.forEach(tag => {
    const label = document.createElement("label");
    label.className = "admin-checklist__item";

    label.innerHTML = `
      <input
        class="admin-checklist__input"
        type="checkbox"
        name="tags"
        value="${tag.value}"
      />
      <span class="admin-checklist__label">${tag.label}</span>
    `;

    container.appendChild(label);
  });
}

function renderSelectOptions(selectEl, options) {
  if (!selectEl) return;

  selectEl.innerHTML = `<option value="">Select</option>`;

  options.forEach(opt => {
    const option = document.createElement("option");
    option.value = opt.value;
    option.textContent = opt.label;
    selectEl.appendChild(option);
  });
}


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


// --- Firestore: add one property ---
if (propertyForm) {
  propertyForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (formMessage) {
      formMessage.textContent = "";
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Saving...";
    }

    try {
      const formData = new FormData(propertyForm);

      const tags = [...propertyForm.querySelectorAll('input[name="tags"]:checked')].map(
        (input) => input.value
      );

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
      if (formMessage) {
        formMessage.textContent = "Property saved successfully.";
      }
      propertyForm.reset();
      fetchPropertiesForAdmin();
    } catch (error) {
      console.error("Error saving property:", error);
      if (formMessage) {
        formMessage.textContent = "Error saving property. Please try again.";
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Save Property";
      }
    }
  });

  // --- Firestore: read properties (admin verification step) ---

async function fetchPropertiesForAdmin() {
  try {
    const querySnapshot = await getDocs(collection(db, "properties"));

    if (!tableBody) return;

    tableBody.innerHTML = "";

    const emptyMessage = document.getElementById("no-properties-message");
    if (emptyMessage) {
      emptyMessage.style.display = "none";
    }


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
    if (querySnapshot.empty && emptyMessage) {
      emptyMessage.style.display = "block";
    }
  } catch (error) {
    console.error("Error fetching properties:", error);
  }
}

renderSelectOptions(
  document.getElementById("property-location"),
  LOCATIONS
);

renderSelectOptions(
  document.getElementById("property-type"),
  PROPERTY_TYPES
);

if (tagContainer) {
  renderTagCheckboxes(tagContainer);
}

fetchPropertiesForAdmin();
// --- Firestore: delete property ---

document.addEventListener("click", async (event) => {
  const deleteBtn = event.target.closest(".admin-btn--danger");
  if (!deleteBtn) return;

  const propertyId = deleteBtn.getAttribute("data-id");
  if (!propertyId) return;
  
  const row = deleteBtn.closest("tr");
  const titleCell = row ? row.querySelector("td") : null;
  const propertyTitle = titleCell ? titleCell.textContent.trim() : "this property";

  const confirmDelete = confirm(`Are you sure you want to delete "${propertyTitle}"?`);

  if (!confirmDelete) return;


  try {
    await deleteDoc(doc(db, "properties", propertyId));
    fetchPropertiesForAdmin(); // refresh table
  } catch (error) {
    console.error("Error deleting property:", error);
    alert("Failed to delete property.");
  }
});
}
