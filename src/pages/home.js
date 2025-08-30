import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { ArrowRight, MapPin, Home as HomeIcon, Tag } from "lucide-react";
import PropertyCard from "../components/PropertyCard";
import Button from "../components/Button";
import { supabase } from "../supabaseClient";

export default function Home() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch latest ads
  useEffect(() => {
    const fetchAds = async () => {
      const { data, error } = await supabase
        .from("ads")
        .select("*")
        .order("owner_listed", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) {
        console.error("Error fetching ads:", error.message);
      } else {
        setAds(data || []);
      }
      setLoading(false);
    };
    fetchAds();
  }, []);

  // Main carousel settings for partner projects
  const mainCarouselSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    swipeToSlide: true,
    touchMove: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          autoplaySpeed: 3000,
        }
      }
    ]
  };

  // Sample partner project images
  const partnerProjects = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200",
      title: "Luxury Residential Complex",
      location: "Sector 7, Panchkula"
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200",
      title: "Modern Commercial Hub",
      location: "IT City, Mohali"
    },
    {
      id: 3,
      image: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1200",
      title: "Premium Villa Project",
      location: "Sector 21, Chandigarh"
    }
  ];

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Partner Projects Carousel */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <Slider {...mainCarouselSettings}>
              {partnerProjects.map((project) => (
                <div key={project.id} className="relative">
                  <div className="h-64 sm:h-80 md:h-96 relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 text-white">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">{project.title}</h3>
                      <p className="text-base sm:text-lg opacity-90 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {project.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg">
                SK
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">Shree Krishna Properties</h1>
            </div>
          </div>
          
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 sm:mb-12 max-w-4xl mx-auto">
            Your trusted property consultant in the Tricity area. We specialize in premium residential 
            and commercial properties across Chandigarh, Mohali, and Panchkula, delivering exceptional 
            service with complete transparency and professionalism.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <HomeIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Premium Properties</h3>
              <p className="text-gray-600 text-sm">Curated selection of high-quality residential and commercial spaces</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Expert Guidance</h3>
              <p className="text-gray-600 text-sm">Professional consultation to help you make informed decisions</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Trusted Service</h3>
              <p className="text-gray-600 text-sm">Years of experience serving clients across the Tricity region</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Properties Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Latest Properties</h2>
            <p className="text-gray-600 text-base sm:text-lg">Discover our newest listings in prime locations</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {ads.map((ad) => (
                <div key={ad.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  {/* Image Carousel */}
                  <div className="relative h-48 sm:h-52 overflow-hidden">
                    {ad.images && ad.images.length > 1 ? (
                      <Slider {...{
                        dots: true,
                        infinite: true,
                        speed: 500,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        autoplay: true,
                        autoplaySpeed: 3000,
                      }}>
                        {ad.images.map((img, index) => (
                          <div key={index}>
                            <img
                              src={img}
                              alt={`${ad.title} ${index + 1}`}
                              className="w-full h-48 sm:h-52 object-cover"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </Slider>
                    ) : (
                      <img
                        src={ad.images?.[0] || "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800"}
                        alt={ad.title}
                        className="w-full h-48 sm:h-52 object-cover"
                        loading="lazy"
                      />
                    )}
                    
                    {/* Price Badge */}
                    <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-2 rounded-xl font-semibold text-sm shadow-lg">
                      {formatPrice(ad.price)}
                    </div>
                    
                    {/* Image Count */}
                    {ad.images && ad.images.length > 1 && (
                      <div className="absolute top-3 left-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded-lg text-xs">
                        {ad.images.length} photos
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
                      {ad.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{ad.location}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <HomeIcon className="w-4 h-4" />
                        <span className="capitalize">{ad.property_type}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        <span>{ad.sector}</span>
                      </span>
                    </div>

                    <Button
                      variant="primary"
                      onClick={() => navigate(`/ads/${ad.id}`)}
                      className="w-full"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && ads.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <HomeIcon className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No Properties Yet</h3>
              <p className="text-gray-500">New listings will appear here soon!</p>
            </div>
          )}

          <div className="text-center mt-8 sm:mt-12">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              onClick={() => navigate("/ads")}
            >
              View All Properties
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}