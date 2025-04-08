import React from 'react'
import './About.css'
import about from '../../assets/about.jpg'
import about_left from '../../assets/about_left.jpg'

const About: React.FC = () => {
  return (
    <div className='about-container'>
      <div className='about-header'>
        <h1 className='about-h1'>About Us</h1>
      </div>

      <h4 className='know-title'>WHAT YOU SHOULD KNOW</h4>
      
      <div className='about-content'>
      <p className='text'>Kingmakers International Ministries is a mandate from God founded in 2018 and led Pastor Afam and Sister Ijeoma Eze. Our ministry is built on the unwavering belief that God has called us to equip believers to reign in every area of life through the power of the Holy Spirit and the Word of God. At Kingmakers, we are passionate about empowering individuals to live out their divine purpose and impact the world around them. We believe that every believer is a king and a ruler in God's kingdom, and we are committed to helping you discover your royal identity, develop your gifts, and walk in the fullness of God's promises for your life.
      </p>      
                  
      <p className='texts'>We welcome you to join us in this exciting journey of faith! At Kingmakers International Ministries, we believe that with God, all things are possible, and we are here to help you reign over life's challenges and step into the greatness that God has called you to. Together, we are building a legacy of faith, power, and victory.</p>
      </div>

      <p className='text-author'>
        In Christ, Afam & Ijeoma Eze
      </p>

      <div className='about-about'>
      <div className='about-left'>
        <img src={about_left} alt='About left' className='about-left-img' />
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
        <div className='values'>Our Core Values</div>       
          <div className='values-text'>
              <ul>
                <ol>Righteousness</ol>
                <ol>Prayer</ol>
                <ol>Royalty</ol>
                <ol>Excellence</ol>
                <ol>Accountability</ol>
                <ol>Love</ol>
                <ol>Family</ol>
              </ul>
          </div>
        </div>

        {/* <div className='started-container'></div>
          <h5 className='started-heading'>How We Started
          </h5>
          <div className='started-text'>
          <p>In pursuit of God's divine purpose, Kingmakers International Ministries was founded in 2018 under the leadership of Pastor Afam and Sister Ijeoma Eze. From the very beginning, it was clear that this ministry carried a unique mandate—to equip believers to reign in every aspect of life through the power of the Holy Spirit and the truth of God's Word.</p>

          <p>The journey began with deep prayer and fasting, seeking clarity on the next steps. The vision was clear: to raise up a generation of believers who understand their royal identity in Christ and walk boldly in their God-given authority. However, the path was not without challenges. Without a dedicated space, the first gatherings took place in small rented venues, where passionate worship and powerful teaching ignited a movement of faith.</p>

          <p>As the ministry grew, so did the obstacles. Limited resources made it difficult to secure a permanent location, and at times, they faced situations where venues required immediate payments before services could begin. But through unwavering trust in God's provision, doors continued to open, and what started as a small gathering soon expanded into a thriving community. </p>

          <p>With each passing year, Kingmakers International Ministries has remained steadfast in its mission—empowering individuals to live out their divine purpose, develop their spiritual gifts, and walk in the fullness of God's promises. From humble beginnings to a growing global impact, the ministry stands as a testimony to faith, perseverance, and the undeniable power of God at work.</p>

          <p>Today, we invite you to be a part of this incredible journey. At Kingmakers, we believe that every believer is called to reign, and together, we are building a legacy of faith, victory, and transformation.
          </p>
        </div>         */}
    </div>
  )
}

export default About
