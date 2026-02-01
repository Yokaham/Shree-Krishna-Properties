// --- Public Ads Page: Render Properties ---

// --- Imports ---
import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";


// --- DOM references ---
const grid = document.querySelector(".property-grid");
const loadMoreBtn = document.getElementById("load-more-btn");
const locationSelect = document.getElementById("filter-location");
const typeSelect = document.getElementById("filter-type");
const filtersForm = document.querySelector(".filters__form");
const tagCheckboxes = document.querySelectorAll('input[name="tags"]');
const searchInput = document.getElementById("filter-search");


// --- State ---
let allProperties = [];

let visibleCount = 6;
const PAGE_SIZE = 6;


// --- Rendering ---
function renderTagsHtml(tags) {
  return Array.isArray(tags) && tags.length
    ? `
      <ul class="property-card__tags">
        ${tags
          .map(tag => `<li class="property-tag">${tag.replace(/_/g, " ")}</li>`)
          .join("")}
      </ul>
    `
    : "";
}

function renderThumbnailHtml(images) {
  return Array.isArray(images) && images.length
    ? `<img class="property-card__image" src="${images[0].url}" alt="Property image" />`
    : `<div class="property-card__image property-card__image--placeholder" aria-label="No Image Available">No Image Available</div>`;
}

function renderPropertyCard(doc) {
  const data = doc.data();

  const card = document.createElement("article");
  card.className = "property-card";
  card.setAttribute("role", "listitem");

  const tagsHtml = renderTagsHtml(data.tags);
  const thumbnail = renderThumbnailHtml(data.images);

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

  return card;
}

async function renderAds() {
  if (!grid) return;

  try {
    const querySnapshot = await getDocs(collection(db, "properties"));

    allProperties = querySnapshot.docs;

    grid.innerHTML = ""; // remove hardcoded ads

    allProperties.forEach((doc) => {
      grid.appendChild(renderPropertyCard(doc));
    });
  } catch {
    // Handle errors silently on ads page
  }
}


// --- Filtering ---
function applyFilters() {
  visibleCount = PAGE_SIZE;

  if (!grid) return;

  const selectedLocation = locationSelect?.value || "";
  const selectedType = typeSelect?.value || "";

  const selectedTags = Array.from(tagCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  const searchText = searchInput?.value.trim().toLowerCase() || "";

  grid.innerHTML = "";

  const filtered = allProperties.filter((doc) => {
    const data = doc.data();

    const matchLocation =
      !selectedLocation || data.location === selectedLocation;

    const matchType =
      !selectedType || data.type === selectedType;

    const matchTags =
      !selectedTags.length ||
      (Array.isArray(data.tags) &&
        selectedTags.every((tag) => data.tags.includes(tag)));

    const searchableText = `
      ${data.title || ""}
      ${data.locality || ""}
      ${data.location || ""}
    `.toLowerCase();

    const matchSearch =
      !searchText || searchableText.includes(searchText);

    return matchLocation && matchType && matchTags && matchSearch;
  });

  if (!filtered.length) {
    grid.innerHTML = "<p>No properties found.</p>";
    return;
  }

  filtered.slice(0, visibleCount).forEach((doc) => {
    grid.appendChild(renderPropertyCard(doc));
  });

  if (filtered.length > visibleCount) {
    loadMoreBtn.style.display = "inline-block";
  } else {
    loadMoreBtn.style.display = "none";
  }
}


// --- Event listeners ---
if (filtersForm) {
  filtersForm.addEventListener("submit", (event) => {
    event.preventDefault(); // stop page reload
    applyFilters();
  });
}

if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    visibleCount += PAGE_SIZE;
    applyFilters();
  });
}


// --- Entry point ---
function init() {
  renderAds();
}

init();


