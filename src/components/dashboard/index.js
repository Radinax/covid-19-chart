import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Table from '../table'
import Github from '../../assets/git.png'
import Linkedin from '../../assets/linked.png'
import Twitter from '../../assets/twitter.png'
import './styles.css'

const Dashboard = ({ children, data, globalData, isMobile }) => {
  const [showTable, setShowTable] = useState(false)
  const confirmedCases = data && data.cases
  const totalDeaths = data && data.deaths
  const recoveredCases = data && data.recovered

  const onClick = () => setShowTable(!showTable)

  const menuData = (
    <div data-testid='menu' className='menu-container'>
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
 
  const bodyData = globalData.map(country => {
   return ({
     country: country.country,
     confirmed: country.cases,
     deaths: country.deaths,
     recovered: country.recovered 
   })
 })
  const table = <Table isMobile={isMobile} headerData={headerData} bodyData={bodyData}/>

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
    <div data-testid='social-media' className='author'>
      <div>
        Made by Adrian Beria
      </div>
      {socialMedia}
    </div>
  )

  const isSticky = isMobile ? 'sticky' : ''
 
  const showTableButton = (
    <div className='show-table-button'>    
      <button onClick={onClick}>{showTable ? 'Hide data' : 'Show COVID-19 global data'}</button>
    </div>
  )

  const menu = (
    <aside className='menu'>
      <div className='menu-box'>      
        {menuData}
        {!isMobile && table}
        {isMobile && showTableButton}
        {isMobile && showTable && table}
      </div>
      {authorData}
    </aside>
  )

  return(
    <div data-testid='dashboard' className={`dashboard ${isSticky}`}>
      {children}
      {menu}
    </div>
  )
}

Dashboard.propTypes = {
  children: PropTypes.element,
  data: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.array
  ]),
  globalData: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.array
  ]),
  isMobile: PropTypes.bool
}

export default Dashboard
