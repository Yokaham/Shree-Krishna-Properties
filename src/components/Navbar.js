import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Plus } from 'lucide-react';
import Button from './Button';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 rounded-b-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 text-gray-800 font-bold text-lg sm:text-xl">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-base">
              SK
            </div>
            <span className="hidden lg:inline">Shree Krishna Properties</span>
            <span className="lg:hidden">SK Properties</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-6">
              <li>
                <Link 
                  to="/" 
                  className={`text-gray-700 font-medium px-4 py-2 rounded-2xl transition-all duration-200 ease-in-out hover:text-blue-600 hover:bg-blue-50 ${
                    location.pathname === '/' ? 'text-blue-600 bg-blue-50' : ''
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/ads" 
                  className={`text-gray-700 font-medium px-4 py-2 rounded-2xl transition-all duration-200 ease-in-out hover:text-blue-600 hover:bg-blue-50 ${
                    location.pathname === '/ads' ? 'text-blue-600 bg-blue-50' : ''
                  }`}
                >
                  Properties
                </Link>
              </li>
            </ul>
            <Button
              variant="primary"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => {/* Future expansion */}}
            >
              Post Ad
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100 pb-4' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="space-y-2">
            <li>
              <Link 
                to="/" 
                className={`block text-gray-700 font-medium px-4 py-3 rounded-2xl transition-all duration-200 ease-in-out hover:text-blue-600 hover:bg-blue-50 ${
                  location.pathname === '/' ? 'text-blue-600 bg-blue-50' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/ads" 
                className={`block text-gray-700 font-medium px-4 py-3 rounded-2xl transition-all duration-200 ease-in-out hover:text-blue-600 hover:bg-blue-50 ${
                  location.pathname === '/ads' ? 'text-blue-600 bg-blue-50' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Properties
              </Link>
            </li>
            <div className="mt-4">
              <Button
                variant="primary"
                icon={<Plus className="w-4 h-4" />}
                onClick={() => setIsMenuOpen(false)}
                className="w-full"
              >
                Post Ad
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;