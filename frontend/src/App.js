import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import './App.css';

import Home from './app/Home/Home';
import MainMenu from './app/MainMenu/MainMenu';
import ProtectedRoute from './app/ProtectedRoute/ProtectedRoute'; // Adjust the import path as necessary

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Protect the MainMenu route */}
        <Route path="/MainMenu" element={
          <ProtectedRoute>
            <MainMenu />
          </ProtectedRoute>
        } />
        {/* Home route is accessible to everyone */}
        <Route path="/" element={<Home />} />
        {/* Redirect all other paths to Home, adjust as needed for additional routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;