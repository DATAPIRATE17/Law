import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaPhone, FaIdCard } from 'react-icons/fa';
import { RiLockPasswordLine, RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

const RegisterForm = ({ toggleRegisterForm }) => { // Receive toggleRegisterForm as a prop
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !password || !email || !phone || !aadhar) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/signup', {
        name,
        email,
        phone,
        aadhar,
        password,
      });
      console.log(response.data); // Output the response from the server
      // Inside your try block after successful registration
      setSuccessMessage('Registration successful!');
      setTimeout(() => {
        setName('');
        setPassword('');
        setEmail('');
        setPhone('');
        setAadhar('');
        // Optionally, redirect the user or perform other actions here
      }, 3000); // 3000 milliseconds = 3 seconds delay
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      setError(error.response.data);
      setSuccessMessage('');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleRegister} className="login-form login-box">
        <div className="input-group">
          <FaUser className="input-icon" />
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <FaPhone className="input-icon" />
          <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="input-group">
          <FaIdCard className="input-icon" />
          <input type="text" placeholder="Aadhar Number" value={aadhar} onChange={(e) => setAadhar(e.target.value)} />
        </div>
        <div className="input-group">
          <RiLockPasswordLine className="input-icon" />
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
        <button type="submit" className="login-button">Register</button>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button className="close-btn" onClick={toggleRegisterForm}>
  <FontAwesomeIcon icon={faAnglesLeft} />
</button>
</form>
    </div>
  );
};

export default RegisterForm;