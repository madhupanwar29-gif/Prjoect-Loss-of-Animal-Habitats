import React from "react";
import React from 'react'

const extinct_animals = () => {
  return (
    <div>
      hii im tanvi
    </div>
  )
}

//export default extinct_animals

const extinctAnimals = [
  {
    name: "Dodo",
    year: "1681",
    reason: "Hunting and habitat destruction",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Dodo_1.JPG",
  },
  {
    name: "Woolly Mammoth",
    year: "2000 BCE",
    reason: "Climate change and human hunting",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Woolly_mammoth.jpg",
  },
  {
    name: "Tasmanian Tiger",
    year: "1936",
    reason: "Overhunting and habitat loss",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Thylacine.jpg",
  },
];

const ExtinctAnimals = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center text-green-700 mb-4">
        Extinct Animals
      </h1>

      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        These animals once lived on Earth but have disappeared forever due to
        human activities, climate change, and habitat destruction.
      </p>

      {/* Cards Section */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {extinctAnimals.map((animal, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={animal.image}
              alt={animal.name}
              className="h-52 w-full object-cover"
            />

            <div className="p-5">
              <h2 className="text-2xl font-semibold text-gray-800">
                {animal.name}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Extinct since: <span className="font-medium">{animal.year}</span>
              </p>

              <p className="mt-3 text-gray-600 text-sm">
                <span className="font-semibold">Reason:</span> {animal.reason}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExtinctAnimals;
