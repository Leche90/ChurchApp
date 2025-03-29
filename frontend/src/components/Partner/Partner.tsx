import React, { useState } from 'react';
// import { db } from './firebase'; // Firebase config (see Step 3)
// import { collection, addDoc } from 'firebase/firestore';
import './Partner.css';

const Partner: React.FC = () => {
  const [isPrayerModalOpen, setPrayerModalOpen] = useState(false);
  const [isPartnershipModalOpen, setPartnershipModalOpen] = useState(false);
  const [prayerData, setPrayerData] = useState({ name: '', request: '' });
  const [partnershipData, setPartnershipData] = useState({ name: '', email: '', message: '' });

  // Submit Prayer Request to Firebase
  const submitPrayerRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'prayerRequests'), {
        name: prayerData.name,
        request: prayerData.request,
        timestamp: new Date(),
      });
      alert('Prayer request submitted!');
      setPrayerModalOpen(false);
    } catch (error) {
      console.error('Error submitting prayer request:', error);
    }
  };

  // Submit Partnership Form to Firebase
  const submitPartnershipForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'partnershipSubmissions'), {
        name: partnershipData.name,
        email: partnershipData.email,
        message: partnershipData.message,
        timestamp: new Date(),
      });
      alert('Partnership request submitted!');
      setPartnershipModalOpen(false);
    } catch (error) {
      console.error('Error submitting partnership form:', error);
    }
  };

  return (
    <div className='partner-container'>
      {/* Prayer Request Card */}
      <div className='partner-card'>
        <div className="partner-right">
          <h4 className='partner-right-title'>Prayer Request</h4>
          <p className='partner-right-text'>Have a prayer request? Share it with us, and let's stand in faith together. "Yes, ask me for anything in my name, and I will do it!"
            <span className='bible-ref'> John 14:14 (NLT) </span>
          </p>
          <button 
            onClick={() => setPrayerModalOpen(true)} 
            className='partner-right-button'
          >
            Submit
          </button>
        </div>
      </div>

      {/* Partnership Form Card (Add similar styling) */}
      <div className='partner-card'>
        <div className="partner-right">
          <h4 className='partner-right-title'>Become a Partner</h4>
          <p className='partner-right-text'>Are you passionate about helping people through giving? Your generosity helps us make a bigger impact!</p>
          <button 
            onClick={() => setPartnershipModalOpen(true)} 
            className='partner-right-button'
          >
            Submit
          </button>
        </div>
      </div>

      {/* Prayer Request Modal */}
      {isPrayerModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Submit Prayer Request</h3>
            <form onSubmit={submitPrayerRequest}>
              <input
                type="text"
                placeholder="Your Name (Optional)"
                value={prayerData.name}
                onChange={(e) => setPrayerData({ ...prayerData, name: e.target.value })}
              />
              <textarea
                placeholder="Your Prayer Request"
                value={prayerData.request}
                onChange={(e) => setPrayerData({ ...prayerData, request: e.target.value })}
                required
              />
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setPrayerModalOpen(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* Partnership Modal */}
      {isPartnershipModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Partnership Form</h3>
            <form onSubmit={submitPartnershipForm}>
              <input
                type="text"
                placeholder="Full Name"
                value={partnershipData.name}
                onChange={(e) => setPartnershipData({ ...partnershipData, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={partnershipData.email}
                onChange={(e) => setPartnershipData({ ...partnershipData, email: e.target.value })}
                required
              />
              <textarea
                placeholder="How would you like to partner with us?"
                value={partnershipData.message}
                onChange={(e) => setPartnershipData({ ...partnershipData, message: e.target.value })}
                required
              />
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setPartnershipModalOpen(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Partner;