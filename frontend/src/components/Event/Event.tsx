import React from 'react'
import './Event.css'
import event1 from '../../assets/event1.jpg'
import event2 from '../../assets/event2.jpg'
import event3 from '../../assets/event3.jpg'

const Event: React.FC = () => {
  return (
    <div className='events'>
      <h2 className='church-life'>OUR CHURCH LIFE</h2>
        <div className='event-container'>
            <div className="event">
                <img src={event1} alt="Worship" className='event1-img'/>
                <div className="caption">Worship</div>
            </div>
            <div className="event">
                <img src={event2} alt="Word" className='event2-img'/>
                <div className="caption">Word</div>
            </div>
            <div className="event">
                <img src={event3} alt="Celebration" className='event3-img'/>
                <div className="caption">Celebration</div>
            </div>
        </div>
    </div>
  )
}

export default Event