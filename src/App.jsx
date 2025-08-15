import React from 'react';
import Home from './components/Home';
import './index.css'; 
import Orderpage from "./components/Orderpage"
import LoginCon from './components/LoginCon';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import MainAbout from './components/MainAbout';

function App() { 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/loginpage" element={<LoginCon />} />
        <Route path="/orderpage" element={<ProtectedRoute><Orderpage /></ProtectedRoute>} />
         <Route path="/aboutpage" element={<ProtectedRoute><MainAbout /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
