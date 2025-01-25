import React from 'react'
import './Mission.css'
import mission_icon from '../../assets/mission-icon.png'
import vision_icon from '../../assets/vision-icon.png'
import values_icons from '../../assets/values-icons.png'

const Mission: React.FC = () => {
  return (
    <div className='mission-container'>
      <img src="" alt="" className='mission-icon'/>
        <div className='mission'>MISSION</div>
        <p className='mission-text'>
            To reach out, discover, train and release members to be like Jesus wherever we are.
        </p>
    </div>
  )
}

export default Mission