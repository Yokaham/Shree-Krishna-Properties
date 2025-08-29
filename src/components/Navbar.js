import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import Button from './Button';

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
                className={`text-white font-medium px-4 py-2 rounded-2xl transition-all duration-200 ease-in-out hover:bg-white hover:bg-opacity-20 ${
                  location.pathname === '/' ? 'bg-white bg-opacity-20' : ''
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/ads" 
                className={`text-white font-medium px-4 py-2 rounded-2xl transition-all duration-200 ease-in-out hover:bg-white hover:bg-opacity-20 ${
                  location.pathname === '/ads' ? 'bg-white bg-opacity-20' : ''
                }`}
              >
                Properties
              </Link>
            </li>
            <li>
              <Button
                variant="secondary"
                icon={<Phone className="w-4 h-4" />}
                onClick={() => window.open("tel:9463255555")}
                className="bg-white text-blue-600 hover:bg-gray-50"
              >
                9463255555
              </Button>
            </li>
          </ul>

          {/* Mobile Hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="py-4 space-y-2">
            <Link 
              to="/" 
              className={`block text-white font-medium px-4 py-3 rounded-2xl transition-all duration-200 ease-in-out hover:bg-white hover:bg-opacity-20 ${
                location.pathname === '/' ? 'bg-white bg-opacity-20' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/ads" 
              className={`block text-white font-medium px-4 py-3 rounded-2xl transition-all duration-200 ease-in-out hover:bg-white hover:bg-opacity-20 ${
                location.pathname === '/ads' ? 'bg-white bg-opacity-20' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Properties
            </Link>
            <div className="mx-4 mt-4">
              <Button
                variant="secondary"
                icon={<Phone className="w-4 h-4" />}
                onClick={() => window.open("tel:9463255555")}
                className="w-full bg-white text-blue-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
              >
                9463255555
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;