import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#1e3d59", color: "white" }}>
      <h2>UBoundFree</h2>
      <Link to="/" style={{ margin: "10px", color: "white" }}>Home</Link>
      <Link to="/travel" style={{ margin: "10px", color: "white" }}>Travel</Link>
      <Link to="/food" style={{ margin: "10px", color: "white" }}>Food</Link>
      <Link to="/nature" style={{ margin: "10px", color: "white" }}>Nature</Link>
    </nav>
  );
}

export default Navbar;
