import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import './Home.css';
import worship from '../../assets/worship.jpg';
import teaching from '../../assets/teaching.jpg';
import prayer from '../../assets/prayer.jpg';
import leader from '../../assets/leader.jpg';
import Strong from '/home/lleche/ChurchApp/frontend/src/assets/Strong.jpg';
import Rebuild from '/home/lleche/ChurchApp/frontend/src/assets/Rebuild.jpg';
import Survive from '/home/lleche/ChurchApp/frontend/src/assets/Survive.jpg';
import pst from '/home/lleche/ChurchApp/frontend/src/assets/pst.jpg';
import { motion } from 'framer-motion';
import { FaCalendar } from 'react-icons/fa';
import barbecue from '/home/lleche/ChurchApp/frontend/src/assets/barbecue.jpg';

// Defining the event type
type Event = {
  date: string;
  heading: string;
  description: string;
};

const Home: React.FC = () => {
  const effectRef = useRef<HTMLDivElement | null>(null);

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

  const [overlayText, setOverlayText] = useState({
    worship: 'WORSHIP',
    word: 'WORD',
    prayer: 'PRAYER',
  });

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
          <h2 className="service-header">Join Us in Worship</h2>
          {/* <p className="service-description">Let us experience God's presence together</p> */}
        </motion.div>        

        {/* Service Cards */}
        <div className="service-grid">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`service-card ${service.color}`}
            >              
              <h3 className="service-h3">{service.title}</h3>
              {service.times.map((time, i) => (
                <p key={i} className="service-card-time">
                  {time}
                </p>
              ))}
            </motion.div>
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

  // Array of events
  const events: Event[] = [
    {
      date: 'June 14, 2025',
      heading: 'Gospel & Grill',
      description: 'Join us for a fun-filled evening of barbecue, fellowship, and uplifting conversations.',
    },
    {
      date: 'July 19, 2025',
      heading: 'Gospel & Grill',
      description:
        'Come together for a day of great food, fellowship, and sharing in God’s Word.',
    },
    {
      date: 'August 23, 2025',
      heading: 'Gospel & Grill',
      description:
        'A day to celebrate good food, good company, and growing together in faith and fellowship.',
    },
  ];

  return (
    <div className="home">
      <div className="hero-wrapper">
        <div className="hero">
          <div className="hero-text">
            <h1>KINGMAKERS' FAMILY</h1>
            <p className="hero-p">
              Rooted in Christ, we stand as one; growing in faith, walking in love, and shining His light to the world. At Kingmakers, every heart matters, every soul has purpose, and together, we reign in His grace. We invite you to come and fellowship with us.
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

      {/* Church Section */}
      <div className="church-container">
        <div className="church-card">
          <h2 className="church-h2">Church Experience</h2>
          <div className="church-grid">
            {/* Image 1 */}
            <div className="church-item">
              <div className="image-container">
                <img src={worship} alt="Worship" className="church-img" />
                <div className="overlay-text">{overlayText.worship}</div>
              </div>
            </div>

            {/* Image 2 */}
            <div className="church-item">
              <div className="image-container">
                <img src={teaching} alt="Word" className="church-img" />
                <div className="overlay-text">{overlayText.word}</div>
              </div>
            </div>

            {/* Image 3 */}
            <div className="church-item">
              <div className="image-container">
                <img src={prayer} alt="Prayer" className="church-img" />
                <div className="overlay-text">{overlayText.prayer}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Teachings */}
      <div className="word-container">
        <h2 className="word-header">Latest Teachings</h2>
        <div className="word-grid">
          {word.map((word, index) => (
            <div key={index} className="word-card">
              <img src={word.image} alt="The Word" className="word-img" />
              <div className="word-info">
                <h3 className="word-title">{word.title}</h3>
                <a href={word.youtubeLink} target="_blank" rel="noopener noreferrer" className="word-link">
                  Watch Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership */}
      <div className="leader-container" style={{ backgroundImage: `url(${pst})` }}>
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

      {/* Upcoming Events */}
      <div className="events-container" style={{ backgroundImage: `url(${barbecue})` }}>
        <div className="events-header">
          <h2 className="events-h2">Upcoming Events</h2>
        </div>
        <div className="events-grid">
          {events.map((event, index) => (
            <div key={index} className="events-card">
              <div className="events-date">
                <span className="events-icon">📅</span> {event.date}
              </div>
              <h3 className="comm-header">{event.heading}</h3>
              <p className="comm-p">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
