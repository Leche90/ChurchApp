import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import './Footer.css';

const Footer: React.FC = () => {    
  const currentYear = new Date().getFullYear();  

  return (
    <footer className="footer">

      <div className="footer-container">
        
        {/* CTA Banner Section */}
        <div className="footer-cta-banner">
          <div className="cta-content">
            <h2>Stay Connected</h2>
            <p className='footer-paragraph'>We keep you informed about upcoming events, inspirational messages, and community updates.</p>
          </div>                    
        </div>

        {/* Main Footer Content */}
        <div className="footer-main">
          
          {/* Brand Section */}
          <div className="footer-brand-section">
            <h2 className="footer-logo">Kingmakers International Ministries</h2>
            <p className="brand-tagline">...Raising Royalties</p>
            
            <div className="contact-info">
              <div className="contact-item">
                <FaMapMarkerAlt />
                <span>582 Burrows Avenue, Winnipeg, MB</span>
              </div>
              <div className="contact-item">
                <FaPhone />
                <a href="tel:+12045551234">(204) 341-5567</a>
              </div>
              <div className="contact-item">
                <FaEnvelope />
                <a href="mailto:info@kingmakers.org">kingmakersinternationalministries@gmail.com</a>
              </div>
            </div>

            <div className="social-links">
              <a href="https://facebook.com/..." target="_blank" rel="noreferrer" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://x.com/..." target="_blank" rel="noreferrer" aria-label="X">
                <FaXTwitter />
              </a>
              <a href="https://instagram.com/..." target="_blank" rel="noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com/..." target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="https://youtube.com/..." target="_blank" rel="noreferrer" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Navigation Grid */}
          <div className="footer-nav-grid">
            <div className="footer-column">
              <h3>Discover</h3>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/teachings">Teachings</Link>
            </div>

            <div className="footer-column">
              <h3>Get Involved</h3>
              <Link to="/community-outreach">Community Outreach</Link>
              <Link to="/prisons">Prison Missions</Link>
              <Link to="/volunteer">Special Programs</Link>
            </div>

            <div className="footer-column">
              <h3>Support</h3>
              <a href="https://members.faithpays.org/donate/FP8588921" target="_blank" rel="noopener">Give</a>
              <Link to="/partnership">Become a Partner</Link>
            </div>
          </div>
        </div>

        {/* Trust Badges Section */}
        <div className="footer-trust-section">
          <div className="trust-badge">
            <div className="badge-icon">🔒</div>
            <div className="badge-text">
              <strong>Secure Giving</strong>
              <span>Encrypted & PCI Compliant</span>
            </div>
          </div>
          <div className="trust-badge">
            <div className="badge-icon">✓</div>
            <div className="badge-text">
              <strong>Tax Receipts</strong>
              <span>Generated Yearly</span>
            </div>
          </div>          
        </div>

        {/* Bottom Legal Section */}
        <div className="footer-bottom">
          <div className="footer-legal">
            <span>&copy; {currentYear} Kingmakers International Ministries. All rights reserved.</span>            
          </div>          
        </div>
      </div>
    </footer>
  );
};

export default Footer;