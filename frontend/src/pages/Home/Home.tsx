import React from 'react';

// Import components used on the homepage
import Hero from '../../components/Hero/Hero';
import Video from '../../components/Video/Video';
import Leader from '../../components/Leader/Leader';
import Evangelism from '../../components/Evangelism/Evangelism';
import Partner from '../../components/Partner/Partner';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <Leader />
      <Video />
      <Evangelism />
      <Partner />
    </div>
  );
};

export default Home;
