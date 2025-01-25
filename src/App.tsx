import React from 'react'
import './styles/tailwind.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Event from './components/Event/Event'
import Video from './components/Video/Video'
import Leader from './components/Leader/Leader'
import Evangelism from './components/Evangelism/Evangelism'
import Mission from './components/Mission/Mission'
import Vision from './components/Vision/Vision'
import Partner from './components/Partner/Partner'
import Values from './components/Values/Values'

import About from './pages/About'
import Teachings from './pages/Teachings'
import Events from './pages/Events'
import Contact from './pages/Contact'
import Give from './pages/Give'

const App: React.FC = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <div className='container'>
        <Event/>
        <Leader/>
        <Video/>
        <Evangelism/>
        <Vision/>
        <Mission/>
        <Values/>
        <Partner/>
      </div>
    </div>
  )
}

export default App