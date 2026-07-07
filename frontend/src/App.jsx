import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { LayoutDashboard, Link as LinkIcon, KeyRound, Mic } from 'lucide-react';
import { motion } from 'framer-motion';

import Dashboard from './pages/Dashboard';
import Shortener from './pages/Shortener';
import PasswordAnalyzer from './pages/PasswordAnalyzer';
import Transcriber from './pages/Transcriber';

const Navbar = () => (
  <nav className="navbar">
    <NavLink to="/" className="nav-brand">
      <div style={{ background: 'var(--primary-accent)', borderRadius: '8px', padding: '6px' }}>
        <LayoutDashboard size={20} color="white" />
      </div>
      <span className="gradient-text">ProductivitySuites</span>
    </NavLink>
    <div className="nav-links">
      <NavLink to="/shortener" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Encurtador</NavLink>
      <NavLink to="/password" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Analisador de Senha</NavLink>
      <NavLink to="/transcriber" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Transcritor</NavLink>
    </div>
  </nav>
);

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="layout-container animate-fade-in">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/shortener" element={<Shortener />} />
          <Route path="/password" element={<PasswordAnalyzer />} />
          <Route path="/transcriber" element={<Transcriber />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
