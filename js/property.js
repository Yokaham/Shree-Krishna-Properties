// --- Property Details Page: Render single property ---

import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Get property ID from URL
const params = new URLSearchParams(window.location.search);
const propertyId = params.get("id");

if (!propertyId) {
  console.error("No property ID found in URL");
} else {
  renderProperty(propertyId);
}

async function renderProperty(id) {
  try {
    const docRef = doc(db, "properties", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.error("Property not found");
      return;
    }

    const data = docSnap.data();
    // --- Image gallery rendering ---
const galleryContainer = document.createElement("div");
galleryContainer.className = "property-gallery";

if (Array.isArray(data.images) && data.images.length) {
  data.images.forEach((img) => {
    const imageEl = document.createElement("img");
    imageEl.src = img.url;
    imageEl.alt = "Property image";
    imageEl.className = "property-gallery__image";
    galleryContainer.appendChild(imageEl);
  });
} else {
  const placeholder = document.createElement("div");
  placeholder.className = "property-gallery__placeholder";

  placeholder.innerHTML = `
    <div class="property-gallery__placeholder-box">
      No images available
    </div>
  `;

  galleryContainer.appendChild(placeholder);
}


// Insert gallery in a clearly visible container
const titleEl = document.getElementById("property-title");
if (titleEl && titleEl.parentElement) {
  titleEl.insertAdjacentElement("afterend", galleryContainer);
} else if (headerSection && headerSection.parentElement) {
  headerSection.parentElement.insertBefore(
    galleryContainer,
    headerSection.nextSibling
  );
}



    // Render tags
    
    if (Array.isArray(data.tags) && data.tags.length) {
        const tagsContainer = document.createElement("ul");
        tagsContainer.className = "property-tags";
        
        data.tags.forEach((tag) => {
            const li = document.createElement("li");
            li.className = "property-tag";
            li.textContent = tag.replace(/_/g, " ");
            tagsContainer.appendChild(li);
        });
        // Insert tags below the subtitle
  
        const subtitleEl = document.querySelector(".section-subtitle");
        if (subtitleEl && subtitleEl.parentElement) {
            subtitleEl.parentElement.appendChild(tagsContainer);
        }
    }


    // Title
    if (titleEl) titleEl.textContent = data.title || "Property";

    // Price
    const priceEl = document.querySelector(".property-detail__price");
    if (priceEl) priceEl.textContent = data.price || "Price on request";

    // Location subtitle
    const subtitleEl = document.querySelector(".section-subtitle");
    if (subtitleEl) {
      subtitleEl.textContent = `${data.locality || ""}${data.location ? ", " + data.location : ""}`;
    }

    // Details table
    const detailsTable = document.querySelector(".details-table tbody");
    if (detailsTable) {
      detailsTable.innerHTML = `
        <tr><th>Location</th><td>${data.location || "-"}</td></tr>
        <tr><th>Locality</th><td>${data.locality || "-"}</td></tr>
        <tr><th>Type</th><td>${data.type || "-"}</td></tr>
        <tr><th>Area</th><td>${data.area || "-"}</td></tr>
      `;
    }

    // Description
    const descEl = document.querySelector(".property-detail__description-text");
    if (descEl) descEl.textContent = data.description || "";

  } catch (error) {
    console.error("Error rendering property:", error);
  }
}
