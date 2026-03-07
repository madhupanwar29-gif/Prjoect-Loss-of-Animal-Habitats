import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

import extinctvid2 from "../assets/extinctvid2.mp4";
import extinctData from "../data/extinctData";
import SlideUpInfo from "../components/SlideUpInfo";
import SpeciesListSidebar from "../components/SpeciesListSidebar";

// ───────────────────────── DATA ───────────────────────── 

const intro = {
  title: "Echoes of the Wild: A Tribute to the Lost",
  subtitle: "The Silent Forest",
  content: `Earth's history is a 4.5-billion-year masterpiece of biological diversity, yet today we stand at a critical turning point. While extinction is a natural part of evolution, the current rate of loss is 1,000 to 10,000 times higher than the natural background rate. From the silent flight of the Passenger Pigeon to the deep-sea mysteries of Steller's Sea Cow, the animals we have lost are not just names in a textbook—they are missing threads in the intricate web of life that supports us all.

Our Mission

This digital archive is dedicated to documenting the world's recently extinct, missing, and rediscovered species. By exploring their stories, we do more than just reminisce; we seek to understand the human-driven causes—from habitat destruction to climate change—that led to their disappearance.

Why It Matters

Every species plays a role in keeping our planet balanced and healthy. To understand the past is to protect the future. We believe that by honoring those that have vanished, we can inspire a new generation to act now to safeguard the millions of species that still have hope to survive and flourish.`,
};

const stats = [
  { number: "99%+", label: "Species gone forever", description: "Of all species that ever lived" },
  { number: "1M+", label: "Species at risk today", description: "Driven by human activity" },
  { number: "68%", label: "Population decline", description: "Since 1970" },
  { number: "365", label: "Species lost per day", description: "Current estimates" },
];

const sections = [
  { 
    id: "mammals",
    title: "Mammals", 
    subtitle: "Warm-blooded giants lost to time",
    bg: "https://images.pexels.com/photos/26689570/pexels-photo-26689570.jpeg",
    species: extinctData.filter(s => s.type === "Mammals") 
  },
  { 
    id: "birds",
    title: "Birds", 
    subtitle: "Songs that will never be heard again",
    bg: "https://images.pexels.com/photos/987947/pexels-photo-987947.jpeg", 
    species: extinctData.filter(s => s.type === "Birds") 
  },
  { 
    id: "reptiles",
    title: "Reptiles", 
    subtitle: "Cold-blooded survivors of a lost era", 
    bg: "https://images.pexels.com/photos/15444977/pexels-photo-15444977.jpeg", 
    species: extinctData.filter(s => s.type === "Reptiles") 
  },
  { 
    id: "amphibian", 
    title: "Amphibian Life", 
    subtitle: "Extinction beneath the waves", 
    bg: "https://images.pexels.com/photos/8919558/pexels-photo-8919558.jpeg", 
    species: extinctData.filter(s => s.type === "Amphibian") 
  },
  { 
    id: "fish", 
    title: "Fish", 
    subtitle: "Ancient swimmers lost forever", 
    bg: "https://images.pexels.com/photos/14264284/pexels-photo-14264284.jpeg", 
    species: extinctData.filter(s => s.type === "Fish") 
  },
  { 
    id: "insects", 
    title: "Insects", 
    subtitle: "Tiny lives with massive impact", 
    bg: "https://images.pexels.com/photos/32934278/pexels-photo-32934278.jpeg", 
    species: extinctData.filter(s => s.type === "Insects") 
  },
];

// ───────────────────── FADE EFFECTS ───────────────────── 

const Fade = ({ direction = "top" }) => {
  if (direction === "top") {
    return (
      <div className="pointer-events-none absolute top-0 inset-x-0 h-40 z-20 bg-gradient-to-b from-slate-950 via-slate-950/60 to-transparent" />
    );
  }
  return (
    <div className="pointer-events-none absolute bottom-0 inset-x-0 h-40 z-20 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
  );
};

