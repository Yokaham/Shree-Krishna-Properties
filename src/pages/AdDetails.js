import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { supabase } from "../supabaseClient";
import FeatureBadge from "../components/FeatureBadge";

export default function AdDetails() {
  const { id } = useParams();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const { data, error } = await supabase
          .from("ads")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          setError(error.message);
        } else {
          setAd(data);
        }
      } catch (err) {
        setError("Failed to fetch property details");
      } finally {
        setLoading(false);
      }
    };

    fetchAd();
  }, [id]);

  const formatPrice = (price) => {
    if (!price) return "Price on Request";
    if (typeof price === 'number') {
      if (price >= 10000000) {
        return `₹${(price / 10000000).toFixed(1)} Cr`;
      } else if (price >= 100000) {
        return `₹${(price / 100000).toFixed(1)} Lakh`;
      } else {
        return `₹${price.toLocaleString()}`;
      }
    }
    return price;
  };

  const gallerySettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">❌</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Property</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate("/ads")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  if (!ad) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🏠</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Property Not Found</h2>
          <p className="text-gray-600 mb-4">The property you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/ads")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  const images = ad.images && ad.images.length > 0 ? ad.images : [
    "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium transition-colors"
        >
          <span>←</span>
          <span>Back</span>
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Image Gallery */}
          <div className="relative">
            {images.length === 1 ? (
              <img
                src={images[0]}
                alt={ad.title}
                className="w-full h-80 object-cover"
              />
            ) : (
              <div className="h-80">
                <Slider {...gallerySettings}>
                  {images.map((img, index) => (
                    <div key={index}>
                      <img
                        src={img}
                        alt={`${ad.title} ${index + 1}`}
                        className="w-full h-80 object-cover"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            )}
          </div>

          {/* Property Details */}
          <div className="p-8">
            {/* Title and Price */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-3">{ad.title}</h1>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center text-gray-600">
                  <span className="mr-2 text-lg">📍</span>
                  <span className="text-lg">{ad.location}</span>
                </div>
                <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-bold text-xl shadow-lg">
                  {formatPrice(ad.price)}
                </div>
              </div>
            </div>

            {/* Features */}
            {ad.features && ad.features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Property Features</h3>
                <div className="flex flex-wrap gap-3">
                  {ad.features.map((feature, index) => (
                    <FeatureBadge key={index} feature={feature} />
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {ad.description && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Description</h3>
                <div className="bg-gray-50 rounded-xl p-6">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {ad.description}
                  </p>
                </div>
              </div>
            )}

            {/* Property Info */}
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Property Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">📅</span>
                  <div>
                    <p className="text-sm text-gray-600">Listed On</p>
                    <p className="font-medium text-gray-800">
                      {ad.created_at ? new Date(ad.created_at).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">🆔</span>
                  <div>
                    <p className="text-sm text-gray-600">Property ID</p>
                    <p className="font-medium text-gray-800">SKP-{ad.id}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">Interested in this property?</h3>
              <p className="mb-6 opacity-90">
                Contact our expert team for more details, site visits, and personalized assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:9463255555"
                  className="flex items-center justify-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  <span>📞</span>
                  <span>Call Now</span>
                </a>
                <a
                  href={`https://wa.me/919463255555?text=${encodeURIComponent(
                    `Hi! I'm interested in the property: ${ad.title} (ID: SKP-${ad.id}). Could you provide more details?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
                >
                  <span>💬</span>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}