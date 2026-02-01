import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";


const grid = document.getElementById("home-featured-grid");

function renderThumbnailHtml(images) {
  return Array.isArray(images) && images.length
    ? `<img class="property-card__image" src="${images[0].url}" alt="Property image" />`
    : `<div class="property-card__image property-card__image--placeholder" aria-label="No Image Available">No Image</div>`;
}

function renderPropertyCard(doc) {
  const data = doc.data();

  const card = document.createElement("article");
  card.className = "property-card";

  const thumbnail = renderThumbnailHtml(data.images);

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

  return card;
}


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
      grid.appendChild(renderPropertyCard(doc));
    });
  } catch {
    // silent by design
  }
}

renderFeaturedProperties();
