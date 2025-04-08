import React from 'react';
import './ThankYou.css'; 

const ThankYou: React.FC = () => {
  return (
    <div className="thank-you-container">
      <div className="thank-you-card">
        <h1>Thank You for Your Generosity! 🙏</h1>
        <p className="gospel-message">
          We deeply appreciate you selflessly choosing to give to the cause of the Gospel. 
          Your partnership helps us spread God's word to all nations.
        </p>
        
        <div className="donation-prompt">
          <p>Please complete your donation at:</p>
          <a 
            href="https://members.faithpays.org/donate/FP8588921" 
            className="donation-link"
            target="_blank" 
            rel="noopener noreferrer"
          >
            FaithPays Donation Portal
          </a>
        </div>

        <p className="bible-verse">
          "Each of you should give what you have decided in your heart to give, 
          not reluctantly or under compulsion, for God loves a cheerful giver."<br />
          - 2 Corinthians 9:7
        </p>
      </div>
    </div>
  );
};

export default ThankYou;