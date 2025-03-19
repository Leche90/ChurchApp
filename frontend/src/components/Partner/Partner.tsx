import React from 'react'
import './Partner.css'

const Partner: React.FC = () => {
  return (
    <div className='partner-container'>
      <div className='partner-card'>
        <div className="partner-left">
            <h4 className='partner-left-title'>PARTNER WITH US</h4>
            <p className='partner-left-text'>Are you passionate about advancing the work of the church?
            Become our <b>valued Partner.</b></p>
            <a href ="http://localhost:5173/partnership" target="_blank" rel="noopener noreferrer" className='partner-left-button'> Join </a>            
        </div>
        <div className="partner-right">
            <h4 className='partner-right-title'>PRAYER REQUEST?</h4>
            
            <p className='partner-right-text'>
              "Yes, ask me for anything in my name, and I will do it!"
            <span className='bible-ref'> John 14:14 (NLT) </span> </p>

            <a
              href='https://forms.gle/form'
              target='_blank'
              rel='noopener noreferrer'
              className='partner-right-button'
            >
              Submit
            </a>
        </div>
      </div>
    </div>
  )
}

export default Partner