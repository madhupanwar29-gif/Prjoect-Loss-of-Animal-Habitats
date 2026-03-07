import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import extinctData from "../data/extinctData";
import endangeredData from "../data/endangeredData";

function AnimalCard({ animal, index }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      onClick={() => navigate(`/${animal.page}#${animal.id}`)}
      className="relative flex-shrink-0 w-48 h-64 rounded-2xl overflow-hidden cursor-pointer group"
    >
      <img
        src={animal.image}
        alt={animal.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        onError={(e) => { e.target.src = "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg"; }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Name */}
      <div className="absolute bottom-0 inset-x-0 p-3 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-white font-semibold text-sm leading-tight drop-shadow-lg">
          {animal.name}
        </h3>
        <p className="text-green-300 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
          View details →
        </p>
      </div>
    </motion.div>
  );
}

function ScrollRow({ title, badgeColor, dotColor, animals, page }) {
  const mapped = animals.map((a, i) => ({
    id: a.id || `${page}-${i}`,
    name: a.name || a.title,
    image: a.image,
    page,
  }));

  return (
    <div className="mb-12">
      {/* Row header */}
      <div className="flex items-center gap-3 mb-4">
        <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${dotColor}`} />
        <h3 className="text-white font-bold text-lg">{title}</h3>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColor}`}>
          {animals.length} species
        </span>
      </div>

      {/* Horizontal scroll strip */}
      <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
        {mapped.map((animal, i) => (
          <AnimalCard key={`${page}-${animal.id}`} animal={animal} index={i} />
        ))}
      </div>
    </div>
  );
}

export default function AnimalGallery() {
  return (
    <section className="relative py-24 px-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm -z-10" />

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-green-400 uppercase tracking-widest text-xs font-semibold mb-3">
            Wildlife Archive
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Faces of the Lost &amp; Vulnerable
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Scroll through every species. Click any to learn their story.
          </p>
        </motion.div>

        {/* Extinct row */}
        <ScrollRow
          title="Extinct Species"
          badgeColor="bg-red-800/80 text-red-100"
          dotColor="bg-red-600"
          animals={extinctData}
          page="extinct"
        />

        {/* Endangered row */}
        <ScrollRow
          title="Endangered Species"
          badgeColor="bg-amber-700/80 text-amber-100"
          dotColor="bg-amber-500"
          animals={endangeredData}
          page="endangered"
        />

      </div>
    </section>
  );
}