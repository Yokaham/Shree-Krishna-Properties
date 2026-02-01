// --- Property Details Page: Render single property ---

import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Get property ID from URL
const params = new URLSearchParams(window.location.search);
const propertyId = params.get("id");

if (propertyId) {
  renderProperty(propertyId);
}

async function renderProperty(id) {
  try {
    const docRef = doc(db, "properties", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return;

    const data = docSnap.data();

    // DOM references
    const titleEl = document.getElementById("property-title");
    const priceEl = document.querySelector(".property-detail__price");
    const subtitleEl = document.querySelector(".section-subtitle");
    const galleryContainer = document.querySelector(".property-detail__gallery");
    const detailsTable = document.querySelector(".details-table tbody");
    const descEl = document.querySelector(".property-detail__description-text");

    const hasTags = Array.isArray(data.tags) && data.tags.length;
    const hasImages = Array.isArray(data.images) && data.images.length;

    /* ---------------- BASIC INFO ---------------- */
    if (titleEl) titleEl.textContent = data.title || "Property";
    if (priceEl) priceEl.textContent = data.price || "Price on request";
    if (subtitleEl) {
      subtitleEl.textContent = `${data.locality || ""}${data.location ? ", " + data.location : ""}`;
    }

    /* ---------------- IMAGE GALLERY ---------------- */
    if (!galleryContainer) return;

    galleryContainer.innerHTML = "";

    if (hasImages) {
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
    if (detailsTable) {
      detailsTable.innerHTML = `
        <tr><th>Location</th><td>${data.location || "-"}</td></tr>
        <tr><th>Locality</th><td>${data.locality || "-"}</td></tr>
        <tr><th>Type</th><td>${data.type || "-"}</td></tr>
        <tr><th>Area</th><td>${data.area || "-"}</td></tr>
      `;
    }
    /* ---------------- TAGS ---------------- */
    const tagsWrapper = document.querySelector(".property-card__tags");
    if (tagsWrapper) {
      tagsWrapper.innerHTML = "";
      if (hasTags) {
        data.tags.forEach((tag) => {
          const span = document.createElement("span");
          span.className = "property-tag";
          span.textContent = tag.replace(/_/g, " ");
          tagsWrapper.appendChild(span);
        });
      } else {
        tagsWrapper.textContent = "No tags available";
      }
    }

    /* ---------------- DESCRIPTION ---------------- */
    if (descEl) descEl.textContent = data.description || "";

  } catch {
    // Handle errors silently on property details page
  }
}