import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Business Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                SK
              </div>
              <div>
                <h3 className="text-white font-bold text-xl">Shree Krishna Properties</h3>
                <p className="text-gray-400 text-sm">Your Trusted Property Partner</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Specializing in premium properties across Chandigarh, Mohali, and Panchkula.
            </p>
            <div className="space-y-2">
              <Link 
                to="/" 
                className="inline-block text-gray-300 hover:text-white transition-colors duration-200 mr-6"
              >
                Home
              </Link>
              <Link 
                to="/ads" 
                className="inline-block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Properties
              </Link>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Information</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="font-medium">Hargobind Aggarwal</p>
                  <a 
                    href="tel:9463255555" 
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  >
                    +91 9463255555
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span>Chandigarh, Mohali, Panchkula</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>info@shreekrishnaproperties.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Shree Krishna Properties. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;