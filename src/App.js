import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Ads from "./pages/Ads";
import AdDetails from "./pages/AdDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactButton from "./components/ContactButton";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ads" element={<Ads />} />
        <Route path="/ads/:id" element={<AdDetails />} />
      </Routes>
      <Footer />
      <ContactButton />
    </Router>
  );
}

export default App;
