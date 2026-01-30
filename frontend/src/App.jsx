
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Travel from "./pages/Travel";
import Food from "./pages/Food";
import Nature from "./pages/Nature";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/food" element={<Food />} />
        <Route path="/nature" element={<Nature />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
