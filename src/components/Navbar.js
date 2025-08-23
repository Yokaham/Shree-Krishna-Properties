import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navStyle = {
    background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '80px',
  };

  const logoStyle = {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: '700',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const navLinksStyle = {
    display: 'flex',
    gap: '32px',
    alignItems: 'center',
    listStyle: 'none',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
    padding: '8px 16px',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
    position: 'relative',
  };

  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
  };

  const contactStyle = {
    backgroundColor: 'white',
    color: '#2563eb',
    padding: '10px 20px',
    borderRadius: '8px',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const mobileMenuStyle = {
    display: isMenuOpen ? 'flex' : 'none',
    flexDirection: 'column',
    position: 'absolute',
    top: '80px',
    left: 0,
    right: 0,
    backgroundColor: '#1e40af',
    padding: '20px',
    gap: '16px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  };

  const hamburgerStyle = {
    display: 'none',
    flexDirection: 'column',
    cursor: 'pointer',
    gap: '4px',
  };

  const hamburgerLineStyle = {
    width: '25px',
    height: '3px',
    backgroundColor: 'white',
    borderRadius: '2px',
    transition: 'all 0.3s ease',
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <Link to="/" style={logoStyle}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: 'white',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#2563eb',
            fontWeight: 'bold',
            fontSize: '1.2rem'
          }}>
            SK
          </div>
          Shree Krishna Properties
        </Link>

        {/* Desktop Navigation */}
        <ul style={{...navLinksStyle, '@media (max-width: 768px)': { display: 'none' }}}>
          <li>
            <Link 
              to="/" 
              style={location.pathname === '/' ? activeLinkStyle : linkStyle}
              onMouseEnter={(e) => {
                if (location.pathname !== '/') {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== '/') {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/ads" 
              style={location.pathname === '/ads' ? activeLinkStyle : linkStyle}
              onMouseEnter={(e) => {
                if (location.pathname !== '/ads') {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== '/ads') {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              Properties
            </Link>
          </li>
          <li>
            <a 
              href="tel:9463255555" 
              style={contactStyle}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
              }}
            >
              📞 9463255555
            </a>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <div 
          style={{
            ...hamburgerStyle,
            '@media (max-width: 768px)': { display: 'flex' }
          }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div style={hamburgerLineStyle}></div>
          <div style={hamburgerLineStyle}></div>
          <div style={hamburgerLineStyle}></div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div style={mobileMenuStyle}>
        <Link to="/" style={linkStyle} onClick={() => setIsMenuOpen(false)}>
          Home
        </Link>
        <Link to="/ads" style={linkStyle} onClick={() => setIsMenuOpen(false)}>
          Properties
        </Link>
        <a href="tel:9463255555" style={{...contactStyle, textAlign: 'center'}}>
          📞 9463255555
        </a>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-hamburger {
            display: flex !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-hamburger {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;