import React, { useEffect, useState, useRef } from 'react';
import Typed from 'typed.js';
import { Play, X, BookOpen, Church, Heart, Video, Headphones, ArrowRight } from 'lucide-react';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import './Home.css';

// Assets
import August from '../../assets/August.jpg';
import June from '../../assets/optimized/June.webp';
import July from '../../assets/July.jpg';
import treasures from '../../assets/treasures.png';
import effective from '../../assets/effective.png';
import transformation from '../../assets/transformation.png';
import leader from '../../assets/leader.jpg';
import welcome from '../../assets/welcome.jpg';
import hero1 from '../../assets/hero1.jpg';
import hero3 from '../../assets/hero3.jpg';

const Home: React.FC = () => {
  const typedRef = useRef<HTMLSpanElement | null>(null);
  const [currentBg, setCurrentBg] = useState(0);
  const heroImages = [hero1, hero3];
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [eventModalOpen, setEventModalOpen] = useState(false);

  // Parallax Effect
  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector('.hero') as HTMLElement;
      if (hero) {
        const scrollY = window.scrollY;
        hero.style.backgroundPositionY = `${scrollY * 0.5}px`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Background Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Typed JS
  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Rooted in Christ, we stand as one; growing in faith, walking in love, and shining His light to the world.",
        "At Kingmakers, every heart matters, every soul has a purpose, and together, we reign in His grace.",
        "We invite you to come and fellowship with us.",
      ],
      typeSpeed: 40,
      backSpeed: 25,
      backDelay: 2000,
      loop: true,
    });
    return () => typed.destroy();
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const services = [
    { title: 'Sunday Morning', times: ['10:00 AM'], color: 'blue' },
    { title: 'Friday Evening', times: ['6:00 PM'], color: 'blue' },
  ];

  const word = [
    { title: 'Treasures in My Heart', youtubeLink: 'https://www.youtube.com/watch?v=oHO-6y2ySpA', image: treasures },
    { title: 'Effective Prayers', youtubeLink: 'https://www.youtube.com/watch?v=otLDqDnZL1s', image: effective },
    { title: 'Divine Transformation', youtubeLink: 'https://www.youtube.com/watch?v=2C-SPh3M718', image: transformation },
  ];

  const eventImages = [
    { src: June, 
      alt: "Faith & Flames", 
      month: "JUN", 
      day: 14, 
      time: "5:00 PM", 
      location: "582 Burrows Avenue"
    },
    { src: July, 
      alt: "Gospel & Grill", 
      month: "JUL", 
      day: 19, 
      time: "5:00 PM", 
      location: "582 Burrows Avenue"
    },
    { src: August, 
      alt: "Feast & Fellowship", 
      month: "AUG", 
      day: 16, 
      time: "5:00 PM", 
      location: "582 Burrows Avenue"
    }
  ];

  return (
    <div className="home">
      <section 
        className="hero" 
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0.4) 100%), url(${heroImages[currentBg]})` }}
      >
        <div className="hero-content">
          <div className="hero-text-align">
            <span className="hero-eyebrow">A PLACE TO BELONG</span>
            <h1 className="hero-title">WE ARE FAMILY</h1>
            <p className="hero-subtitle">
              <span ref={typedRef}></span>
            </p>
            
            <div className="hero-cta-group">
              <a href="https://www.youtube.com/@kingmakerstv6942" target="_blank" rel="noopener noreferrer" className="btn-primary">
                <Video size={20} /> WATCH LIVE
              </a>              
            </div>            
          </div>
        </div>

        {/* TRUST BAR */}
        <div className="trust-bar">
          <div className="trust-item">
            <BookOpen size={20} className="trust-icon" />
            <span>Biblical Teaching</span>
          </div>
          <div className="trust-divider"></div>
          <div className="trust-item">
            <Church size={20} className="trust-icon" />
            <span>Community-Focused</span>
          </div>
          <div className="trust-divider"></div>
          <div className="trust-item">
            <Heart size={20} className="trust-icon" />
            <span>Christ-Centered Worship</span>
          </div>
        </div>
      </section>

      {/* Service Times Section */}
      <section className="service-immersive">
        <div className="service-header-wrap">
          <span className="elevation-eyebrow">EXPERIENCE THE PRESENCE</span>
          <h2 className="service-main-heading">Weekly Gatherings</h2>
          <p className="service-tagline">
            Whether in-person or online, there is a place for you to encounter God 
            and discover your purpose.
          </p>
        </div>

              {/* SERVICE TIMES */}
        <div className="service-list-container">
          {services.map((service, index) => (
            <div key={index} className="service-row">
              <div className="service-row-left">
                {/* <span className="service-index">0{index + 1}</span> */}
                <h3 className="service-row-title">{service.title}</h3>
              </div>
              
              <div className="service-row-divider"></div>
              
              <div className="service-row-right">
                {service.times.map((time, i) => (
                  <span key={i} className="service-row-time">{time}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="service-footer-note">
          <p>All times are in CST. </p>
        </div>
      </section>

      {/* Welcome Section - Elevation Style */}
      <section className="welcome-immersive">
        <div className="welcome-split">
          
          <div className="welcome-visual-stack">
            <div className="main-image-wrapper">
              <img src={welcome} alt="Our Community" className="elevation-img-main" />
            </div>
            {/* Floating accent - typical Elevation design element */}
            <div className="elevation-accent-box">
              <p className="accent-quote">"A place where everyone is welcome, because nobody is perfect."</p>
            </div>
          </div>

          <div className="welcome-text-side">
            <div className="elevation-content-wrap">
              <span className="elevation-eyebrow">WELCOME HOME</span>
              <h2 className="elevation-heading">We're glad <br/> you're here</h2>
              <div className="elevation-divider"></div>
              <p className="welcome-desc">
                At Kingmakers International Ministries, we believe in the power of community 
                and the transformative love of Jesus Christ. 
              </p>
              <p className="welcome-desc">
                Whether you're exploring faith for the first time or looking for a place to call home, 
                <strong> there is a seat for you.</strong>
              </p>
              <a href="/about" className="elevation-btn-outline">Learn Our Story</a>
            </div>
          </div>
          
        </div>
      </section>

          {/* Leadership */}
      <section className="leadership-immersive">
        <div className="leadership-watermark">LEADERSHIP</div>
        
        <div className="leadership-content-grid">
          <div className="leadership-image-stack">
            <div className="leadership-main-frame">
              <img src={leader} alt="Pastor Afam Eze" className="pastor-image" />
            </div>
            <div className="leadership-stat-card">
              <span className="stat-label">Lead Pastor</span>
              <span className="stat-value">AFAM EZE</span>
            </div>
          </div>

          <div className="leadership-copy-side">
            <div className="leadership-header">
              <span className="elevation-eyebrow">THE VISIONARY</span>
              <h2 className="leadership-name">Pastor <br/> Afam Eze</h2>
              <div className="leadership-line"></div>
            </div>
            
            <div className="leadership-biography">
              <p className="bio-lead">
                Called to lead with a divine purpose and a heart for lost souls.
              </p>
              <p className="bio-main">
                Pastor Afam Eze is the Senior Pastor of Kingmakers International Ministries, where he leads with a strong sense of divine purpose. Through his obedience to God's call, many have experienced the transformative power of Jesus Christ. 
              </p>
              <p className="bio-main">
                Alongside his wife, Sister Ijeoma Eze, he serves the community with a shared vision to draw people closer to Christ and empower them to live purposeful lives. Pastor Eze’s leadership inspires believers to walk faithfully in their own callings and serve with love and humility.
              </p>
              
              <div className="leadership-signature">
                <span className="sig-text">Faith. Purpose. Community.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* Upcoming Events - The Gallery Hybrid */}
      <section className="events-immersive">
        <div className="events-top-meta">
          <h2 className="events-h2">Upcoming Events</h2>
        </div>

        <div className="expanding-gallery">
          {eventImages.map((event, index) => (
            <div 
              key={index}
              className={`event-tile ${index === activeIndex ? 'is-active' : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              <div className="tile-image-wrapper">
                <img src={event.src} alt={event.alt} className="tile-img" />
                <div className="tile-overlay"></div>
              </div>

              {/* Elevation-style date badge */}
              <div className="event-date-badge">
                <span className="month">{event.month}</span>
                <span className="day">{event.day}</span>
              </div>

              <div className="tile-content">
                <h3 className="tile-title">{event.alt}</h3>
                <p className="tile-description">Join us for a life-changing experience. Everyone is welcome.</p>
              </div>
            </div>
          ))}
        </div>
      </section>      

          {/* Latest Teachings - Cinematic Media Library */}
    <section className="teachings-immersive">
      <div className="teachings-header">
        <div className="header-left">
          <span className="elevation-eyebrow">EQUIPPING THE SAINTS WITH GOD'S WORD</span>
          <h2 className="teachings-main-h2">LATEST SERMONS</h2>
        </div>
        <button className="view-all-btn">Browse Archive <ArrowRight size={16} /></button>
      </div>

      <div className="teachings-featured-layout">
        {word.slice(0, 3).map((item, index) => (
          <div 
            key={index} 
            className={`teachings-card ${index === 0 ? 'featured-card' : 'standard-card'}`}
            /* Triggers the video modal on click */
            onClick={() => { setCurrentVideo(item.youtubeLink); setModalIsOpen(true); }}
          >
            <div className="card-media-wrapper">
              <img src={item.image} alt={item.title} className="teaching-img" />
              <div className="card-overlay-gradient"></div>
              
              <div className="play-indicator-wrap">
                <div className="play-circle">
                  <Play size={index === 0 ? 32 : 20} fill="currentColor" />
                </div>
              </div>

              <div className="teaching-metadata">
                <span className="teaching-category">Latest Message</span>
                <h3 className="teaching-title">{item.title}</h3>
                {index === 0 && (
                  <p className="teaching-excerpt">
                    Experience this life-transforming message from Scriptures through God's servant.
                  </p>
                )}
                <div className="teaching-actions">
                  {/* Only 'Watch' remains, styled as a clean action link */}
                  <span className="action-link"><Play size={14} fill="currentColor" /> WATCH NOW</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Re-adding the Video Modal within this section or at the bottom of the component */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="video-modal"
        overlayClassName="video-modal-overlay"
      >
        <div className="modal-content">
          <button className="close-modal" onClick={() => setModalIsOpen(false)}>
            <X size={24} />
          </button>
          {currentVideo && (
            <iframe
              width="100%"
              height="100%"
              src={currentVideo.replace('watch?v=', 'embed/')}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </Modal>
    </section>
    </div>
  );
};

export default Home;