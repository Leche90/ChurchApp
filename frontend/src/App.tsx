import React from 'react';
import './styles/tailwind.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import Hero from './components/Hero/Hero';
import Church from './components/Church/Church';
import Partner from './components/Partner/Partner';
import Video from './components/Video/Video';
import Leader from './components/Leader/Leader';
import Evangelism from './components/Evangelism/Evangelism';

import About from './pages/About/About';
import Teachings from './pages/Teachings/Teachings';
import Contact from './pages/Contact/Contact';
import Partnership from './pages/Partnership/Partnership';
import CommunityOutreach from './pages/Events/CommunityOutreach/CommunityOutreach';
import Programs from './pages/Events/Programs/Programs';
import Prisons from './pages/Events/Prisons/Prisons';

const App: React.FC = () => {
  return (
    <>
      {/* Navbar Component to appear on every page */}
      <Navbar />
      
      {/* Main routing structure */}
      <Routes>
        {/* Hero route to display Hero separately */}
        <Route path="/hero" element={<Hero />} />

      {/* Home Route (Displays Homepage content) */}
      <Route path="/" element={
        <>
          <Hero />        
          <div className='app-container'>
            <Church />
            <Leader />
            <Partner />
            <Video />
            <Evangelism />            
          </div>
        </>      
      } />

      {/* Individual Pages (like SignUp, About, etc.) */}
      <Route path="/about" element={<About />} />
      <Route path="/teachings" element={<Teachings />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/partnership" element={<Partnership />} />

      {/* Events pages */}
      <Route path="/community_outreach" element={<CommunityOutreach />} />
      <Route path="/programs" element={<Programs />} />
      <Route path="/prisons" element={<Prisons />} />
      </Routes>

      {/* Footer Component to appear on every page */}
      <Footer />
    </>
  );
}

export default App;
