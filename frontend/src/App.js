import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import './App.css';

import Home from './app/Home/Home';
import Login from './app/Home/Login/Login'
import Register from './app/Home/Register/Register'
import Dashboard from './app/DashBoard/DashBoard';
import SDashboard from './app/DashBoard/SDashBoard';
import BookingData from './app/Booking/BookingData';


function App() {
  const [token, setToken] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home setToken={setToken}  />} />
        <Route path="/home" element={<Home setToken={setToken}  />} />
        <Route path="/sdashboard" element={<SDashboard token={token} />} />
        <Route path="/bookingData" element={<BookingData />} />
        <Route path="/dashboard" element={<Dashboard token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
