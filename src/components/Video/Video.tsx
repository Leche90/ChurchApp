import React from 'react'
import './Video.css'

const Video: React.FC = () => {
  return (
    <div className='video'>
        <div className="video-main">
            <h3 className="video-title">Watch the Latest Sermon</h3>
            <p className='video-description'>
              <span className="message-title">REVISITING THE OLD PLAN</span>              
            </p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/WMbTKbN17D4?rel=0"
                title="YouTube video player"
                style={{ border: "none"  }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>                
              </iframe>
        </div>
    </div>
  )
}

export default Video