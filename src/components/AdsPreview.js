import React from "react";

export default function AdsPreview() {
  const ads = [
    { id: 1, title: "10 Marla Kothi in Sector 7 Panchkula", price: "₹2.5 Cr" },
    { id: 2, title: "1 Kanal Plot in Mohali IT City", price: "₹3 Cr" },
    { id: 3, title: "3 BHK Flat in Zirakpur", price: "₹85 Lakh" },
  ];

  return (
    <section className="ads-preview">
      <h2>Latest Listings</h2>
      <div className="ads-list">
        {ads.map((ad) => (
          <div key={ad.id} className="ad-card">
            <h3>{ad.title}</h3>
            <p>{ad.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
