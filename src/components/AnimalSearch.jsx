import { useState } from "react";
import { useNavigate } from "react-router-dom";
import extinctData from "../data/extinctData";
import endangeredData from "../data/endangeredData";

export default function AnimalSpecies() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const animals = [
    ...extinctData.map((animal) => ({
      title: animal.title,
      id: animal.id,
      page: "extinct",
      type: animal.type || "",
      keywords: animal.keywords || [],
      status: "Extinct",
    })),
    ...endangeredData.map((animal) => ({
      title: animal.name,
      id: animal.id,
      page: "endangered",
      type: animal.type || "",
      keywords: animal.keywords || [],
      status: "Endangered",
    })),
  ];

  const query = search.trim().toLowerCase();

  const filtered = query
    ? animals.filter((animal) => {
        const titleMatch = animal.title?.toLowerCase().includes(query);
        const typeMatch = animal.type?.toLowerCase().includes(query);
        const keywordMatch = animal.keywords?.some(
          (keyword) => keyword && keyword.toLowerCase().includes(query)
        );
        return titleMatch || typeMatch || keywordMatch;
      })
    : [];

  const handleClick = (animal) => {
    navigate(`/${animal.page}#${animal.id}`);
    setSearch("");
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">

      {/* INPUT */}
      <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-xl focus-within:border-green-400/60 focus-within:ring-2 focus-within:ring-green-400/20 transition-all duration-300">
        <span className="pl-5 text-gray-400 text-xl select-none">🔍</span>

        <input
          type="text"
          placeholder="Search animals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-white placeholder-gray-400 px-4 py-4 outline-none text-base"
        />

        {search && (
          <button
            onClick={() => setSearch("")}
            className="px-4 text-gray-400 hover:text-white transition text-lg"
          >
            ✕
          </button>
        )}
      </div>

      {/* DROPDOWN */}
      {query && (
        <div className="absolute w-full mt-2 rounded-2xl overflow-hidden shadow-2xl z-50
                        bg-gray-900/95 backdrop-blur-md border border-white/10">
          {filtered.length > 0 ? (
            filtered.slice(0, 8).map((animal) => (
              <div
                key={`${animal.page}-${animal.id}`}
                onClick={() => handleClick(animal)}
                className="flex items-center justify-between px-5 py-3 cursor-pointer
                           hover:bg-white/10 border-b border-white/5 last:border-b-0
                           transition-colors duration-150"
              >
                <span className="text-white text-sm font-medium">{animal.title}</span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold
                  ${animal.status === "Extinct"
                    ? "bg-red-800/70 text-red-200"
                    : "bg-amber-700/70 text-amber-200"
                  }`}>
                  {animal.status}
                </span>
              </div>
            ))
          ) : (
            <div className="px-5 py-4 text-gray-400 text-sm">No animals found</div>
          )}
        </div>
      )}

    </div>
  );
}