import { Link } from "react-router-dom";
import logo from "../assets/Logo.png"; 
import "../Components/Navbar.css"; 

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Elkido Live Updates" />
        <h1>Elkido Live Updates</h1>
      </div>

      <div className="navbar-links">
        <Link to="/">Live Scores</Link>
        <Link to="/table">EPL Table</Link>
        <Link to="/players">Top Assists</Link>
      </div>
    </nav>
  );
}

export default Navbar;
