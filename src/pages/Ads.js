import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient"; 
import PropertyCard from "../components/PropertyCard"; // use PropertyCard, not AdsPreview

export default function Ads() {
  const [ads, setAds] = useState([]);
  const navigate = useNavigate();

  // Fetch all ads for Ads page
  useEffect(() => {
    const fetchAds = async () => {
      let { data, error } = await supabase.from("ads").select("*");

      if (error) {
        console.error("Error fetching ads:", error);
      } else {
        setAds(data);
      }
    };

    fetchAds();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Ads</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ads.map((ad) => (
          <PropertyCard
            key={ad.id}
            ad={ad}
            onClick={() => navigate(`/ads/${ad.id}`, { state: { from: "ads" } })}
          />
        ))}
      </div>
    </div>
  );
}
