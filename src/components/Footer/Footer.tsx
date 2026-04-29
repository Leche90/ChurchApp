import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Main */}
        <div className="footer-main">

          {/* Brand */}
          <div className="footer-brand-section">
            <h2 className="footer-logo">
              Kingmakers <br />
              <em>International Ministries</em>
            </h2>
            <p className="brand-tagline">…Raising Royalties</p>

            <div className="contact-info">
              <div className="contact-item">
                <FaMapMarkerAlt />
                <span>582 Burrows Avenue, Winnipeg, MB</span>
              </div>
              <div className="contact-item">
                <FaPhone />
                <a href="tel:+12043415567">(204) 341-5567</a>
              </div>
              <div className="contact-item">
                <FaEnvelope />
                <a href="mailto:kingmakersinternationalministries@gmail.com">
                  kingmakersinternationalministries@gmail.com
                </a>
              </div>
            </div>

            <div className="social-links">
              <a 
                href="https://www.facebook.com/profile.php?id=100075792504435" 
                target="_blank" rel="noreferrer" 
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a 
                href="https://www.youtube.com/@kingmakerstv6942" 
                target="_blank" rel="noreferrer" 
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div className="footer-nav-grid">
            <div className="footer-column">
              <h3><span className="col-dash" />Discover</h3>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/teachings">Teachings</Link>
            </div>

            <div className="footer-column">
              <h3><span className="col-dash" />Get Involved</h3>
              <Link to="/community-outreach">Community Outreach</Link>
              <Link to="/prisons">Prison Missions</Link>
              <Link to="/volunteer">Special Programs</Link>
            </div>

            <div className="footer-column">
              <h3><span className="col-dash" />Support</h3>
              <a 
                href="https://members.faithpays.org/donate/FP8588921" 
                target="_blank" rel="noopener noreferrer"
              >
                Give
              </a>
              <Link to="/partnership">Become a Partner</Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <span className="footer-bottom-line" />
          <span className="footer-legal">
            &copy; {currentYear} Kingmakers International Ministries. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;