import animalVideo from "../assets/animal.mp4";

function Home() {
  return (
    <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden ">

    <input type ="text" placeholder="Enter Endangered or Exitinct Animals" className = "text-right w-90 h-50 m-4 p-2 rounded-md z-20 absolute top-0 right-0"/>
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

        <h1 className="text-4xl font-bold text-gray-400 mb-4">
          Loss of Animal Habitat
        </h1>

        <p className="text-gray-300 max-w-2xl mb-6">
          Habitat loss is one of the major reasons behind the extinction and
          endangerment of wildlife species. This platform aims to spread
          awareness and promote conservation efforts.
        </p>

      

      </div>
    </div>
  );
}

export default Home;
