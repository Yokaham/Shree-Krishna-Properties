import React from "react";
import { Link } from "react-router-dom";

const fallbackImg =
  "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200";

export default function PropertyCard({ ad, onClick }) {
  const mainImage = ad?.images?.[0] || ad?.image || fallbackImg;

  const CardInner = (
    <div className="border rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
      <div className="relative">
        <img
          src={mainImage}
          alt={ad?.title || "Property"}
          className="w-full h-48 object-cover"
        />
        {ad?.price && (
          <div className="absolute bottom-2 left-2 bg-white/90 px-3 py-1 rounded-md font-semibold">
            {ad.price}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg">{ad?.title || "Untitled Property"}</h3>
        {ad?.location && (
          <p className="text-gray-600 text-sm mt-1">📍 {ad.location}</p>
        )}

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {ad?.dateAdded
              ? new Date(ad.dateAdded).toLocaleDateString()
              : ""}
          </span>

          {/* Looks like a button; safe in both Link and div wrappers */}
          <span className="inline-block bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm">
            View Details
          </span>
        </div>
      </div>
    </div>
  );

  // If parent passes onClick (like your Home.js), make the entire card clickable
  if (onClick) {
    return (
      <div className="cursor-pointer" onClick={onClick} role="button">
        {CardInner}
      </div>
    );
  }

  // Fallback: self-link to details with state={ from: "home" }
  return (
    <Link to={`/ads/${ad?.id}`} state={{ from: "home" }} className="block">
      {CardInner}
    </Link>
  );
}
