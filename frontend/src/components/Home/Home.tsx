import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import church1 from '../../assets/church1.jpg'
import church2 from '../../assets/church2.jpg'
import church3 from '../../assets/church3.jpg'
import leader from '../../assets/leader.jpg'
import Strong from '/home/lleche/ChurchApp/frontend/src/assets/Strong.jpg'
import Rebuild from '/home/lleche/ChurchApp/frontend/src/assets/Rebuild.jpg'
import Survive from '/home/lleche/ChurchApp/frontend/src/assets/Survive.jpg'
import pst from '/home/lleche/ChurchApp/frontend/src/assets/pst.jpg'
import wordfor from 'home/lleche/ChurchApp/frontend/src/assets/wordfor.jpg'


    // Defining the event type
  type Event = {
    date: string;
    heading: string;
    description: string;
  };

const Home: React.FC = () => {
    const effectRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
      const handleScroll = () => {
        if (!effectRef.current) return;

        const scrollY = window.scrollY * -0.2; // Slower parallax movement
        const maxTranslate = -100; // Limit max movement

        effectRef.current.style.transform = `translate3d(0, ${Math.max(scrollY, maxTranslate)}px, 0)`;
      };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup an unmount
  }, []);

  // Dynamic titles for each teacing
  const teachings = [
    { title: 'Staying Strong in the Face of Opposition', 
      pastor: 'Pastor Afam Eze',
      youtubeLink: 'https://www.youtube.com/watch?v=EF2LijgjMmM&t=22s?rel=0',
      image: Strong },
    { title: 'Returning to Build',
      pastor: 'Pastor Afam Eze',
      youtubeLink: 'https://www.youtube.com/watch?v=B0qMXmMhfpE&t=1s?rel=0',
      image: Rebuild },    
    { title: 'How to Live and Survive in a Conflict Zone (Part 3)', 
      pastor: 'Pastor Afam Eze',
      youtubeLink: 'https://www.youtube.com/watch?v=TMRlLrEWBy0?rel=0',
      image: Survive } 
  ];


    // Array of events
  const events: Event[] = [
    {
      date: 'June 14, 2025',
      heading: 'Bread and The Word',
      description: 'Join us as we serve our local community, helping those in need.',
    },
    {
      date: 'July 19, 2025',
      heading: 'Sips and Scriptures',
      description: 'Feeding those in need within our commmunity with food, giving clothes, shoes, bags to people who leed and cannot afford them.',      
    },
    {
      date: 'August 23, 2025',
      heading: 'Dine and Divine',
      description: 'Join us for an evening of fellowship and spiritual growth as we share a meal and reflect on God’s Word.'
    },
  ];

  return (
    <div className='home'>
      <div className='hero-wrapper'>
        <div className='hero'>
          <div className="hero-text">
            <h1>KINGMAKERS' FAMILY</h1>
              <p className='hero-p'>Rooted in Christ, we stand as one; growing in faith, walking in love, and shining His light to the world. At Kingmakers, every heart matters, every soul has purpose, and together, we reign in His grace. We invite you to come and fellowship with us.</p>
              <button className='join-btn'><a href ="https://www.youtube.com/@kingmakerstv6942" target="_blank" rel="noopener noreferrer">JOIN US LIVE</a></button>        
          </div>
        </div>
      </div>
                   
          {/* Service Times */}      
        <div className="service-container">
            <h2 className='service-header'>Church Service Times</h2>
            <div className="service-grid">
              <div className="service-card">
                <h3 className='service-h3'>Sunday Morning</h3>
                <p className="service-card-time">10:00 AM</p>
              </div>
              <div className="service-card">
                <h3 className='service-h3'>Friday Evening</h3>
                <p className="service-card-time">6:00 PM</p>
              </div>
              <div className="service-card">
                <h3 className='service-h3'>Last Friday of Each Month</h3>
                <p className="service-card-time">10:00 PM</p>
              </div>
            </div>
          </div>

      {/* Church Section */}
      <div className='church-container'>
        <div className='church-card'>
          <h2 className='church-heading'>Church Experience</h2>
          <div className='church-grid'>

                {/* Image 1 */}
            <div className="church-item">
              <div className="image-container">
                <img src={church1} alt="Worship" className='church-img'/>              
              <div className='middle'>
                <div className='image-text'>WORSHIP</div>
              </div>
            </div>
              <div className='caption'>Worship</div>
            </div>

                {/* Image 2 */}
            <div className="church-item">
              <div className="image-container">
                <img src={church2} alt="Worship" className='church-img'/>              
              <div className='middle'>
                <div className='image-text'>WORD</div>
              </div>
            </div>
              <div className='caption'>Word</div>
            </div>
              
              {/* Image 3 */}
            <div className="church-item">
              <div className="image-container">
                <img src={church3} alt="Worship" className='church-img'/>              
              <div className='middle'>
                <div className='image-text'>CELEBRATION</div>
              </div>
            </div>
              <div className='caption'>Celebration</div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Teachings */}
        <div className="teachings-container">
            <h2 className='teachings-header'>Latest Teachings</h2>
          <div className="teachings-grid">
            {teachings.map((teaching, index) => (
              <div key={index} className="teachings-card">
                <img
                  src={teaching.image}
                  alt="Teaching"
                  className="teachings-img"
                />
                <div className="teaching-info">
                  <h3 className="teachings-title">{teaching.title}</h3>
                  <p className="teaching-pastor">{teaching.pastor}</p>
                  <a href={teaching.youtubeLink} target='_blank' rel='noopener noreferrer' className="teaching-link">Watch Now</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership */}
        <div className="leader-container" style={{ backgroundImage: `url(${pst})`}}>            
        <div className='leader'>
        <div className='leader-left'>
          <img src={leader} alt='Leader' className='leader-img' />
          </div>
        <div className='leader-right'>
          <h3 className='lead-pastor'>LEAD PASTOR</h3>
          <h2 className='pastor'>PASTOR AFAM EZE</h2>
          <p className='pastor-paragraph'>
            Pastor Afam Eze is the Senior Pastor of Kingmakers International Ministries, where he leads with a strong sense of divine purpose. Through his obedience to God's call, many have experienced the transformative power of Jesus Christ.
            Alongside his wife, Sister Ijeoma Eze, he serves the community with a shared vision to draw people closer to Christ and empower them to live purposeful lives.
            Pastor Eze’s leadership inspires believers to walk faithfully in their own callings and serve with love and humility.
          </p>
        </div>
      </div>          
    </div>

      {/* Upcoming Events */}
        <div className="events-container">
          <div className="events-header">
            <h2 className='events-h2'>Upcoming Events</h2>
          </div>
          <div className="events-grid">
              {events.map((event, index) => (
                <div key={index} className="events-card">
                  <div className="events-date">
                    <span className="events-icon">📅</span> {event.date}
                  </div>
                  <h3 className='comm-header'>{event.heading}</h3>
                  <p className='comm-p'>{event.description}</p>                  
                </div>
              ))}
          </div>
                
            {/* New Registration / Donation Link */}
          <div className='register-section'>
              <h3 className='register-h3'>Become a Partner</h3>
              <p className='register-p'>Are you passionate about helping people through giving? Your generosity helps us make a bigger impact!</p>
              <a href='/partnership' className='registration-link'>Partner with us through your giving</a>
              </div>
          </div>
        </div>          
  )
}

export default Home;
