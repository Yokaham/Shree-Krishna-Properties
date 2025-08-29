import React from 'react';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-700 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                SK
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Shree Krishna Properties</h3>
                <p className="text-gray-300 text-sm">Your Trusted Property Partner</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Specializing in premium properties across Chandigarh, Mohali, and Panchkula. 
              We help you find your dream property with professional guidance and expertise.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="space-y-3">
              <a 
                href="/" 
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200"
              >
                <span>🏠</span>
                <span>Home</span>
              </a>
              <a 
                href="/ads" 
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200"
              >
                <span>🏢</span>
                <span>All Properties</span>
              </a>
              <a 
                href="tel:9463255555" 
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200"
              >
                <span>📞</span>
                <span>Contact Us</span>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-300">
                <span>👤</span>
                <span>Hargobind Aggarwal</span>
              </div>
              <a 
                href="tel:9463255555" 
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200"
              >
                <span>📱</span>
                <span>+91 9463255555</span>
              </a>
              <div className="flex items-center gap-2 text-gray-300">
                <span>📍</span>
                <span>Chandigarh, Mohali, Panchkula</span>
              </div>
              <a 
                href="https://wa.me/919463255555" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-2xl font-semibold hover:bg-green-600 transition-all duration-200 ease-in-out transform hover:scale-105 shadow-md mt-4"
              >
                <span>💬</span>
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-8 text-center">
          <p className="text-gray-300">© {new Date().getFullYear()} Shree Krishna Properties. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-2">
            Designed with ❤️ for premium property solutions
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;