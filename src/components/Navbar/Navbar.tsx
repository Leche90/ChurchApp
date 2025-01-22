import React, { useEffect, useState} from 'react';
import './Navbar.css';
import logo from '../../assets/logo.jpg';
// import { Link } from'react-router-dom';

const Navbar: React.FC = () => {  
  const [sticky, setSticky] = useState(false); // State for sticky navigation bar
  const [click, setClick] = useState(false); // State for menu button click

  const handleClick = () => setClick(!click); // Function to handle menu button click

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    };
    window.addEventListener('scroll', handleScroll); // Add event listener on scroll
    return () => {
      window.removeEventListener('scroll', handleScroll); // Remove event listener on scroll
    };
  }, []);

  console.log('Navbar rendered');

  return (
    <nav className={`container ${sticky ? 'sticky' : ''}`}>
        <img src={logo} alt="Logo" className='logo' />
        <ul>
            <li><a href="/">HOME</a></li>
            <li><a href="https://www.kingmakersinternationalministries.com/about">ABOUT</a></li>
            <li><a href="https://www.kingmakersinternationalministries.com/teachings">TEACHINGS</a></li>
            <li><a href="https://www.kingmakersinternationalministries.com/events">EVENTS</a></li>
            <li><a href="https://www.kingmakersinternationalministries.com/contact">CONTACT</a></li>
            <button className="btn" onClick={handleClick}>GIVE</button>
        </ul>       
    </nav>
  );
};

export default Navbar;