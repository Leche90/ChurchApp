import React from 'react'
import './Hero.css'

const Hero: React.FC = () => {
  return (
    <div className='hero container'>
        <div className="hero-text">
            <h1>Welcome to the Kingmakers' Family</h1>
            <p>We invite you to come and fellowship with us. We believe in the power of faith, the strength of community, and the boundless love of God. Whether you're seeking spiritual growth, a place of peace, or a family to walk with you in Christ.</p>
            <button className='btn'>JOIN US <b>LIVE</b></button>        
        </div>
    </div>
  )
}

export default Hero