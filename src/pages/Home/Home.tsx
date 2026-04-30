import React, { useState, useRef, useEffect } from 'react';
import { Play, X, ArrowRight, Clock, MapPin, Video } from 'lucide-react';
import Modal from 'react-modal';
import { motion, useScroll, useTransform } from 'framer-motion';
import Typed from 'typed.js';
import treasures from '../../assets/treasures.png';
import effective from '../../assets/effective.png';
import transformation from '../../assets/transformation.png';
import welcome from '../../assets/welcome.jpg';
import leader from '../../assets/leader.jpg';
import hero4 from '../../assets/hero4.jpg';
import './Home.css';

/* ============================================================
   HERO — geometric shapes + typed text
   ============================================================ */
const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const typedRef = useRef<HTMLSpanElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const shape1Y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const shape2Y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const shape3Y = useTransform(scrollYProgress, [0, 1], [0, -150]);

  useEffect(() => {
    if (!typedRef.current) return;
    const typed = new Typed(typedRef.current, {
      strings: [
        "Rooted in Christ, we stand as one; growing in faith, walking in love, and shining His light to the world.",
        "At Kingmakers, every heart matters, every soul has a purpose, and together, we reign in His grace.",
        "We invite you to come and fellowship with us.",
      ],
      typeSpeed: 40,
      backSpeed: 15,
      backDelay: 2500,
      startDelay: 1800,
      loop: true,
      smartBackspace: true,
      showCursor: true,
      cursorChar: "|",
    });
    return () => typed.destroy();
  }, []);

  return (
    <section className="hero-d" ref={heroRef}>
      <div 
        className="hero-d-photo-bg" 
        style={{ backgroundImage: `url(${hero4})` }}
        aria-hidden="true"
      />
      <div className="hero-d-photo-overlay" aria-hidden="true" />
      <motion.div className="hero-d-shape hero-d-circle-large" style={{ y: shape1Y }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          style={{ width: '100%', height: '100%' }}
        >
          <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="300" cy="300" r="280" fill="none" stroke="rgba(255,193,7,0.15)" strokeWidth="1" strokeDasharray="2 8" />
            <circle cx="300" cy="300" r="200" fill="none" stroke="rgba(255,193,7,0.08)" strokeWidth="1" />
          </svg>
        </motion.div>
      </motion.div>

      <motion.div className="hero-d-shape hero-d-cross" style={{ y: shape2Y }}>
        <motion.div
          animate={{ rotate: [0, 8, 0, -8, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="44" y="10" width="12" height="80" fill="#FFC107" opacity="0.4" />
            <rect x="20" y="34" width="60" height="12" fill="#FFC107" opacity="0.4" />
          </svg>
        </motion.div>
      </motion.div>

      <motion.div className="hero-d-shape hero-d-line-vertical" style={{ y: shape3Y }} />
      <motion.div className="hero-d-shape hero-d-line-horizontal" style={{ y: shape1Y }} />

      <motion.div 
        className="hero-d-shape hero-d-square"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="20" y="20" width="60" height="60" fill="none" stroke="rgba(255,193,7,0.25)" strokeWidth="1" />
        </svg>
      </motion.div>

      <motion.div 
        className="hero-d-shape hero-d-dot-grid"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 8 }).map((_, col) => (
              <circle key={`${row}-${col}`} cx={20 + col * 22} cy={20 + row * 22} r="1.5" fill="#FFC107" />
            ))
          )}
        </svg>
      </motion.div>

      <div className="hero-d-grain" aria-hidden="true" />

      <motion.div 
        className="hero-d-content"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div 
          className="hero-d-eyebrow hero-d-eyebrow-inline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >         
        </motion.div>

        <h1 className="hero-d-title">
          <motion.span 
            className="hero-d-title-row"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            We Are
          </motion.span>
          <motion.span 
            className="hero-d-title-family"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Family
          </motion.span>
        </h1>

        <motion.p 
          className="hero-d-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <span ref={typedRef}></span>
        </motion.p>

        <motion.div 
          className="hero-d-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
        >
          <a href="/contact" className="btn-magnetic-primary">
            <span>Plan Your Visit</span>
            <ArrowRight size={16} />
          </a>
          <a 
            href="https://www.youtube.com/@kingmakerstv6942" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-magnetic-ghost"
          >
            <Video size={16} />
            <span>Watch Live</span>
          </a>
        </motion.div>
      </motion.div>

      <motion.div 
        className="hero-d-side-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        BELIEVE · BELONG · BECOME
      </motion.div>
    </section>
  );
};

/* ============================================================
   PASTOR — cream editorial
   ============================================================ */
