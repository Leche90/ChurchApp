import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState ({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    securityQuestion: '',
    securityAnswer: '',
  });

  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');

  // Initialise the navigate function
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));    
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;      
    }

    try {
      await axios.post('http://localhost:5000/api/signup', formData);
      alert('Registration successful! Please log in');
      // Redirect to login page
    } catch (error) {
      setFormError('Error during registration. Please try again.');
      console.error(error); // For debugging purposes
    }
  };

  return (
    <div>
      <h2>Become a Partner</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input type='text' name='firstName' value={formData.firstName} onChange={handleChange} required />        

        <label>Last Name</label>
        <input type='text' name='lastName' value={formData.lastName} onChange={handleChange} required />

        <label>Email</label>
        <input type='email' name='email' value={formData.email} onChange={handleChange} required />

        <label>Password</label>
        <input type='password' name='password' value={formData.password} onChange={handleChange} required />

        <label>Confirm Password</label>
        <input type='password' name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} required />
        {passwordError && <p>{passwordError}</p>}
        
        // Security Question and answer
        <label>Security Question</label>
        <select name="securityQuestion" value={formData.securityQuestion} onChange={handleChange} required>
          <option value='' disabled>Select a question</option>
          <option value='firstSchool'>What was the name of your first school?</option>       
          <option value='parkVisit'>What was the name of the park you visited most often as a child?</option>
          <option value='firstJob'>In which city did you get your first job?</option>
          <option value='firstDate'>Where did you go on your first date?</option>
          <option value='schoolTeacher'>What’s the name of your first school teacher?
          </option>
          <option value='favoriteBook'>What is your favorite book?</option>
          <option value='childhoodGame'>What was the name of your favorite childhood game</option>
          <option value='favoriteTeacher'>What was the name of your favorite teacher in elementary school?</option>
          <option value='concert'>What is the name of the first concert you attended?</option>
          <option value='countryVisit'>Which country would you love to visit but haven’t yet?</option>
        </select>

        <label>Security Answer</label>
        <input type='text' name='securityAnswer' value={formData.securityAnswer} onChange={handleChange} required/>

        <button type='submit'>Sign Up</button>
      </form>

      {formError && <p>{formError}</p>}
    </div>
  );
};

export default SignUp;