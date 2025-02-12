import React, { useEffect, useState, useRef } from 'react'; // Import necessary routes from react
import './Navbar.css';
import logo from '../../assets/logo.jpg';
import { Link } from'react-router-dom'; // Import link from react-router-dom for routing within the app

const Navbar: React.FC = () => {  // nabvar functional component
  const [sticky, setSticky] = useState(false); // State to track if the navbar is sticky (fixed at the top)
  const [click, setClick] = useState(false); // State to track whether the mobile menu is open or closed
  const [searchText, setSearchText] = useState(''); // State to track the search input text
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to track dropdown visibility for search
  const [isEventsDropdownOpen, setIsEventsDropdownOpen] = useState(false); // State to track dropdown visibility for events dropdown

  // Ref for dropdown menu
  const eventsDropdownRef = useRef<HTMLUListElement | null>(null);  

  useEffect(() => { // useEffect hook to handle scroll events
    const handleScroll = () => {
      window.scrollY > 50 ? setSticky(true) : setSticky(false); // If scrolled more than 50px, make navbar sticky
    };
    window.addEventListener('scroll', handleScroll); // Add event listener on scroll
    return () => {
      window.removeEventListener('scroll', handleScroll); // Remove event listener on scroll
    };
  }, []); // Empty dependency array means this effect runs only once when the component mounts

   // Handle search input change
   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

    // Toggle focus for the search bar
    const handleSearchFocus = () => {
    setSearchText(searchText); // Trigger focus event
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
    <nav className={`container ${sticky ? 'sticky' : ''}`}> 
          {/* Logo as a link to the homepage */}
      <Link to="/" className='logo-link'> 
        <img src={logo} alt="Logo" className='logo' />
      </Link>

      {/* Search Bar */}
      <div className={`search ${searchText.length > 0 ? 'focused' : ''}`}>
        <input
          type="text"
          className="search-textbox"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearchChange}
          onFocus={handleSearchFocus}
        />
        {searchText.length > 0 && (
          <button className="ico-btn clear-btn" onClick={() => setSearchText('')}>
            <i className="material-icons ic_clear">&#xE14C;</i>
          </button>
        )}
        {searchText.length === 0 && (
          <button className="ico-btn search-btn">
            <i className="material-icons ic_search">&#xE8B6;</i>
          </button>
        )}
      </div>

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
                  <li><Link to="/community_outreach">Community Outreach</Link></li>
                  <li><Link to="/prisons_mission">Prisons Mission</Link></li>
                  <li><Link to="/special_programs">Special Programs</Link></li>
                </ul>              
            </li>
            <li><Link to="/contact">Contact</Link></li>
            <a href='https://members.faithpays.org/donate/FP8588921' target="_blank" rel="noopener noreferrer">
            <button className="btn" onClick={handleClick}>GIVE</button></a>
        </ul>       
    </nav>
  );
};

export default Navbar;