const Pastor: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section className="pastor-cream" ref={sectionRef}>
      <div className="pastor-cream-grid">
        <div className="pastor-cream-text-col">
          <motion.h2 
            className="pastor-cream-name"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="pastor-cream-name-row">Pastor</span>
            <span className="pastor-cream-name-italic">Afam Eze</span>
          </motion.h2>

          <motion.div 
            className="pastor-cream-pullquote"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <span className="pastor-cream-quote-mark">"</span>
            <p>Called to lead with divine purpose <em>and a heart for lost souls.</em></p>
          </motion.div>

          <motion.div 
            className="pastor-cream-body"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="pastor-cream-dropcap">
              Pastor Afam Eze is the Senior Pastor of Kingmakers International 
              Ministries, where he leads with a strong sense of divine purpose. 
              Through his obedience to God's call, many have experienced the 
              transformative power of Jesus Christ.
            </p>
            <p>
              Alongside his wife, Sister Ijeoma Eze, he serves the community 
              with a shared vision to draw people closer to Christ and empower 
              them to live purposeful lives. Pastor Eze's leadership inspires 
              believers to walk faithfully in their own callings and serve with 
              love and humility.
            </p>
          </motion.div>

          <motion.div 
            className="pastor-cream-signature"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <span className="pastor-cream-sig-text">Peace &amp; Blessings to You</span>
          </motion.div>
        </div>

        <div className="pastor-cream-image-col">
          <div className="pastor-cream-image-meta">
            <motion.span 
              className="pastor-cream-vert-text"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              SHEPHERD · TEACHER · FATHER
            </motion.span>
          </div>

          <motion.div 
            className="pastor-cream-frame"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.img 
              src={leader} 
              alt="Pastor Afam Eze, Senior Pastor of Kingmakers International Ministries"
              style={{ y: imgY }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   HOME — the page itself
   ============================================================ */
const Home: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);

  const welcomeRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: welcomeProgress } = useScroll({
    target: welcomeRef,
    offset: ["start end", "end start"]
  });
  const welcomeImgY = useTransform(welcomeProgress, [0, 1], [-60, 60]);

  const services = [
    { day: 'SUN', label: 'Morning Worship', time: '10:00 AM' },
    { day: 'FRI', label: 'Evening Service', time: '6:00 PM' },
  ];

  const word = [
    { 
      title: 'Treasures in My Heart', 
      youtubeLink: 'https://www.youtube.com/watch?v=oHO-6y2ySpA', 
      image: treasures,
      excerpt: 'Experience this life-transforming message from Scripture.',
      duration: '45 MIN'
    },
    { 
      title: 'Effective Prayers', 
      youtubeLink: 'https://www.youtube.com/watch?v=otLDqDnZL1s', 
      image: effective,
      excerpt: 'Prayer leads to answered doors.',
      duration: '38 MIN'
    },
    { 
      title: 'Divine Transformation', 
      youtubeLink: 'https://www.youtube.com/watch?v=2C-SPh3M718', 
      image: transformation,
      excerpt: 'Renewed by His power.',
      duration: '52 MIN'
    },
  ];

  const events = [
    { 
      title: "Faith & Flames",
      description: "An evening of worship, fellowship, and BBQ.",
      month: "JUN", year: "'26", day: 13, 
      time: "5:00 PM", location: "582 Burrows Avenue"
    },
    { 
      title: "Gospel & Grill",
      description: "Authentic connection over food and faith.",
      month: "JUL", year: "'26", day: 11, 
      time: "5:00 PM", location: "582 Burrows Avenue"
    },
    { 
      title: "Feast & Fellowship",
      description: "Come hungry for the Word and great food.",
      month: "AUG", year: "'26", day: 22, 
      time: "5:00 PM", location: "582 Burrows Avenue"
    }
  ];


  return (
    <div className="home-cinematic">

      <Hero />

      {/* MARQUEE */}
      <div className="marquee-strip">
        <motion.div 
          className="marquee-track"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        >
         
        </motion.div>
      </div>

      {/* SERVICES */}
      <section className="services-cinema">
        <div className="services-bg-text" aria-hidden="true">GATHER</div>

        <div className="services-cinema-header">
          <motion.span 
            className="section-eyebrow"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow-dash" />
            FELLOWSHIP WITH US
          </motion.span>
          <motion.h2 
            className="section-cinema-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Weekly <em>Gatherings</em>
          </motion.h2>
          <motion.p 
            className="section-cinema-tagline"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            In-person or online, there is a place for you to encounter God 
            and discover your purpose.
          </motion.p>
        </div>

        <div className="services-cinema-grid">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="service-card"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
            >
              <div className="service-card-body">
                <h3 className="service-day">{service.day}</h3>
                <p className="service-label">{service.label}</p>
                <div className="service-time-wrap">
                  <Clock size={16} />
                  <span className="service-time">{service.time}</span>
                </div>
              </div>
              <div className="service-card-glow" />
            </motion.div>
          ))}
        </div>

        <p className="services-footer-note">All times in CST</p>
      </section>

      {/* WELCOME */}
      <section className="welcome-cinema" ref={welcomeRef}>
        <div className="welcome-cinema-grid">
          
          <div className="welcome-image-col">
            <motion.div 
              className="welcome-image-frame"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.img 
                src={welcome} 
                alt="Our community gathering in worship" 
                style={{ y: welcomeImgY }}
              />
              <div className="welcome-frame-border" />
            </motion.div>

            <motion.div 
              className="welcome-quote-card"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="quote-mark">"</span>
              <p>Oh, how wonderful, how pleasing it is when God's people all come together as one.</p>
              <span className="quote-cite">— Psalm 133:1 (ERV)</span>
            </motion.div>
          </div>

          <div className="welcome-text-col">
            <motion.span 
              className="section-eyebrow"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="eyebrow-dash" />
              WELCOME HOME
            </motion.span>

            <motion.h2 
              className="welcome-cinema-heading"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              We're glad <br/> <em>you're here</em>
            </motion.h2>

            <motion.div 
              className="welcome-cinema-divider"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            <motion.p 
              className="welcome-cinema-desc"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              At Kingmakers International Ministries, we believe in the power 
              of community and the transformative love of Jesus Christ. 
              Whether you're exploring faith for the first time or looking 
              for a place to call home, <strong>there is a seat for you.</strong>
            </motion.p>

            <motion.a 
              href="/about" 
              className="btn-cinema-outline"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <span>Learn Our Story</span>
              <ArrowRight size={18} />
            </motion.a>
          </div>
        </div>
      </section>

      <Pastor />

      {/* EVENTS */}
      <section className="events-cinema">
        <div className="events-cinema-header">
          <motion.span 
            className="section-eyebrow"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow-dash" />
            WHAT'S COMING
          </motion.span>
          <motion.h2 
            className="section-cinema-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Upcoming <em>Events</em>
          </motion.h2>
        </div>

        <div className="events-cinema-list">
          {events.map((event, index) => (
            <motion.div 
              key={index}
              className={`event-cinema-row ${hoveredEvent === index ? 'is-hovered' : ''}`}
              onMouseEnter={() => setHoveredEvent(index)}
              onMouseLeave={() => setHoveredEvent(null)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="event-cinema-number">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="event-cinema-date">
                <span className="event-day-num">{event.day}</span>
                <span className="event-month-text">{event.month} {event.year}</span>
              </div>
              <div className="event-cinema-info">
                <h3 className="event-cinema-title">{event.title}</h3>
                <p className="event-cinema-desc">{event.description}</p>
              </div>
              <div className="event-cinema-meta">
                <div className="event-meta-item">
                  <Clock size={14} />
                  <span>{event.time}</span>
                </div>
                <div className="event-meta-item">
                  <MapPin size={14} />
                  <span>{event.location}</span>
                </div>
              </div>
              <div className="event-cinema-arrow">
                <ArrowRight size={24} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERMONS */}
      <section className="sermons-cinema">
        <div className="sermons-cinema-header">
          <div>
            <motion.span 
              className="section-eyebrow eyebrow-gold"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="eyebrow-dash gold" />
              FROM THE PULPIT
            </motion.span>
            <motion.h2 
              className="section-cinema-title light"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Latest <em>Messages</em>
            </motion.h2>
          </div>
          <motion.a 
            href="/sermons" 
            className="btn-cinema-gold"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span>All Sermons</span>
            <ArrowRight size={16} />
          </motion.a>
        </div>

        <div className="sermons-cinema-grid">
          {word.map((item, index) => (
            <motion.div 
              key={index}
              className={`sermon-card ${index === 0 ? 'sermon-featured' : 'sermon-standard'}`}
              onClick={() => { setCurrentVideo(item.youtubeLink); setModalIsOpen(true); }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
            >
              <div className="sermon-image-wrap">
                <img src={item.image} alt={item.title} />
                <div className="sermon-overlay-gradient" />
                <motion.div 
                  className="sermon-play-btn"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="sermon-play-pulse" />
                  <Play size={index === 0 ? 28 : 20} fill="currentColor" />
                </motion.div>
                <div className="sermon-duration-badge">
                  <Clock size={12} />
                  <span>{item.duration}</span>
                </div>
                <div className="sermon-meta">
                  <h3 className="sermon-title">{item.title}</h3>
                  {index === 0 && <p className="sermon-excerpt">{item.excerpt}</p>}
                  <div className="sermon-watch-link">
                    <Play size={12} fill="currentColor" />
                    <span>WATCH NOW</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className="video-modal"
          overlayClassName="video-modal-overlay"
          contentLabel="Sermon video player"
        >
          <div className="modal-content">
            <button 
              className="close-modal" 
              onClick={() => setModalIsOpen(false)}
              aria-label="Close video"
            >
              <X size={20} /> CLOSE
            </button>
            {currentVideo && (
              <iframe
                width="100%"
                height="100%"
                src={currentVideo.replace('watch?v=', 'embed/')}
                title="Sermon video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </Modal>
      </section>
    </div>
  );
};

export default Home;