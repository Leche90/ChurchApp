import React from 'react';
import './styles/tailwind.css';
import { Routes, Route } from 'react-router-dom';

// Importing global components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Importing other components
import Hero from './components/Hero/Hero';
import Church from './components/Church/Church';
import Partner from './components/Partner/Partner';
import Video from './components/Video/Video';
import Leader from './components/Leader/Leader';
import Evangelism from './components/Evangelism/Evangelism';

// Importing pages
import About from './pages/About/About';
import Teachings from './pages/Teachings/Teachings';
import Contact from './pages/Contact/Contact';
import Partnership from './pages/Partnership/Partnership';
import CommunityOutreach from './pages/Events/CommunityOutreach/CommunityOutreach';
import Programs from './pages/Events/Programs/Programs';
import Prisons from './pages/Events/Prisons/Prisons';

// Importing Signup and Login
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';

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

      {/* User registration and Login */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />

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
