import React from 'react'
import './Partner.css'

const Partner: React.FC = () => {
  return (
    <div className='partner'>
        <div className="partner-left">
            <h4>PARTNER WITH US</h4>
            <p>Do you desire to support the ministry?</p>
            <a href ="https://www.kingmakersinternationalministries.com/signup" target="_blank" rel="noopener noreferrer"> Sign up for FREE today</a>            
        </div>
        <div className="partner-right">
            <h4>SUBMIT YOUR PRAYER REQUESTS</h4>
            <div className='subscribe-form'>
                <input type="email" placeholder="Email Address" />
                <button>SUBMIT</button>
            </div>
        </div>
    </div>
  )
}

export default Partner