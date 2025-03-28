import React from 'react'
import './Partner.css'
import treesImage from '/home/lleche/ChurchApp/frontend/src/assets/trees.jpg'

const Partner: React.FC = () => {
  return (
    <div className='partner-container' style={{ backgroundImage: `url(${treesImage})`}}>
      <div className='partner-card'>
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