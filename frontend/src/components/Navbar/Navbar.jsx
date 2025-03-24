import { Link } from "react-router-dom";
import ToggleTheme from '../ToggleTheme/ToggleTheme';
import './Navbar.css';  // Add this import

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="site-title">
          <span className="site-logo">🎨</span>
          <span>Ibraheem's Portfolio</span>
        </Link>
      </div>
      <ul className="navbar-menu">
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