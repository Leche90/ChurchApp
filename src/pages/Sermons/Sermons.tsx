import React, { useState, useRef } from 'react';
import { Play, X, Clock, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Sermons.css';
import word2Image from '../../assets/word2.jpg';
import handImage from '../../assets/hand.jpg';
import timeImage from '../../assets/optimized/time.webp';
import burdenImage from '../../assets/optimized/burden.webp';
import planImage from '../../assets/optimized/plan.webp';
import strategicImage from '../../assets/optimized/strategic.webp';
import praiseImage from '../../assets/optimized/praise.webp';

const youtubeLinks: { [key: number]: string } = {
  1: 'https://www.youtube.com/embed/3aCfFoH_PE4?rel=0&modestbranding=1&autoplay=1',
  2: 'https://www.youtube.com/embed/JhSVPYnqVsk?start=4&rel=0&modestbranding=1&autoplay=1',
  3: 'https://www.youtube.com/embed/AuY62wY46As?rel=0&modestbranding=1&autoplay=1',
  4: 'https://www.youtube.com/embed/WMbTKbN17D4?rel=0&modestbranding=1&autoplay=1',
  5: 'https://www.youtube.com/embed/YKfhkEJJ6qk?rel=0&modestbranding=1&autoplay=1',
  6: 'https://www.youtube.com/embed/_4D-XgUy1q4?rel=0&modestbranding=1&autoplay=1',
};

const Sermons: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<number | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroBgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroShape1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const heroShape2Y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const messages = [
    {
      id: 1,
      title: 'The Hand of God',
      duration: '38 MIN',
      date: '2024',
      description: "Understanding God's sovereign hand in our daily lives.",
      image: handImage
    },
    {
      id: 2,
      title: 'The Value of Time',
      duration: '42 MIN',
      date: '2024',
      description: 'Redeeming time and living with eternal perspective.',
      image: timeImage
    },
    {
      id: 3,
      title: "Bearing Each Other's Burdens",
      duration: '44 MIN',
      date: '2024',
      description: 'Building authentic community through shared support.',
      image: burdenImage
    },
    {
      id: 4,
      title: 'Revisiting the Old Plan',
      duration: '41 MIN',
      date: '2024',
      description: "Returning to God's original design for your life.",
      image: planImage
    },
    {
      id: 5,
      title: 'Strategic Planning',
      duration: '37 MIN',
      date: '2024',
      description: 'Aligning your plans with Kingdom purpose.',
      image: strategicImage
    },
    {
      id: 6,
      title: 'Returning to Praise the Lord',
      duration: '38 MIN',
      date: '2024',
      description: 'Cultivating a lifestyle of worship and gratitude.',
      image: praiseImage
    }
  ];

  const handlePlayClick = (id: number) => {
    setCurrentVideo(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setCurrentVideo(null), 300);
  };

  return (
    <div className="sermons-cinematic">

      {/* ============ HERO ============ */}
      <section className="sermons-hero" ref={heroRef}>
        <motion.div 
          className="sermons-hero-backdrop"
          style={{ 
            backgroundImage: `url(${word2Image})`,
            scale: heroBgScale,
          }}
          aria-hidden="true"
        />
        <div className="sermons-hero-overlay" aria-hidden="true" />
        <div className="sermons-hero-grid-overlay" aria-hidden="true" />
        <div className="sermons-hero-grain" aria-hidden="true" />

        {/* Geometric shapes */}
        <motion.div 
          className="sermons-hero-shape sermons-hero-circle"
          style={{ y: heroShape1Y }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            style={{ width: '100%', height: '100%' }}
          >
            <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="300" cy="300" r="280" fill="none" stroke="rgba(255,193,7,0.18)" strokeWidth="1" strokeDasharray="2 8" />
              <circle cx="300" cy="300" r="200" fill="none" stroke="rgba(255,193,7,0.1)" strokeWidth="1" />
            </svg>
          </motion.div>
        </motion.div>

        <motion.div 
          className="sermons-hero-shape sermons-hero-square"
          style={{ y: heroShape2Y }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="20" y="20" width="60" height="60" fill="none" stroke="rgba(255,193,7,0.25)" strokeWidth="1" />
          </svg>
        </motion.div>

        <motion.div 
          className="sermons-hero-content"
          style={{ y: heroContentY, opacity: heroContentOpacity }}
        >
          <motion.div 
            className="sermons-hero-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >            
          </motion.div>

          <h1 className="sermons-hero-title">
            <motion.span
              className="sermons-hero-title-main"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              Sermons
            </motion.span>
          </h1>

          <motion.p 
            className="sermons-hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <em>Growing in faith</em> through God's Word. Watch our latest messages and dive deeper into Scripture.
          </motion.p>

          <motion.div 
            className="sermons-hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <button 
              className="sermons-btn-primary" 
              onClick={() => handlePlayClick(1)}
            >
              <Play size={16} fill="currentColor" />
              <span>Play Latest</span>
            </button>
          </motion.div>
        </motion.div>        
      </section>     

      {/* ============ CARDS SECTION ============ */}
      <section className="sermons-library">
        <div className="sermons-library-bg-text" aria-hidden="true">WORD</div>

        <div className="sermons-library-header">
          <motion.span 
            className="sermons-section-eyebrow"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
          </motion.span>
          <motion.h2 
            className="sermons-section-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Recent <em>Messages</em>
          </motion.h2>
          <motion.p 
            className="sermons-section-tagline"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Click any sermon to watch — featuring teachings on faith, 
            purpose, and walking in the Spirit.
          </motion.p>
        </div>

        <div className="sermons-grid">
          {messages.map((msg, i) => (
            <motion.article
              key={msg.id}
              className="sermon-card"
              onClick={() => handlePlayClick(msg.id)}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
            >
              <div className="sermon-card-image-wrap">
                <img src={msg.image} alt={msg.title} className="sermon-card-image" />
                <div className="sermon-card-overlay" />

                <div className="sermon-card-play">
                  <Play size={22} fill="currentColor" />
                </div>

                <div className="sermon-card-duration">
                  <Clock size={11} />
                  <span>{msg.duration}</span>
                </div>
              </div>

              <div className="sermon-card-info">
                <h3 className="sermon-card-title">{msg.title}</h3>
                <p className="sermon-card-description">{msg.description}</p>
                <div className="sermon-card-meta">
                  <span className="sermon-card-year">{msg.date}</span>
                  <ArrowRight size={14} className="sermon-card-arrow" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ============ MODAL ============ */}
      {isModalOpen && currentVideo !== null && (
        <div 
          className={`sermons-modal-overlay ${isModalOpen ? 'active' : ''}`} 
          onClick={closeModal}
        >
          <div className="sermons-modal-wrapper" onClick={(e) => e.stopPropagation()}>
            <button 
              className="sermons-modal-close" 
              onClick={closeModal}
              aria-label="Close video"
            >
              <X size={18} /> CLOSE
            </button>
            <div className="sermons-modal-video-container">
              <iframe
                src={youtubeLinks[currentVideo]}
                title={messages.find((m) => m.id === currentVideo)?.title || 'Sermon'}
                className="sermons-modal-iframe"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sermons;