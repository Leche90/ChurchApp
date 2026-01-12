import React from 'react'

// Importing both Navbar and Footer components, which will be used in the layout
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Defning the types for the props of this component
// LayoutWrapper expects a 'children' prop which will represent the content passed to the wrapper
interface LayoutWrapperProps {
    children: React.ReactNode;
}

// LayoutWrapper functional component
// This component takes the 'children' prop and render it alng with the Navbar and Footer
const LayoutWrapper: React.FC<LayoutWrapperProps> =({ children }) => {
  return (
    <>
      {/* Rendering the Navbar component at the top of the page */}
      <Navbar />

      {/* Rendering the passed content (children) in the middle */}
      {children}

      {/* Rendering the Footer component at the bottom of the page */}
      <Footer />
    </>
  );  
}

export default LayoutWrapper;