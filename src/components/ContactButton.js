import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import Button from './Button';

function ContactButton() {
  const [isHovered, setIsHovered] = useState(false);

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      "Hello! I'm interested in your property services. Could you please provide more information?"
    );
    window.open(`https://wa.me/919463255555?text=${message}`, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        variant="success"
        size="icon"
        onClick={openWhatsApp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-14 h-14 sm:w-16 sm:h-16 shadow-lg hover:shadow-xl"
      >
        {/* Tooltip */}
        <div className={`absolute right-full mr-3 bg-gray-800 text-white px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
          isHovered ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-2'
        }`}>
          Chat with us on WhatsApp
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-800 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
        </div>
        
        {/* WhatsApp Icon */}
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8" />
      </Button>
    </div>
  );
}

export default ContactButton;