import React from 'react'
import { Play } from 'lucide-react'
import './Teachings.css'

// Import images
import teachingsImage from '../../assets/teachings.jpg'
import preacherImage from '../../assets/preacher.jpg'
import scripturesImage from '../../assets/scriptures.jpg'

interface TeachingProps {}

const Teachings: React.FC<TeachingProps> = () => {
  return (
    <div className="teachings-container">
      <div className="teachings-hero-section" style={{ backgroundImage: `url(${teachingsImage})` }}>
        <div className="teachings-card" />
        <div className="teachings-card-second">
          <div className="teachings-heading">
            <h1 className="teachings-h1">Our Teachings</h1>
            <p className="headings-title-p">Growing in faith through God's Word</p>
          </div>
        </div>
      </div>

      {/* Latest Sermons */}
      <div className="sermons-section">
        <div className="sermons-container">
          <h2 className="section-title">Teachings</h2>
          <div className="sermons-grid">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="sermon-card">
                <div className="sermon-image-container">
                  <img src={preacherImage} alt="Preacher" className="sermon-image" />
                  <button className="play-button">
                    <Play className="play-icon" />
                  </button>
                </div>
                <div className="sermon-details">
                  <div className="sermon-date">March 10, 2025</div>
                  <h3 className="sermon-title">Walking in Faith</h3>
                  <p className="sermon-author">Pastor Afam Eze</p>
                  <div className="sermon-meta">
                    <span className="sermon-time">47 Minutes</span>
                    <span className="sermon-separator">•</span>
                    <span className="sermon-series">Series: Faith Foundations</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Series Section */}
      <div className="series-section">
        <div className="series-container">
          <h2 className="section-h2">Sermon Series</h2>
          <div className="series-grid">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="series-card">
                <div className="series-content">
                  <div className="series-image-container">
                    <img className="series-image" src={scripturesImage} alt="Series" />
                  </div>
                  <div className="series-details">
                    <h3 className="series-title">Faith Foundation</h3>
                    <p className="series-description">A six-part series exploring the fundamentals of Christian faith.</p>
                    <button className="view-series-button">View Series →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Teachings;
