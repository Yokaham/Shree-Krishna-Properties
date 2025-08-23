import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";

const AdDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAd = async () => {
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

        const foundAd = rows.find((item) => String(item.id) === String(id));
        setAd(foundAd || null);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load ad details:", err);
        setLoading(false);
      }
    };

    fetchAd();
  }, [id]);

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)',
    color: 'white',
    padding: '40px 0',
    marginBottom: '40px',
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
  };

  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#2563eb',
    color: 'white',
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#f3f4f6',
    color: '#374151',
  };

  const whatsappButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#25D366',
    color: 'white',
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        flexDirection: 'column',
        gap: '20px',
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '4px solid #e5e7eb',
          borderTop: '4px solid #2563eb',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}></div>
        <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>Loading property details...</p>
      </div>
    );
  }

  if (!ad) {
    return (
      <div style={containerStyle}>
        <div style={{
          textAlign: 'center',
          padding: '80px 20px',
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🏠</div>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '600',
            marginBottom: '12px',
            color: '#374151',
          }}>
            Property Not Found
          </h2>
          <p style={{
            color: '#6b7280',
            marginBottom: '24px',
            fontSize: '1.1rem',
          }}>
            The property you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/ads"
            style={primaryButtonStyle}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#1e40af';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#2563eb';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            ← Browse All Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section style={headerStyle}>
        <div style={containerStyle}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '20px',
            flexWrap: 'wrap',
          }}>
            <div style={{ flex: 1 }}>
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                marginBottom: '12px',
                lineHeight: '1.2',
              }}>
                {ad.title}
              </h1>
              <p style={{
                fontSize: '1.2rem',
                opacity: 0.9,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                📍 {ad.location}
              </p>
            </div>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: '16px 24px',
              borderRadius: '12px',
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '4px',
              }}>
                {ad.price}
              </div>
              <div style={{
                fontSize: '0.9rem',
                opacity: 0.8,
              }}>
                Best Price
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={containerStyle}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '40px',
          alignItems: 'start',
        }}>
          {/* Main Content */}
          <div>
            {/* Image */}
            <div style={cardStyle}>
              <img
                src={ad.imageURL || "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200"}
                alt={ad.title}
                style={{
                  width: '100%',
                  height: '500px',
                  objectFit: 'cover',
                }}
              />
            </div>

            {/* Description */}
            <div style={{
              ...cardStyle,
              marginTop: '30px',
              padding: '40px',
            }}>
              <h2 style={{
                fontSize: '1.8rem',
                fontWeight: '600',
                marginBottom: '20px',
                color: '#1f2937',
              }}>
                Property Description
              </h2>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.8',
                color: '#4b5563',
                marginBottom: '30px',
              }}>
                {ad.description}
              </p>

              {/* Features */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginTop: '30px',
              }}>
                <div style={{
                  padding: '20px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontSize: '2rem',
                    marginBottom: '8px',
                  }}>🏠</div>
                  <div style={{
                    fontWeight: '600',
                    color: '#374151',
                  }}>Premium Location</div>
                </div>
                <div style={{
                  padding: '20px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontSize: '2rem',
                    marginBottom: '8px',
                  }}>✅</div>
                  <div style={{
                    fontWeight: '600',
                    color: '#374151',
                  }}>Ready to Move</div>
                </div>
                <div style={{
                  padding: '20px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontSize: '2rem',
                    marginBottom: '8px',
                  }}>🔒</div>
                  <div style={{
                    fontWeight: '600',
                    color: '#374151',
                  }}>Secure Investment</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Contact Card */}
            <div style={{
              ...cardStyle,
              padding: '30px',
              marginBottom: '30px',
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '20px',
                color: '#1f2937',
                textAlign: 'center',
              }}>
                Interested in this property?
              </h3>
              
              <div style={{
                textAlign: 'center',
                marginBottom: '25px',
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#2563eb',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: 'white',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                }}>
                  SK
                </div>
                <h4 style={{
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  marginBottom: '4px',
                  color: '#1f2937',
                }}>
                  Hargobind Aggarwal
                </h4>
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.9rem',
                }}>
                  Property Consultant
                </p>
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}>
                <a
                  href="tel:9463255555"
                  style={primaryButtonStyle}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#1e40af';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#2563eb';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  📞 Call Now
                </a>
                <a
                  href={`https://wa.me/919463255555?text=${encodeURIComponent(`Hi, I'm interested in: ${ad.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={whatsappButtonStyle}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#128C7E';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#25D366';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>

            {/* Property Info */}
            <div style={{
              ...cardStyle,
              padding: '30px',
            }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '600',
                marginBottom: '20px',
                color: '#1f2937',
              }}>
                Property Information
              </h3>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '12px',
                  borderBottom: '1px solid #e5e7eb',
                }}>
                  <span style={{ color: '#6b7280' }}>Price</span>
                  <span style={{
                    fontWeight: '600',
                    color: '#059669',
                    fontSize: '1.1rem',
                  }}>
                    {ad.price}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '12px',
                  borderBottom: '1px solid #e5e7eb',
                }}>
                  <span style={{ color: '#6b7280' }}>Location</span>
                  <span style={{
                    fontWeight: '500',
                    color: '#374151',
                  }}>
                    {ad.location}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '12px',
                  borderBottom: '1px solid #e5e7eb',
                }}>
                  <span style={{ color: '#6b7280' }}>Listed On</span>
                  <span style={{
                    fontWeight: '500',
                    color: '#374151',
                  }}>
                    {ad.dateAdded}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span style={{ color: '#6b7280' }}>Status</span>
                  <span style={{
                    backgroundColor: '#dcfce7',
                    color: '#166534',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                  }}>
                    Available
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '50px',
          padding: '30px',
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <Link
            to={location.state?.from === "home" ? "/ads" : "/ads"}
            style={secondaryButtonStyle}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#e5e7eb';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#f3f4f6';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            ← {location.state?.from === "home" ? "More Properties" : "Back to Properties"}
          </Link>
          
          <Link
            to="/"
            style={primaryButtonStyle}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#1e40af';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#2563eb';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            🏠 Back to Home
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .property-grid {
            grid-template-columns: 1fr !important;
          }
          .property-header {
            flex-direction: column !important;
            text-align: center !important;
          }
          .navigation-buttons {
            flex-direction: column !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdDetails;