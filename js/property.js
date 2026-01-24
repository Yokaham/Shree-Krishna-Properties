// --- Property Details Page: Render single property ---

import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Get property ID from URL
const params = new URLSearchParams(window.location.search);
const propertyId = params.get("id");

if (!propertyId) return;
renderProperty(propertyId);

async function renderProperty(id) {
  try {
    const docRef = doc(db, "properties", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return;

    const data = docSnap.data();

    /* ---------------- BASIC INFO ---------------- */

    const titleEl = document.getElementById("property-title");
    if (titleEl) titleEl.textContent = data.title || "Property";

    const priceEl = document.querySelector(".property-detail__price");
    if (priceEl) priceEl.textContent = data.price || "Price on request";

    const subtitleEl = document.querySelector(".section-subtitle");
    if (subtitleEl) {
      subtitleEl.textContent = `${data.locality || ""}${data.location ? ", " + data.location : ""}`;
    }

    /* ---------------- TAGS ---------------- */

    if (Array.isArray(data.tags) && data.tags.length) {
      const tagsContainer = document.createElement("ul");
      tagsContainer.className = "property-tags";

      data.tags.forEach((tag) => {
        const li = document.createElement("li");
        li.className = "property-tag";
        li.textContent = tag.replace(/_/g, " ");
        tagsContainer.appendChild(li);
      });

      if (subtitleEl && subtitleEl.parentElement) {
        subtitleEl.parentElement.appendChild(tagsContainer);
      }
    }

    /* ---------------- IMAGE GALLERY ---------------- */

    const galleryContainer = document.querySelector(".property-detail__gallery");
    if (!galleryContainer) return;

    galleryContainer.innerHTML = "";

    if (Array.isArray(data.images) && data.images.length) {
      data.images.forEach((img, index) => {
        const card = document.createElement("div");
        card.className = "property-card";
        card.setAttribute("role", "listitem");

        card.innerHTML = `
          <div class="property-card__media">
            <img
              src="${img.url}"
              alt="Property image ${index + 1}"
              class="property-gallery__image"
            />
          </div>
        `;

        galleryContainer.appendChild(card);
      });
    } else {
      const placeholderCard = document.createElement("div");
      placeholderCard.className = "property-card";
      placeholderCard.setAttribute("role", "listitem");

      placeholderCard.innerHTML = `
        <div class="property-card__media">
          <div class="property-card__image-placeholder">
            No images available
          </div>
        </div>
      `;

      galleryContainer.appendChild(placeholderCard);
    }

    /* ---------------- DETAILS TABLE ---------------- */

    const detailsTable = document.querySelector(".details-table tbody");
    if (detailsTable) {
      detailsTable.innerHTML = `
        <tr><th>Location</th><td>${data.location || "-"}</td></tr>
        <tr><th>Locality</th><td>${data.locality || "-"}</td></tr>
        <tr><th>Type</th><td>${data.type || "-"}</td></tr>
        <tr><th>Area</th><td>${data.area || "-"}</td></tr>
      `;
    }

    /* ---------------- DESCRIPTION ---------------- */

    const descEl = document.querySelector(".property-detail__description-text");
    if (descEl) descEl.textContent = data.description || "";

  } catch {
    // Handle errors silently on property details page
  }
}