import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';


// Define the response structure for the better type safety
interface LoginResponse {
    success: boolean;
    message: string;
}

// Login component to handle user login
const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post<LoginResponse>('http://localhost:5000/api/login', {email, password});
            if (response.data.success) {
                alert('Login successful!'); // Pops up thr "Login successful" message
                navigate('/partnership'); // Redirect to partnership page or dashboard
            } else {
                setLoginError('Invalid email or password');
            }
        }catch (error) {
            setLoginError('Login failed. Please try again.');            
        }
    };

  return (
    <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <button type="submit">Login</button>
        </form>

        {loginError && <p>{loginError}</p>}
    </div>
  );
};

export default Login