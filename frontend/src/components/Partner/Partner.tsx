import React from 'react'
import './Partner.css'

const Partner: React.FC = () => {
  return (
    <div className='partner-container'>
      <div className='partner-card'>
        <div className="partner-left">
            <h4 className='partner-title1'>PARTNER WITH US</h4>
            <p className='partner-text'>Are you passionate about advancing the work of the church?
            Become a <b>valued Partner.</b></p>
            <a href ="http://localhost:5173/signup" target="_blank" rel="noopener noreferrer" className='partner-link'> Join </a>            
        </div>
        <div className="partner-right">
            <h4 className='partner-title2'>PRAYER REQUEST?</h4>
            
            <p className='scripture'>
              "Yes, ask me for anything in my name, and I will do it!"
            <span className='bible-ref'> John 14:14 (NLT) </span> </p>


            <a
              href='https://forms.gle/form'
              target='_blank'
              rel='noopener noreferrer'
              className='prayer-request-button'
            >
              Submit
            </a>
        </div>
      </div>
    </div>
  )
}

export default Partner