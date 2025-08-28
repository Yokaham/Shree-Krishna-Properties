import React, { useState } from 'react';

function ContactButton() {
  const [isHovered, setIsHovered] = useState(false);

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      "Hello! I'm interested in your property services. Could you please provide more information?"
    );
    window.open(`https://wa.me/919463255555?text=${message}`, "_blank");
  };

  return (
    <button
      className={`whatsapp-button ${isHovered ? 'whatsapp-button-hovered' : ''}`}
      onClick={openWhatsApp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Contact us on WhatsApp"
    >
      <div className={`whatsapp-tooltip ${isHovered ? 'whatsapp-tooltip-visible' : ''}`}>
        Chat with us on WhatsApp
        <div className="whatsapp-tooltip-arrow"></div>
      </div>
      <img
        className="whatsapp-icon"
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
      />
    </button>
  );
}

export default ContactButton;