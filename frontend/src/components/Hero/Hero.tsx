import React from 'react'
import './Hero.css'

const Hero: React.FC = () => {
  return (
    <div className='hero'>
        <div className="hero-text">
            <h1>Welcome to the Kingmakers' Family</h1>
            <p>At Kingmakers, we are committed to 'Raising Royalties' — empowering people to step into their divine purpose and embrace the royalty within them. We believe every person is called to reign in life, guided by faith, love, and the wisdom of God. We invite you to come and fellowship with us.</p>
            <button className='btn'>JOIN US<b>LIVE</b></button>        
        </div>
    </div>
  )
}

export default Hero