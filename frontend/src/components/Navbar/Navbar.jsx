import { Link } from "react-router-dom";
import { useEffect, useRef } from 'react';
import ToggleTheme from '../ToggleTheme/ToggleTheme';
import './Navbar.css'; 
import { useState } from 'react';
import useResponsive from '../../hooks/useResponsive';
import { detectSwipe } from '../../utils/touchEvents';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navbarRef = useRef(null);
  const { isMobile, isTablet } = useResponsive();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target) && menuOpen) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // Add swipe detection for mobile
  useEffect(() => {
    if (isMobile || isTablet) {
      detectSwipe(document.body, (direction) => {
        if (direction === 'left' && menuOpen) {
          setMenuOpen(false);
        } else if (direction === 'right' && !menuOpen) {
          setMenuOpen(true);
        }
      });
    }
  }, [isMobile, isTablet, menuOpen]);

  // Add body class for menu open state and prevent scrolling
  useEffect(() => {
    if (menuOpen && (isMobile || isTablet)) {
      document.body.classList.add('menu-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
    };
  }, [menuOpen, isMobile, isTablet]);

  return (
    <nav className="navbar" ref={navbarRef}>
      <div className="navbar-brand">
        <Link to="/" className="site-title">
          <span className="site-logo">🎨</span>
          <span>Ibraheem's Portfolio</span>
        </Link>
        <button 
          className="mobile-menu-toggle" 
          onClick={toggleMenu} 
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`hamburger-icon ${menuOpen ? 'open' : ''}`}></span>
        </button>
      </div>
      <ul className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/image-editor" onClick={() => setMenuOpen(false)}>Image Editor</Link></li>
        <li><Link to="/arca" onClick={() => setMenuOpen(false)}>ARCA</Link></li>
        <li><Link to="/recommender-system" onClick={() => setMenuOpen(false)}>Movie Recommendation System</Link></li>
        <li><ToggleTheme /></li>
      </ul>
    </nav>
  );
};

export default Navbar;