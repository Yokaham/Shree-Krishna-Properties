// --- Public Ads Page: Render Properties ---

import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const grid = document.querySelector(".property-grid");

async function renderAds() {
  if (!grid) return;

  try {
    const querySnapshot = await getDocs(collection(db, "properties"));

    grid.innerHTML = ""; // remove hardcoded ads
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      const card = document.createElement("article");
      card.className = "property-card";
      card.setAttribute("role", "listitem");

const tagsHtml = Array.isArray(data.tags) && data.tags.length
  ? `
    <ul class="property-card__tags">
      ${data.tags.map(tag => `<li class="property-tag">${tag.replace(/_/g, " ")}</li>`).join("")}
    </ul>
  `
  : "";
const thumbnail =
  Array.isArray(data.images) && data.images.length
    ? `<img class="property-card__image" src="${data.images[0].url}" alt="Property image" />`
    : `<div class="property-card__image property-card__image--placeholder" aria-label="No Image Available" >No Image Available</div>`;

card.innerHTML = `
  ${thumbnail}
  <div class="property-card__content">
    <h3 class="property-card__title">${data.title || "Untitled Property"}</h3>

    <p class="property-card__location">
      ${data.locality || ""}${data.location ? ", " + data.location : ""}
    </p>

    ${tagsHtml}

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
  } catch {
    // Handle errors silently on ads page
  }
}

renderAds();
