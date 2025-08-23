import React, { useState } from 'react';

function ContactButton() {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    backgroundColor: '#25D366',
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 8px 25px rgba(37, 211, 102, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 1000,
    transform: isHovered ? 'scale(1.1) translateY(-5px)' : 'scale(1)',
    animation: 'pulse 2s infinite',
  };

  const iconStyle = {
    width: '35px',
    height: '35px',
    filter: 'brightness(0) invert(1)',
  };

  const tooltipStyle = {
    position: 'absolute',
    right: '80px',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: '#1f2937',
    color: 'white',
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    opacity: isHovered ? 1 : 0,
    visibility: isHovered ? 'visible' : 'hidden',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  };

  const arrowStyle = {
    position: 'absolute',
    left: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    width: 0,
    height: 0,
    borderTop: '6px solid transparent',
    borderBottom: '6px solid transparent',
    borderLeft: '6px solid #1f2937',
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      "Hello! I'm interested in your property services. Could you please provide more information?"
    );
    window.open(`https://wa.me/919463255555?text=${message}`, "_blank");
  };

  return (
    <>
      <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 8px 25px rgba(37, 211, 102, 0.3);
          }
          50% {
            box-shadow: 0 8px 25px rgba(37, 211, 102, 0.5), 0 0 0 10px rgba(37, 211, 102, 0.1);
          }
          100% {
            box-shadow: 0 8px 25px rgba(37, 211, 102, 0.3);
          }
        }

        @media (max-width: 768px) {
          .whatsapp-button {
            bottom: 20px !important;
            right: 20px !important;
            width: 60px !important;
            height: 60px !important;
          }
          .whatsapp-icon {
            width: 30px !important;
            height: 30px !important;
          }
          .whatsapp-tooltip {
            display: none !important;
          }
        }
      `}</style>
      
      <button
        className="whatsapp-button"
        style={buttonStyle}
        onClick={openWhatsApp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Contact us on WhatsApp"
      >
        <div className="whatsapp-tooltip" style={tooltipStyle}>
          Chat with us on WhatsApp
          <div style={arrowStyle}></div>
        </div>
        <img
          className="whatsapp-icon"
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          style={iconStyle}
        />
      </button>
    </>
  );
}

export default ContactButton;