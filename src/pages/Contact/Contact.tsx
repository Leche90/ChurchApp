import React, { useState, useRef } from 'react';
import { MapPin, Clock, ChevronDown } from 'lucide-react';
import axios from 'axios';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Contact.css';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FAQ {
  question: string;
  answer: string;
}

const Contact: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroShape1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const heroShape2Y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      question: 'What are your service times?',
      answer:
        'We hold services on Sundays at 10:00 AM, Friday evenings at 6:00 PM, and a monthly Vigil on the last Friday of every month at 10:00 PM. All are welcome to join us for worship, fellowship, and spiritual growth.'
    },
    {
      question: 'Where is the church located?',
      answer:
        "Kingmakers International Ministries is located at 582 Burrows Avenue, Winnipeg, MB. We're easily accessible by public transit and have parking available for guests."
    },
    {
      question: 'Do I need to dress formally for services?',
      answer:
        'We welcome you to come as you are. While some members choose to dress formally, there is no strict dress code. The most important thing is that you feel comfortable and ready to worship.'
    },
    {
      question: 'Are there programs for children and youth?',
      answer:
        'Yes. We offer age-appropriate programs for children and youth during our Sunday services. Our dedicated team provides engaging, faith-based activities that help young people grow in their relationship with God.'
    },
    {
      question: 'How can I become a member?',
      answer:
        "We'd love to have you join our church family. Membership begins with attending our New Members' Class, which covers our beliefs, mission, and vision. Contact us through this form or speak with one of our pastors after service to learn more."
    },
    {
      question: 'Do you offer baptism services?',
      answer:
        "Yes, we offer baptism for those who have made a personal decision to follow Christ. If you're interested in being baptized, please speak with Pastor Afam or Sister Ijeoma, or call the church office at (204) 341-5567."
    },
    {
      question: 'Can I volunteer or get involved in ministry?',
      answer:
        'Absolutely. We have various ministry opportunities including the worship team and community outreach. Reach out to discover where your gifts and passions can make an impact.'
    },
    {
      question: 'How can I submit a prayer request?',
      answer:
        'You can submit prayer requests through this contact form, by calling the church office at (204) 341-5567, or by speaking with the pastor after service. All requests are kept confidential and prayed over by our team.'
    },
    {
      question: 'Do you offer online streaming of services?',
      answer:
        "Yes. Our services are streamed live and archived on our YouTube channel. You can also find sermon recordings and teachings in the 'Sermons' section of our website."
    },
    {
      question: 'How can I give or support the ministry?',
      answer:
        'We offer giving options through our website or in-person during services.'
    }
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/contact',
        formData
      );

      if (response.status === 200) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="contact-cinematic">

      {/* ============ HERO ============ */}
      <section className="contact-hero" ref={heroRef}>
        <div className="contact-hero-grid-overlay" aria-hidden="true" />
        <div className="contact-hero-grain" aria-hidden="true" />

        {/* Geometric shapes */}
        <motion.div
          className="contact-hero-shape contact-hero-circle"
          style={{ y: heroShape1Y }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
            style={{ width: '100%', height: '100%' }}
          >
            <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="300" cy="300" r="280" fill="none" stroke="rgba(255,193,7,0.18)" strokeWidth="1" strokeDasharray="2 8" />
              <circle cx="300" cy="300" r="200" fill="none" stroke="rgba(255,193,7,0.1)" strokeWidth="1" />
            </svg>
          </motion.div>
        </motion.div>

        <motion.div
          className="contact-hero-shape contact-hero-square"
          style={{ y: heroShape2Y }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="20" y="20" width="60" height="60" fill="none" stroke="rgba(255,193,7,0.25)" strokeWidth="1" />
          </svg>
        </motion.div>

        <motion.div
          className="contact-hero-content"
          style={{ y: heroContentY, opacity: heroContentOpacity }}
        >
          <motion.div
            className="contact-hero-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
          </motion.div>

          <h1 className="contact-hero-title">
            <motion.span
              className="contact-hero-title-main"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              Let's
            </motion.span>
            <motion.span
              className="contact-hero-title-accent"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Connect
            </motion.span>
          </h1>

          <motion.p
            className="contact-hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <em>We'd love to hear from you</em> — whether it's a question, 
            a prayer request, or simply a hello.
          </motion.p>
        </motion.div>
      </section>

      {/* ============ FORM + INFO (CREAM) ============ */}
      <section className="contact-form-section">
        <div className="contact-form-bg-text" aria-hidden="true">CONNECT</div>

        <div className="contact-form-grid">

          {/* FORM */}
          <motion.div
            className="contact-form-col"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="contact-section-eyebrow">
              <span className="contact-eyebrow-dash" />
              SEND US A MESSAGE
            </span>
            <h2 className="contact-section-title">
              Drop a <em>line</em>
            </h2>

            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="contact-form-row">
                <div className="contact-form-field">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>
                <div className="contact-form-field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="contact-form-field">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="What's on your mind?"
                />
              </div>

              <div className="contact-form-field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Type your message here…"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="contact-submit-btn"
              >
                <span>
                  {status === 'submitting' ? 'Sending…' : 'Send Message'}
                </span>
              </button>

              {status === 'success' && (
                <motion.p
                  className="contact-form-status success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Thank you for reaching out — we'll respond shortly.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  className="contact-form-status error"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Something went wrong. Please try again.
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* INFO COLUMN */}
          <motion.aside
            className="contact-info-col"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Service Times — charcoal card */}
            <div className="contact-times-card">
              <span className="contact-times-eyebrow">
                <span className="contact-eyebrow-dash dash-gold" />
                WHEN WE GATHER
              </span>
              <h3 className="contact-times-title">
                Service <em>Times</em>
              </h3>

              <ul className="contact-times-list">
                <li>
                  <Clock size={14} className="contact-times-icon" />
                  <div>
                    <span className="contact-times-label">Sunday Worship</span>
                    <span className="contact-times-value">10:00 AM</span>
                  </div>
                </li>
                <li>
                  <Clock size={14} className="contact-times-icon" />
                  <div>
                    <span className="contact-times-label">Friday Evening</span>
                    <span className="contact-times-value">6:00 PM</span>
                  </div>
                </li>
                <li>
                  <Clock size={14} className="contact-times-icon" />
                  <div>
                    <span className="contact-times-label">Monthly Vigil</span>
                    <span className="contact-times-value">Last Fri · 10:00 PM</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Map */}
            <div className="contact-map-block">               
              <h3 className="contact-map-title">
                Visit <em>in person</em>
              </h3>

              <div className="contact-map-wrap">
                <iframe
                  title="Church Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2731.8014322254736!2d-97.16316332421374!3d49.92670097138127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52ea7157fae4ae5f%3A0x4a4f6b3b4c4b4c7!2s582%20Burrows%20Ave%2C%20Winnipeg%2C%20MB!5e0!3m2!1sen!2sca!4v1707630980000!5m2!1sen!2sca"
                  width="100%"
                  height="280"
                  loading="lazy"
                />
              </div>

              <div className="contact-address">
                <MapPin size={16} />
                <span>582 Burrows Avenue, Winnipeg, MB</span>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* ============ FAQ (DARK) ============ */}
      <section className="contact-faq">
        <div className="contact-faq-bg-text" aria-hidden="true">FAQ</div>

        <div className="contact-faq-header">
          <motion.h2
            className="contact-faq-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Frequently Asked <em>Questions</em>
          </motion.h2>
          <motion.p
            className="contact-faq-tagline"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Everything you might want to know — gathered in one place.
          </motion.p>
        </div>

        <div className="contact-faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openFAQ === index;
            return (
              <motion.div
                key={index}
                className={`contact-faq-item ${isOpen ? 'open' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
              >
                <button
                  className="contact-faq-question"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                >
                  <span className="contact-faq-q-num">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="contact-faq-q-text">{faq.question}</span>
                  <ChevronDown
                    className={`contact-faq-icon ${isOpen ? 'rotated' : ''}`}
                    size={20}
                  />
                </button>
                <div
                  className={`contact-faq-answer ${isOpen ? 'open' : ''}`}
                >
                  <p>{faq.answer}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Contact;