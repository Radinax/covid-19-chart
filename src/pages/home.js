import React, { useState } from 'react'
// Components
import CovidGlobalChart from '../components/charts/covidGlobalChart'
import CovidVenezuelaChart from '../components/charts/covidVenezuelaChart'

const Home = () => {
  const [toggle, setToggle] = useState(true)
  const onClick = () => setToggle(!toggle)
  const button = (
    <div style={{ marginBottom: '20px', marginTop: '20px' }}>    
      <button onClick={onClick}>{toggle ? 'Switch to all countries' : "Switch to Venezuela's states"}</button>
    </div>
  )
  return (
    <div>
      {button}
      {toggle
        ? <CovidVenezuelaChart height='750px' />
        : <CovidGlobalChart height='600px' /> }
    </div>
  )
}

export default Home
