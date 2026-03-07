import { useState, useEffect, useRef } from "react";
import threatsData from "../data/threatsData";

const STATS = [
  { value: "1M+", label: "Species at Risk", sub: "of extinction right now", icon: "🐾" },
  { value: "10B+", label: "Animals Killed", sub: "every year by humans", icon: "💀" },
  { value: "68%", label: "Wildlife Decline", sub: "since 1970 — in one lifetime", icon: "📉" },
  { value: "80%", label: "Habitat Destroyed", sub: "of Earth's forests are gone", icon: "🌲" },
  { value: "3.6M ha", label: "Forest Lost", sub: "every single year", icon: "🪓" },
  { value: "$23B", label: "Illegal Trade", sub: "in wildlife annually", icon: "🦏" },
  { value: "8M tons", label: "Plastic Dumped", sub: "into oceans every year", icon: "🌊" },
  { value: "1 in 6", label: "Species Risk", sub: "threatened by climate change", icon: "🌡️" },
];

const SEVERITY_CONFIG = {
  Critical: {
    text: "text-red-400",
    border: "border-red-500/50",
    badge: "bg-red-500/20 text-red-300 border border-red-500/40",
    glow: "hover:shadow-[0_0_25px_rgba(239,68,68,0.3)]",
  },
  High: {
    text: "text-orange-400",
    border: "border-orange-500/50",
    badge: "bg-orange-500/20 text-orange-300 border border-orange-500/40",
    glow: "hover:shadow-[0_0_25px_rgba(249,115,22,0.3)]",
  },
  Medium: {
    text: "text-yellow-400",
    border: "border-yellow-500/50",
    badge: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/40",
    glow: "hover:shadow-[0_0_25px_rgba(234,179,8,0.3)]",
  },
  Low: {
    text: "text-green-400",
    border: "border-green-500/50",
    badge: "bg-green-500/20 text-green-300 border border-green-500/40",
    glow: "hover:shadow-[0_0_25px_rgba(34,197,94,0.3)]",
  },
};

const WAYS_TO_HELP = [
  {
    emoji: "🌱",
    text: "Support conservation organizations and wildlife charities",
    action: "Donate Now",
    href: "https://www.worldwildlife.org/donate",
  },
  {
    emoji: "🚫",
    text: "Refuse products made from endangered species",
    action: "Learn More",
    href: "https://www.traffic.org",
  },
  {
    emoji: "🌳",
    text: "Plant native trees and restore local habitats",
    action: "Plant Trees",
    href: "https://www.arborday.org",
  },
  {
    emoji: "📢",
    text: "Raise awareness — share and educate others",
    action: "Share Now",
    href: "#",
  },
  {
    emoji: "🥦",
    text: "Reduce meat consumption to lower deforestation",
    action: "Get Tips",
    href: "https://www.meatfreedays.com",
  },
  {
    emoji: "♻️",
    text: "Reduce plastic use to protect oceans and wildlife",
    action: "Learn How",
    href: "https://oceanconservancy.org",
  },
];

function StatCard({ value, label, sub, icon }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-label={`${label}: ${value}`}
      className={`
        bg-gradient-to-br from-green-900/50 via-emerald-800/40 to-amber-900/40
        border border-green-400/30
        rounded-xl p-6 text-center backdrop-blur-md
        transition-all duration-500
        hover:scale-110 hover:border-amber-300
        hover:shadow-[0_0_25px_rgba(253,224,71,0.4)]
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
    >
      <div className="text-3xl mb-2" aria-hidden="true">{icon}</div>
      <div className={`text-4xl font-bold text-emerald-300 ${visible ? "animate-pulse" : ""}`}>
        {value}
      </div>
      <div className="text-green-200 font-semibold mt-2">{label}</div>
      <div className="text-sm text-amber-200/80">{sub}</div>
    </div>
  );
}

function SeverityBadge({ severity }) {
  const config = SEVERITY_CONFIG[severity] || SEVERITY_CONFIG.Medium;
  const icons = { Critical: "🔴", High: "🟠", Medium: "🟡", Low: "🟢" };
  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${config.badge}`}
      aria-label={`Threat severity: ${severity}`}
    >
      <span aria-hidden="true">{icons[severity]}</span>
      {severity}
    </span>
  );
}