const SpeciesCard = ({ item, onClick }) => (
  <div
    onClick={onClick}
    className="relative h-48 cursor-pointer overflow-hidden rounded-xl transition-transform hover:scale-[1.03]"
    role="button"
    tabIndex={0}
    onKeyPress={(e) => e.key === 'Enter' && onClick()}
  >
    <img src={item.image} alt={item.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-black/50" />
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
      <h4 className="font-serif text-stone-100 text-lg">{item.title}</h4>
      <p className="text-sm text-stone-300 mt-1">{item.subtitle}</p>
    </div>
  </div>
);

const StatCard = ({ stat }) => (
  <div className="text-center">
    <div className="text-6xl font-serif text-amber-300 mb-4">{stat.number}</div>
    <h3 className="text-lg font-semibold text-stone-100 mb-1">{stat.label}</h3>
    <p className="text-sm text-stone-400">{stat.description}</p>
  </div>
);

// ───────────────────── MAIN COMPONENT ───────────────────── 

export default function Extinct() {
  const sectionRefs = useRef([]);
  const [activeSpecies, setActiveSpecies] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = sidebarOpen || activeSpecies ? "hidden" : "";
  }, [sidebarOpen, activeSpecies]);

  const openSpecies = (item) => {
    const idx = extinctData.findIndex(s => s.id === item.id);
    setActiveSpecies(item);
    setActiveIndex(idx);
  };

  useEffect(() => {

  const hash = location.hash.replace("#", "");

  if (hash) {

    const found = extinctData.find(a => a.id === hash);

    if (found) {

      setTimeout(() => {
        openSpecies(found);
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 300);

    }

  }

}, [location]);

  return (
    <main className="bg-slate-950 text-stone-200">

      {/* HERO */}
      <section className="relative h-screen overflow-hidden flex items-center">
        <video src={extinctvid2} autoPlay loop muted className="absolute inset-0 object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black/50" />
        <Fade />
        <Fade direction="bottom" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-7xl px-6"
        >
          <p className="uppercase tracking-widest text-sm text-stone-400">Extinction Archive</p>
          <h1 className="mt-4 text-6xl font-serif text-stone-100">Extinct,<br />but remembered</h1>
          <p className="mt-6 text-lg text-stone-300 max-w-2xl">A visual record of species erased from Earth.</p>
          <button
            onClick={() => setSidebarOpen(true)}
            className="mt-8 px-6 py-3 border border-stone-400 text-sm uppercase hover:bg-stone-100 hover:text-black transition"
          >
            Open Species List
          </button>
        </motion.div>
      </section>

      {/* INTRO */}
      <section className="relative py-32">
        <Fade />
        <Fade direction="bottom" />
        
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-serif text-stone-100 mb-2">{intro.title}</h2>
          <h3 className="text-2xl font-serif text-amber-300 mb-10">{intro.subtitle}</h3>
          <p className="max-w-4xl mx-auto text-stone-300 leading-relaxed whitespace-pre-line mb-16">
            {intro.content}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <StatCard key={i} stat={s} />
            ))}
          </div>
        </div>
      </section>

      {/* SPECIES SECTIONS */}
      {sections.map((sec, i) => (
        <section
          key={sec.id}
          ref={el => sectionRefs.current[i] = el}
          className="relative py-40 bg-cover bg-center"
          style={{ backgroundImage: `url(${sec.bg})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <Fade />
          <Fade direction="bottom" />

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-serif text-stone-100">{sec.title}</h2>
              <p className="text-stone-300 mt-2">{sec.subtitle}</p>
              <div className="w-16 h-1 bg-amber-300/50 mx-auto mt-6 rounded" />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
             {sec.species.map(sp => (
  <div id={sp.id} key={sp.id}>
    <SpeciesCard item={sp} onClick={() => openSpecies(sp)} />
  </div>
))}
            </div>
          </div>
        </section>
      ))}

      {/* MODALS */}
      {activeSpecies && (
        <SlideUpInfo species={activeSpecies} onClose={() => setActiveSpecies(null)} />
      )}

      <SpeciesListSidebar
        sections={sections}
        species={extinctData}
        currentIndex={activeIndex}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSpeciesClick={(i) => openSpecies(extinctData[i])}
        onTypeClick={(i) => sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth" })}
      />
    </main>
  );
}