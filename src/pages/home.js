import React, { useEffect, useState } from "react";
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

// ✅ Correct imports
import PropertyCard from "../components/PropertyCard";
import { supabase } from "../supabaseClient";

export default function Home() {
  const [ads, setAds] = useState([]);
  const navigate = useNavigate();

  // Fetch latest ads
  useEffect(() => {
    const fetchAds = async () => {
      const { data, error } = await supabase
        .from("ads")
        .select("*")
        .order("id", { ascending: false })
        .limit(3);

      if (error) {
        console.error("Error fetching ads:", error.message);
      } else {
        setAds(data || []);
      }
    };
    fetchAds();
  }, []);

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="p-6 space-y-10">
      
      {/* 🔹 Main Project Carousel */}
      <div className="max-w-5xl mx-auto">
        <Slider {...carouselSettings}>
          <div>
            <img
              src="/assets/project1.jpg"
              alt="Project 1"
              className="w-full h-80 object-cover rounded-2xl shadow"
            />
          </div>
          <div>
            <img
              src="/assets/project2.jpg"
              alt="Project 2"
              className="w-full h-80 object-cover rounded-2xl shadow"
            />
          </div>
          <div>
            <img
              src="/assets/project3.jpg"
              alt="Project 3"
              className="w-full h-80 object-cover rounded-2xl shadow"
            />
          </div>
        </Slider>
      </div>

      {/* 🔹 Business Description */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Shree Krishna Properties</h1>
        <p className="text-lg text-gray-700">
          We are a trusted property consultant operating in the Tricity area
          (Chandigarh, Mohali, Panchkula). We specialize in residential and
          commercial properties, offering clients the best deals in prime
          locations. Our focus is on transparency, professionalism, and
          customer satisfaction.
        </p>
      </div>

      {/* 🔹 Latest Ads Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Latest Ads</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ads.map((ad) => (
            <PropertyCard
              key={ad.id}
              ad={ad}
              onClick={() => navigate(`/ads/${ad.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
