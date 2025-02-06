import { Link } from "react-router-dom";
import ToggleTheme from '../ToggleTheme/ToggleTheme';
import './Navbar.css';  // Add this import

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><ToggleTheme /></li>
      </ul>
    </nav>
  );
};

export default Navbar;