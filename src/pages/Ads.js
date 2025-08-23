import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Ads() {
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");

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

        setAds(rows.filter(ad => ad.id && ad.title));
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch ads:", err);
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  // Filter ads
  const filteredAds = ads.filter((ad) => {
    const matchesSearch = ad.title.toLowerCase().includes(search.toLowerCase()) ||
                         ad.location.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = locationFilter === "all" || 
                           ad.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    let matchesPrice = true;
    if (priceFilter !== "all") {
      const priceValue = parseFloat(ad.price.replace(/[^\d.]/g, ''));
      switch (priceFilter) {
        case "under-50":
          matchesPrice = priceValue < 50;
          break;
        case "50-100":
          matchesPrice = priceValue >= 50 && priceValue <= 100;
          break;
        case "100-200":
          matchesPrice = priceValue >= 100 && priceValue <= 200;
          break;
        case "above-200":
          matchesPrice = priceValue > 200;
          break;
        default:
          matchesPrice = true;
      }
    }
    
    return matchesSearch && matchesLocation && matchesPrice;
  });

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)',
    color: 'white',
    padding: '60px 0',
    marginBottom: '40px',
  };

  const filterSectionStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    marginBottom: '40px',
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    height: '100%',
    display: 'flex',
    flexDirection: viewMode === 'list' ? 'row' : 'column',
  };

  const listCardStyle = {
    ...cardStyle,
    flexDirection: 'row',
    alignItems: 'center',
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
        <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>Loading properties...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      <section style={headerStyle}>
        <div style={containerStyle}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
          }}>
            <div>
              <h1 style={{
                fontSize: '3rem',
                fontWeight: '700',
                marginBottom: '12px',
              }}>
                All Properties
              </h1>
              <p style={{
                fontSize: '1.2rem',
                opacity: 0.9,
              }}>
                Discover {ads.length} premium properties across Chandigarh, Mohali & Panchkula
              </p>
            </div>
            <Link
              to="/"
              className="btn"
              style={{
                backgroundColor: 'white',
                color: '#2563eb',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>

      <div style={containerStyle}>
        {/* Filter Section */}
        <div style={filterSectionStyle}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '20px',
          }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#374151',
              }}>
                🔍 Search Properties
              </label>
              <input
                type="text"
                placeholder="Search by title or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#374151',
              }}>
                📍 Location
              </label>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: 'white',
                }}
              >
                <option value="all">All Locations</option>
                <option value="chandigarh">Chandigarh</option>
                <option value="mohali">Mohali</option>
                <option value="panchkula">Panchkula</option>
                <option value="sector">Sector Areas</option>
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#374151',
              }}>
                💰 Price Range (Lakhs)
              </label>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: 'white',
                }}
              >
                <option value="all">All Prices</option>
                <option value="under-50">Under ₹50L</option>
                <option value="50-100">₹50L - ₹1Cr</option>
                <option value="100-200">₹1Cr - ₹2Cr</option>
                <option value="above-200">Above ₹2Cr</option>
              </select>
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '20px',
            borderTop: '1px solid #e5e7eb',
          }}>
            <p style={{
              color: '#6b7280',
              margin: 0,
            }}>
              Showing {filteredAds.length} of {ads.length} properties
            </p>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '6px',
                  backgroundColor: viewMode === 'grid' ? '#2563eb' : '#f3f4f6',
                  color: viewMode === 'grid' ? 'white' : '#6b7280',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                ⊞ Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '6px',
                  backgroundColor: viewMode === 'list' ? '#2563eb' : '#f3f4f6',
                  color: viewMode === 'list' ? 'white' : '#6b7280',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                ☰ List
              </button>
            </div>
          </div>
        </div>

        {/* Properties Grid/List */}
        {filteredAds.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: viewMode === 'grid' 
              ? 'repeat(auto-fit, minmax(350px, 1fr))' 
              : '1fr',
            gap: '24px',
          }}>
            {filteredAds.map((ad) => (
              <div
                key={ad.id}
                style={viewMode === 'list' ? listCardStyle : cardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{
                  position: 'relative',
                  overflow: 'hidden',
                  width: viewMode === 'list' ? '300px' : '100%',
                  flexShrink: 0,
                }}>
                  <img
                    src={ad.image || "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600"}
                    alt={ad.title}
                    style={{
                      width: '100%',
                      height: viewMode === 'list' ? '200px' : '250px',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: '#059669',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                  }}>
                    Available
                  </div>
                </div>

                <div style={{
                  padding: '24px',
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}>
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
                    {ad.description?.substring(0, viewMode === 'list' ? 150 : 100)}
                    {ad.description?.length > (viewMode === 'list' ? 150 : 100) && '...'}
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
                      state={{ from: "ads" }}
                      className="btn btn-primary"
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#2563eb',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '8px',
                        fontWeight: '500',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#1e40af';
                        e.target.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#2563eb';
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '20px',
            }}>🔍</div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '12px',
              color: '#374151',
            }}>
              No properties found
            </h3>
            <p style={{
              color: '#6b7280',
              marginBottom: '24px',
            }}>
              Try adjusting your search criteria or filters to find more properties.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setLocationFilter('all');
                setPriceFilter('all');
              }}
              className="btn btn-primary"
              style={{
                backgroundColor: '#2563eb',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .list-card {
            flex-direction: column !important;
          }
          .list-card img {
            width: 100% !important;
            height: 250px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Ads;