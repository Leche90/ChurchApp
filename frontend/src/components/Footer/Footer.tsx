import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa6'
import './Footer.css'

const Footer: React.FC = () => {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        {/* Brand and Social Links */}
        <div  className='footer-top'>
          <h2 className='footer-brand'>Kingmakers' International Ministries</h2>
          <div className='social-links'>
            <a href='https://www.facebook.com/kingmakersintministries/' target='_blank' rel='noopener noreferrer'><FaFacebookF /></a>
            <a href='https://www.twitter.com/kingmakersintministries/' target='_blank' rel='noopener noreferrer'><FaTwitter /></a>
            <a href='https://www.instagram.com/kingmakersintministries/' target='_blank' rel='noopener noreferrer'><FaInstagram /></a>
            <a href='https://www.linkedin.com/company/kingmakers-international-ministries/' target='_blank' rel='noopener noreferrer'><FaLinkedin /></a>
            <a href='https://www.youtube.com/@kingmakerstv6942' target='_blank' rel='noopener noreferrer'><FaYoutube /></a>            
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