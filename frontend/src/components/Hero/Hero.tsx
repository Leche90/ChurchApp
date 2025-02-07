import React from 'react'
import './Hero.css'

const Hero: React.FC = () => {
  return (
    <div className='hero'>
        <div className="hero-text">
            <h1>Welcome to the Kingmakers' Family</h1>
            <p>We invite you to come and fellowship with us.</p>
            <button className='btn'>JOIN US <b>LIVE</b></button>        
        </div>
    </div>
  )
}

export default Hero