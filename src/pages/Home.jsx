import animalVideo from "../assets/animal.mp4";
import { motion } from "framer-motion";
import AnimalSpecies from "../components/AnimalSearch";
import AnimalGallery from "../components/AnimalGallery";
import AnimalVoices from "../components/AnimalVoices";

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}

    >

      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center h-screen text-center px-6 overflow-hidden">

        <video
          className="absolute top-0 left-0 w-full h-full object-cover object-center -z-20"
          src={animalVideo}
          autoPlay
          loop
          muted
          playsInline
        />

        <div className="absolute inset-0 bg-black/50 -z-10" />

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">
            Loss of Animal Habitat
          </h1>

          <p className="text-gray-300 max-w-2xl text-lg leading-relaxed mb-8">
            Habitat loss is one of the major reasons behind the extinction and
            endangerment of wildlife species. This platform aims to spread
            awareness and promote conservation efforts.
          </p>

          <AnimalSpecies />
        </motion.div>

        {/* Smooth fade into next section */}
        <div className="absolute bottom-0 w-full h-40 bg-gradient-to-b from-transparent to-[#0f1b13]" />
      </section>

      {/* WHY HABITAT LOSS */}
      <section
        id="info-section"
        className="py-24 px-6 bg-gradient-to-b from-[#0f1b13] to-[#2a2418]"
      >
        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Why Habitat Loss Matters
          </h2>

          <p className="text-gray-200 leading-relaxed text-lg">
            Forest clearing, urban expansion, agriculture, and climate change
            are rapidly destroying the natural homes of wildlife. When animals
            lose their habitats, they struggle to survive, reproduce, and
            maintain ecological balance.
          </p>

          <div className="grid md:grid-cols-3 gap-12 px-7 py-16">

            <div className="bg-[#235c18] border hover:bg-[#608127] border-yellow-400 backdrop-blur-md p-8 rounded-2xl shadow-xl">
              <h3 className="text-4xl font-bold mb-3 text-green-300">
                1M+
              </h3>
              <p className="text-gray-200">
                Species threatened with extinction globally.
              </p>
            </div>

            <div className="bg-[#235c18] border hover:bg-[#608127] border-yellow-400 backdrop-blur-md p-8 rounded-2xl shadow-xl">
              <h3 className="text-4xl font-bold mb-3 text-emerald-300">
                15B
              </h3>
              <p className="text-gray-200">
                Trees cut down every year worldwide.
              </p>
            </div>

            <div className="bg-[#235c18] border hover:bg-[#608127] border-yellow-400 backdrop-blur-md p-8 rounded-2xl shadow-xl">
              <h3 className="text-4xl font-bold mb-3 text-lime-300">
                75%
              </h3>
              <p className="text-gray-200">
                Land surface altered significantly by humans.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* VOICES OF THE WILD */}
      <section className="py-24 bg-gradient-to-b from-[#2a2418] to-[#7f4f0c] text-black">
        <AnimalVoices />
      </section>

      {/* BE PART OF CHANGE */}
      <section className="py-28 px-6 text-center bg-gradient-to-b from-[#7f4f0c] to-[#141c04] text-white">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Be Part of the Change
          </h2>

          <p className="text-gray-200 max-w-2xl mx-auto mb-16 text-lg">
            Change does not begin with governments or corporations. It begins
            with awareness, responsibility, and everyday choices.
          </p>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="bg-[#2f3e2f]/70 hover:bg-[#1a8b4f] backdrop-blur-lg p-8 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">🌳</div>
              <h3 className="text-xl font-semibold mb-3">Protect Forests</h3>
              <p className="text-gray-200 text-sm">
                Support sustainable products and reduce demand for industries
                that destroy natural ecosystems.
              </p>
            </div>

            <div className="bg-[#2f3e2f]/70 hover:bg-[#1a8b4f] backdrop-blur-lg p-8 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">🌊</div>
              <h3 className="text-xl font-semibold mb-3">Preserve Water</h3>
              <p className="text-gray-200 text-sm">
                Protect rivers, lakes, and oceans from pollution that damages
                fragile wildlife habitats.
              </p>
            </div>

            <div className="bg-[#2f3e2f]/70 hover:bg-[#1a8b4f] backdrop-blur-lg p-8 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">🌎</div>
              <h3 className="text-xl font-semibold mb-3">Spread Awareness</h3>
              <p className="text-gray-200 text-sm">
                Educating others creates ripple effects that can influence
                communities and protect species.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* GALLERY */}
      <section className="py-24 bg-gradient-to-b from-[#141c04] to-[#1a1813]">
        <AnimalGallery />
      </section>

      {/* FOOTER */}
      <section className="px-10 py-24 bg-gradient-to-b from-[#1a1813] to-black">

        <div className="grid md:grid-cols-3 gap-16 text-center">

          <div>
            <h3 className="text-3xl font-bold mb-6 text-green-400">
              About Us
            </h3>

            <p className="text-gray-300">
              We aim to spread awareness about the loss of wildlife habitats
              and encourage people to take action for nature.
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold mb-6 text-green-400">
              Our Mission
            </h3>

            <p className="text-gray-300">
              Our mission is to highlight the growing destruction of
              forests and inspire people to protect the homes of
              countless animal species.
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold mb-6 text-green-400">
              Contact Us
            </h3>

            <p className="text-gray-300">
              wildlife@email.com
            </p>

            <p className="text-gray-300">
              conservation@email.com
            </p>
          </div>

        </div>

      </section>

    </motion.div>
  );
}

export default Home;