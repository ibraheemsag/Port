import { Link } from "react-router-dom";
import ToggleTheme from '../ToggleTheme/ToggleTheme';
import './Navbar.css';  // Add this import

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/image-editor">Image Editor</Link></li>
        <li><Link to="/arca">ARCA</Link></li>
        <li><Link to="/recommender-system">Movie Recommendation System</Link></li>
        <li><ToggleTheme /></li>
      </ul>
    </nav>
  );
};

export default Navbar;