function ImpactBar({ level }) {
  const width = `${(level / 10) * 100}%`;
  const color =
    level >= 9
      ? "bg-red-500"
      : level >= 7
      ? "bg-orange-500"
      : level >= 5
      ? "bg-yellow-500"
      : "bg-green-500";

  return (
    <div className="mt-3">
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>Impact Level</span>
        <span aria-label={`${level} out of 10`}>{level}/10</span>
      </div>
      <div
        className="h-2 bg-gray-700 rounded-full overflow-hidden"
        role="meter"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={10}
        aria-label={`Impact level: ${level} out of 10`}
      >
        <div
          className={`h-full ${color} rounded-full transition-all duration-1000`}
          style={{ width }}
        />
      </div>
    </div>
  );
}

function Threats() {
  const [openId, setOpenId] = useState(null);
  const [severityFilter, setSeverityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const categories = [
    "All",
    ...new Set(threatsData.map((t) => t.category).filter(Boolean)),
  ];
  const severities = ["All", "Critical", "High", "Medium", "Low"];

  const filteredThreats = threatsData.filter((item) => {
    const matchesSeverity =
      severityFilter === "All" || item.severity === severityFilter;
    const matchesCategory =
      categoryFilter === "All" || item.category === categoryFilter;
    return matchesSeverity && matchesCategory;
  });

  const openIndex = filteredThreats.findIndex((t) => t.id === openId);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && openId !== null) {
        setOpenId(null);
      }
      if ((e.key === "ArrowRight" || e.key === "ArrowDown") && openId !== null) {
        if (openIndex < filteredThreats.length - 1) {
          setOpenId(filteredThreats[openIndex + 1].id);
        }
      }
      if ((e.key === "ArrowLeft" || e.key === "ArrowUp") && openId !== null) {
        if (openIndex > 0) {
          setOpenId(filteredThreats[openIndex - 1].id);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openId, openIndex, filteredThreats]);

  useEffect(() => {
    document.body.style.backgroundColor = "black";
  }, []);

  return (
    <main
      className="fixed inset-0 text-white overflow-hidden"
      aria-label="Wildlife Threats"
    >
      {/* Background Video */}
      <video
        className="fixed inset-0 w-full h-full object-cover -z-10"
        src="/threats.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="fixed inset-0 bg-black/60 -z-10" aria-hidden="true" />

      <div className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">

        {/* HERO SECTION */}
        <section
          className="snap-start min-h-screen relative px-10 py-20"
          aria-labelledby="hero-heading"
        >
          <h1
            id="hero-heading"
            className="absolute top-24 left-10 text-6xl md:text-7xl font-extrabold text-green-200 drop-shadow-lg"
          >
            The Silent War
          </h1>
          <h1
            className="absolute bottom-28 right-10 text-6xl md:text-7xl font-extrabold text-[#7fc764dd] text-right drop-shadow-lg px-2 py-12"
            aria-hidden="true"
          >
            Against Wildlife
          </h1>
          <p className="absolute bottom-10 left-10 max-w-xl text-xl text-gray-200 leading-relaxed px-8">
            Forests are disappearing. Oceans are polluted. Habitats are collapsing.
            Human expansion, climate change, and exploitation are pushing species
            toward extinction every single day.
          </p>
        </section>

        {/* STATS */}
        <section
          className="snap-start min-h-screen flex flex-col items-center justify-center px-6"
          aria-labelledby="stats-heading"
        >
          <h2
            id="stats-heading"
            className="text-4xl font-bold text-green-300 text-center"
          >
            The Scale of Destruction
          </h2>
          <p className="text-gray-300 mt-4 text-center max-w-xl">
            These numbers are not just statistics — they represent lives and
            ecosystems lost forever.
          </p>
          <ul
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 max-w-5xl w-full list-none"
            aria-label="Conservation statistics"
          >
            {STATS.map((stat) => (
              <li key={stat.label}>
                <StatCard {...stat} />
              </li>
            ))}
          </ul>
        </section>

        {/* FILTER + CARDS SECTION */}
        <section
          className="snap-start min-h-screen flex flex-col items-center justify-start px-6 py-16"
          aria-labelledby="browse-heading"
        >
          <h2
            id="browse-heading"
            className="text-3xl font-bold text-green-300 text-center mb-6"
          >
            Browse Threats
          </h2>

          {/* Filter Controls */}
          <div
            className="flex flex-col md:flex-row flex-wrap gap-6 justify-center mb-8"
            role="group"
            aria-label="Filter threats by severity and category"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-green-300 text-sm font-semibold" id="severity-label">
                Filter by Severity
              </span>
              <div
                className="flex flex-wrap gap-2 justify-center"
                role="group"
                aria-labelledby="severity-label"
              >
                {severities.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSeverityFilter(s)}
                    aria-pressed={severityFilter === s}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                      severityFilter === s
                        ? "bg-green-600 text-white shadow-lg shadow-green-500/30"
                        : "bg-white/10 text-gray-300 hover:bg-white/20"
                    }`}
                  >
                    {s === "Critical"
                      ? "🔴 "
                      : s === "High"
                      ? "🟠 "
                      : s === "Medium"
                      ? "🟡 "
                      : s === "Low"
                      ? "🟢 "
                      : ""}
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <span className="text-green-300 text-sm font-semibold" id="category-label">
                Filter by Category
              </span>
              <div
                className="flex flex-wrap gap-2 justify-center"
                role="group"
                aria-labelledby="category-label"
              >
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategoryFilter(c)}
                    aria-pressed={categoryFilter === c}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                      categoryFilter === c
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                        : "bg-white/10 text-gray-300 hover:bg-white/20"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results count */}
          <p
            className="text-gray-400 text-sm mb-6"
            aria-live="polite"
            aria-atomic="true"
          >
            Showing {filteredThreats.length} of {threatsData.length} threats
            {openId !== null && (
              <span className="ml-2 text-green-400 text-xs">
                · Use arrow keys to navigate · ESC to close
              </span>
            )}
          </p>

          {/* Threat Cards Grid */}
          {filteredThreats.length > 0 ? (
            <ul
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full list-none"
              aria-label="Threat cards"
            >
              {filteredThreats.map((item) => {
                const severityConf =
                  SEVERITY_CONFIG[item.severity] || SEVERITY_CONFIG.Medium;
                const isOpen = openId === item.id;
                return (
                  <li key={item.id}>
                    <article
                      className={`
                        bg-gradient-to-br from-[#1c2a22]/90 via-[#24352c]/90 to-[#3b2f23]/90
                        p-6 rounded-2xl border ${severityConf.border}
                        transition-all duration-300
                        hover:scale-[1.03] ${severityConf.glow}
                        cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400
                      `}
                      onClick={() =>
                        setOpenId(isOpen ? null : item.id)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setOpenId(isOpen ? null : item.id);
                        }
                      }}
                      tabIndex={0}
                      aria-expanded={isOpen}
                      aria-label={`${item.title} — ${item.severity || ""} severity. Press Enter to ${isOpen ? "collapse" : "expand"}.`}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="rounded-xl h-44 object-cover w-full mb-4 transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-lg font-bold text-green-300">
                          {item.title}
                        </h3>
                        {item.severity && (
                          <SeverityBadge severity={item.severity} />
                        )}
                      </div>
                      {item.category && (
                        <span className="text-xs text-gray-400 mb-2 block">
                          📂 {item.category}
                        </span>
                      )}
                      <p className="text-gray-300 text-sm">{item.short}</p>
                      {item.impactLevel && (
                        <ImpactBar level={item.impactLevel} />
                      )}
                      {item.affectedSpecies && (
                        <p className="text-xs text-amber-300/80 mt-2">
                          🐾 {item.affectedSpecies}
                        </p>
                      )}
                      <p className="text-xs text-green-400 mt-3 text-center">
                        {isOpen ? "▲ Click to collapse" : "▼ Scroll down to read more"}
                      </p>
                    </article>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p
              className="text-gray-400 text-center mt-8"
              role="status"
            >
              No threats match your current filters.
            </p>
          )}
        </section>

        {/* DETAILED THREAT SECTIONS */}
        {filteredThreats.map((item, index) => {
          const isOpen = openId === item.id;
          const severityConf =
            SEVERITY_CONFIG[item.severity] || SEVERITY_CONFIG.Medium;

          return (
            <section
              key={item.id}
              className="snap-start min-h-screen flex items-center justify-center px-6 py-12"
              aria-labelledby={`threat-title-${item.id}`}
            >
              <div
                className={`
                  grid md:grid-cols-2 gap-10 max-w-6xl w-full
                  bg-gradient-to-br from-[#1c2a22]/90 via-[#24352c]/90 to-[#3b2f23]/90
                  p-8 md:p-10 rounded-2xl
                  border ${severityConf.border}
                  transition-all duration-300
                  hover:scale-[1.01]
                  hover:shadow-[0_0_35px_rgba(34,197,94,0.35)]
                `}
              >
                {/* Images */}
                <div className="space-y-6">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="rounded-xl h-72 object-cover w-full transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  {isOpen &&
                    item.extraImages?.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Additional image for ${item.title}`}
                        className="rounded-xl h-72 object-cover w-full transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    ))}
                </div>

                {/* Text Content */}
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    {item.severity && (
                      <SeverityBadge severity={item.severity} />
                    )}
                    {item.category && (
                      <span className="text-xs text-gray-400 bg-white/10 px-3 py-1 rounded-full">
                        📂 {item.category}
                      </span>
                    )}
                  </div>

                  <h2
                    id={`threat-title-${item.id}`}
                    className="text-2xl font-bold text-green-300"
                  >
                    {item.title}
                  </h2>

                  {item.subtitle && (
                    <p className="text-gray-400 text-sm mt-1 italic">
                      {item.subtitle}
                    </p>
                  )}

                  {item.impactLevel && (
                    <ImpactBar level={item.impactLevel} />
                  )}

                  {item.stat && (
                    <div className="mt-3 bg-amber-900/20 border border-amber-500/30 rounded-lg p-3">
                      <p className="text-amber-300 text-sm font-semibold">
                        📊 {item.stat}
                      </p>
                    </div>
                  )}

                  <p className="text-gray-300 mt-4">{item.short}</p>

                  {!isOpen ? (
                    <button
                      onClick={() => setOpenId(item.id)}
                      aria-expanded={false}
                      aria-controls={`threat-details-${item.id}`}
                      className="
                        mt-6 px-6 py-2
                        bg-gradient-to-r from-green-600 to-blue-400
                        rounded-lg
                        hover:from-green-700 hover:to-emerald-200
                        transition shadow-md hover:shadow-xl
                        focus:outline-none focus:ring-2 focus:ring-green-400
                      "
                    >
                      Read More
                    </button>
                  ) : (
                    <div
                      id={`threat-details-${item.id}`}
                      className="mt-6 space-y-4"
                    >
                      <p className="text-gray-200">{item.long}</p>

                      {item.causes && (
                        <section aria-label={`Causes of ${item.title}`}>
                          <h3 className="text-green-300 font-semibold">
                            Causes
                          </h3>
                          <ul className="space-y-1 text-gray-300" role="list">
                            {item.causes.map((cause, i) => (
                              <li key={i}>• {cause}</li>
                            ))}
                          </ul>
                        </section>
                      )}

                      {item.effects && (
                        <section aria-label={`Effects of ${item.title}`}>
                          <h3 className="text-amber-300 font-semibold">
                            Effects
                          </h3>
                          <ul className="space-y-1 text-gray-300" role="list">
                            {item.effects.map((effect, i) => (
                              <li key={i}>• {effect}</li>
                            ))}
                          </ul>
                        </section>
                      )}

                      {item.affectedSpecies && (
                        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                          <p className="text-red-300 text-sm">
                            🐾 Affected Species: {item.affectedSpecies}
                          </p>
                        </div>
                      )}

                      {(item.example ||
                        (item.examples && item.examples.length > 0)) && (
                        <blockquote className="italic text-gray-300 border-l-2 border-amber-400 pl-4">
                          {item.example || item.examples[0]}
                        </blockquote>
                      )}

                      <div className="flex gap-3 flex-wrap mt-4">
                        <button
                          onClick={() => setOpenId(null)}
                          aria-expanded={true}
                          aria-controls={`threat-details-${item.id}`}
                          className="
                            px-6 py-2
                            bg-gradient-to-r from-amber-700 to-green-700
                            rounded-lg hover:opacity-90 transition
                            focus:outline-none focus:ring-2 focus:ring-amber-400
                          "
                        >
                          Show Less
                        </button>
                        {index < filteredThreats.length - 1 && (
                          <button
                            onClick={() =>
                              setOpenId(filteredThreats[index + 1].id)
                            }
                            className="
                              px-6 py-2
                              bg-gradient-to-r from-blue-700 to-green-700
                              rounded-lg hover:opacity-90 transition
                              focus:outline-none focus:ring-2 focus:ring-blue-400
                            "
                            aria-label={`Next: ${filteredThreats[index + 1].title}`}
                          >
                            Next Threat →
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        })}

        {/* CALL TO ACTION / WAYS TO HELP */}
        <section
          className="snap-start min-h-screen flex flex-col items-center justify-center text-center px-6"
          aria-labelledby="cta-heading"
        >
          <h2
            id="cta-heading"
            className="text-5xl font-extrabold bg-gradient-to-r from-green-300 via-emerald-200 to-amber-300 bg-clip-text text-transparent mb-6"
          >
            Every Species Lost Is Forever
          </h2>
          <p className="max-w-xl text-gray-200 mb-10 leading-relaxed">
            The extinction crisis is happening right now. Every species lost is a
            unique story erased from Earth forever.
          </p>

          <div
            className="
              bg-gradient-to-br from-green-900/40 via-emerald-800/30 to-amber-900/40
              border border-green-400/30
              p-8 rounded-xl max-w-2xl w-full
              backdrop-blur-md
              hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]
              transition
            "
            aria-labelledby="ways-heading"
          >
            <h3
              id="ways-heading"
              className="text-xl font-semibold text-green-300 mb-6"
            >
              Ways You Can Help
            </h3>
            <ul className="space-y-4" role="list">
              {WAYS_TO_HELP.map((way, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition group"
                >
                  <span className="text-gray-200 text-left flex items-center gap-2 text-sm">
                    <span className="text-xl" aria-hidden="true">
                      {way.emoji}
                    </span>
                    {way.text}
                  </span>
                  <a
                    href={way.href}
                    target={way.href !== "#" ? "_blank" : undefined}
                    rel={
                      way.href !== "#" ? "noopener noreferrer" : undefined
                    }
                    className="
                      shrink-0 px-4 py-1.5 text-xs font-medium
                      bg-gradient-to-r from-green-700 to-emerald-600
                      rounded-full text-white
                      hover:from-green-600 hover:to-emerald-500
                      transition
                      focus:outline-none focus:ring-2 focus:ring-green-400
                      opacity-80 group-hover:opacity-100
                    "
                    aria-label={`${way.action}: ${way.text}`}
                  >
                    {way.action}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-10 text-amber-300 font-semibold text-lg">
            🌍 The wild world is counting on us.
          </p>
        </section>
      </div>
    </main>
  );
}

export default Threats;
