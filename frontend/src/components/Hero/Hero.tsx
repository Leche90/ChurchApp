import React from 'react'
import './Hero.css'

const Hero: React.FC = () => {
    return (
      <div className='hero-wrapper'>
        <div className='hero'>
          <div className="hero-text">
            <h1>Kingmakers' Family</h1>
              <p className='hero-p'>Rooted in Christ, we stand as one—growing in faith, walking in love, and shining His light to the world. At Kingmakers, every heart matters, every soul has purpose, and together, we reign in His grace. We invite you to come and fellowship with us.</p>
              <button className='btn'>JOIN US<b>LIVE</b></button>        
          </div>
        </div>
      </div>
  )
}

export default Hero