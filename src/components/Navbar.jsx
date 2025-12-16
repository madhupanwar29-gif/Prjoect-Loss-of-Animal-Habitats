function Navbar() {
  return (
    <nav style={{ padding: "15px", backgroundColor: "#05341dff", color: "white" }}>
      <h1>Loss of Animal Habitat</h1>

      <ul style={{ display: "flex", gap: "25px", listStyle: "none" }}>
        <li>Home</li>
        <li>Extinct Animals</li>
        <li>Endangered Animals</li>
        <li>Sanctuaries</li>
        <li>Government Initiative</li>
        <li>Feedback</li>
      </ul>
    </nav>
  );
}

export default Navbar;
