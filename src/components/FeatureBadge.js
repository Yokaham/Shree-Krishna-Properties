import React from 'react';

const featureEmojiMap = {
  "Ready to Move In": "🏡",
  "B-Road": "🛣️",
  "Park Facing": "🌳",
  "Corner Property": "📐",
  "Near Market": "🛍️",
  "Near School": "🎓",
  "Furnished": "🛋️",
  "Semi-Furnished": "🪑",
  "Unfurnished": "📦",
  "Newly Built": "🏗️",
  "Resale": "🔄",
  "Gated Society": "🚪",
  "Swimming Pool": "🏊",
  "Gym": "🏋️",
  "Lift": "🛗",
  "Car Parking": "🚗",
  "Power Backup": "⚡",
  "Water Supply": "💧",
  "Security": "🛡️",
  "Club House": "🏠"
};

export default function FeatureBadge({ feature }) {
  const emoji = featureEmojiMap[feature] || "📌";
  
  return (
    <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 px-3 py-2 rounded-xl text-sm font-medium border border-blue-200 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 ease-in-out transform hover:scale-105 shadow-sm">
      <span className="text-base">{emoji}</span>
      <span>{feature}</span>
    </span>
  );
}