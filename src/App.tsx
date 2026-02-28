import React from 'react';
import './styles/tailwind.css';
import { Routes, Route } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop';

// Importing components
import LayoutWrapper from './LayoutWrapper';

// Other imports for sections/components
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Sermons from './pages/Sermons/Sermons';
import Contact from './pages/Contact/Contact';
import CommunityOutreach from './pages/Events/CommunityOutreach/CommunityOutreach';
import Prisons from './pages/Events/Prisons/Prisons';
import Programs from './pages/Events/Programs/Programs';

const App: React.FC = () => {
  return (
    <>
    <ScrollToTop />
    <Routes>      

      {/* Routes with LayoutWrapper (Navbar and Footer) */}
      <Route path="/" element={
        <LayoutWrapper>
          <div className="app-container">
            <Home />
          </div>
        </LayoutWrapper>
      } />

      {/* Other individual pages with LayoutWrapper */}
      <Route path="/about" element={
        <LayoutWrapper>
          <About />
        </LayoutWrapper>
      } />
      <Route path="/sermons" element={
        <LayoutWrapper>
          <Sermons />
        </LayoutWrapper>
      } />
      <Route path="/contact" element={
        <LayoutWrapper>
          <Contact />
        </LayoutWrapper>
      } />
       <Route path="/community-outreach" element={
        <LayoutWrapper>
          <CommunityOutreach />
        </LayoutWrapper>
      } />
      <Route path="/prisons" element={
        <LayoutWrapper>
          <Prisons />
        </LayoutWrapper>
      } />
      <Route path="/programs" element={
        <LayoutWrapper>
          <Programs />
        </LayoutWrapper>
      } />
    </Routes>
  </>
  );
}

export default App;
