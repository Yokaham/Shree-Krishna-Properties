// src/pages/adDetails.js
import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";

const AdDetails = () => {
  const { id } = useParams(); // get the ad ID from the URL
  const location = useLocation();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const sheetId = "154qLJA3oGBMHXjfiQfD6sOOExpZ6onoWP5HPTDvNfxg";
        const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

        const response = await fetch(url);
        const text = await response.text();
        const json = JSON.parse(text.substr(47).slice(0, -2));

        const rows = json.table.rows.map((row) => ({
          id: row.c[0]?.v,
          title: row.c[1]?.v,
          price: row.c[2]?.v,
          location: row.c[3]?.v,
          description: row.c[4]?.v,
          imageURL: row.c[5]?.v,
          dateAdded: row.c[6]?.v,
        }));

        const foundAd = rows.find((item) => String(item.id) === String(id));
        setAd(foundAd || null);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load ad details:", err);
        setLoading(false);
      }
    };

    fetchAd();
  }, [id]);

  if (loading) return <div className="p-6">Loading ad details...</div>;
  if (!ad) return <div className="p-6">Ad not found.</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{ad.title}</h1>
      <img
        src={ad.imageURL || "https://via.placeholder.com/600x400"}
        alt={ad.title}
        className="w-full h-80 object-cover mb-4 rounded-lg"
      />
      <p className="text-green-600 font-bold text-xl mb-2">{ad.price}</p>
      <p className="text-gray-700 mb-2">📍 {ad.location}</p>
      <p className="text-gray-600 mb-6">{ad.description}</p>
      <p className="text-sm text-gray-400">Posted on: {ad.dateAdded}</p>

      {/* Back Button Logic */}
      {location.state?.from === "home" ? (
        <Link
          to="/ads"
          className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          More Ads
        </Link>
      ) : (
        <Link
          to="/ads"
          className="mt-4 inline-block bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Back to Ads
        </Link>
      )}
      <Link to="/" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700" >
      Back to Home
      </Link>
    </div>
  );
};

export default AdDetails;
