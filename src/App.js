import "./App.css";
import Home from "./Home";
import Events from "./Events";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./Aboutus";
import Team from "./Team";
import Join from "./Join";
import NotFound from "./NotFound";
import ScrollToTop from "./ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/Team" element={<Team />} />
          <Route path="/About" element={<About />} />
          <Route path="/Join" element={<Join />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
