import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import './Navbar.css';
import logowhite from '../../assets/logowhite.png';
import logoblack from '../../assets/logoblack.png';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEventsDropdownOpen, setIsEventsDropdownOpen] = useState(false);
  const eventsParentRef = useRef<HTMLLIElement | null>(null);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        eventsParentRef.current &&
        !eventsParentRef.current.contains(event.target as Node)
      ) {
        setIsEventsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const toggleEventsDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEventsDropdownOpen((prev) => !prev);
  };

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsEventsDropdownOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo-link" onClick={closeAllMenus}>
          <img
            src={scrolled || isMenuOpen ? logoblack : logowhite}
            alt="Kingmakers International Ministries"
            className="navbar-logo"
          />
        </Link>

        {/* Hamburger (mobile) */}
        <button
          className="navbar-hamburger"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Nav links */}
        <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" onClick={closeAllMenus}>Home</Link>
          </li>
          <li>
            <Link to="/about" onClick={closeAllMenus}>About</Link>
          </li>
          <li>
            <Link to="/sermons" onClick={closeAllMenus}>Sermons</Link>
          </li>

          {/* Events dropdown */}
          <li 
            ref={eventsParentRef}
            className={`navbar-dropdown-parent ${isEventsDropdownOpen ? 'open' : ''}`}
          >
            <button
              className="navbar-dropdown-trigger"
              onClick={toggleEventsDropdown}
              aria-haspopup="true"
              aria-expanded={isEventsDropdownOpen}
            >
              <span>Events</span>
              <ChevronDown 
                size={14} 
                className={`navbar-dropdown-icon ${isEventsDropdownOpen ? 'rotated' : ''}`}
              />
            </button>

            <ul className={`navbar-dropdown ${isEventsDropdownOpen ? 'active' : ''}`}>
              <li>
                <Link to="/community-outreach" onClick={closeAllMenus}>                  
                  <span className="navbar-dropdown-label">Community Outreach</span>
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/contact" onClick={closeAllMenus}>Contact</Link>
          </li>

          <li className="navbar-give-wrap">
            <a
              href="https://members.faithpays.org/donate/FP8588921"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-give-btn"
              onClick={closeAllMenus}
            >
              GIVE
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;