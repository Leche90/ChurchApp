import React, { useState } from 'react';
import { Play, Info, X } from 'lucide-react';
import './Sermons.css';
import wordforImage from '../../assets/optimized/wordfor.webp';
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
  6: 'https://www.youtube.com/embed/_4D-XgUy1q4?rel=0&modestbranding=1&autoplay=1'
};

const sermons: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<number | null>(null);
  const [hoveredMessagesCard, setHoveredMessagesCard] = useState<number | null>(null);

  const messages = [
    {
      id: 1,
      title: 'The Hand of God',
      duration: '38 min',
      date: '2024',
      description: 'Understanding God\'s sovereign hand in our daily lives',
      image: handImage
    },
    {
      id: 2,
      title: 'The Value of Time',
      duration: '42 min',
      date: '2024',
      description: 'Redeeming time and living with eternal perspective',
      image: timeImage
    },
    {
      id: 3,
      title: "Bearing Each Other's Burdens",
      duration: '44 min',
      date: '2024',
      description: 'Building authentic community through shared support',
      image: burdenImage
    },
    {
      id: 4,
      title: 'Revisiting the Old Plan',
      duration: '41 min',
      date: '2024',
      description: 'Returning to God\'s original design for your life',
      image: planImage
    },
    {
      id: 5,
      title: 'Strategic Planning',
      duration: '37 min',
      date: '2024',
      description: 'Aligning your plans with Kingdom purpose',
      image: strategicImage
    },
    {
      id: 6,
      title: 'Returning to Praise the Lord',
      duration: '38 min',
      date: '2024',
      description: 'Cultivating a lifestyle of worship and gratitude',
      image: praiseImage
    }
  ];

  const handlePlayClick = (messagesId: number) => {
    setCurrentVideo(messagesId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setCurrentVideo(null), 300);
  };

  return (
    <div className='messages-page'>
      
      {/* Netflix-Style messages Banner */}
      <section className='messages-banner'>
        <div className='messages-backdrop' style={{ backgroundImage: `url(${wordforImage})` }}></div>
        <div className='messages-gradient'></div>
        <div className='messages-content'>
          <h1 className='messages-title'>Our Messages</h1>
          <p className='messages-description'>
            Growing in faith through God's Word. Watch our latest messages and dive deeper into Scripture.
          </p>
          <div className='messages-buttons'>
            <button className='messages-btn-play' onClick={() => handlePlayClick(1)}>
              <Play fill='#000' strokeWidth={0} />
              <span>Play Latest</span>
            </button>
            {/* <button className='messages-btn-info'>
              <Info size={20} />
              <span>More Info</span>
            </button> */}
          </div>
        </div>
      </section>

      {/* messages Row */}
      <section className='messages-section'>
        <h2 className='messages-section-title'>Recent Messages</h2>
        <div className='messages-row'>
          {messages.map((messages) => (
            <div
              key={messages.id}
              className={`messages-card ${hoveredMessagesCard === messages.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredMessagesCard(messages.id)}
              onMouseLeave={() => setHoveredMessagesCard(null)}
              onClick={() => handlePlayClick(messages.id)}
            >
              <div className='messages-card-image-wrapper'>
                <img src={messages.image} alt={messages.title} className='messages-card-image' />
                <div className='messages-card-overlay'>
                  <button className='messages-card-play-btn'>
                    <Play fill='#fff' strokeWidth={0} size={32} />
                  </button>
                </div>
              </div>
              <div className='messages-card-info'>
                <h3 className='messages-card-title'>{messages.title}</h3>
                <div className='messages-card-meta'>
                  <span className='messages-card-duration'>{messages.duration}</span>
                  <span className='messages-card-dot'>•</span>
                  <span className='messages-card-year'>{messages.date}</span>
                </div>
                <p className='messages-card-description'>{messages.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Modal */}
      {isModalOpen && currentVideo !== null && (
        <div className={`messages-modal-overlay ${isModalOpen ? 'active' : ''}`} onClick={closeModal}>
          <div className='messages-modal-wrapper' onClick={(e) => e.stopPropagation()}>
            <button className='messages-modal-close' onClick={closeModal}>
              <X size={24} />
            </button>
            <div className='messages-modal-video-container'>
              <iframe
                src={youtubeLinks[currentVideo]}
                title={messages.find(s => s.id === currentVideo)?.title || 'messages'}
                className='messages-modal-iframe'
                allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default sermons;