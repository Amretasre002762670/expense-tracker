import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/App.css';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} /> {/* Use the 'element' prop to render the Login component */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} /> {/* Assuming there's a Signup component */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
