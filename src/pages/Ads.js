// src/pages/Ads.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Ads() {

  // State
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch ads from Google Sheets
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
          image: row.c[5]?.v,
          date: row.c[6]?.v,
        }));

        setAds(rows);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch ads:", err);
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  // Filtered Ads
  const filteredAds = ads.filter((ad) => {
    const matchesSearch = ad.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ? true : ad.location.toLowerCase().includes(filter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  if (loading) return <div className="p-6">Loading ads...</div>;

  return (
    <div>

      <div className="p-6 max-w-6xl mx-auto">
        {/* Header + Back to Home Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">All Ads</h1>
          <Link
            to="/"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Back to Home
          </Link>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by title..."
            className="p-2 border rounded w-full md:w-1/2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="p-2 border rounded w-full md:w-1/4"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Locations</option>
            <option value="Sector 9">Sector 9</option>
            <option value="Sector 16">Sector 16</option>
            <option value="Panchkula">Panchkula</option>
          </select>
        </div>

        {/* Ads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAds.map((ad) => (
            <div
              key={ad.id}
              className="border rounded-lg shadow-lg overflow-hidden bg-white"
            >
              <img
                src={ad.image || "https://via.placeholder.com/400x200"}
                alt={ad.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold">{ad.title}</h2>
                <p className="text-gray-600">{ad.price}</p>
                <p className="text-sm text-gray-500">{ad.location}</p>
                <Link
                  to={`/ads/${ad.id}`}
                  state={{ from: "ads" }}
                  className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  View More Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Ads;
