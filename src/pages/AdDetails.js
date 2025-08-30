import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, MessageCircle, Calendar, Hash, MapPin, Home as HomeIcon, Ruler } from "lucide-react";
import Slider from "react-slick";
import { supabase } from "../supabaseClient";
import FeatureBadge from "../components/FeatureBadge";
import Button from "../components/Button";

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
    swipeToSlide: true,
    touchMove: true,
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl sm:text-4xl">❌</span>
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Error Loading Property</h2>
          <p className="text-red-600 mb-4 text-center">{error}</p>
          <Button variant="primary" onClick={() => navigate("/ads")}>
            Back to Properties
          </Button>
        </div>
      </div>
    );
  }

  if (!ad) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl sm:text-4xl">🏠</span>
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Property Not Found</h2>
          <p className="text-gray-600 mb-4">The property you're looking for doesn't exist.</p>
          <Button variant="primary" onClick={() => navigate("/ads")}>
            Back to Properties
          </Button>
        </div>
      </div>
    );
  }

  const images = ad.images && ad.images.length > 0 ? ad.images : [
    "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Back Button */}
        <Button
          variant="outline"
          icon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          Back
        </Button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Image Gallery - Compact Size */}
          <div className="relative h-56 sm:h-64 md:h-72">
            {images.length === 1 ? (
              <img
                src={images[0]}
                alt={ad.title}
                className="w-full h-56 sm:h-64 md:h-72 object-cover"
                loading="lazy"
              />
            ) : (
              <Slider {...{
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                autoplay: true,
                autoplaySpeed: 3000,
                swipeToSlide: true,
                touchMove: true,
              }}>
                {images.map((img, index) => (
                  <div key={index}>
                    <img
                      src={img}
                      alt={`${ad.title} ${index + 1}`}
                      className="w-full h-56 sm:h-64 md:h-72 object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </Slider>
            )}
            
            {/* Image Count Badge */}
            {images.length > 1 && (
              <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-3 py-2 rounded-xl text-sm font-medium">
                {images.length} photos
              </div>
            )}
          </div>

          {/* Property Details */}
          <div className="p-6 sm:p-8">
            {/* Title and Price */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{ad.title}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span className="text-base sm:text-lg">{ad.location}</span>
                </div>
                <div className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold text-lg sm:text-xl shadow-lg self-start sm:self-auto">
                  {formatPrice(ad.price)}
                </div>
              </div>
            </div>

            {/* Property Quick Info */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 sm:mb-8">
              {ad.sector && (
                <div className="bg-gray-50 rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-2">🏘️</div>
                  <p className="text-xs text-gray-500 mb-1">Sector</p>
                  <p className="font-semibold text-gray-800">{ad.sector}</p>
                </div>
              )}
              {ad.property_type && (
                <div className="bg-gray-50 rounded-2xl p-4 text-center">
                  <HomeIcon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-xs text-gray-500 mb-1">Type</p>
                  <p className="font-semibold text-gray-800 capitalize">{ad.property_type}</p>
                </div>
              )}
              {ad.size && (
                <div className="bg-gray-50 rounded-2xl p-4 text-center">
                  <Ruler className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <p className="text-xs text-gray-500 mb-1">Size</p>
                  <p className="font-semibold text-gray-800">{ad.size}</p>
                </div>
              )}
              <div className="bg-gray-50 rounded-2xl p-4 text-center">
                <div className="text-2xl mb-2">{ad.owner_listed ? '👤' : '🏢'}</div>
                <p className="text-xs text-gray-500 mb-1">Listed By</p>
                <p className="font-semibold text-gray-800">{ad.owner_listed ? 'Owner' : 'Agent'}</p>
              </div>
            </div>

            {/* Features */}
            {ad.features && ad.features.length > 0 && (
              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Property Features</h3>
                <div className="flex flex-wrap gap-3">
                  {ad.features.map((feature, index) => (
                    <FeatureBadge key={index} feature={feature} />
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {ad.description && (
              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Description</h3>
                <div className="bg-gray-50 rounded-2xl p-4 sm:p-6">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {ad.description}
                  </p>
                </div>
              </div>
            )}

            {/* Property Info */}
            <div className="bg-blue-50 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Property Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
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
                  <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <Hash className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Property ID</p>
                    <p className="font-medium text-gray-800">SKP-{ad.id}</p>
                  </div>
                </div>
                {ad.property_type && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">
                      <HomeIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Property Type</p>
                      <p className="font-medium text-gray-800 capitalize">{ad.property_type}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-blue-600 rounded-2xl p-6 sm:p-8 text-white">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Interested in this property?</h3>
              <p className="mb-6 opacity-90 text-sm sm:text-base">
                Contact our expert team for more details, site visits, and personalized assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="secondary"
                  icon={<Phone className="w-5 h-5" />}
                  onClick={() => window.open("tel:9463255555")}
                >
                  Call Now
                </Button>
                <Button
                  variant="success"
                  icon={<MessageCircle className="w-5 h-5" />}
                  onClick={() => window.open(`https://wa.me/919463255555?text=${encodeURIComponent(
                    `Hi! I'm interested in the property: ${ad.title} (ID: SKP-${ad.id}). Could you provide more details?`
                  )}`, "_blank")}
                >
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}