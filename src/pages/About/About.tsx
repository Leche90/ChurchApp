import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import pastoratee1 from '../../assets/pastoratee1.jpg';
import './About.css';

const About: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const vmRef = useRef<HTMLDivElement>(null);

  // Hero parallax
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroContentY = useTransform(heroProgress, [0, 1], [0, -120]);
  const heroContentOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);
  const heroShape1Y = useTransform(heroProgress, [0, 1], [0, -200]);
  const heroShape2Y = useTransform(heroProgress, [0, 1], [0, 150]);

  // Story parallax
  const { scrollYProgress: storyProgress } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"]
  });
  const storyImgY = useTransform(storyProgress, [0, 1], [-50, 50]);

  // Vision/Mission parallax
  const { scrollYProgress: vmProgress } = useScroll({
    target: vmRef,
    offset: ["start end", "end start"]
  });
  const vmBgX = useTransform(vmProgress, [0, 1], ['-10%', '10%']);

  const coreValues = [
    { number: "01", label: "Love", description: "Serving others with the heart of Christ." },
    { number: "02", label: "Kingdom", description: "Walking in divine authority and purpose." },
    { number: "03", label: "Prayer", description: "Sustaining intimacy with God continually." },
    { number: "04", label: "Honour", description: "Living transparently and responsibly." },
    { number: "05", label: "Excellence", description: "Doing all things as unto God." },
    { number: "06", label: "Truth", description: "Upholding godly standards." },
    { number: "07", label: "Family", description: "Building strong, unified relationships." }
  ];

  const heroStats = [
    { number: "2018", label: "Established" },
    { number: "WPG", label: "Winnipeg, MB" },
    { number: "2x", label: "Weekly Gatherings" },
  ];

  return (
    <div className="about-cinematic">

            {/* ============ HERO ============ */}
      <section className="about-hero-cinema" ref={heroRef}>
        {/* Geometric shapes */}
        <motion.div className="about-hero-shape about-hero-circle" style={{ y: heroShape1Y }}>
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
          className="about-hero-shape about-hero-square"
          style={{ y: heroShape2Y }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="20" y="20" width="60" height="60" fill="none" stroke="rgba(255,193,7,0.25)" strokeWidth="1" />
          </svg>
        </motion.div>

        <div className="about-hero-grid-overlay" aria-hidden="true" />
        <div className="about-hero-grain" aria-hidden="true" />

        <motion.div 
          className="about-hero-content"
          style={{ y: heroContentY, opacity: heroContentOpacity }}
        >
          <h1 className="about-hero-title">
            <motion.span
              className="about-hero-title-main"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              About
            </motion.span>
            <motion.span
              className="about-hero-title-accent"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Us
            </motion.span>
          </h1>

          <motion.p 
            className="about-hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            A ministry called to <em>raise royalties</em> — equipping believers 
            to reign through the Word, the Spirit, and the love of Christ.
          </motion.p>
        </motion.div>
      </section>

      {/* ============ STORY ============ */}
      <section className="about-story-cinema" ref={storyRef}>
        <div className="about-story-grid">

          <div className="about-story-text-col">
            <motion.span 
              className="section-eyebrow"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="eyebrow-dash" />
              OUR STORY
            </motion.span>

            <motion.h2 
              className="about-story-heading"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Things to <em>Know</em>
            </motion.h2>

            <motion.div 
              className="about-story-divider"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            <motion.p 
              className="about-story-body about-story-lead"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Kingmakers International Ministries is a mandate from God founded in 2018 
              and led by Pastor Afam and Sister Ijeoma Eze.
            </motion.p>

            <motion.p 
              className="about-story-body"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              The ministry is built on the unwavering belief that God has called us to 
              equip believers to reign in every area of life through the power of the 
              Holy Spirit and the Word of God. We are passionate about empowering 
              individuals to live out their divine purpose and impact the world around them.
            </motion.p>

            <motion.p 
              className="about-story-body"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              We believe that with God, all things are possible, and we are here to help 
              you reign over life's challenges and step into the greatness that God has 
              called you to. Together, we are building a legacy of faith, power, and 
              victory. <strong>We welcome you to join us in this exciting journey of faith.</strong>
            </motion.p>

            <motion.div 
              className="about-signature"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <span className="about-signature-pre">In Christ,</span>
              <span className="about-signature-name">Afam Eze</span>
            </motion.div>
          </div>

          <div className="about-story-image-col">
            <motion.div 
              className="about-story-frame"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.img 
                src={pastoratee1} 
                alt="Pastor Afam and Sister Ijeoma Eze" 
                style={{ y: storyImgY }}
              />
            </motion.div>

            <motion.div 
              className="about-story-caption"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="about-story-caption-line" />
              PASTOR AFAM
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ VISION & MISSION ============ */}
      <section className="about-vm-cinema" ref={vmRef}>
        <motion.div 
          className="about-vm-bg-text"
          style={{ x: vmBgX }}
          aria-hidden="true"
        >
          PURPOSE
        </motion.div>

        <div className="about-vm-grid">

          <motion.div 
            className="about-vm-card about-vm-vision"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
          >
            <span className="about-vm-eyebrow">
              <span className="about-vm-eyebrow-dash" />
              VISION
            </span>
            <h3 className="about-vm-label">Raising</h3>
            <h3 className="about-vm-label-italic">Royalties</h3>
            <p className="about-vm-text">
              To raise a people to become empowered, and conscious of their identity as kings in God's kingdom.
            </p>
          </motion.div>

          <motion.div 
            className="about-vm-card about-vm-mission"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
          >
            <span className="about-vm-eyebrow">
              <span className="about-vm-eyebrow-dash" />
              MISSION
            </span>
            <h3 className="about-vm-label">Reach.</h3>
            <h3 className="about-vm-label-italic">Train. Release.</h3>
            <p className="about-vm-text">
              To reach out, discover, train, and release members 
              to be like Jesus wherever they are.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ============ CORE VALUES — horizontal scrolling row ============ */}
      <section className="about-values-cinema">
        <div className="about-values-bg-text" aria-hidden="true">VALUES</div>

        <div className="about-values-header">
          <motion.span 
            className="section-eyebrow eyebrow-gold"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow-dash gold" />
            WHAT WE STAND FOR
          </motion.span>
          <motion.h2 
            className="about-values-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Our Core <em>Values</em>
          </motion.h2>
          <motion.p 
            className="about-values-tagline"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Seven principles that shape who we are and how we serve.
          </motion.p>
        </div>

        <div className="about-values-row">
          {coreValues.map((val, i) => (
            <motion.div
              key={i}
              className="about-value-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
            >
              <span className="about-value-number">{val.number}</span>
              <h3 className="about-value-label">{val.label}</h3>
              <p className="about-value-description">{val.description}</p>
              <div className="about-value-arrow">
                <ArrowRight size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;