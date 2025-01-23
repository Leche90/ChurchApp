import React from 'react'
import './styles/tailwind.css'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Events from './components/Events/Events'
import Video from './components/Video/Video'
import Leader from './components/Leader/Leader'
import Evangelism from './components/Evangelism/Evangelism'
import Mission from './components/Mission/Mission'
import Vision from './components/Vision/Vision'
import Partner from './components/Partner/Partner'

const App: React.FC = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <div className='container'>
        <Events/>
        <Leader/>
        <Video/>
        <Evangelism/>
        <Vision/>
        <Mission/>
        <Partner/>
      </div>
    </div>
  )
}

export default App