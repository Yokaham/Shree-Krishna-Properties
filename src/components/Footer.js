import React from 'react';

function Footer() {
  const footerStyle = {
    background: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
    color: 'white',
    marginTop: '60px',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '60px 20px 30px',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    marginBottom: '40px',
  };

  const sectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#dbeafe',
  };

  const linkStyle = {
    color: '#d1d5db',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const bottomStyle = {
    borderTop: '1px solid #4b5563',
    paddingTop: '30px',
    textAlign: 'center',
    color: '#9ca3af',
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  };

  const iconBoxStyle = {
    width: '50px',
    height: '50px',
    backgroundColor: '#2563eb',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.2rem',
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={gridStyle}>
          {/* Company Info */}
          <div style={sectionStyle}>
            <div style={logoStyle}>
              <div style={iconBoxStyle}>SK</div>
              <div>
                <h3 style={{color: 'white', margin: 0}}>Shree Krishna Properties</h3>
                <p style={{color: '#9ca3af', margin: 0, fontSize: '0.9rem'}}>Your Trusted Property Partner</p>
              </div>
            </div>
            <p style={{color: '#d1d5db', lineHeight: '1.6'}}>
              Specializing in premium properties across Chandigarh, Mohali, and Panchkula. 
              We help you find your dream property with professional guidance and expertise.
            </p>
          </div>

          {/* Quick Links */}
          <div style={sectionStyle}>
            <h4 style={titleStyle}>Quick Links</h4>
            <a 
              href="/" 
              style={linkStyle}
              onMouseEnter={(e) => e.target.style.color = '#dbeafe'}
              onMouseLeave={(e) => e.target.style.color = '#d1d5db'}
            >
              🏠 Home
            </a>
            <a 
              href="/ads" 
              style={linkStyle}
              onMouseEnter={(e) => e.target.style.color = '#dbeafe'}
              onMouseLeave={(e) => e.target.style.color = '#d1d5db'}
            >
              🏢 All Properties
            </a>
            <a 
              href="tel:9463255555" 
              style={linkStyle}
              onMouseEnter={(e) => e.target.style.color = '#dbeafe'}
              onMouseLeave={(e) => e.target.style.color = '#d1d5db'}
            >
              📞 Contact Us
            </a>
          </div>

          {/* Contact Info */}
          <div style={sectionStyle}>
            <h4 style={titleStyle}>Contact Information</h4>
            <div style={{...linkStyle, cursor: 'default'}}>
              <span>👤</span>
              <span>Hargobind Aggarwal</span>
            </div>
            <a 
              href="tel:9463255555" 
              style={linkStyle}
              onMouseEnter={(e) => e.target.style.color = '#dbeafe'}
              onMouseLeave={(e) => e.target.style.color = '#d1d5db'}
            >
              📱 +91 9463255555
            </a>
            <div style={{...linkStyle, cursor: 'default'}}>
              <span>📍</span>
              <span>Chandigarh, Mohali, Panchkula</span>
            </div>
            <a 
              href="https://wa.me/919463255555" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                ...linkStyle,
                backgroundColor: '#25D366',
                padding: '10px 16px',
                borderRadius: '8px',
                marginTop: '8px',
                justifyContent: 'center',
                fontWeight: '500',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#128C7E';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#25D366';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              💬 WhatsApp Us
            </a>
          </div>

          {/* Services */}
          <div style={sectionStyle}>
            <h4 style={titleStyle}>Our Services</h4>
            <div style={{...linkStyle, cursor: 'default'}}>
              <span>🏘️</span>
              <span>Residential Properties</span>
            </div>
            <div style={{...linkStyle, cursor: 'default'}}>
              <span>🏢</span>
              <span>Commercial Spaces</span>
            </div>
            <div style={{...linkStyle, cursor: 'default'}}>
              <span>🏗️</span>
              <span>Plot & Land Deals</span>
            </div>
            <div style={{...linkStyle, cursor: 'default'}}>
              <span>💼</span>
              <span>Investment Consultation</span>
            </div>
          </div>
        </div>

        <div style={bottomStyle}>
          <p>© {new Date().getFullYear()} Shree Krishna Properties. All rights reserved.</p>
          <p style={{marginTop: '8px', fontSize: '0.9rem'}}>
            Designed with ❤️ for premium property solutions
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;