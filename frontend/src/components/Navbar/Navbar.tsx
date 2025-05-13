import React, { useEffect, useState, useRef } from 'react';
import './Navbar.css';
import logowhite from '../../assets/logowhite.png';
import logoblack from '../../assets/logoblack.png';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars, faCaretDown } from '@fortawesome/free-solid-svg-icons';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEventsDropdownOpen, setIsEventsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const eventsDropdownRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Trigger at 50px scroll
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleEventsDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsEventsDropdownOpen(!isEventsDropdownOpen);
  };

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsEventsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (eventsDropdownRef.current && !eventsDropdownRef.current.contains(event.target as Node)) {
        setIsEventsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className='logo-link' onClick={closeAllMenus}>
        <img src={scrolled ? logoblack : logowhite} alt="Logo" className="logo" />
      </Link>

      {/* Mobile Hamburger Button */}
      <div className="hamburger" onClick={toggleMenu}>
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
      </div>

      {/* Navigation Links */}
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={closeAllMenus}>Home</Link></li>
        <li><Link to="/about" onClick={closeAllMenus}>About</Link></li>
        <li><Link to="/teachings" onClick={closeAllMenus}>Teachings</Link></li>
        <li className="dropdown-parent" onClick={toggleEventsDropdown}>
          <Link to='/events' onClick={(e) => e.preventDefault()}>
            Events
            <FontAwesomeIcon icon={faCaretDown} className="dropdown-icon" />
          </Link>
          <ul 
            ref={eventsDropdownRef}
            className={`events-dropdown ${isEventsDropdownOpen ? 'active' : ''}`}
          >
            <li><Link to="/community-outreach" onClick={closeAllMenus}>Community Outreach</Link></li>
            <li><Link to="/prisons" onClick={closeAllMenus}>Prisons Mission</Link></li>
            <li><Link to="/programs" onClick={closeAllMenus}>Special Programs</Link></li>
          </ul>
        </li>
        <li><Link to="/contact" onClick={closeAllMenus}>Contact</Link></li>
        <li className="give-btn-container">
          <a href='https://members.faithpays.org/donate/FP8588921' target="_blank" rel="noopener noreferrer">
            <button className="give-btn">GIVE</button>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;