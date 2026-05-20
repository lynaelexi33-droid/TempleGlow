import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Store from './components/Store';
import Dashboard from './components/Dashboard';
import Subscriptions from './components/Subscriptions';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/store" element={<Store />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
      </Routes>
      <SpeedInsights />
    </Router>
  );
}

export default App;
