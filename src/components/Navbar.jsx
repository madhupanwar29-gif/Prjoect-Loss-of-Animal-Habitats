function Navbar() {
  return (
   <nav className="bg-[#0f2a1d]/95 text-white px-6 py-4 flex justify-between items-center">

      
      <h1 className="text-xl font-bold">
        Loss of Animal Habitat
      </h1>

      <ul className="flex gap-6 text-sm">
        <li className="cursor-pointer hover:text-green-300">Home</li>
        <li className="cursor-pointer hover:text-green-300">Extinct Animals</li>
        <li className="cursor-pointer hover:text-green-300">Endangered Animals</li>
        <li className="cursor-pointer hover:text-green-300">Sanctuaries</li>
        <li className="cursor-pointer hover:text-green-300">Government Initiative</li>
        <li className="cursor-pointer hover:text-green-800">Feedback</li>
      </ul>

    </nav>
  );
}

export default Navbar;



