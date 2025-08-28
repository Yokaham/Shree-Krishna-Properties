import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-icon">
            SK
          </div>
          Shree Krishna Properties
        </Link>

        {/* Desktop Navigation */}
        <ul className="navbar-links desktop-nav">
          <li>
            <Link 
              to="/" 
              className={`navbar-link ${location.pathname === '/' ? 'navbar-link-active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/ads" 
              className={`navbar-link ${location.pathname === '/ads' ? 'navbar-link-active' : ''}`}
            >
              Properties
            </Link>
          </li>
          <li>
            <a 
              href="tel:9463255555" 
              className="navbar-contact"
            >
              📞 9463255555
            </a>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <div 
          className="mobile-hamburger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'mobile-menu-open' : ''}`}>
        <Link to="/" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
          Home
        </Link>
        <Link to="/ads" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
          Properties
        </Link>
        <a href="tel:9463255555" className="navbar-contact mobile-contact">
          📞 9463255555
        </a>
      </div>
    </nav>
  );
}

export default Navbar;