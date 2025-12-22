import animalVideo from "../assets/animal.mp4";

function Home() {
  return (
    <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden ">


      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={animalVideo}
        autoPlay
        loop
        muted
      />

      {/* Overlay (dark layer for readability) */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      {/* Content on top of video */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">

        <h1 className="text-4xl font-bold text-white mb-4">
          Loss of Animal Habitat
        </h1>

        <p className="text-gray-200 max-w-2xl mb-6">
          Habitat loss is one of the major reasons behind the extinction and
          endangerment of wildlife species. This platform aims to spread
          awareness and promote conservation efforts.
        </p>

        <button className="bg-[#51846bf9] hover:bg-[#202422f9] text-white px-6 py-3 rounded-md">
          Learn More
        </button>

      </div>
    </div>
  );
}

export default Home;
