import React from 'react';
import './styles/tailwind.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Event from './components/Event/Event';
import Video from './components/Video/Video';
import Leader from './components/Leader/Leader';
import Evangelism from './components/Evangelism/Evangelism';
import Partner from './components/Partner/Partner';

import About from './pages/About/About';
import Teachings from './pages/Teachings/Teachings';
import Events from './pages/Events/Events';
import Contact from './pages/Contact/Contact';
import SignUp from './pages/SignUp/SignUp';

const App: React.FC = () => {
  return (
    <>
      {/* Navbar Component to appear on every page */}
      <Navbar />
      
      {/* Main routing structure */}
      <Routes>
      {/* Home Route (Displays Homepage content) */}
      <Route path="/" element={        
          <div className='container mx-auto min-h-screen flex flex-col'>
            <Hero />
            <Event />
            <Leader />
            <Video />
            <Evangelism />
            <Partner />
          </div>      
      } />

      {/* Individual Pages (like SignUp, About, etc.) */}
      <Route path="/about" element={<About />} />
      <Route path="/teachings" element={<Teachings />} />
      <Route path="/events" element={<Events />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
