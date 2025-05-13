import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Contact.css';
import contact from '../../assets/contact.jpg';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await axios.post('/api/contact', formData);
      
      if (response.status === 200) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <div className="contact-hero"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 51, 36, 0.8), rgba(0, 20, 30, 0.9)), url(${contact})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>
        
          <div className="contact-hero-text">
            <h1 className='contact-h1'>Get in Touch with Us</h1>
            <p className='contact-p'>
              Have a question or need support? We’re here for you—reach out anytime.
            </p>
          </div>
      </div>

      {/* Contact Information Cards */}
      <div className="contact-cards-container">
        <div className="contact-cards-grid">
          {[
            {
              icon: Phone,
              title: "Call Us",
              info: "204-341-5567",
              color: "card-white",
              iconColor: "icon-primary",
            },            
            {
              icon: Mail,
              title: "Email Us",
              info: "kingmakersinternationalministries@gmail.com",
              color: "card-white",
              iconColor: "icon-primary",
            },
          ].map((item, index) =>(
            <div key={index} className={`contact-card ${item.color}`}>
            <div className='card-title-with-icon'>
              <item.icon className={`contact-card-icon ${item.iconColor}`} />
              <h3>{item.title}</h3>
            </div>
              <p className="contact-card-info">{item.info}</p>              
            </div>
          ))}
        </div>
      </div>

      <div className="contact-main-container">
        <div className="contact-grid">
          {/* Contact Form */}
          <motion.div
            ref={ref}           
            className="contact-form-section"
          >
            <h2 className='contact-h2'>Send us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-form-grid">
                <div className="contact-form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your Name"
                  />
                </div>
                <div className="contact-form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Your Email"
                  />
                </div>
              </div>
              <div className="contact-form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="Subject"
                />
              </div>
              <div className="contact-form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Type your message here"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="submit-button"
              >
                {status === 'submitting' ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message
                    <Send className="send-icon" />
                  </>
                )}
              </button>
              {status === 'success' && (
                <p className="success-message">Thank you for submitting. We will respond to you shortly.</p>
              )}
              {status === 'error' && (
                <p className="error-message">Error sending message. Please try again.</p>
              )}
            </form>
          </motion.div>

          {/* Location and Hours */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeIn}
            className="contact-info-section"
          >
            <div className="location-section">
              <h2 className="location-h2">Visit us</h2>
              <div className="map-container">
                <iframe
                  title="Church Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2731.8014322254736!2d-97.16316332421374!3d49.92670097138127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52ea7157fae4ae5f%3A0x4a4f6b3b4c4b4c7!2s582%20Burrows%20Ave%2C%20Winnipeg%2C%20MB!5e0!3m2!1sen!2sca!4v1707630980000!5m2!1sen!2sca"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div className="address-info">
                <MapPin className="info-icon" />
                <p>582 Burrows Avenue, Winnipeg, MB</p>
              </div>
            </div>
            
            <div className="info-card">
              <h3>Service Times</h3>
              <div className="info-list">
                <div className="info-item">
                  <Clock className="info-icon" />
                  <div>
                    <h4 className='info-h4'>Sunday Services</h4>
                    <p className='info-p'>10:00 AM</p>
                  </div>
                </div>
                <div className="info-item">
                  <Clock className="info-icon" />
                  <div>
                    <h4 className='info-h4'>Friday Night</h4>
                    <p className='info-p'>6:00 PM</p>
                  </div>
                </div>
                <div className="info-item">
                  <Clock className="info-icon" />
                  <div>
                    <h4 className='info-h4'>Vigil (Last Friday of Every Month)</h4>
                    <p className='info-p'>10:00 PM</p>
                  </div>
                </div>
              </div>
            </div>            
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;