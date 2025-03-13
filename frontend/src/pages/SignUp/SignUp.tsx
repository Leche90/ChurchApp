import React, { useState } from 'react';

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

    const response = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Signup successful! Redirecting to login...');
      // After successful signup, you can redirect them to the login page
      window.location.href = '/login';
    } else {
      alert(`Signup failed: ${data.message || 'Something went wrong!'}`);
    }
  };

  return (
    <div className='signup-container'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />

        <label>Last Name</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Phone Number</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <label>Confirm Password</label>
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

        <label>Security Question</label>
        <select name="securityQuestion" value={formData.securityQuestion} onChange={handleChange} required>
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

        <label>Security Answer</label>
        <input type="text" name="securityAnswer" value={formData.securityAnswer} onChange={handleChange} required />

        <button type="submit">Sign Up</button>
      </form>

      <div className='caveat'>
        <p className='caveat-p'>Please, we are collecting your information as it is our custom to pray for our partners and send appreciate them</p>
      </div>
    </div>    
  );
};

export default Signup;
