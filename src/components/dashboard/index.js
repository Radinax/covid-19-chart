import React from 'react'
import Table from '../table'
import Github from '../../assets/git.png'
import Linkedin from '../../assets/linked.png'
import Twitter from '../../assets/twitter.png'
import './styles.css'

const Dashboard = ({ children, data, globalData, isMobile }) => {
  const confirmedCases = data && data.nationwide && data.nationwide.confirmed
  const totalDeaths = data && data.nationwide && data.nationwide.deaths
  const recoveredCases = data && data.nationwide && data.nationwide.recovered

  const menuData = (
    <div className='menu-container'>
      <div className='menu-item'>
        <span className='menu-title'>Confirmed Cases:</span> {confirmedCases}  
      </div>
      <div className='menu-item'>
        <span className='menu-title'>Total of deaths:</span> {totalDeaths}
      </div>
      <div className='menu-item'>
        <span className='menu-title'>Recovered Cases:</span> {recoveredCases}
      </div>
    </div>
  )

  const headerData = ['country', 'confirmed', 'deaths', 'recovered']
  // eslint-disable-next-line no-sequences
  const dataByOrder = Object.keys(globalData).sort().reduce((r, k) => (r[k] = globalData[k], r), {});
  const countriesData = Object.values(dataByOrder)
  const countriesName = Object.keys(dataByOrder)
  const bodyData = countriesName.map((country, index) => {
    const confirmed = countriesData[index].nationwide.confirmed
    const deaths = countriesData[index].nationwide.deaths
    const recovered = countriesData[index].nationwide.recovered
    return ({
      country,
      confirmed,
      deaths,
      recovered
    })
  })
  const table = <Table headerData={headerData} bodyData={bodyData}/>

  const socialMedia = (
    <div className='socialMedia'>
      <a href="https://github.com/Radinax" target="_blank" rel="noopener noreferrer">
        <img src={Github} alt="Github" />
      </a>
      <a href="https://twitter.com/Adrberia" target="_blank" rel="noopener noreferrer">
        <img src={Twitter} alt="Twitter" />
      </a>
      <a href="https://www.linkedin.com/in/adrianberia2013/" target="_blank" rel="noopener noreferrer">
        <img src={Linkedin} alt="Linkedin"/>
      </a>
    </div>
  )

  const authorData = (
    <div className='author'>
      <div>
        Made by Adrian Beria
      </div>
      {socialMedia}
    </div>
  )
  const isSticky = isMobile ? 'sticky' : ''
  const menu = (
    <aside className='menu'>
      <div className='menu-box'>      
        {menuData}
        {!isMobile && table}
      </div>
      {authorData}
    </aside>
  )

  return(
    <div className={`dashboard ${isSticky}`}>
      {children}
      {menu}
    </div>
  )
}

export default Dashboard
