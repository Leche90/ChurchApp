import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import './CommunityOutreach.css';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import feast from '../../../assets/optimized/feast.webp';

// ============ ASSET LISTS ============
// Files live in /public/assets/2024/ and /public/assets/2023/
const images2024: string[] = [
  '/assets/2024/hangout2.jpg', '/assets/2024/hangout3.jpg',
  '/assets/2024/hangout4.jpg', '/assets/2024/hangout5.jpg',
  '/assets/2024/hangout6.jpg', '/assets/2024/hangout7.jpg',
  '/assets/2024/hangout8.jpg', '/assets/2024/hangout9.jpg',
  '/assets/2024/hangout10.jpg', '/assets/2024/hangout11.jpg',
  '/assets/2024/hangout12.jpg', '/assets/2024/hangout13.jpg',
  '/assets/2024/hangout14.jpg', '/assets/2024/hangout15.jpg',
  '/assets/2024/hangout16.jpg', '/assets/2024/hangout17.jpg',
  '/assets/2024/hangout18.jpg', '/assets/2024/hangout19.jpg',
  '/assets/2024/hangout20.jpg',
];

const images2023: string[] = [
  '/assets/2023/hangoutA.jpeg', '/assets/2023/hangoutB.jpeg',
  '/assets/2023/hangoutC.jpeg', '/assets/2023/hangoutD.jpeg',
  '/assets/2023/hangoutE.jpeg', '/assets/2023/hangoutF.jpeg',
  '/assets/2023/hangoutG.jpeg', '/assets/2023/hangoutH.jpeg',
  '/assets/2023/hangoutI.jpeg', '/assets/2023/hangoutJ.jpeg',
  '/assets/2023/hangoutK.jpeg', '/assets/2023/hangoutL.jpeg',
  '/assets/2023/hangoutM.jpeg', '/assets/2023/hangoutN.jpeg',
  '/assets/2023/hangoutO.jpeg', '/assets/2023/hangoutP.jpeg',
  '/assets/2023/hangoutQ.jpeg', '/assets/2023/hangoutR.jpeg',
  '/assets/2023/hangoutS.jpeg', '/assets/2023/hangoutT.jpeg',
  '/assets/2023/hangoutU.jpeg',
];

type Year = '2023' | '2024';

