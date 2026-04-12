import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import watchMovie from "../assets/watch movie.mp4";
import { GL, Tag, SectionHeader, NewsModal, FocusModal } from "../components/ConservationComp.jsx";
import {
  GOLD, G, bg, cream, dim, gBtn,
  SLIDES, FOCUS, FOCUS_MODALS, STATS, THREATS, WINS,
  ANIMALS, MIGRATION, HELP_ACTIONS, VOLUNTEER_ROLES, NEWS, ORGS,
} from "../data/ConservationData.js";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" },
};

const focusIcons = { Leaf: "🌿", Droplet: "💧", Heart: "♥" };

export default function Conservation() {
  const [slide, setSlide] = useState(0);
  const [focusModal, setFocusModal] = useState(null);
  const [newsArticle, setNewsArticle] = useState(null);
  const [video, setVideo] = useState(null);
  const [expandedWin, setExpandedWin] = useState(null);
  const [migrationModal, setMigrationModal] = useState(null);

  useEffect(() => {
    const t = setInterval(() => setSlide(p => (p + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="overflow-x-hidden" style={{ background: bg.main, color: cream, fontFamily: "'Cinzel', Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap');
      `}</style>

      {/* ── HERO ── */}
      <section className="relative h-screen overflow-hidden flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${SLIDES[slide].img})` }}
          />
        </AnimatePresence>

        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(6,10,7,0.92) 0%, rgba(6,10,7,0.55) 55%, transparent 100%)" }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${bg.main}, transparent 40%)` }} />

        <div className="relative z-10 flex items-center h-full px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-xs uppercase mb-4 font-mono tracking-[0.5em]" style={{ color: GOLD }}>
              {SLIDES[slide].label}
            </p>
            <h1 className="leading-none mb-6 text-[clamp(3.5rem,9vw,7rem)] tracking-[-0.02em]">
              {SLIDES[slide].title}
            </h1>
            <p className="mb-10 text-lg max-w-[32rem] leading-[1.8] opacity-80" style={{ color: dim }}>
              Every action we take today shapes the world our children will inherit.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => document.getElementById("act-now").scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 rounded-full text-xs uppercase font-semibold cursor-pointer border-none tracking-[0.2em]"
                style={{ background: G, color: bg.main }}
              >
                Take Action
              </button>
              <button
                onClick={() => setVideo(watchMovie)}
                className="px-8 py-4 rounded-full cursor-pointer flex items-center gap-2 text-xs uppercase tracking-[0.2em] bg-[rgba(201,168,76,0.07)] border border-[rgba(201,168,76,0.35)]"
                style={{ color: cream }}
              >
                ▶ Watch Film
              </button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {SLIDES.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setSlide(i)}
              animate={{ width: i === slide ? 32 : 6, backgroundColor: i === slide ? GOLD : "rgba(240,234,216,0.25)" }}
              transition={{ duration: 0.3 }}
              className="h-0.5 border-none rounded-[4px] cursor-pointer"
            />
          ))}
        </div>

        <p className="absolute bottom-10 right-12 z-10 font-mono text-[0.6rem] tracking-[0.3em] text-[rgba(201,168,76,0.45)]">
          SCROLL ↓
        </p>
      </section>

      {/* ── MISSION ── */}
      <section className="py-28 px-8" style={{ background: "linear-gradient(160deg, #060d09, #0a150c, #060d09)" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-20 items-center">
          <motion.div {...fadeUp}>
            <p className="text-xs uppercase mb-3 font-mono tracking-[0.5em]" style={{ color: GOLD }}>Our Mission</p>
            <GL />
            <h2 className="font-normal mb-6 text-[clamp(2rem,3.5vw,3rem)] leading-[1.15]" style={{ color: cream }}>
              One Planet. One Chance. Act Together.
            </h2>
            <p className="mb-5 leading-[1.9] opacity-[0.85]" style={{ color: dim }}>
              Green Nature is a conservation awareness platform dedicated to educating, inspiring, and connecting
              people with the organisations and actions that protect our planet's wildlife and wild places.
            </p>
            <p className="mb-8 text-[1.05rem] opacity-70 leading-[1.9]" style={{ color: dim }}>
              We believe informed people make better choices — for animals, ecosystems, and the future of all life on Earth.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                ["🌍", "Global Reach", "Covering conservation across 6 continents"],
                ["🔬", "Science-Backed", "All data from peer-reviewed research"],
                ["🤝", "Community", "Connecting you to front-line conservationists"],
                ["💡", "Action-Focused", "Every page ends with a way to help"],
              ].map(([icon, title, desc]) => (
                <div key={title} className="p-4 rounded-xl bg-[rgba(201,168,76,0.04)]">
                  <span className="text-2xl">{icon}</span>
                  <p className="font-medium mt-1 mb-1 text-[0.95rem]" style={{ color: cream }}>{title}</p>
                  <p className="m-0 text-[0.85rem] opacity-70" style={{ color: dim }}>{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.1, duration: 0.5 }} className="relative">
            <div className="overflow-hidden rounded-2xl h-[32rem]">
              <img src="https://i0.wp.com/charities2love.org/wp-content/uploads/2023/04/One-Earth-One-Chance-Logo.png?fit=500%2C500&ssl=1" className="w-full h-full object-cover" />
            </div>
            <motion.div
              {...fadeUp} transition={{ delay: 0.2, duration: 0.5 }}
              className="absolute -bottom-6 -right-6 px-7 py-5 rounded-2xl backdrop-blur-xl bg-[rgba(3,6,5,0.9)]"
            >
              <div className="h-0.5 mb-2" style={{ background: G }} />
              <p className="text-[2rem]" style={{ color: GOLD, fontFamily: "'Cinzel', serif" }}>Since 2018</p>
              <p className="text-[0.85rem] opacity-70" style={{ color: dim }}>Raising awareness for wildlife</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── WHAT WE PROTECT ── */}
      <section className="py-28 px-8" style={{ background: bg.main }}>
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Our Focus" title="What We Protect" center />
          <div className="grid grid-cols-3 gap-6">
            {FOCUS.map((item, i) => (
              <motion.div
                key={item.key}
                {...fadeUp}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl h-[25rem]"
                onClick={() => setFocusModal(item.key)}
              >
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-[600ms] ease-in-out group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,10,7,0.94) 0%, rgba(6,10,7,0.25) 55%, transparent 100%)" }} />
                <div className="absolute bottom-0 p-8">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-xl bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.28)]">
                    {focusIcons[item.icon]}
                  </div>
                  <h3 className="font-normal mb-2 text-[1.7rem]" style={{ color: cream }}>{item.title}</h3>
                  <GL />
                  <span className="uppercase text-xs tracking-[0.15em]" style={{ color: GOLD }}>Explore →</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE CRISIS ── */}
      <section className="py-28 px-8" style={{ background: "linear-gradient(160deg, #060d09, #0a1a0e, #060d09)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 gap-20 items-center mb-20">
            <motion.div {...fadeUp}>
              <p className="text-xs uppercase mb-3 font-mono tracking-[0.5em]" style={{ color: GOLD }}>The Crisis</p>
              <GL />
              <h2 className="font-normal mb-6 text-[clamp(2rem,3.5vw,3rem)]" style={{ color: cream }}>
                Why Animal Conservation Matters
              </h2>
              <p className="mb-5 leading-[1.9] opacity-[0.85]" style={{ color: dim }}>
                Every species plays a crucial role in maintaining ecological balance. When one disappears, it disrupts the entire food chain.
              </p>
              <p className="text-[1.05rem] leading-[1.9] opacity-70" style={{ color: dim }}>
                We are currently in the sixth mass extinction — the first one driven not by asteroids or volcanoes, but by human activity.
                The good news: it can be stopped.
              </p>
            </motion.div>

            <motion.div {...fadeUp} transition={{ delay: 0.1, duration: 0.5 }} className="relative">
              <div className="overflow-hidden rounded-2xl h-[24rem]">
                <img src="https://img.volunteerworld.com/img/default/1b8ff06780f2c238d9cbef775e9a4309b6b3eefb/IMG4648.jpg?Height=317&Width=562" alt="Wildlife" className="w-full h-full object-cover" />
              </div>
              <motion.div
                {...fadeUp} transition={{ delay: 0.2, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 px-7 py-5 rounded-2xl backdrop-blur-xl bg-[rgba(3,6,5,0.88)]"
              >
                <div className="h-0.5 mb-2" style={{ background: G }} />
                <p className="text-[2.2rem]" style={{ color: GOLD, fontFamily: "'Cinzel', serif" }}>3,682</p>
                <p className="text-[0.85rem] opacity-70" style={{ color: dim }}>Tigers in India — up from 1,200</p>
              </motion.div>
            </motion.div>
          </div>

          <div className="grid grid-cols-4 gap-5 mb-16">
            {STATS.map((stat, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08, duration: 0.5 }} className="py-8 px-5 text-center rounded-2xl bg-[rgba(201,168,76,0.04)]">
                <p className="font-normal mb-1 text-[2.4rem]" style={{ color: GOLD }}>{stat.val}</p>
                <div className="h-px w-6 mx-auto my-2" style={{ background: G }} />
                <p className="text-[0.85rem] opacity-70" style={{ color: dim }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <h3 className="font-normal mb-6 text-[1.8rem]" style={{ color: cream }}>Major Threats to Wildlife</h3>
          <div className="grid grid-cols-2 gap-4">
            {THREATS.map((threat, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.07, duration: 0.5 }} className="p-7 rounded-2xl bg-[rgba(255,255,255,0.02)]">
                <span className="text-4xl block mb-3">{threat.icon}</span>
                <h4 className="font-normal mb-2 text-[1.2rem]" style={{ color: cream }}>{threat.title}</h4>
                <p className="text-[0.95rem] leading-[1.7] opacity-70" style={{ color: dim }}>{threat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONSERVATION WINS ── */}
      <section className="py-28 px-8" style={{ background: "linear-gradient(160deg, #060d09, #071a0e, #060d09)" }}>
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Proof It Works" title="Conservation Wins" sub="These stories prove conservation works when we commit to it." center />
          <div className="grid grid-cols-3 gap-6">
            {WINS.map((win, i) => {
              const isOpen = expandedWin === i;
              return (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className={`rounded-2xl overflow-hidden cursor-pointer transition-colors duration-300 border ${isOpen ? "border-[rgba(201,168,76,0.3)]" : "border-[rgba(201,168,76,0.08)]"}`}
                  style={{ background: bg.card }}
                  onClick={() => setExpandedWin(isOpen ? null : i)}
                >
                  <div className="group relative overflow-hidden h-[22rem]">
                    <img src={win.img} alt={win.title} className="w-full h-full object-cover transition-transform duration-[600ms] ease-in-out group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(3,6,5,0.96) 0%, rgba(3,6,5,0.4) 55%, transparent 100%)" }} />
                    <div className="absolute top-4 right-4 rounded-full px-3 py-1 backdrop-blur-md bg-[rgba(201,168,76,0.15)] border border-[rgba(201,168,76,0.4)]">
                      <span className="uppercase font-mono text-[0.6rem] tracking-[0.2em]" style={{ color: GOLD }}>✦ Success</span>
                    </div>
                    <div className="absolute bottom-0 p-6 w-full">
                      <span className="text-2xl">{win.emoji}</span>
                      <h3 className="font-normal mt-1 mb-1 text-[1.2rem]" style={{ color: cream }}>{win.title}</h3>
                      <p className="text-[1.9rem] m-0 mb-[0.15rem]" style={{ color: GOLD, fontFamily: "'Cinzel', serif" }}>{win.stat}</p>
                      <p className="text-[0.82rem] opacity-80 m-0 mb-[0.25rem]" style={{ color: dim }}>{win.unit}</p>
                      <div className="flex justify-between items-center">
                        <p className="font-mono m-0 text-[0.75rem] text-[rgba(196,187,166,0.45)]">↑ {win.before}</p>
                        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }} className="text-[0.75rem]" style={{ color: GOLD }}>▾</motion.span>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-7 pt-5 border-t border-t-[rgba(201,168,76,0.1)]">
                          <p className="mb-4 text-[0.9rem] leading-[1.85] opacity-75" style={{ color: dim }}>{win.detail}</p>
                          <p className="mb-4 text-[0.9rem] leading-[1.85] opacity-85" style={{ color: cream }}>{win.desc}</p>
                          <p className="mb-4 text-[0.9rem] leading-[1.85] opacity-70" style={{ color: dim }}>{win.how}</p>
                          <p className="m-0 text-[0.88rem] leading-[1.85] opacity-60" style={{ color: dim }}>{win.facts.join(" — ")}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ANIMALS ── */}
      <section className="py-28 px-8" style={{ background: `linear-gradient(180deg, ${bg.main}, ${bg.mid})` }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            label="In Focus"
            title="Animals Worth Saving"
            sub="Each of these species faces an uncertain future. Their survival depends on the actions we take today."
            center
          />
          <div className="grid grid-cols-3 gap-5">
            {ANIMALS.map((animal, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08, duration: 0.5 }} className="relative overflow-hidden rounded-2xl h-[22rem]">
                <img src={animal.img} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(3,6,5,0.92) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)" }} />
                <span
                  className="absolute top-4 left-4 px-3 py-1 rounded-full uppercase backdrop-blur-md font-mono text-[0.6rem] tracking-[0.2em]"
                  style={{ color: animal.color, background: `${animal.color}18`, border: `1px solid ${animal.color}44` }}
                >
                  {animal.status}
                </span>
                <h3 className="absolute bottom-6 left-6 font-normal text-[1.5rem]" style={{ color: cream }}>{animal.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MIGRATION ── */}
      <section className="py-28 px-8" style={{ background: "linear-gradient(180deg, #040d07, #071408, #040d07)" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            label="Nature's Greatest Journey"
            title="Wildlife Migration"
            sub="Every year, billions of animals undertake extraordinary journeys driven by seasons, food, and survival."
            center
          />

          <motion.div {...fadeUp} className="relative overflow-hidden rounded-2xl mb-16 h-[28rem]">
            <img
              src="https://static.wixstatic.com/media/0c30ac_b35519427750445db2618fb0dcc22853~mv2.png/v1/fill/w_1110,h_624,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/0c30ac_b35519427750445db2618fb0dcc22853~mv2.png"
              alt="Great Migration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,13,7,0.92) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)" }} />
            <div className="absolute bottom-10 left-10">
              <div className="flex flex-wrap gap-2 mb-4">
                {["1.5M Wildebeest", "250K Zebra", "500km Journey", "Annual Event"].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full uppercase backdrop-blur-md font-mono text-[0.65rem] tracking-[0.15em] bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.25)]" style={{ color: GOLD }}>
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-normal text-[2.4rem]" style={{ color: cream }}>The Great Wildebeest Migration</h3>
              <p className="mt-2 opacity-70 text-[1.05rem]" style={{ color: dim }}>The largest terrestrial migration on Earth — Serengeti to Masai Mara and back.</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-6 mb-16">
            {MIGRATION.map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group overflow-hidden rounded-2xl cursor-pointer border border-[rgba(201,168,76,0.1)] transition-colors duration-300 hover:border-[rgba(201,168,76,0.35)]"
                onClick={() => setMigrationModal(item)}
                style={{ background: bg.card }}
              >
                <div className="relative overflow-hidden h-[13rem]">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-[600ms] ease-in-out group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 40%, ${bg.card} 100%)` }} />
                  <span className="absolute top-4 right-4 text-3xl">{item.icon}</span>
                  <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full backdrop-blur-md bg-[rgba(201,168,76,0.12)] border border-[rgba(201,168,76,0.3)]">
                    <span className="uppercase font-mono text-[0.6rem] tracking-[0.2em]" style={{ color: GOLD }}>View Details →</span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-normal mb-3 text-[1.4rem]" style={{ color: cream }}>{item.name}</h4>
                  <div className="flex gap-2 flex-wrap mb-3">
                    <Tag>📍 {item.route}</Tag>
                    <Tag color="#a8c9ad">📏 {item.dist}</Tag>
                  </div>
                  <p className="text-[0.95rem] leading-[1.75] opacity-70" style={{ color: dim }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="rounded-2xl p-12 bg-[rgba(201,168,76,0.04)]">
            <h3 className="text-center font-normal mb-10 text-[1.7rem]" style={{ color: cream }}>Migration by the Numbers</h3>
            <div className="grid grid-cols-4 gap-8 text-center">
              {[
                { v: "1.5B",   l: "Birds migrate each year in North America", i: "🐦" },
                { v: "90K km", l: "Distance Arctic Tern travels annually",    i: "🗺️" },
                { v: "500+",   l: "Species undertake long-distance migrations", i: "🌍" },
                { v: "30%",    l: "Migratory species in decline",             i: "📉" },
              ].map((stat, i) => (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08, duration: 0.5 }}>
                  <div className="text-3xl mb-2">{stat.i}</div>
                  <p className="text-[1.9rem] mb-[0.4rem]" style={{ color: GOLD, fontFamily: "'Cinzel', serif" }}>{stat.v}</p>
                  <div className="h-px w-5 mx-auto my-1" style={{ background: G }} />
                  <p className="text-[0.82rem] leading-[1.6] opacity-[0.65]" style={{ color: dim }}>{stat.l}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── HOW YOU CAN HELP ── */}
      <section className="py-28 px-8" style={{ background: "linear-gradient(160deg, #060d09, #0a1a0e, #060d09)" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            label="Daily Actions"
            title="How You Can Help"
            sub="You don't have to donate to make a difference. These everyday actions have real, measurable impact."
            center
          />
          <div className="grid grid-cols-3 gap-5 mb-16">
            {HELP_ACTIONS.map((action, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.07, duration: 0.5 }} className="p-8 rounded-2xl bg-[rgba(255,255,255,0.02)]">
                <span className="text-4xl block mb-3">{action.icon}</span>
                <h4 className="font-normal mb-2 text-[1.2rem]" style={{ color: cream }}>{action.title}</h4>
                <p className="text-[0.95rem] leading-[1.75] opacity-70" style={{ color: dim }}>{action.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="px-12 py-10 rounded-2xl text-center relative bg-[rgba(201,168,76,0.04)]">
            <span className="absolute top-4 left-8 leading-none text-[4rem] font-serif text-[rgba(201,168,76,0.12)]">"</span>
            <p className="italic mx-auto text-[1.35rem] leading-[1.7] opacity-90 max-w-[46rem]" style={{ color: cream }}>
              The Earth does not belong to us. We belong to the Earth. What we do to the web of life, we do to ourselves.
            </p>
            <div className="h-px w-12 mx-auto mt-6 mb-3" style={{ background: G }} />
            <p className="uppercase tracking-[0.3em] font-mono text-[0.8rem]" style={{ color: GOLD }}>Chief Seattle</p>
          </motion.div>
        </div>
      </section>

      {/* ── VOLUNTEER ── */}
      <section className="py-28 px-8" style={{ background: bg.main }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader label="Get Involved" title="Volunteer for Wildlife" sub="Go beyond awareness — give your time, skills, and energy directly to conservation." center />
          <div className="grid grid-cols-3 gap-5 mb-16">
            {VOLUNTEER_ROLES.map((role, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.07, duration: 0.5 }} className="p-8 rounded-2xl bg-[rgba(255,255,255,0.02)]">
                <span className="text-4xl block mb-3">{role.icon}</span>
                <h4 className="font-normal mb-1 text-[1.15rem]" style={{ color: cream }}>{role.title}</h4>
                <p className="mb-4 text-[0.92rem] leading-[1.75] opacity-70" style={{ color: dim }}>{role.desc}</p>
                <div className="flex gap-2 flex-wrap">
                  <Tag color="#7aab82">⏱ {role.time}</Tag>
                  <Tag color="#a8c9ad">📍 {role.loc}</Tag>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="grid gap-8 items-center px-12 py-10 rounded-2xl relative overflow-hidden bg-[rgba(201,168,76,0.06)] border border-[rgba(201,168,76,0.22)]" style={{ gridTemplateColumns: "1fr auto" }}>
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: G }} />
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[1.1rem]" style={{ color: GOLD }}>👥</span>
                <span className="uppercase font-mono text-[0.65rem] tracking-[0.4em]" style={{ color: GOLD }}>Join the Movement</span>
              </div>
              <h3 className="font-normal mb-2 text-[1.7rem]" style={{ color: cream }}>12,000+ volunteers active worldwide</h3>
              <p className="text-[1rem] opacity-70" style={{ color: dim }}>Connect with conservation programs that match your skills, availability, and location.</p>
            </div>
            <a
              href="https://www.volunteerworld.com/en/volunteer-abroad/wildlife-conservation"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 rounded-full no-underline uppercase font-bold whitespace-nowrap text-[0.85rem] tracking-[0.15em]"
              style={{ background: G, color: bg.main }}
            >
              Find a Role
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── ORGANISATIONS ── */}
      <section className="py-28 px-8" style={{ background: "linear-gradient(180deg, #060a07, #0a120a)" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader label="Partners" title="Leading the Movement" sub="These organisations protect animals, restore habitats, and safeguard biodiversity globally." center />
          <div className="flex flex-col gap-24">
            {ORGS.map((org, i) => {
              const isEven = i % 2 === 0;

              const ImageCol = (
                <div
                  className="group relative overflow-hidden rounded-2xl cursor-pointer h-[22rem] border border-[rgba(201,168,76,0.1)]"
                  onClick={() => setVideo(org.vid)}
                >
                  <img src={org.img} className="w-full h-full object-cover transition-transform duration-[600ms] ease-in-out group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(3,6,5,0.55), transparent)" }} />
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: G }}
                  >
                    <span className="text-[1rem] ml-0.5" style={{ color: bg.main }}>▶</span>
                  </div>
                </div>
              );

              const TextCol = (
                <div>
                  <GL />
                  <h3 className="font-normal mb-4 text-[2rem]" style={{ color: cream }}>{org.name}</h3>
                  <p className="mb-6 text-[1.05rem] leading-[1.85] opacity-[0.75]" style={{ color: dim }}>{org.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-7">
                    {org.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                  </div>
                  <a
                    href={org.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={gBtn}
                    onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = bg.main; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = GOLD; }}
                  >
                    Visit Website ↗
                  </a>
                </div>
              );

              return (
                <motion.div key={i} {...fadeUp} transition={{ delay: 0.05, duration: 0.5 }} className="grid grid-cols-2 gap-16 items-center">
                  {isEven ? <>{ImageCol}{TextCol}</> : <>{TextCol}{ImageCol}</>}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── LATEST NEWS ── */}
      <section className="py-28 px-8" style={{ background: "linear-gradient(160deg, #060d09, #0a150c, #060d09)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-end flex-wrap gap-4 mb-14">
            <SectionHeader label="Stay Informed" title="Latest News" />
            <a
              href="https://iucn.org/news-events"
              target="_blank"
              rel="noopener noreferrer"
              className={`mb-14 ${gBtn}`}
              onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = bg.main; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = GOLD; }}
            >
              View All Stories 📖
            </a>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {NEWS.map((article, i) => (
              <motion.div
                key={article.title || i}
                {...fadeUp}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group overflow-hidden rounded-2xl cursor-pointer flex flex-col border border-[rgba(201,168,76,0.1)] transition-colors duration-300 hover:border-[rgba(201,168,76,0.35)]"
                onClick={() => setNewsArticle(article)}
                style={{ background: bg.card }}
              >
                <div className="relative overflow-hidden shrink-0 h-[13rem]">
                  <img src={article.img} alt={article.title} className="w-full h-full object-cover transition-transform duration-[600ms] ease-in-out group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 50%, ${bg.card} 100%)` }} />
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full backdrop-blur-md bg-[rgba(6,10,7,0.8)] border border-[rgba(201,168,76,0.2)]">
                    <span className="font-mono text-[0.62rem] text-[rgba(201,168,76,0.7)]">⏱ {article.readTime}</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <Tag>{article.tag}</Tag>
                    <span className="font-mono text-[0.75rem] text-[rgba(196,187,166,0.4)]">{article.date}</span>
                  </div>
                  <h4 className="font-normal mb-3 text-[1.15rem] leading-[1.4]" style={{ color: cream }}>{article.title}</h4>
                  <p className="flex-1 text-[0.9rem] leading-[1.7] opacity-[0.65]" style={{ color: dim }}>{article.excerpt}</p>
                  <div className="mt-4 pt-4 flex items-center gap-2 border-t border-t-[rgba(201,168,76,0.08)]">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br from-[rgba(201,168,76,0.18)] to-[rgba(201,168,76,0.04)] border border-[rgba(201,168,76,0.18)] text-[0.65rem]" style={{ color: GOLD }}>
                      {article.author.charAt(0)}
                    </div>
                    <p className="flex-1 m-0 truncate text-[0.78rem] opacity-80" style={{ color: cream }}>{article.author}</p>
                    <span className="uppercase shrink-0 font-mono text-[0.75rem] tracking-[0.12em]" style={{ color: GOLD }}>Read →</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACT NOW ── */}
      <section id="act-now" className="py-36 px-8 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a1a08, #142810, #0a1a08)" }}>
        <div className="max-w-5xl mx-auto relative">
          <motion.div {...fadeUp} className="text-center mb-20">
            <p className="uppercase mb-4 font-mono text-[0.65rem] tracking-[0.55em]" style={{ color: GOLD }}>The Time Is Now</p>
            <div className="h-px w-16 mx-auto mb-5" style={{ background: G }} />
            <h2 className="leading-none mb-6 text-[clamp(3.5rem,8vw,6rem)]" style={{ color: cream }}>Act Now.</h2>
            <p className="mx-auto text-[1.15rem] leading-[1.85] opacity-[0.75] max-w-[36rem]" style={{ color: dim }}>
              The window to protect our planet's biodiversity is narrowing. Choose how you want to make a difference.
            </p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.1, duration: 0.5 }} className="rounded-2xl p-12 mb-8 relative overflow-hidden bg-[rgba(201,168,76,0.06)] border border-[rgba(201,168,76,0.25)]">
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: G }} />
            <div className="grid gap-8 items-center" style={{ gridTemplateColumns: "1fr auto" }}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🌍</span>
                  <span className="uppercase font-mono text-[0.65rem] tracking-[0.4em]" style={{ color: GOLD }}>Featured Platform</span>
                </div>
                <h3 className="font-normal mb-3 text-[1.9rem]" style={{ color: cream }}>Wildlife Conservation Network</h3>
                <p className="mb-5 text-[1.05rem] leading-[1.8] opacity-80 max-w-[42rem]" style={{ color: dim }}>
                  A hub for wildlife conservation projects worldwide. Choose which animal, habitat, or program you want to support.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["💰 Donate to Projects", "🐘 Support Animals", "🌳 Fund Habitats", "🎯 Run Fundraisers"].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full text-[0.8rem] bg-[rgba(255,255,255,0.04)] border border-[rgba(201,168,76,0.15)]" style={{ color: dim }}>{tag}</span>
                  ))}
                </div>
              </div>
              <a
                href="https://wildnet.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 px-9 py-6 rounded-2xl no-underline text-center min-w-[10rem]"
                style={{ background: G, color: bg.main }}
              >
                <span className="text-2xl">🐾</span>
                <span className="font-bold uppercase text-[0.85rem] tracking-[0.1em]">Take Action</span>
                <span className="text-[0.72rem] opacity-[0.65]">wildnet.org</span>
              </a>
            </div>
          </motion.div>

          <div className="grid grid-cols-3 gap-5">
            {[
              { emoji: "🌱", name: "GlobalGiving",    desc: "Choose from hundreds of conservation projects worldwide.", tag: "Fund Projects",    url: "https://www.globalgiving.org",   color: "#7aab82" },
              { emoji: "🌿", name: "Rainforest Trust", desc: "Protect critical rainforest habitats and biodiversity.",  tag: "Protect Habitats", url: "https://www.rainforesttrust.org", color: "#2a8c7a" },
              { emoji: "✊", name: "Change.org",       desc: "Sign petitions to stop illegal wildlife trade globally.", tag: "Sign Petitions",   url: "https://www.change.org",         color: GOLD     },
            ].map((platform, i) => (
              <motion.a
                key={i}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                {...fadeUp}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="block p-8 rounded-2xl no-underline bg-[rgba(255,255,255,0.02)] border border-[rgba(201,168,76,0.1)] transition-colors duration-300 hover:border-[rgba(201,168,76,0.35)]"
              >
                <span className="text-3xl block mb-3">{platform.emoji}</span>
                <h4 className="font-normal mb-2 text-[1.3rem]" style={{ color: cream }}>{platform.name}</h4>
                <p className="mb-5 text-[0.95rem] leading-[1.7] opacity-70" style={{ color: dim }}>{platform.desc}</p>
                <Tag color={platform.color}>{platform.tag} →</Tag>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-t-[rgba(201,168,76,0.1)]" style={{ background: bg.deep }}>
        <div className="px-10 py-8 flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm" style={{ background: G, color: bg.main }}>🌿</div>
            <span className="uppercase text-[0.8rem] tracking-[0.25em]">
              Loss Of Animal <span style={{ color: GOLD }}>Habitats</span>
            </span>
          </div>
          <p className="text-[0.82rem] text-[rgba(201,168,76,0.25)]">© 2026 Loss Of Animal Habitat Project. All rights reserved.</p>
          <div className="flex gap-7">
            {["Privacy", "Terms", "Contact"].map(link => (
              <a key={link} href="#" className="no-underline transition-colors duration-300 text-[0.82rem] text-[rgba(201,168,76,0.3)] hover:text-[rgba(201,168,76,1)]">
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* ── VIDEO LIGHTBOX ── */}
      <AnimatePresence>
        {video && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-6 backdrop-blur-2xl bg-[rgba(3,6,5,0.95)]"
            onClick={() => setVideo(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-[54rem] rounded-2xl overflow-hidden aspect-video border border-[rgba(201,168,76,0.2)]"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 z-10" style={{ background: G }} />
              {typeof video === "string" && (video.endsWith(".mp4") || video.startsWith("/") || video.includes("assets"))
                ? <video src={video} autoPlay controls className="w-full h-full object-cover bg-black" />
                : <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${video}?autoplay=1`} title="Video" allowFullScreen allow="autoplay" />
              }
              <button
                onClick={() => setVideo(null)}
                className="absolute top-2 right-2 p-1.5 rounded-full cursor-pointer flex items-center justify-center z-10 backdrop-blur-md bg-[rgba(6,10,7,0.85)] border border-[rgba(201,168,76,0.25)]"
                style={{ color: cream }}
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MIGRATION DETAIL MODAL ── */}
      <AnimatePresence>
        {migrationModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 flex items-center justify-center p-4 backdrop-blur-3xl z-[400] bg-[rgba(3,6,5,0.95)]"
            onClick={() => setMigrationModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-2xl overflow-y-auto rounded-3xl max-h-[92vh] border border-[rgba(201,168,76,0.2)]"
              style={{ background: bg.card }}
            >
              <div className="h-0.5 rounded-t-3xl sticky top-0 z-10" style={{ background: G }} />
              <div className="relative overflow-hidden h-[20rem]">
                <img src={migrationModal.heroImg} alt={migrationModal.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(12,20,16,1) 0%, rgba(12,20,16,0.3) 60%, transparent 100%)" }} />
                <button
                  onClick={() => setMigrationModal(null)}
                  className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer backdrop-blur-md bg-[rgba(6,10,7,0.85)] border border-[rgba(201,168,76,0.25)]"
                  style={{ color: cream }}
                >
                  ×
                </button>
                <div className="absolute bottom-7 left-8">
                  <span className="text-4xl">{migrationModal.icon}</span>
                  <h2 className="font-normal mt-1 mb-2 text-[2.2rem]" style={{ color: cream }}>{migrationModal.name}</h2>
                  <div className="flex gap-2 flex-wrap">
                    <Tag>📍 {migrationModal.route}</Tag>
                    <Tag color="#a8c9ad">📏 {migrationModal.dist}</Tag>
                  </div>
                </div>
              </div>
              <div className="px-12 pt-10 pb-12">
                <p className="mb-4 text-[0.95rem] leading-[1.85] opacity-90" style={{ color: cream }}>{migrationModal.desc}</p>
                <p className="mb-4 text-[0.9rem] leading-[1.85] opacity-65" style={{ color: dim }}>{migrationModal.detail}</p>
                <p className="mb-4 text-[0.88rem] leading-[1.85] opacity-65" style={{ color: dim }}>{migrationModal.facts.join(" — ")}</p>
                <p className="m-0 text-[0.88rem] leading-[1.85] opacity-65" style={{ color: dim }}>⚠️ {migrationModal.threats}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {focusModal && (
          <FocusModal focusKey={focusModal} modalsData={FOCUS_MODALS} onClose={() => setFocusModal(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {newsArticle && (
          <NewsModal article={newsArticle} onClose={() => setNewsArticle(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}