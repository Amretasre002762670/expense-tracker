import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../src/App.css';

import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import LandingPage from './components/landingPage/landingPage';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/landingPage" element={<LandingPage />} /> 
      </Routes>
    </BrowserRouter>
  );
};

export default App;
