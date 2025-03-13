import React from 'react';
import './styles/tailwind.css';
import { Routes, Route } from 'react-router-dom';

// Importing components
import LayoutWrapper from './LayoutWrapper';

// Importing pages
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';

// Other imports for sections/components
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
import PrisonsMission from './pages/Events/Prisons/Prisons';
import Programs from './pages/Events/Programs/Programs';

const App: React.FC = () => {
  return (
    <Routes>
      {/* Routes for Signup and Login without Navbar and Footer */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path='/partnership' element={<Partnership />} />

      {/* Routes with LayoutWrapper (Navbar and Footer) */}
      <Route path="/" element={
        <LayoutWrapper>
          <Hero />
          <div className="app-container">
            <Church />
            <Leader />
            <Partner />
            <Video />
            <Evangelism />
          </div>
        </LayoutWrapper>
      } />

      {/* Other individual pages with LayoutWrapper */}
      <Route path="/about" element={
        <LayoutWrapper>
          <About />
        </LayoutWrapper>
      } />
      <Route path="/teachings" element={
        <LayoutWrapper>
          <Teachings />
        </LayoutWrapper>
      } />
      <Route path="/contact" element={
        <LayoutWrapper>
          <Contact />
        </LayoutWrapper>
      } />
       <Route path="/community_outreach" element={
        <LayoutWrapper>
          <CommunityOutreach />
        </LayoutWrapper>
      } />
      <Route path="/prisons" element={
        <LayoutWrapper>
          <CommunityOutreach />
        </LayoutWrapper>
      } />
      <Route path="/programs" element={
        <LayoutWrapper>
          <Programs />
        </LayoutWrapper>
      } />
    </Routes>
  );
}

export default App;
