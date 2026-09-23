import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TechNews from "./pages/TechNews";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tech-news" element={<TechNews />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
