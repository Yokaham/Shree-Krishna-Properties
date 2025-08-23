import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carousel settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
  };

  // Hero carousel images
  const heroImages = [
    {
      url: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200",
      title: "Premium Properties in Chandigarh",
      subtitle: "Discover luxury living spaces"
    },
    {
      url: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200",
      title: "Modern Homes in Mohali",
      subtitle: "Contemporary design meets comfort"
    },
    {
      url: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1200",
      title: "Elegant Villas in Panchkula",
      subtitle: "Your dream home awaits"
    }
  ];

  // Fetch latest ads from Google Sheets
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

        const latest = rows
          .filter((r) => r?.id && r?.title)
          .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
          .slice(0, 3);

        setAds(latest);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load ads:", err);
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  const heroStyle = {
    position: 'relative',
    height: '70vh',
    minHeight: '500px',
    overflow: 'hidden',
  };

  const heroSlideStyle = {
    position: 'relative',
    height: '70vh',
    minHeight: '500px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const heroOverlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.8) 0%, rgba(37, 99, 235, 0.6) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const heroContentStyle = {
    textAlign: 'center',
    color: 'white',
    maxWidth: '800px',
    padding: '0 20px',
  };

  const sectionStyle = {
    padding: '80px 0',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  const statsStyle = {
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    padding: '60px 0',
  };

  const statItemStyle = {
    textAlign: 'center',
    padding: '20px',
  };

  const statNumberStyle = {
    fontSize: '3rem',
    fontWeight: '700',
    color: '#2563eb',
    marginBottom: '8px',
  };

  const statLabelStyle = {
    color: '#64748b',
    fontSize: '1.1rem',
    fontWeight: '500',
  };

  return (
    <div>
      {/* Hero Section with Carousel */}
      <section style={heroStyle}>
        <Slider {...sliderSettings}>
          {heroImages.map((image, idx) => (
            <div key={idx}>
              <div 
                style={{
                  ...heroSlideStyle,
                  backgroundImage: `url(${image.url})`
                }}
              >
                <div style={heroOverlayStyle}>
                  <div style={heroContentStyle} className="fade-in-up">
                    <h1 style={{
                      fontSize: '3.5rem',
                      fontWeight: '700',
                      marginBottom: '24px',
                      lineHeight: '1.1',
                    }}>
                      {image.title}
                    </h1>
                    <p style={{
                      fontSize: '1.25rem',
                      marginBottom: '32px',
                      opacity: 0.9,
                    }}>
                      {image.subtitle}
                    </p>
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <Link
                        to="/ads"
                        className="btn btn-primary"
                        style={{
                          fontSize: '1.1rem',
                          padding: '16px 32px',
                          backgroundColor: 'white',
                          color: '#2563eb',
                          fontWeight: '600',
                        }}
                      >
                        View Properties
                      </Link>
                      <a
                        href="tel:9463255555"
                        className="btn btn-secondary"
                        style={{
                          fontSize: '1.1rem',
                          padding: '16px 32px',
                          backgroundColor: 'transparent',
                          color: 'white',
                          border: '2px solid white',
                        }}
                      >
                        Contact Us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Stats Section */}
      <section style={statsStyle}>
        <div style={containerStyle}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
          }}>
            <div style={statItemStyle}>
              <div style={statNumberStyle}>500+</div>
              <div style={statLabelStyle}>Properties Sold</div>
            </div>
            <div style={statItemStyle}>
              <div style={statNumberStyle}>15+</div>
              <div style={statLabelStyle}>Years Experience</div>
            </div>
            <div style={statItemStyle}>
              <div style={statNumberStyle}>1000+</div>
              <div style={statLabelStyle}>Happy Clients</div>
            </div>
            <div style={statItemStyle}>
              <div style={statNumberStyle}>50+</div>
              <div style={statLabelStyle}>Active Listings</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '60px',
            alignItems: 'center',
          }}>
            <div>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                marginBottom: '24px',
                color: '#1f2937',
              }}>
                Your Trusted Property Partner
              </h2>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.8',
                color: '#6b7280',
                marginBottom: '32px',
              }}>
                With over 15 years of experience in the real estate industry, Shree Krishna Properties 
                has been helping families and investors find their perfect properties across Chandigarh, 
                Mohali, and Panchkula. We specialize in premium residential and commercial properties, 
                offering personalized service and expert guidance throughout your property journey.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/ads" className="btn btn-primary">
                  Explore Properties
                </Link>
                <a href="tel:9463255555" className="btn btn-outline">
                  Get Consultation
                </a>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Property consultation"
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Properties Section */}
      <section style={{...sectionStyle, backgroundColor: '#f8fafc'}}>
        <div style={containerStyle}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: '16px',
              color: '#1f2937',
            }}>
              Latest Properties
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto',
            }}>
              Discover our newest listings featuring premium properties in prime locations
            </p>
          </div>

          {loading ? (
            <div className="loading">
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '1.1rem',
                color: '#6b7280',
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid #e5e7eb',
                  borderTop: '2px solid #2563eb',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}></div>
                Loading latest properties...
              </div>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '32px',
            }}>
              {ads.map((ad) => (
                <div
                  key={ad.id}
                  style={cardStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={ad.imageURL || "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600"}
                      alt={ad.title}
                      style={{
                        width: '100%',
                        height: '250px',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                      }}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      backgroundColor: '#2563eb',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                    }}>
                      New
                    </div>
                  </div>
                  <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: '#1f2937',
                      lineHeight: '1.4',
                    }}>
                      {ad.title}
                    </h3>
                    <p style={{
                      color: '#6b7280',
                      marginBottom: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}>
                      📍 {ad.location}
                    </p>
                    <p style={{
                      color: '#6b7280',
                      marginBottom: '16px',
                      lineHeight: '1.6',
                      flexGrow: 1,
                    }}>
                      {ad.description?.substring(0, 100)}...
                    </p>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 'auto',
                    }}>
                      <span style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: '#059669',
                      }}>
                        {ad.price}
                      </span>
                      <Link
                        to={`/ads/${ad.id}`}
                        state={{ from: "home" }}
                        className="btn btn-primary"
                        style={{ fontSize: '0.9rem', padding: '10px 20px' }}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {ads.length === 0 && !loading && (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#6b7280',
            }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '16px',
              }}>🏠</div>
              <h3 style={{ marginBottom: '8px', color: '#374151' }}>No properties available</h3>
              <p>Please check back soon for new listings.</p>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Link
              to="/ads"
              className="btn btn-primary"
              style={{
                fontSize: '1.1rem',
                padding: '16px 32px',
              }}
            >
              View All Properties →
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem !important;
          }
          .hero-content {
            padding: 0 16px !important;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;