const CommunityOutreach: React.FC = () => {
  const [photoIndex, setPhotoIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<Year>('2024');

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroBgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroShape1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const heroShape2Y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const activeImages = selectedYear === '2023' ? images2023 : images2024;

  const openLightbox = (index: number, year: Year): void => {
    setPhotoIndex(index);
    setSelectedYear(year);
    setIsOpen(true);
  };

  const closeLightbox = useCallback((): void => {
    setIsOpen(false);
  }, []);

  const moveSlide = useCallback(
    (direction: number): void => {
      const list = selectedYear === '2023' ? images2023 : images2024;
      setPhotoIndex(
        (prev) => (prev + direction + list.length) % list.length
      );
    },
    [selectedYear]
  );

  // Keyboard: Esc + arrow nav
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') moveSlide(-1);
      if (e.key === 'ArrowRight') moveSlide(1);
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeLightbox, moveSlide]);  

  const stats = [
    { num: '3+', label: 'Years Running' },
    { num: '100+', label: 'Meals Served' },
    { num: 'JUN — AUG', label: 'Each Summer' },
  ];

  return (
    <div className="community-cinematic">

      {/* ============ HERO ============ */}
      <section className="community-hero" ref={heroRef}>
        <motion.div
          className="community-hero-backdrop"
          style={{
            backgroundImage: `url(${feast})`,
            scale: heroBgScale,
          }}
          aria-hidden="true"
        />
        <div className="community-hero-overlay" aria-hidden="true" />
        <div className="community-hero-grid-overlay" aria-hidden="true" />
        <div className="community-hero-grain" aria-hidden="true" />

        {/* Geometric shapes */}
        <motion.div 
          className="community-hero-shape community-hero-circle"
          style={{ y: heroShape1Y }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
            style={{ width: '100%', height: '100%' }}
          >
            <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="300" cy="300" r="280" fill="none" stroke="rgba(255,193,7,0.18)" strokeWidth="1" strokeDasharray="2 8" />
              <circle cx="300" cy="300" r="200" fill="none" stroke="rgba(255,193,7,0.1)" strokeWidth="1" />
            </svg>
          </motion.div>
        </motion.div>

        <motion.div 
          className="community-hero-shape community-hero-square"
          style={{ y: heroShape2Y }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="20" y="20" width="60" height="60" fill="none" stroke="rgba(255,193,7,0.25)" strokeWidth="1" />
          </svg>
        </motion.div>

        <motion.div
          className="community-hero-content"
          style={{ y: heroContentY, opacity: heroContentOpacity }}
        >
          <h1 className="community-hero-title">
            <motion.span
              className="community-hero-title-main"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              Faith &amp;
            </motion.span>
            <motion.span
              className="community-hero-title-accent"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Flames
            </motion.span>
          </h1>

          <motion.p
            className="community-hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <em>A summer hangout</em> of feasting, fellowship, and 
            sharing the Word - together.
          </motion.p>
        </motion.div>
      </section>

      <Breadcrumbs 
        items={[
          { label: 'Home', to: '/' },
          { label: 'Events', to: '/events' },
          { label: 'Community Outreach' }
        ]}
        theme="dark"
      />

      {/* ============ INTRO ============ */}
      <section className="community-intro">
        <div className="community-intro-bg-text" aria-hidden="true">HEART</div>

        <div className="community-intro-grid">
          <div className="community-intro-text-col">
            <motion.span
              className="community-section-eyebrow"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="community-eyebrow-dash" />
              OUR HEART
            </motion.span>

            <motion.h2
              className="community-section-title"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              More Than a <em>BBQ</em>
            </motion.h2>

            <motion.div
              className="community-intro-divider"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            <motion.p
              className="community-intro-lead"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              From June through August, we host our annual outreach 
              that brings our community together.
            </motion.p>

            <motion.p
              className="community-intro-body"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              It's more than feasting — it's a time of sharing, 
              connecting, and giving. Attendees enjoy free barbecue, 
              clothing, shoes, and essentials, alongside uplifting 
              moments through the Word of God.
            </motion.p>

            <motion.p
              className="community-intro-body"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Below are some of the moments captured during our 
              yearly gatherings. <strong>You're invited to join us.</strong>
            </motion.p>
          </div>

          <div className="community-intro-stats-col">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="community-stat"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
              >
                <span className="community-stat-num">{stat.num}</span>
                <span className="community-stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 2024 GALLERY (CHARCOAL) ============ */}
      <section className="community-year-section community-year-dark">
        <div className="community-year-header">
          <motion.span
            className="community-section-eyebrow eyebrow-on-dark"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="community-eyebrow-dash dash-gold" />
            GALLERY
          </motion.span>

          <motion.h2
            className="community-year-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="community-year-title-line">Twenty</span>
            <span className="community-year-title-line community-year-title-italic">Twenty-Four</span>
          </motion.h2>
        </div>

        <div className="community-image-grid">
          {images2024.slice(0, 3).map((image, index) => (
            <motion.button
              key={index}
              className="community-thumb"
              onClick={() => openLightbox(index, '2024')}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              aria-label={`Open 2024 photo ${index + 1}`}
            >
              <img src={image} alt={`2024 BBQ Hangout ${index + 1}`} />
              <div className="community-thumb-overlay">
                <span className="community-thumb-num">{String(index + 1).padStart(2, '0')}</span>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="community-view-more">
          <button
            className="community-btn-ghost-light"
            onClick={() => openLightbox(0, '2024')}
          >
            <span>View All</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ============ 2023 GALLERY (CREAM) ============ */}
      <section className="community-year-section community-year-light">
        <div className="community-year-header">
          <motion.span
            className="community-section-eyebrow"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="community-eyebrow-dash dash-gold-deep" />
            GALLERY
          </motion.span>

          <motion.h2
            className="community-year-title community-year-title-dark"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="community-year-title-line">Twenty</span>
            <span className="community-year-title-line community-year-title-italic">Twenty-Three</span>
          </motion.h2>
        </div>

        <div className="community-image-grid">
          {images2023.slice(0, 3).map((image, index) => (
            <motion.button
              key={index}
              className="community-thumb community-thumb-on-cream"
              onClick={() => openLightbox(index, '2023')}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              aria-label={`Open 2023 photo ${index + 1}`}
            >
              <img src={image} alt={`2023 BBQ Hangout ${index + 1}`} />
              <div className="community-thumb-overlay">
                <span className="community-thumb-num">{String(index + 1).padStart(2, '0')}</span>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="community-view-more">
          <button
            className="community-btn-ghost-dark"
            onClick={() => openLightbox(0, '2023')}
          >
            <span>View All</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ============ LIGHTBOX ============ */}
      {isOpen && (
        <div
          className="community-lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery"
        >
          <div className="community-lightbox-counter">
            <span className="community-lightbox-counter-current">
              {String(photoIndex + 1).padStart(2, '0')}
            </span>
            <span className="community-lightbox-counter-divider">/</span>
            <span className="community-lightbox-counter-total">
              {String(activeImages.length).padStart(2, '0')}
            </span>
            <span className="community-lightbox-counter-year">{selectedYear}</span>
          </div>

          <button
            className="community-lightbox-close"
            onClick={closeLightbox}
            aria-label="Close gallery"
          >
            <X size={18} />
            <span>CLOSE</span>
          </button>

          <button
            className="community-lightbox-prev"
            onClick={(e) => { e.stopPropagation(); moveSlide(-1); }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={22} />
          </button>

          <img
            src={activeImages[photoIndex]}
            alt={`${selectedYear} hangout ${photoIndex + 1}`}
            className="community-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="community-lightbox-next"
            onClick={(e) => { e.stopPropagation(); moveSlide(1); }}
            aria-label="Next photo"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CommunityOutreach;