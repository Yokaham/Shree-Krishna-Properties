import { db } from "./firebase.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Fixed list of available tags
const AVAILABLE_TAGS = [
  "b_road",
  "gated",
  "newly_built",
  "loan_available",
  "possession_ready",
  "north_facing",
  "park_facing",
  "corner",
];

  

// Get property ID from URL
const params = new URLSearchParams(window.location.search);
const propertyId = params.get("id");

if (!propertyId) {
  console.error("No property ID found in URL");
} else {
  loadPropertyForEdit(propertyId);
}



async function loadPropertyForEdit(id) {
  try {
    const docRef = doc(db, "properties", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.error("Property not found");
      return;
    }

    const data = docSnap.data();

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
    // Populate editable tag checkboxes
const editTagsContainer = document.getElementById("edit-tags");

if (editTagsContainer) {
  editTagsContainer.innerHTML = "";

  AVAILABLE_TAGS.forEach((tag) => {
    const label = document.createElement("label");
    label.className = "admin-tag-option";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "tags";
    checkbox.value = tag;

    if (existingTags.includes(tag)) {
      checkbox.checked = true;
    }

    label.appendChild(checkbox);
    label.append(" " + tag.replace(/_/g, " "));
    editTagsContainer.appendChild(label);
  });
}


  } catch (error) {
    console.error("Error loading property for edit:", error);
  }
}

// Utility helper
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value || "—";
}


// Handle update form submission (build payload only)
const editForm = document.getElementById("edit-property-form");

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

// Save updates to Firestore
try {
  const docRef = doc(db, "properties", propertyId);
  await updateDoc(docRef, updateData);

  alert("Property updated successfully");
  window.location.href = "dashboard.html";
} catch (error) {
  console.error("Error updating property:", error);
  alert("Failed to update property. Check console.");
}

  });
}
