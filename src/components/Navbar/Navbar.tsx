import React, { useEffect, useState} from 'react'; // Import necessary routes from react
import './Navbar.css';
import logo from '../../assets/logo.jpg';
import { Link } from'react-router-dom'; // Import link from react-router-dom for routing within the app

const Navbar: React.FC = () => {  // nabvar functional component
  const [sticky, setSticky] = useState(false); // State to track if the navbar is sticky (fixed at the top)
  const [click, setClick] = useState(false); // State to track whether the mobile menu is open or closed
  const [searchText, setSearchText] = useState(''); // State to track the search input text
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to track dropdown visibility for search
  const [isEventsDropdownOpen, setIsEventsDropdownOpen] = useState(false); // State to track dropdown visibility for events dropdown

  const handleClick = () => setClick(!click); // Toggle the menu open/close when hamburger is clicked

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
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/teachings">Teachings</a></li>
            <li onClick={toggleEventsDropdown}>
              <a href='/events' onClick={(e) => e.preventDefault()}>
              Events
              <i className='fa fa-caret-down'></i></a>
                <ul className={`events-dropdown ${isEventsDropdownOpen ? 'active' : ''}`}>
                  <li><a href="/events/barbeque">Barbeque</a></li>
                  <li><a href="/events/lorem">Lorem</a></li>
                  <li><a href="/events/ipsum">Ipsum</a></li>
                </ul>              
            </li>
            <li><a href="http://localhost:5173/contact">Contact</a></li>
            <a href='https://members.faithpays.org/donate/FP8588921' target="_blank" rel="noopener noreferrer">
            <button className="btn" onClick={handleClick}>GIVE</button></a>
        </ul>       
    </nav>
  );
};

export default Navbar;