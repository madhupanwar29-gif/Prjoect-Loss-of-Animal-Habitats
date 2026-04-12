import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GOLD, G, bg, cream, dim } from "../data/ConservationData.js";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: "easeOut" },
};

// ── Shared primitives ──────────────────────────────────────

export const GL = ({ center }) => (
  <div
    className={`h-px w-16 my-3 ${center ? "mx-auto" : "mx-0"}`}
    style={{ background: G }}
  />
);

export const Tag = ({ children, color }) => (
  <span
    className="inline-block px-3 py-1 rounded-full text-xs uppercase font-mono tracking-[0.2em]"
    style={{
      color: color || GOLD,
      background: `${color || GOLD}12`,
      border: `1px solid ${color || GOLD}33`,
    }}
  >
    {children}
  </span>
);

export const SectionHeader = ({ label, title, sub, center }) => (
  <motion.div {...fadeUp} className={`mb-14 ${center ? "text-center" : "text-left"}`}>
    <p className="text-xs uppercase mb-3 font-mono tracking-[0.5em]" style={{ color: GOLD }}>
      {label}
    </p>
    <GL center={center} />
    <h2 className="font-normal text-[clamp(2.2rem,4vw,3.2rem)] tracking-[0.02em]" style={{ color: cream }}>
      {title}
    </h2>
    {sub && (
      <p
        className={`mt-4 text-lg leading-[1.8] opacity-[0.75] max-w-[40rem] ${center ? "mx-auto" : ""}`}
        style={{ color: dim }}
      >
        {sub}
      </p>
    )}
  </motion.div>
);

// ── Body block renderer ────────────────────────────────────

function BodyBlocks({ body }) {
  return (
    <div className="flex flex-col gap-5">
      {body.map((block, i) => {

        if (block.type === "intro") return (
          <p key={i} className="m-0 text-[1.05rem] leading-[1.9] opacity-90" style={{ color: cream }}>
            {block.text}
          </p>
        );

        if (block.type === "paragraph") return (
          <p key={i} className="m-0 text-[0.95rem] leading-[1.9] opacity-75" style={{ color: dim }}>
            {block.text}
          </p>
        );

        if (block.type === "subheading") return (
          <h3 key={i} className="text-xl font-normal m-0 mt-2" style={{ color: cream }}>{block.text}</h3>
        );

        if (block.type === "pullquote") return (
          <p key={i} className="m-0 italic text-[1.05rem] leading-[1.8] opacity-80" style={{ color: cream }}>
            "{block.text}" — <span className="not-italic text-[0.8rem] opacity-60" style={{ color: dim }}>{block.attribution}</span>
          </p>
        );

        if (block.type === "stats") return (
          <p key={i} className="m-0 text-[0.9rem] leading-[1.85] opacity-70" style={{ color: dim }}>
            {block.items.map(s => `${s.val} — ${s.label}`).join(" · ")}
          </p>
        );

        if (block.type === "callout") return (
          <p key={i} className="m-0 text-[0.95rem] leading-[1.85] opacity-80" style={{ color: dim }}>
            {block.icon} {block.text}
          </p>
        );

        return null;
      })}
    </div>
  );
}

// ── News Article Modal ─────────────────────────────────────

