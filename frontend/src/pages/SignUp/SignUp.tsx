import React, { useState } from 'react';
import './SignUp.css';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    securityQuestion: '',
    securityAnswer: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');

    const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      // Redirect to the login page after successful signup      
      window.location.href = '/login';
    } else {
      alert(`Signup failed: ${data.message || 'Something went wrong!'}`);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="form-input" required />
        </div>

        <div className="form-group">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="form-input" required />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" required />
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-input" required />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-input" required />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="form-input" required />
        </div>

        <div className="form-group">
          <label htmlFor="securityQuestion" className="form-label">Security Question</label>
          <select name="securityQuestion" value={formData.securityQuestion} onChange={handleChange} className="form-input" required>
            <option value='' disabled>Select a question</option>
            <option value='firstSchool'>What was the name of your first school?</option>
            <option value='parkVisit'>What was the name of the park you visited most often as a child?</option>
            <option value='firstJob'>In which city did you get your first job?</option>
            <option value='firstDate'>Where did you go on your first date?</option>
            <option value='schoolTeacher'>What’s the name of your first school teacher?</option>
            <option value='favoriteBook'>What is your favorite book?</option>
            <option value='childhoodGame'>What was the name of your favorite childhood game?</option>
            <option value='favoriteTeacher'>What was the name of your favorite teacher?</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="securityAnswer" className="form-label">Security Answer</label>
          <input type="text" name="securityAnswer" value={formData.securityAnswer} onChange={handleChange} className="form-input" required />
        </div>

        <button type="submit" className="signup-btn">Sign Up</button>
      </form>

      <div className="caveat-container">
        <p className="caveat-text">
          We value your partnership with us. Your information will be used solely for documentation purposes, to ensure we can support you in prayer, and to express our gratitude for your involvement in our community.
        </p>
      </div>
    </div>
  );
};

export default Signup;
