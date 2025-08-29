import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 text-white font-bold text-lg sm:text-xl">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 font-bold text-sm sm:text-base">
              SK
            </div>
            <span className="hidden sm:inline">Shree Krishna Properties</span>
            <span className="sm:hidden">SK Properties</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <Link 
                to="/" 
                className={`text-white font-medium px-4 py-2 rounded-xl transition-all duration-200 ease-in-out hover:bg-white hover:bg-opacity-20 ${
                  location.pathname === '/' ? 'bg-white bg-opacity-20' : ''
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/ads" 
                className={`text-white font-medium px-4 py-2 rounded-xl transition-all duration-200 ease-in-out hover:bg-white hover:bg-opacity-20 ${
                  location.pathname === '/ads' ? 'bg-white bg-opacity-20' : ''
                }`}
              >
                Properties
              </Link>
            </li>
            <li>
              <a 
                href="tel:9463255555" 
                className="bg-white text-blue-600 px-6 py-2 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-200 ease-in-out transform hover:scale-105 shadow-md"
              >
                📞 9463255555
              </a>
            </li>
          </ul>

          {/* Mobile Hamburger */}
          <button 
            className="md:hidden flex flex-col gap-1 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="py-4 space-y-2">
            <Link 
              to="/" 
              className={`block text-white font-medium px-4 py-3 rounded-xl transition-all duration-200 ease-in-out hover:bg-white hover:bg-opacity-20 ${
                location.pathname === '/' ? 'bg-white bg-opacity-20' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/ads" 
              className={`block text-white font-medium px-4 py-3 rounded-xl transition-all duration-200 ease-in-out hover:bg-white hover:bg-opacity-20 ${
                location.pathname === '/ads' ? 'bg-white bg-opacity-20' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Properties
            </Link>
            <a 
              href="tel:9463255555" 
              className="block bg-white text-blue-600 px-4 py-3 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-200 ease-in-out text-center mx-4 mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              📞 9463255555
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;