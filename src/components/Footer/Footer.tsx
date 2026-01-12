import React from 'react'
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa6'
import XLogo from '../../assets/XLogo.png';
import './Footer.css'
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        {/* Brand and Social Links */}
        <div  className='footer-top'>
          <h2 className='footer-brand'>Follow us</h2>
          <div className='social-links'>
            <a href='https://www.facebook.com/kingmakersintministries/' target='_blank' rel='noopener noreferrer'><FaFacebookF /></a>
            <a href='https://x.com/kingmakersintministries/' target='_blank' rel='noopener noreferrer'><img src={XLogo} alt='X Logo' width={13} height={13} /></a>
            <a href='https://www.instagram.com/kingmakersintministries/' target='_blank' rel='noopener noreferrer'><FaInstagram /></a>
            <a href='https://www.linkedin.com/company/kingmakers-international-ministries/' target='_blank' rel='noopener noreferrer'><FaLinkedin /></a>
            <a href='https://www.youtube.com/@kingmakerstv6942' target='_blank' rel='noopener noreferrer'><FaYoutube /></a>            
          </div>
      </div>

      {/* Navigation columns */}
      <div className='footer-links'>
        <div className='footer-column'>
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/teachings">Teachings</Link>
          <Link to="/contact">Contact</Link>
      </div>

      {/* Footer Column */}
    <div className='footer-column'>
      <h4>Events</h4>
      <Link to="/community-outreach">Community Outreach</Link>
      <Link to="/prisons">Prisons Mission</Link>
      <Link to="/programs">Special Programs</Link>
      </div>

      <div className='footer-column'>
        <h4>Support</h4>
        <a href='https://members.faithpays.org/donate/FP8588921' target="_blank" rel="noopener noreferrer">Give</a>
      </div>
    </div>

      {/* Navigation Links */}
       <div className='footer-bottom'>
         <p>&copy; {new Date().getFullYear()} Kingmakers International Ministries. All rights reserved.</p>
       </div>
      </div>
    </footer>
  );
};

export default Footer