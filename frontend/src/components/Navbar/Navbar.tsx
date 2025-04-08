import React, { useEffect, useState, useRef } from 'react'; // Import necessary routes from react
import './Navbar.css';
import logo from '../../assets/logo.jpg';
import { Link, useNavigate } from'react-router-dom'; // Import link from react-router-dom for routing within the app
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar: React.FC = () => {  // nabvar functional component
  const [sticky, setSticky] = useState(false); // State to track if the navbar is sticky (fixed at the top)
  const [click, setClick] = useState(false); // State to track whether the mobile menu is open or closed  
  const navigate = useNavigate(); //React router to navigate

  const menuItems = [
    { title: 'Home', link: '/' },
    {title: 'About', link: '/about' },
    {title: 'Teachings', link: '/teachings' },
    {title: 'Community Outreach', link: '/community-outreach' },
    { title: 'Prisons Mission', link: '/prisons-mission' },
    { title: 'Give', link: '/give' },
    { title: 'Contact', link: '/contact' }
  ]    

  // Toggle mobile menu
  const toggleMenu = () => {
    setClick(!click);
  };

  // Close mobile menu when clicked outside the dropdown menu
  const handleClickOutsideDropdown = (event: MouseEvent) => {
    if (eventsDropdownRef.current &&!eventsDropdownRef.current.contains(event.target as Node)) {
      setIsEventsDropdownOpen(false);
    }
  };

  const [isEventsDropdownOpen, setIsEventsDropdownOpen] = useState(false); // State to track dropdown visibility for events dropdown

  // Ref for dropdown menu
  const eventsDropdownRef = useRef<HTMLUListElement | null>(null);  

  useEffect(() => { // useEffect hook to handle scroll events
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;

        if (window.scrollY >= heroBottom) {
          setSticky(true);
          } else {
          setSticky(false);
          }
      }  
    };
    window.addEventListener('scroll', handleScroll); // Add event listener on scroll
    return () =>
      window.removeEventListener('scroll', handleScroll); // Remove event listener on scroll

  }, []); // Empty dependency array means this effect runs only once when the component mounts
 
    // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsEventsDropdownOpen(!isEventsDropdownOpen);
  };

  // Toggle dropdown visibility when clicked
  const toggleEventsDropdown = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent default link behavior
    setIsEventsDropdownOpen(!isEventsDropdownOpen);
  };

  // Toggle the mobile menu (hamburger menu
  const handleClick = () => setClick(!click);

  // Detect clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) =>{
      if (eventsDropdownRef.current && !eventsDropdownRef.current.contains(event.target as Node)) {
        setIsEventsDropdownOpen(false); // Close the dropdown if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    }, []);

  return (
    <nav key={sticky ? 'sticky' : 'not-sticky'} className={`container ${sticky ? 'sticky' : ''}`}> 
          {/* Logo as a link to the homepage */}
      <Link to="/" className='logo-link'> 
        <img src={logo} alt="Logo" className='logo' />
      </Link>
 
          {/* Hamburger icon and menu toggle for mobile */}
      <div className="hamburger" onClick={handleClick}>
        <div className={click ? 'bar toggle' : 'bar'}></div>
        <div className={click ? 'bar toggle' : 'bar'}></div>
        <div className={click ? 'bar toggle' : 'bar'}></div>
      </div>

      {/* Menu items and GIVE button */}
        <ul className={click ? 'nav-links active' : 'nav-links'}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/teachings">Teachings</Link></li>
            <li onClick={toggleEventsDropdown}>
              <Link to='/events' onClick={(e) => e.preventDefault()}>
              Events
              <i className='fa fa-caret-down'></i></Link>
                <ul 
                  ref={eventsDropdownRef}
                  className={`events-dropdown ${isEventsDropdownOpen ? 'active' : ''}`}>
                  <li><Link to="/community-outreach">Community Outreach</Link></li>
                  <li><Link to="/prisons-mission">Prisons Mission</Link></li>
                  <li><Link to="/special-programs">Special Programs</Link></li>
                </ul>              
            </li>
            <li><Link to="/contact">Contact</Link></li>
            <a href='https://members.faithpays.org/donate/FP8588921' target="_blank" rel="noopener noreferrer">
            <button className="give-btn" onClick={handleClick}>GIVE</button></a>
        </ul>       
    </nav>
  );
};

export default Navbar;
