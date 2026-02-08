import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // Modern X icon from react-icons
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Section: Brand & Newsletter (Stripe Style) */}
        <div className="footer-brand-section">
          <div className="brand-info">
            <h2 className="footer-logo">Kingmakers</h2>
            <p className="brand-tagline">Empowering lives through faith and service.</p>
            <div className="social-links">
              <a href="https://facebook.com/..." target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
              <a href="https://x.com/..." target="_blank" rel="noreferrer" aria-label="X"><FaXTwitter /></a>
              <a href="https://instagram.com/..." target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://linkedin.com/..." target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href="https://youtube.com/..." target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube /></a>
            </div>
          </div>
        </div>

        {/* Middle Section: Multi-column Navigation */}
        <div className="footer-nav-grid">
          <div className="footer-column">
            <h3>Resources</h3>
            <Link to="/">Home</Link>
            <Link to="/about">Our Story</Link>
            <Link to="/teachings">Teachings</Link>
            <Link to="/contact">Get in Touch</Link>
          </div>

          <div className="footer-column">
            <h3>Outreach</h3>
            <Link to="/community-outreach">Community</Link>
            <Link to="/prisons">Prison Missions</Link>
            <Link to="/programs">Special Programs</Link>
          </div>

          <div className="footer-column">
            <h3>Support</h3>
            <a href="https://members.faithpays.org/..." target="_blank" rel="noopener">Online Giving</a>
            <Link to="/volunteer">Volunteer</Link>
            <Link to="/faq">FAQs</Link>
          </div>
        </div>

        {/* Bottom Section: Legal & Credits */}
        <div className="footer-bottom">
          <div className="footer-legal">
            <span>&copy; {currentYear} Kingmakers International Ministries.</span>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;