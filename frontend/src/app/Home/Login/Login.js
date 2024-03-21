import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

 

  const toggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm);
    setShowLoginForm(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/login', { email: username, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', username);
      navigate('/MainMenu'); // Redirect to MainMenu after successful login
    } catch (error) {
      console.error('Login failed:', error.response);
      setError('Invalid email or password');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <span className="input-icon">
            <FaUser />
          </span>
          <input type="text" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="input-group">
          <span className="input-icon">
            <FaLock />
          </span>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="password-icon" onClick={togglePasswordVisibility}>
            {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
          </span>
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
