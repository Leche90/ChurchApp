import React from 'react'
import './About.css'
import about from '../../assets/strategic.jpg'
import pastoratee from '../../assets/pastoratee.jpg'
import '@fortawesome/fontawesome-free/css/all.min.css'

const About: React.FC = () => {
  return (
    <div className='about-container'>
      <div className='about-header'>
        <h1 className='about-h1'>About Us</h1>
      </div>

      <h4 className='about-h4'>WHAT YOU SHOULD KNOW</h4>
      
      <div className='about-content'>
      <p className='about-p'>Kingmakers International Ministries is a mandate from God founded in 2018 and led by Pastor Afam and Sister Ijeoma Eze. The ministry is built on the unwavering belief that God has called us to equip believers to reign in every area of life through the power of the Hliy Spirit and the Word of God. At Kingmakers, we are passionate about empowering individuals to live out their divine purpose and impact the world around them. We believe that every believer is a king and a ruler in God's kingdom, and we are committed to helping you discover your royal identity, develop your gifts, and walk in the fullness of God's promises for your life.
      </p>      
                  
      <p className='about-p'>At Kingmakers International Ministries, we believe that with God, all things are possible, and we are here to help you reign over life's challenges and step into the greatness that God has called you to. Together, we are building a legacy of faith, power, and victory. We welcome you to join us in this exciting journey of faith! </p>
      </div>

      <p className='text-author'>
        In Christ, Afam & Ijeoma Eze
      </p>

      <div className='about-about'>
        <div className='about-left'>
          <img src={pastoratee} alt='Pastor' className='pastoratee' />
        </div>

        {/* Vision and Mission Section */}
        <div className='about-right'>
            <div className='vision'>
              <h2 className='vision-heading'>VISION
              </h2>
              <p className='vision-text'>
                Raising royalties.
              </p>
            </div>

            <div className='mission'>
              <h2 className='mission-heading'>MISSION</h2>
              <p className='mission-text'>
              To reach out, discover, train and release members to be like Jesus wherever we are.
              </p>
            </div>
        </div>
     </div>

     <div className='values-container'>
          <h2 className="values-h2">OUR CORE VALUES</h2>      
          <div className='values-text'>
              <ul>
                <li><i className="fas fa-heart"></i>Love</li>
                <li><i className="fas fa-crown"></i>Kingdom Identity</li>
                <li><i className="fas fa-praying-hands"></i>Prayers</li>
                <li><i className="fas fa-clipboard-check"></i>Accountability</li>
                <li><i className="fas fa-trophy"></i>Excellence</li>
                <li><i className="fas fa-balance-scale"></i>Righteousness</li>
                <li><i className="fas fa-users"></i>Family</li>
              </ul>
          </div>
        </div>        
    </div>
  )
}

export default About
