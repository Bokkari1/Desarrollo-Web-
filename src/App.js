//App.js//
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import PasswordRecovery from './components/PasswordRecovery'; 
import PasswordReset from './components/PasswordReset';
//import ResetPassword from "./components/ResetPassword"; 


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={isAuthenticated ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/password-recovery" element={<PasswordRecovery />} /> 
        <Route path="/password-reset" element={<PasswordReset />} /> 
           <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
