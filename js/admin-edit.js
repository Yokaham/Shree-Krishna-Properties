import { db } from "./firebase.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { TAGS } from "./constants.js";
import "./admin-guard.js";

// DOM references
const editForm = document.getElementById("edit-property-form");
const errorMessage = document.getElementById("edit-error-message");


// Utility helper
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value || "—";
}

function renderEditableTags(container, selectedTags = []) {
  container.innerHTML = "";

  TAGS.forEach(tag => {
    const label = document.createElement("label");
    label.className = "admin-tag-option";

    const checked = selectedTags.includes(tag.value);

    label.innerHTML = `
      <input
        type="checkbox"
        name="tags"
        value="${tag.value}"
        ${checked ? "checked" : ""}
      />
      ${tag.label}
    `;

    container.appendChild(label);
  });
}

async function loadPropertyForEdit(id) {
  try {
    const docRef = doc(db, "properties", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      if (errorMessage) {
        errorMessage.textContent = "Property not found or may have been deleted.";
        errorMessage.style.display = "block";
      }
      return;
    }


    const data = docSnap.data();

    const editTagsContainer = document.getElementById("edit-tags");
    if (editTagsContainer) {
      renderEditableTags(editTagsContainer, data.tags || []);
    }

    // ---------- EXISTING IMAGES ----------
    
    const imagesContainer = document.getElementById("edit-images");
    if (imagesContainer) {
      imagesContainer.innerHTML = "";
      
      if (Array.isArray(data.images) && data.images.length) {
        data.images.forEach((img, index) => {
          const wrapper = document.createElement("div");
          wrapper.className = "admin-image-item";
          
          wrapper.innerHTML = `
            <img src="${img.url}" alt="Property image ${index + 1}" />
            <button
              type="button"
              class="admin-btn admin-btn--danger admin-btn--small"
              data-image-index="${index}"
            >
              Remove
            </button>
          `;
          
          imagesContainer.appendChild(wrapper);
        });
      } else {
        imagesContainer.innerHTML = "<p class='admin-muted'>No images uploaded.</p>";
      }
    }


    
    const existingTags = Array.isArray(data.tags) ? data.tags : [];


    // Populate current property details
    setText("current-title", data.title);
    setText("current-price", data.price);
    setText("current-location", data.location);
    setText("current-locality", data.locality);
    setText("current-type", data.type);
    setText("current-area", data.area);
    setText("current-description", data.description);

    // Tags
    const tagsList = document.getElementById("current-tags");
    if (tagsList) {
      tagsList.innerHTML = "";

      if (existingTags.length) {
        existingTags.forEach((tag) => {
          const li = document.createElement("li");
          li.textContent = tag.replace(/_/g, " ");
          tagsList.appendChild(li);
        });
      } else {
        const li = document.createElement("li");
        li.textContent = "No tags";
        tagsList.appendChild(li);
      }
      
    }


  } catch (error) {
    console.error("Error loading property for edit:", error);
  }
}

// Get property ID from URL
const params = new URLSearchParams(window.location.search);
const propertyId = params.get("id");

if (!propertyId) {
  if (errorMessage) {
    errorMessage.textContent = "Invalid property link.";
    errorMessage.style.display = "block";
  }
} else {
  loadPropertyForEdit(propertyId);
}

document.addEventListener("click", async (event) => {
  const btn = event.target.closest("[data-image-index]");
  if (!btn) return;

  const index = Number(btn.getAttribute("data-image-index"));
  if (Number.isNaN(index)) return;

  const confirmDelete = confirm("Remove this image?");
  if (!confirmDelete) return;

  try {
    const docRef = doc(db, "properties", propertyId);
    const snap = await getDoc(docRef);
    if (!snap.exists()) return;

    const data = snap.data();
    const updatedImages = [...(data.images || [])];
    updatedImages.splice(index, 1);

    await updateDoc(docRef, { images: updatedImages });

    loadPropertyForEdit(propertyId); // refresh UI
  } catch (error) {
    console.error("Failed to remove image:", error);
    alert("Failed to remove image.");
  }
});


// Handle update form submission (build payload only)

if (editForm) {
  editForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(editForm);
    const updateData = {};

    // Text fields
    ["title", "price", "location", "locality", "type", "area", "description"].forEach(
      (field) => {
        const value = formData.get(field);
        if (value && value.trim() !== "") {
          updateData[field] = value.trim();
        }
      }
    );

    // Tags (replace completely)
    const selectedTags = [
      ...editForm.querySelectorAll('input[name="tags"]:checked')
    ].map((input) => input.value);

    updateData.tags = selectedTags;
    try {
      const docRef = doc(db, "properties", propertyId);
      await updateDoc(docRef, updateData);
      alert("Property updated successfully");
      loadPropertyForEdit(propertyId);
      editForm.reset();
    } catch (error) {
      console.error("Error updating property:", error);
      alert("Failed to update property. Check console.");
    }
  });
}
