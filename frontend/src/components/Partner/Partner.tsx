import React from 'react'
import './Partner.css'

const Partner: React.FC = () => {
  return (
    <div className='partner'>
        <div className="partner-left">
            <h4 className='partner-us'>PARTNER WITH US</h4>
            <p className='partner-text'>Do you desire to support the ministry?</p>
            <a href ="http://localhost:5173/signup" target="_blank" rel="noopener noreferrer"> Join Our Ministry Partnership </a>            
        </div>
        <div className="partner-right">
            <h4 className='submit'>SUBMIT YOUR PRAYER REQUESTS</h4>
            <div className='subscribe-form'>
                <input type="email" placeholder="Email Address" />
                <button>SUBMIT</button>
            </div>
        </div>
    </div>
  )
}

export default Partner