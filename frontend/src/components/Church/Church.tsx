import React, { useEffect, useState } from 'react'
import './Church.css'
import church1 from '../../assets/church1.jpg'
import church2 from '../../assets/church2.jpg'
import church3 from '../../assets/church3.jpg'

const Event: React.FC = () => {
  return (
    <div className='churchs'>
      <h2 className='church-life'>OUR CHURCH LIFE</h2>
        <div className='church-container'>
            <div className="church">
              <div className="image-container">
                  <img src={church1} alt="Worship" className='church1-img'/>
              </div>
                  <div className="caption">Worship</div>
                    <div className='middle'>
                      <div className='image-text'>WORSHIP</div>
                    </div>                 
            </div>
            <div className="church">
              <div className="image-container">
                  <img src={church2} alt="Word" className='church2-img'/>
              </div>
                  <div className="caption">Word</div>
                    <div className='middle'>
                      <div className='image-text'>WORD</div>
                  </div>
            </div>
            <div className="church">
              <div className="image-container">
                  <img src={church3} alt="Celebration" className='church3-img'/>
              </div>
                  <div className="caption">Celebration</div>
                    <div className='middle'>
                        <div className='image-text'>CELEBRATION</div>
                    </div>
            </div>
        </div>
      </div>
  )
}

export default Event;