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
    swipeToSlide: true,
    touchMove: true,
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
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
      {/* Image Carousel */}
      <div className="relative h-48 sm:h-52 md:h-48 lg:h-52 overflow-hidden">
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
                  className="w-full h-48 sm:h-52 md:h-48 lg:h-52 object-cover"
                />
              </div>
            ))}
          </Slider>
        )}
        
        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-2 rounded-xl font-semibold text-sm shadow-lg">
          {formatPrice(ad?.price)}
        </div>
        
        {/* Image Count Badge */}
        {images.length > 1 && (
          <div className="absolute top-3 left-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded-lg text-xs font-medium">
            {images.length} photos
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5">
        <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-2 line-clamp-2">
          {ad?.title || "Untitled Property"}
        </h3>
        
        {ad?.location && (
          <div className="flex items-center text-gray-600 text-sm mb-3">
            <span className="mr-2 text-base">📍</span>
            <span className="truncate">{ad.location}</span>
          </div>
        )}

        {showFullDetails && ad?.features && ad.features.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {ad.features.slice(0, 2).map((feature, index) => (
              <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-xs font-medium border border-blue-100">
                {feature}
              </span>
            ))}
            {ad.features.length > 2 && (
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs font-medium">
                +{ad.features.length - 2} more
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-gray-500">
            {ad?.created_at ? new Date(ad.created_at).toLocaleDateString() : ""}
          </span>
          <span className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all duration-200 ease-in-out transform hover:scale-105 shadow-md">
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