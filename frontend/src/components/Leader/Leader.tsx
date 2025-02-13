import React from 'react'
import './Leader.css'
import leader from '../../assets/leader.jpg'

const Leader: React.FC = () => {
  return (
    <div>
        <div className='leader'>
            <div className='leader-left'>
                <img src={leader} alt='Leader' className='leader-img' />
            </div>
            <div className='leader-right'>
                <h3 className='lead-pastor'>LEAD PASTOR</h3>
                <h2 className='pastor'>PASTOR AFAM EZE</h2>
                <p className='pastor-paragraph'>
                Pastor Afam Eze is the Senior Pastor of Kingmakers International Ministries, where he leads with a strong sense of divine purpose. Through his obedience to God's call, many have experienced the transformative power of Jesus Christ.
                Alongside his wife, Sister Ijeoma Eze, he serves the community with a shared vision to draw people closer to Christ and empower them to live purposeful lives.
                Pastor Eze’s leadership inspires believers to walk faithfully in their own callings and serve with love and humility.
                </p>
            </div>
        </div>        
    </div>
  )
}

export default Leader