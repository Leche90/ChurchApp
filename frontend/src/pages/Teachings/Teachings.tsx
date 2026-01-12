import React, { useState } from 'react'
import { Play } from 'lucide-react'
import './Teachings.css'
import wordforImage from '../../assets/optimized/wordfor.webp'
import preacherImage from '../../assets/preacher.jpg'
import scripturesImage from '../../assets/optimized/scriptures.webp'
import timeImage from '../../assets/optimized/time.webp'
import planImage from '../../assets/optimized/plan.webp'
import strategicImage from '../../assets/optimized/strategic.webp'
import praiseImage from '../../assets/optimized/praise.webp'
import handImage from '../../assets/hand.jpg'
import burdenImage from '../../assets/optimized/burden.webp'

const youtubeLinks: { [key: number]: string } = {
  1: 'https://www.youtube.com/embed/3aCfFoH_PE4?rel=0&modestbranding=1',
  2: 'https://www.youtube.com/embed/JhSVPYnqVsk?start=4&rel=0&modestbranding=1',
  3: 'https://www.youtube.com/embed/AuY62wY46As?rel=0&modestbranding=1',
  4: 'https://www.youtube.com/embed/WMbTKbN17D4?rel=0&modestbranding=1',
  5: 'https://www.youtube.com/embed/YKfhkEJJ6qk?rel=0&modestbranding=1',
  6: 'https://www.youtube.com/embed/_4D-XgUy1q4?rel=0&modestbranding=1'
};

interface TeachingProps {}

const Teachings: React.FC<TeachingProps> = () => {

  // Modal state to control visibility
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentVideo, setCurrentVideo] = useState<number | null>(null);

  // Sermons array
  const sermons = [
  {
    id: 1,
    title: 'The Hand of God',
    duration: '38 Minutes',
    image: handImage
  },
  {
    id: 2,
    title: 'The Value of Time',
    duration: '42 Minutes',
    image: timeImage
  },
  {
    id: 3,
    title: "Bearing Each Other's Burdens",
    duration: "44 Minutes",
    image: burdenImage
  },
  {
    id: 4,
    title: 'Revisiting the Old Plan',
    duration: '41 Minutes',
    image: planImage
  },
  {
    id: 5,
    title: 'Strategic Planning',
    duration: '37 Minutes',
    image: strategicImage
  },
  {
    id: 6,
    title: 'Returning to Praise the Lord',
    duration: '38 Minutes',
    image: praiseImage
  },
];

  // Function to handle video modal opening and closing
  const handlePlayClick = (sermonId: number) => {
    setCurrentVideo(sermonId); // Set the video to the clicked sermon
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setCurrentVideo(null); // Reset the video to null
  };

    // Series array
  const series = [
    {
      id: 1,
      title: 'Kingmakers International Ministries',
      description: 'A series of sermons and events to help you grow in faith and live out God’s plan for your life.',
      image: scripturesImage
    },
    {
      id: 2,
      title: 'Faith Foundations',
      description: 'A six-part series exploring the fundamentals of Christian faith.',
      image: scripturesImage
    },
    {
      id: 3,
      title: 'Living in Faith',
      description: 'A series of teachings on how to live a life of faith in today’s world.',
      image: scripturesImage
    },
    {
      id: 4,
      title: 'Growing in Faith',
      description: 'A series of teachings on how to grow in faith and live in God’s presence.',
      image: scripturesImage
    }  
  ]

  return (
    <>
      <div className="teachings-header" style={{ backgroundImage: `url(${wordforImage})` }}>
        <div className="teachings-card-second">
          <div className="teachings-title">
            <h1 className="teachings-h1">Our Teachings</h1>
            <p className="headings-title-p">Growing in faith through God's Word</p>
          </div>
        </div>
      </div>


      {/* Latest Sermons */}
      <div className="sermons-section">
        <div className="sermons-container">
          <h2 className="sermons-h2">Sermons</h2>
          <div className="sermons-grid">
            {sermons.map((sermon) => (
              <div key={sermon.id} className="sermon-card">
                <div className="sermon-image-container">
                  {/* Hover effect to show play button */}
                  <img src={sermon.image} alt="Preacher" className="sermon-image" />
                  <button className="sermon-play-button" onClick={() => handlePlayClick(sermon.id)}>
                    <Play className="sermon-play-icon" />
                  </button>
                </div>
                <div className="sermon-details">       
                  <h3 className="sermon-title">{sermon.title}</h3>                  
                  <div className="sermon-meta">
                    <span className="sermon-time">{sermon.duration}</span>
                    {/* <span className="sermon-separator">•</span>                     */}
                </div>
              </div>
            </div>
            ))}
        </div>
      </div>
    </div>

      {/* Modal for playing YouTube video */}
      {isModalOpen && currentVideo !== null && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close-button" onClick={closeModal}>
            X
          </button>
          <iframe
            src={youtubeLinks[currentVideo]}
            title={sermons.find(s => s.id === currentVideo)?.title || "Sermon"}
            className="video-iframe"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      )}
    </>      
  )
}; 

export default Teachings;
