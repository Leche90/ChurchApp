import React from 'react';

// Import components used on the homepage
import Hero from '../components/Hero/Hero';
import Event from '../components/Event/Event';
import Video from '../components/Video/Video';
import Leader from '../components/Leader/Leader';
import Evangelism from '../components/Evangelism/Evangelism';
import Mission from '../components/Mission/Mission';
import Vision from '../components/Vision/Vision';
import Partner from '../components/Partner/Partner';
import Values from '../components/Values/Values';

console.log('Home.tsx loaded');
console.log('Hero component:', Hero);

const Home: React.FC = () => {
  return (
    <div>
      {console.log('Rendering Home page')}
        <Hero />
        <Leader />
        <Video />
        <Evangelism />
        <Vision />
        <Mission />
        <Values />
        <Partner />
    </div>
  );
};

export default Home;
