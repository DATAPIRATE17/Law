import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './MainMenu.css';

const Home = ({ onLogout }) => {
  const navigate = useNavigate(); // Get the navigate function
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/'); // Navigate to the Home page
  };

  return (
    <container className="main-menu-container">
      <div>
        <h1>Welcome, {username}!</h1>
        <button onClick={handleLogout}>Logout</button>
        <p>This is a sample dummy home page.</p>
      </div>
    </container>
  );
};

export default Home;