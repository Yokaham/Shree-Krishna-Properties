import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

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
    cssEase: 'linear',
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Partner Projects Carousel */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <Slider {...mainCarouselSettings}>
              {partnerProjects.map((project) => (
                <div key={project.id} className="relative">
                  <div className="h-96 relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-8 left-8 text-white">
                      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                      <p className="text-lg opacity-90 flex items-center">
                        <span className="mr-2">📍</span>
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
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                SK
              </div>
              <h1 className="text-4xl font-bold text-gray-800">Shree Krishna Properties</h1>
            </div>
          </div>
          
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Your trusted property consultant in the Tricity area. We specialize in premium residential 
            and commercial properties across Chandigarh, Mohali, and Panchkula, delivering exceptional 
            service with complete transparency and professionalism.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Premium Properties</h3>
              <p className="text-gray-600 text-sm">Curated selection of high-quality residential and commercial spaces</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Expert Guidance</h3>
              <p className="text-gray-600 text-sm">Professional consultation to help you make informed decisions</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Trusted Service</h3>
              <p className="text-gray-600 text-sm">Years of experience serving clients across the Tricity region</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Properties Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Latest Properties</h2>
            <p className="text-gray-600 text-lg">Discover our newest listings in prime locations</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ads.map((ad) => (
                <PropertyCard
                  key={ad.id}
                  ad={ad}
                  onClick={() => navigate(`/ads/${ad.id}`)}
                  showFullDetails={true}
                />
              ))}
            </div>
          )}

          {!loading && ads.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🏠</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Properties Yet</h3>
              <p className="text-gray-500">New listings will appear here soon!</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/ads"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              <span>View All Properties</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}