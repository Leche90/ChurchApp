import React, { useEffect, useState, useRef } from 'react';
import Typed from 'typed.js';
import { Link } from 'react-router-dom';
import { Play, X } from 'lucide-react';
import Modal from 'react-modal';
import './Home.css';
import worship from '../../assets/worship.jpg';
import teaching from '../../assets/teaching.jpg';
import prayer from '../../assets/prayer.jpg';
import leader from '../../assets/leader.jpg';
import fellowship from '../../assets/August.jpg';
import flames from '../../assets/June.jpg';
import grill from '../../assets/July.jpg';
import praise from '/home/lleche/ChurchApp/frontend/src/assets/Prayers.jpg';
import Strong from '/home/lleche/ChurchApp/frontend/src/assets/Strong.jpg';
import Rebuild from '/home/lleche/ChurchApp/frontend/src/assets/Rebuild.jpg';
import Survive from '/home/lleche/ChurchApp/frontend/src/assets/Survive.jpg';
import pst from '/home/lleche/ChurchApp/frontend/src/assets/pst.jpg';
import { motion } from 'framer-motion';
import { FaCalendar } from 'react-icons/fa';
// import barbecuees from '/home/lleche/ChurchApp/frontend/src/assets/barbecuees.jpg';
import { ChevronLeft, ChevronRight } from 'lucide-react';


const Home: React.FC = () => {
  const effectRef = useRef<HTMLDivElement | null>(null);
  const typedRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!effectRef.current) return;

      const scrollY = window.scrollY * -0.2; // Slower parallax movement
      const maxTranslate = -100; // Limit max movement

      effectRef.current.style.transform = `translate3d(0, ${Math.max(scrollY, maxTranslate)}px, 0)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup on unmount
  }, []);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const ServiceTimes: React.FC = () => {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          setInView(entry.isIntersecting);
        },
        { threshold: 0.5 }
      );
      if (ref.current) {
        observer.observe(ref.current);
      }
      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, []);

    const services = [
      {
        title: 'Sunday Morning',
        times: ['10:00 AM'],
        color: 'blue'
      },
      {
        title: 'Friday Evening',
        times: ['6:00 PM'],
        color: 'blue'
      },     
    ];    

    useEffect(() => {
      const typed = new Typed(typedRef.current, {
        strings: [
          "Rooted in Christ, we stand as one; growing in faith, walking in love, and shining His light to the world.",
          "At Kingmakers, every heart matters, every soul has purpose, and together, we reign in His grace.",
          "We invite you to come and fellowship with us.",
        ],
        typeSpeed: 40,
        backSpeed: 25,
        backDelay: 2000,
        loop: true,
        smartBackspace: true,
        showCursor: true,
        cursorChar: '|',
      });

      return () => {
        typed.destroy(); // Clean up on unmount
      };
    }, []);

    return (
      <div className="service-container">
        {/* Intro Heading */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="service-intro"
        >
          <h2 className="service-h2">Join Us in Worship</h2>
          {/* <p className="service-description">Let us experience God's presence together</p> */}
        </motion.div>        

        {/* Service Cards */}
        <div className="service-grid">
          {services.map((service, index) => (
            <div key={index}            
              className={`service-card ${service.color}`}
            >              
              <h3 className="service-h3">{service.title}</h3>
              {service.times.map((time, i) => (
                <p key={i} className="service-card-time">
                  {time}
                </p>
              ))}
            </div>
          ))}
      </div>
    </div>
    );
  }; 

  // Dynamic titles for each teaching
  const word = [
    {
      title: 'Staying Strong in the Face of Opposition',
      youtubeLink: 'https://www.youtube.com/watch?v=EF2LijgjMmM&t=22s?rel=0',
      image: Strong,
    },
    {
      title: 'Returning to Build',
      youtubeLink: 'https://www.youtube.com/watch?v=B0qMXmMhfpE&t=1s?rel=0',
      image: Rebuild,
    },
    {
      title: 'How to Live and Survive in a Conflict Zone (Part 3)',
      youtubeLink: 'https://www.youtube.com/watch?v=TMRlLrEWBy0?rel=0',
      image: Survive,
    },
  ];

    // Image carousel data
  const eventImages = [
    {
      src: flames,
      blurredSrc: `${flames}?blur=10`,
      alt: "Faith & Flames",      
    },
    {
      src: grill,
      blurredSrc: `${grill}?blur=10`,
      alt: "Gospel & Grill",      
    },
    {
      src: fellowship,
      blurredSrc: `${fellowship}?blur=10`,
      alt: "Feast & Fellowship",      
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="home">
      <div className="hero-wrapper">
        <div className="hero">
          <div className="hero-text">
            <h1>KINGMAKERS' FAMILY</h1>
            <p className="hero-p">
                <span ref={typedRef}></span>
            </p>
            <button className="join-btn">
              <a href="https://www.youtube.com/@kingmakerstv6942" target="_blank" rel="noopener noreferrer">
                JOIN US LIVE
              </a>
            </button>
          </div>
        </div>
      </div>

      {/* Service Times */}
      <ServiceTimes />
          
          {/* Upcoming Events - Expanding Cards */}
    <div className="events-container">
      <div className="events-header">
        <h2 className="events-h2">Upcoming Events</h2>
      </div>
      
      <div className="expanding-cards">
        {eventImages.map((event, index) => (
          <div 
            className={`card ${index === activeIndex ? 'active' : ''}`}
            key={index}
            onClick={() => setActiveIndex(index)}
          >          
          
           {/* Blurred Background */}
           <div 
             className="blur-background"
             style={{ backgroundImage: `url(${event.src})` }}
           ></div>

           {/* Sharp Foreground Image */}
        <img 
          src={event.src} 
          alt={event.alt}
          className="event-image"
        />
        </div>
        ))}
      </div>
    </div>

    {/* Leadership */}
      <div className="leader-container">
        <div className="leader">
          <div className="leader-left">
            <img src={leader} alt="Leader" className="leader-img" />
          </div>
          <div className="leader-right">
            <h3 className="lead-pastor">LEAD PASTOR</h3>
            <h2 className="pastor">PASTOR AFAM EZE</h2>
            <p className="pastor-paragraph">
              Pastor Afam Eze is the Senior Pastor of Kingmakers International Ministries, where he leads with a strong sense of divine purpose. Through his obedience to God's call, many have experienced the transformative power of Jesus Christ.
              Alongside his wife, Sister Ijeoma Eze, he serves the community with a shared vision to draw people closer to Christ and empower them to live purposeful lives.
              Pastor Eze’s leadership inspires believers to walk faithfully in their own callings and serve with love and humility.
            </p>
          </div>
        </div>
      </div>
      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="video-modal"
        overlayClassName="video-modal-overlay"
        contentLabel="Video Modal"
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
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </Modal>     

      {/* Latest Teachings */}
      <div className="teachings-container">
        <h2 className="teachings-h2">Latest Teachings</h2>
        <div className="teachings-grid">
          {word.map((word, index) => (
            <div key={index} className="teachings-card">
              <div className="image-container">
              <img src={word.image} alt={word.title} className="word-img" />
              <button
                className="play-button"
                onClick={() => {
                  setCurrentVideo(word.youtubeLink);
                  setModalIsOpen(true);
                }}
              >
                <Play size={24} />
              </button>
            </div>
              <div className="word-info">
                <h3 className="word-title">{word.title}</h3>                
              </div>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default Home;
