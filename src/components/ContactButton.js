function ContactButton() {
  const buttonStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#25D366", // WhatsApp green
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hello, I’m interested in a property from Shree Krishna Properties.");
    window.open(`https://wa.me/919463255555?text=${message}`, "_blank");
  };

  return (
    <button style={buttonStyle} onClick={openWhatsApp}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        style={{ width: "30px", height: "30px" }}
      />
    </button>
  );
}

export default ContactButton;
