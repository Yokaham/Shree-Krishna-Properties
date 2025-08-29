import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import PropertyCard from "../components/PropertyCard";

export default function Ads() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const { data, error } = await supabase
          .from("ads")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          setError(error.message);
        } else {
          setAds(data || []);
        }
      } catch (err) {
        setError("Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl sm:text-4xl">❌</span>
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Error Loading Properties</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-blue-700 transition-all duration-200 ease-in-out transform hover:scale-105 shadow-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">All Properties</h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Explore our complete collection of premium properties
          </p>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-700 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Properties Grid */}
        {ads.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {ads.map((ad) => (
                <PropertyCard
                  key={ad.id}
                  ad={ad}
                  onClick={() => navigate(`/ads/${ad.id}`)}
                  showFullDetails={true}
                />
              ))}
            </div>
            
            {/* Results Count */}
            <div className="text-center mt-8 sm:mt-12 p-6 bg-white rounded-2xl shadow-sm">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-blue-600">{ads.length}</span> {ads.length === 1 ? 'property' : 'properties'}
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl sm:text-6xl">🏠</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">No Properties Available</h3>
            <p className="text-gray-500 text-base sm:text-lg mb-8">
              We're currently updating our listings. Please check back soon!
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-blue-700 transition-all duration-200 ease-in-out transform hover:scale-105 shadow-md"
            >
              Refresh Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
}