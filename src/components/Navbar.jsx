import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ── Navbar visibility bus (used by pages with custom scroll divs) ──
let _visListeners = [];
export function setNavbarVisible(v) { _visListeners.forEach(fn => fn(v)); }
function subscribeNavbar(fn) {
  _visListeners.push(fn);
  return () => { _visListeners = _visListeners.filter(l => l !== fn); };
}

// ── Scroll progress bus (pushed by pages like Threats that own their scroll div) ──
let _progressListeners = [];
export function setNavbarProgress(p) { _progressListeners.forEach(fn => fn(p)); }
function subscribeProgress(fn) {
  _progressListeners.push(fn);
  return () => { _progressListeners = _progressListeners.filter(l => l !== fn); };
}

// Each page link has its own accent colour
const NAV_LINKS = [
  { label: "Home",         path: "/home",         color: "#c9a84c", glow: "rgba(201,168,76,0.35)"  },
  { label: "Extinct",      path: "/extinct",      color: "#b5895a", glow: "rgba(181,137,90,0.35)"  },
  { label: "Endangered",   path: "/endangered",   color: "#e8d87f", glow: "rgba(232,216,127,0.35)" },
  { label: "Threats",      path: "/threats",      color: "#a3c46a", glow: "rgba(163,196,106,0.35)" },
  { label: "Conservation", path: "/conservation", color: "#5bbfb5", glow: "rgba(91,191,181,0.35)"  },
];


