import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const fallbackImg = "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800";

export default function PropertyCard({ ad, onClick, showFullDetails = false }) {
  const images = ad?.images && ad.images.length > 0 ? ad.images : [fallbackImg];
  
  const carouselSettings = {
    dots: images.length > 1,
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: images.length > 1,
    autoplaySpeed: 3000,
  };

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

  const CardContent = (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Carousel */}
      <div className="relative h-48 overflow-hidden">
        {images.length === 1 ? (
          <img
            src={images[0]}
            alt={ad?.title || "Property"}
            className="w-full h-full object-cover"
          />
        ) : (
          <Slider {...carouselSettings}>
            {images.map((img, index) => (
              <div key={index}>
                <img
                  src={img}
                  alt={`${ad?.title || "Property"} ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </Slider>
        )}
        
        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1.5 rounded-full font-semibold text-sm shadow-lg">
          {formatPrice(ad?.price)}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
          {ad?.title || "Untitled Property"}
        </h3>
        
        {ad?.location && (
          <div className="flex items-center text-gray-600 text-sm mb-3">
            <span className="mr-2">📍</span>
            <span>{ad.location}</span>
          </div>
        )}

        {showFullDetails && ad?.features && ad.features.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {ad.features.slice(0, 3).map((feature, index) => (
              <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
                {feature}
              </span>
            ))}
            {ad.features.length > 3 && (
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
                +{ad.features.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-gray-500">
            {ad?.created_at ? new Date(ad.created_at).toLocaleDateString() : ""}
          </span>
          <span className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            View Details
          </span>
        </div>
      </div>
    </div>
  );

  if (onClick) {
    return (
      <div className="cursor-pointer" onClick={onClick}>
        {CardContent}
      </div>
    );
  }

  return (
    <Link to={`/ads/${ad?.id}`} className="block">
      {CardContent}
    </Link>
  );
}