import React, { useState } from 'react';
import './Contact.css'

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<string>(''); // Added state to manage form status message

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Updates the respective field in formData
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate a successful submission for the form
    setFormStatus('Thank you for submitting. We will respond to you shortly');
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className='contact'>
      <h2 className='contact-heading'>We'd Love to Hear from You</h2>
      <p className='contact-description'>
        Whether you have a prayer request, need guidance, or want to join the Kingmakers International family, please feel free to contact us using the information below or fill out the form. We would reach out to you.
      </p>

      {/* Contact Information Section */}
      <div className='contact-info'>
        <h3 className='contact-h3'>Our Address:</h3>
        <p className='address'>582 Burrows Avenue, Winnipeg, MB</p>

        <h3>Phone:</h3>
        <p className='tel'><a href='tel:+12043415567'>204-341-5567</a></p>

        <h3>Email:</h3>
        <p className='email'><a href='mailto:kingmakersinternationalministries@gmail.com'>kingmakersinternationalministries@gmail.com</a></p>
      </div>

      {/* Contact Form Section */}
      <div className='contact-form-section'>
        <h3>Send us a message:</h3>
        {formStatus && <p className='form-status'>{formStatus}</p>}

        <form className='contact-form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder='Your Name'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder='Your Email'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='message'>Your Message</label>
            <textarea
              id='message'
              name='message'
              value={formData.message}
              onChange={handleInputChange}
              required
              placeholder='Type your message here'
            ></textarea>
          </div>

          <button type='submit' className='submit-btn'>Send Message</button>
        </form>
      </div>

        {/* Embedded Google Map */}
      <div className='map-container'>
        <h3 className='location'>Our Location</h3>
        <iframe
          title='Church Location'
          width='100%'
          height='400'                    
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2731.8014322254736!2d-97.16316332421374!3d49.92670097138127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52ea7157fae4ae5f%3A0x4a4f6b3b4c4b4c7!2s582%20Burrows%20Ave%2C%20Winnipeg%2C%20MB!5e0!3m2!1sen!2sca!4v1707630980000!5m2!1sen!2sca"
          allowFullScreen
          ></iframe>
      </div>
    </div>
  );
};

export default Contact;
