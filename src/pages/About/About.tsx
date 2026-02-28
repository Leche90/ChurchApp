import React from 'react'
import './About.css'
import pastoratee from '../../assets/pastoratee.jpg'

const About: React.FC = () => {
  return (
    <div className='about-page'>
      {/* Hero Section */}
      <section className='about-hero'>
        <div className='hero-overlay'>
          <h4 className='subtitle'>ESTABLISHED 2018</h4>
          <h1 className='display-title'>Our Mandate</h1>
        </div>
      </section>

      {/* Founder's Message Section */}
      <section className='about-story-grid'>
        <div className='story-text'>
          <h2 className='section-label'>What You Should Know</h2>
          
          <p className='body-text'>
            Kingmakers International Ministries is a mandate from God founded in 2018 and led by Pastor Afam and Sister Ijeoma Eze. The ministry is built on the unwavering belief that God has called us to equip believers to reign in every area of life through the power of the Hliy Spirit and the Word of God. At Kingmakers, we are passionate about empowering individuals to live out their divine purpose and impact the world around them. We believe that every believer is a king and a ruler in God's kingdom, and we are committed to helping you discover your royal identity, develop your gifts, and walk in the fullness of God's promises for your life.
            </p>
            <p className='body-text'> At Kingmakers International Ministries, we believe that with God, all things are possible, and we are here to help you reign over life's challenges and step into the greatness that God has called you to. Together, we are building a legacy of faith, power, and victory. We welcome you to join us in this exciting journey of faith!
          </p>
          <div className='signature-block'>
            <p className='signing-off'>In Christ,</p>
            <p className='author-names'>Afam & Ijeoma Eze</p>
          </div>
        </div>
        <div className='story-image'>
          <div className='image-frame'>
            <img src={pastoratee} alt='Pastors Afam and Ijeoma Eze' className='pastor-img' />
            <div className='image-accent'></div>
          </div>
        </div>
      </section>

      {/* Vision & Mission: High Contrast Cards */}
      <section className='vision-mission-row'>
        <div className='vision-card'>
          <h3>Vision</h3>
          <p>Raising Royalties.</p>
        </div>
        <div className='mission'>
          <h3>Mission</h3>
          <p>To reach out, discover, train and release members to be like Jesus wherever we are.</p>
        </div>
      </section>

      {/* Core Values: The Grid */}
      <section className='values-section'>
        <h2 className='values-h2'>Our Core Values</h2>
        <div className='values-grid'>
          {[
            { icon: 'fa-heart', label: 'Love' },
            { icon: 'fa-crown', label: 'Kingdom Identity' },
            { icon: 'fa-praying-hands', label: 'Prayers' },
            { icon: 'fa-clipboard-check', label: 'Accountability' },
            { icon: 'fa-trophy', label: 'Excellence' },
            { icon: 'fa-balance-scale', label: 'Righteousness' },
            { icon: 'fa-users', label: 'Family' }
          ].map((val, i) => (
            <div key={i} className='value-item'>
              <i className={`fas ${val.icon}`}></i>
              <span>{val.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About