export default function Navbar() {

  const [scrolled, setScrolled] = useState(false);
  const [visible,  setVisible]  = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered,  setHovered]  = useState(null);
  const [progress, setProgress] = useState(0);

  const lastY   = useRef(0);
  const ticking = useRef(false);
  const location = useLocation();

  // Reset everything on route change
  useEffect(() => {
    lastY.current = 0;
    setScrolled(false);
    setVisible(true);
    setMenuOpen(false);
  }, [location.pathname]);

  // Window scroll — handles progress bar AND show/hide
  useEffect(() => {
    const onScroll = () => {
      // update progress
      const el  = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      if (max > 0) setProgress(window.scrollY / max);

      // show/hide (debounced via rAF)
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const y     = window.scrollY;
        const delta = y - lastY.current;

        setScrolled(y > 30);

        if (y < 80)          setVisible(true);
        else if (delta > 5)  { setVisible(false); setMenuOpen(false); }
        else if (delta < -5) setVisible(true);

        lastY.current   = y;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Accept progress from pages that have their own scroll container
  useEffect(() => subscribeProgress(p => setProgress(p)), []);

  // Accept show/hide commands from other components
  useEffect(() => subscribeNavbar(v => {
    setVisible(v);
    if (!v) setMenuOpen(false);
  }), []);


  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;800&family=Cormorant+Garamond:ital,wght@0,300;1,300&display=swap');
      `}</style>

      <motion.nav
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: visible ? 0 : -115, opacity: 1 }}
        transition={
          visible
            ? { type: "spring", stiffness: 340, damping: 28, mass: 0.9 }
            : { duration: 0.28, ease: [0.4, 0, 0.6, 1] }
        }
        className={[
          "fixed top-0 left-0 right-0 z-[200] backdrop-blur-2xl",
          "transition-[background,box-shadow,border-color] duration-300",
          scrolled
            ? "bg-[rgba(4,9,4,0.94)] border-b border-[rgba(201,168,76,0.2)] shadow-[0_6px_40px_rgba(0,0,0,0.6)]"
            : "bg-[rgba(4,9,4,0.45)] border-b border-white/5",
        ].join(" ")}
      >

        {/* Gold top accent line */}
        <div
          className={`absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300 ${scrolled ? "opacity-90" : "opacity-40"}`}
          style={{ background: "linear-gradient(90deg, #c9a84c, #e8d87f, #8fad58)" }}
        />

        <div className="max-w-[1360px] mx-auto px-8 h-[70px] flex items-center justify-between gap-6">

          {/* ── Logo ─────────────────────────────────────────── */}
          <NavLink to="/home" className="flex items-center gap-3 shrink-0 no-underline">

            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-base shrink-0"
              style={{
                background: "rgba(163,196,106,0.12)",
                border: "1px solid rgba(163,196,106,0.22)",
              }}
            >
              🌿
            </div>

            <div className="leading-none">
              <p
                className="m-0 text-[13px] tracking-[0.22em] font-extrabold"
                style={{
                  fontFamily: "'Cinzel', Georgia, serif",
                  background: "linear-gradient(90deg, #c9a84c, #e8d87f, #8fad58)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Loss of Animal Habitat
              </p>
              <p
                className="m-0 mt-1 text-[10px] tracking-[0.14em]"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontStyle: "italic",
                  color: "rgba(175,210,135,0.45)",
                }}
              >
                Wildlife Awareness
              </p>
            </div>

          </NavLink>

          {/* ── Desktop links ─────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => {
              const isActive  = location.pathname === link.path;
              const isHovered = hovered === link.path;
              const lit       = isActive || isHovered;

              return (
                <div
                  key={link.path}
                  className="relative flex flex-col items-center"
                  onMouseEnter={() => setHovered(link.path)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Animated pill background */}
                  <motion.div
                    className="absolute inset-x-0.5 rounded-[9px] pointer-events-none border"
                    style={{ top: 3, bottom: 6 }}
                    animate={{
                      opacity:     lit ? 1 : 0,
                      y:           lit ? -4 : 3,
                      scaleX:      lit ? 1 : 0.78,
                      scaleY:      lit ? 1 : 0.85,
                      background:  lit ? `linear-gradient(175deg, ${link.color}28 0%, ${link.color}10 100%)` : "transparent",
                      borderColor: lit ? `${link.color}44` : "transparent",
                      boxShadow:   lit ? `0 0 18px 4px ${link.glow}, 0 6px 0 rgba(0,0,0,0.5)` : "none",
                    }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  />

                  <NavLink to={link.path} className="relative z-10 no-underline px-4 pb-3 pt-2.5">
                    <motion.span
                      className="block text-[11px] font-bold tracking-[0.22em] uppercase"
                      style={{ fontFamily: "'Cinzel', Georgia, serif" }}
                      animate={{
                        y:          lit ? -4 : 0,
                        color:      lit ? link.color : "rgba(196,187,166,0.55)",
                        textShadow: lit
                          ? `0 0 10px ${link.glow}, 0 0 26px ${link.color}55`
                          : "none",
                      }}
                      transition={{ duration: 0.22 }}
                    >
                      {link.label}
                    </motion.span>
                  </NavLink>

                  {/* Glowing underline dot */}
                  <motion.div
                    className="absolute bottom-0.5 h-[2px] rounded-full pointer-events-none"
                    animate={{
                      opacity:   lit ? 1 : 0,
                      scaleX:    lit ? 1 : 0.15,
                      y:         lit ? (isActive ? -3 : -4) : 0,
                      width:     isActive ? 22 : 18,
                      boxShadow: `0 0 8px 2px ${link.glow}, 0 0 20px 4px ${link.color}44`,
                    }}
                    transition={{ duration: 0.28 }}
                    style={{
                      background: `linear-gradient(90deg, ${link.color}aa, ${link.color}, ${link.color}aa)`,
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* ── Mobile hamburger ──────────────────────────────── */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle navigation"
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg cursor-pointer transition-colors duration-200"
            style={{
              border: "1px solid rgba(201,168,76,0.28)",
              background: menuOpen ? "rgba(201,168,76,0.1)" : "transparent",
              color: "#c9a84c",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6"  y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                : <><line x1="3"  y1="7" x2="21" y2="7"  /><line x1="8" y1="12" x2="21" y2="12" /><line x1="13" y1="17" x2="21" y2="17" /></>
              }
            </svg>
          </button>

        </div>

        {/* ── Mobile drawer ─────────────────────────────────── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-[rgba(201,168,76,0.12)] md:hidden"
              style={{ background: "rgba(3,7,3,0.98)" }}
            >
              <div className="px-3.5 pt-3 pb-5">
                <p
                  className="m-0 px-[18px] pt-1 pb-2 text-[11px] tracking-[0.14em]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    color: "rgba(201,168,76,0.3)",
                  }}
                >
                  Navigate
                </p>

                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ x: -16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.055, ease: "easeOut" }}
                  >
                    <NavLink
                      to={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) => [
                        "block text-[12px] font-bold tracking-[0.25em] uppercase no-underline",
                        "px-[18px] py-[13px] rounded-[10px] border-l-2 transition-all duration-200",
                        isActive
                          ? "bg-[rgba(201,168,76,0.08)] border-l-[#c9a84c]"
                          : "border-l-transparent hover:bg-[rgba(201,168,76,0.05)]",
                      ].join(" ")}
                      style={({ isActive }) => ({
                        fontFamily: "'Cinzel', Georgia, serif",
                        color: isActive ? link.color : "rgba(196,187,166,0.65)",
                      })}
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.nav>
    </>
  );
}