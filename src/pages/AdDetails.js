import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function AdDetails() {
  const { id } = useParams();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch ad details
  useEffect(() => {
    const fetchAd = async () => {
      let { data, error } = await supabase
        .from("ads")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setError(error.message);
      } else {
        setAd(data);
      }
      setLoading(false);
    };

    fetchAd();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;
  if (!ad) return <p className="p-6">Ad not found.</p>;

  return (
    <div className="p-6">
      {/* Ad Title */}
      <h1 className="text-3xl font-bold mb-4">{ad.title}</h1>

      {/* Images Grid */}
      {ad.images && ad.images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
          {ad.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${ad.title} ${index + 1}`}
              className="w-full h-40 object-cover rounded-lg shadow"
            />
          ))}
        </div>
      )}

      {/* Location */}
      <p className="text-lg text-gray-700 mb-2">
        <span className="font-semibold">Location:</span> {ad.location}
      </p>

      {/* Price */}
      <p className="text-lg text-green-600 font-bold mb-2">
        Price: {ad.price}
      </p>

      {/* Description */}
      <p className="text-gray-800 mb-4">{ad.description}</p>

      {/* Date */}
      <p className="text-sm text-gray-500 mb-4">
        Added on: {new Date(ad.dateAdded).toLocaleDateString()}
      </p>

      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={() => navigate("/ads")}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600"
        >
          Back to Ads
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
