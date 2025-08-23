function Footer() {
  return (
    <footer style={{ 
      backgroundColor: "#222", 
      color: "white", 
      padding: "20px", 
      textAlign: "center",
      marginTop: "30px"
    }}>
      <p>© {new Date().getFullYear()} Shree Krishna Properties. All rights reserved.</p>
      <p>Contact: 9463255555 | Hargobind Aggarwal</p>
    </footer>
  );
}

export default Footer;
