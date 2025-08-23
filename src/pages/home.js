// src/pages/home.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [ads, setAds] = useState([]);

  // ✅ Carousel settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  // ✅ Replace these with real images in /public/images/
  const projectImages = [
    "/images/project1.jpg",
    "/images/project2.jpg",
    "/images/project3.jpg",
  ];

  // ✅ Fetch latest ads from Google Sheets
  useEffect(() => {
    const fetchAds = async () => {
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

        // Latest 3 by dateAdded
        const latest = rows
          .filter((r) => r?.id && r?.title) // simple guard
          .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
          .slice(0, 3);

        setAds(latest);
      } catch (err) {
        console.error("Failed to load ads:", err);
      }
    };

    fetchAds();
  }, []);

  return (
    <div className="p-6">
      {/* ✅ Carousel */}
      <div className="mb-10">
        <Slider {...sliderSettings}>
          {projectImages.map((img, idx) => (
            <div key={idx}>
              <img
                src={img}
                alt={`Project ${idx + 1}`}
                className="w-full h-64 object-cover rounded-lg shadow"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Intro blurb */}
      <h1 className="text-3xl font-bold mb-4">Welcome to Shree Krishna Properties</h1>
      <p className="mb-8 text-gray-700">
        We specialize in premium properties across Chandigarh, Mohali, and Panchkula.
        Explore the latest listings and find your dream property today.
      </p>

      {/* ✅ Latest 3 Ads */}
      <h2 className="text-2xl font-semibold mb-4">Latest Ads</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ads.map((ad) => (
          <div key={ad.id} className="border p-4 rounded-lg shadow-md bg-white">
            <img
              src={ad.imageURL || "https://via.placeholder.com/600x400"}
              alt={ad.title}
              className="w-full h-48 object-cover mb-2 rounded-lg"
            />
            <h3 className="text-xl font-semibold">{ad.title}</h3>
            <p className="text-gray-600">{ad.location}</p>
            <p className="text-green-600 font-bold">{ad.price}</p>
            <Link
              to={`/ads/${ad.id}`}
              state={{ from: "home" }} // so AdDetails can show "More Ads"
              className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              View More
            </Link>
          </div>
        ))}
        {ads.length === 0 && (
          <div className="text-gray-500">No ads yet. Please check back soon.</div>
        )}
      </div>

      {/* View all */}
      <div className="mt-8">
        <Link
          to="/ads"
          className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700"
        >
          View All Ads
        </Link>
      </div>
    </div>
  );
};

export default Home;