export function NewsModal({ article, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[400] flex items-center justify-center p-4 backdrop-blur-2xl bg-[rgba(3,6,5,0.93)]"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-2xl overflow-y-auto rounded-3xl border border-[rgba(201,168,76,0.18)] max-h-[92vh]"
        style={{ background: bg.card }}
      >
        {/* Gold top bar */}
        <div className="h-0.5 rounded-t-3xl sticky top-0 z-10" style={{ background: G }} />

        {/* Hero image */}
        <div className="relative overflow-hidden h-[22rem]">
          <img src={article.heroImg} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,20,16,1)] via-[rgba(12,20,16,0.4)] to-transparent" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer backdrop-blur-md z-10 text-lg transition-colors duration-200 bg-[rgba(6,10,7,0.85)] border border-[rgba(201,168,76,0.25)] hover:border-[rgba(201,168,76,1)]"
            style={{ color: cream }}
          >
            ×
          </button>

          {/* Tag + date */}
          <div className="absolute top-5 left-6 flex items-center gap-2">
            <Tag>{article.tag}</Tag>
            <span className="text-[0.72rem] font-mono text-[rgba(201,168,76,0.5)]">{article.date}</span>
          </div>
        </div>

        {/* Content */}
        <div className="px-12 pt-10 pb-12">
          <h2 className="font-normal mb-6 leading-tight text-[clamp(1.6rem,3vw,2.4rem)]" style={{ color: cream }}>
            {article.title}
          </h2>

          {/* Author row */}
          <div className="flex items-center gap-5 pb-6 mb-8 border-b border-b-[rgba(201,168,76,0.1)]">
            <div className="w-11 h-11 rounded-full flex items-center justify-center text-lg shrink-0 bg-gradient-to-br from-[rgba(201,168,76,0.2)] to-[rgba(201,168,76,0.05)] border border-[rgba(201,168,76,0.2)]">
              {article.author.charAt(0)}
            </div>
            <div>
              <p className="m-0 text-[0.92rem]" style={{ color: cream }}>{article.author}</p>
              <p className="m-0 text-[0.78rem] opacity-60" style={{ color: dim }}>{article.authorRole}</p>
            </div>
            <div className="ml-auto text-[0.75rem] font-mono text-[rgba(201,168,76,0.45)]">
              ⏱ {article.readTime}
            </div>
          </div>

          <BodyBlocks body={article.body} />

          {/* Footer */}
          <div className="mt-10 pt-6 flex items-center flex-wrap gap-4 border-t border-t-[rgba(201,168,76,0.1)]">
            <div className="flex gap-2">
              <Tag>{article.tag}</Tag>
              <Tag color="#a8c9ad">{article.readTime}</Tag>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Focus (image gallery) Modal ────────────────────────────

export function FocusModal({ focusKey, modalsData, onClose }) {
  const [imgIdx, setImgIdx] = useState(0);
  const md = modalsData[focusKey];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  if (!md) return null;

  const prev = () => setImgIdx(p => (p - 1 + md.imgs.length) % md.imgs.length);
  const next = () => setImgIdx(p => (p + 1) % md.imgs.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-2xl bg-[rgba(3,6,5,0.92)]"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.97 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[rgba(201,168,76,0.2)]"
        style={{ background: bg.card }}
      >
        {/* Gold top bar */}
        <div className="h-0.5 rounded-t-2xl" style={{ background: G }} />

        {/* Image carousel */}
        <div className="relative overflow-hidden h-[20rem]">
          <AnimatePresence mode="wait">
            <motion.img
              key={imgIdx}
              src={md.imgs[imgIdx]}
              alt={md.title}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top,${bg.card},transparent 50%)` }} />

          {/* Prev */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200 bg-[rgba(3,6,5,0.75)] border border-[rgba(201,168,76,0.2)] hover:border-[rgba(201,168,76,1)]"
            style={{ color: cream }}
          >
            ‹
          </button>

          {/* Next */}
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200 bg-[rgba(3,6,5,0.75)] border border-[rgba(201,168,76,0.2)] hover:border-[rgba(201,168,76,1)]"
            style={{ color: cream }}
          >
            ›
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200 text-lg bg-[rgba(3,6,5,0.75)] border border-[rgba(201,168,76,0.2)] hover:border-[rgba(201,168,76,1)]"
            style={{ color: cream }}
          >
            ×
          </button>

          <h2 className="absolute bottom-6 left-8 text-4xl font-normal" style={{ color: cream }}>{md.title}</h2>
        </div>

        {/* Body */}
        <div className="p-8">
          {/* Dot indicators */}
          <div className="flex gap-1 justify-center mb-6">
            {md.imgs.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setImgIdx(i)}
                animate={{
                  width: i === imgIdx ? 26 : 6,
                  backgroundColor: i === imgIdx ? GOLD : "rgba(201,168,76,0.2)",
                }}
                transition={{ duration: 0.25 }}
                className="h-0.5 border-none rounded-[4px] cursor-pointer"
              />
            ))}
          </div>

          <p className="mb-4 text-[0.95rem] leading-[1.85] opacity-80" style={{ color: dim }}>{md.desc}</p>
          <p className="m-0 text-[0.88rem] leading-[1.85] opacity-65" style={{ color: dim }}>{md.facts.join(" — ")}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}