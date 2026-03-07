import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Extinct from "./pages/extinct.jsx";
import Endangered from "./pages/Endangered.jsx";
import Threats from "./pages/Threats.jsx";
import Conservation from "./pages/Conservation.jsx";
import Landing from "./pages/Landingpage.jsx";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"; 
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const showNavbar = location.pathname !== "/";

  // Scroll to top on every navigation, including revisits
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.key]); // ← add this

  useEffect(() => {
    if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD) {
      navigate("/");
    } else if (location.pathname !== "/" && !["/extinct", "/endangered", "/threats", "/conservation", "/home"].includes(location.pathname)) {
      navigate("/");
    }
  }, []);

  return (
    <>
      {showNavbar && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/extinct" element={<Extinct />} />
          <Route path="/endangered" element={<Endangered />} />
          <Route path="/threats" element={<Threats />} />
          <Route path="/conservation" element={<Conservation />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;