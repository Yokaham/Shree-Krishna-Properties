// --- Home Page: Render Featured Properties ---

import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const grid = document.querySelector(".property-grid");

async function renderFeaturedProperties() {
  if (!grid) return;

  try {
    const q = query(
      collection(db, "properties"),
      orderBy("createdAt", "desc"),
      limit(3)
    );

    const querySnapshot = await getDocs(q);

    grid.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      const card = document.createElement("article");
      card.className = "property-card";

      const thumbnail =
        Array.isArray(data.images) && data.images.length
          ? `<img class="property-card__image" src="${data.images[0].url}" alt="Property image" />`
          : `<div class="property-card__image property-card__image--placeholder">No Image</div>`;

      card.innerHTML = `
        ${thumbnail}

        <div class="property-card__content">
          <h3 class="property-card__title">${data.title || "Untitled Property"}</h3>

          <p class="property-card__location">
            ${data.locality || ""}${data.location ? ", " + data.location : ""}
          </p>

          <p class="property-card__price">
            ${data.price || "Price on request"}
          </p>

          <a class="btn btn--primary" href="property.html?id=${doc.id}">
            View Details
          </a>
        </div>
      `;

      grid.appendChild(card);
    });
  } catch (error) {
    console.error("Error rendering featured properties:", error);
  }
}

renderFeaturedProperties();
