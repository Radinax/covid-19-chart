import React from 'react'
import './styles.css'

const Dashboard = ({ children, data }) => {
  const confirmedCases = data && data.nationwide && data.nationwide.confirmed
  const totalDeaths = data && data.nationwide && data.nationwide.deaths
  const recoveredCases = data && data.nationwide && data.nationwide.recovered
  const menu = (
    <aside className="menu">
      <div>
        <span><h1>Confirmed Cases:</h1>{confirmedCases}</span>
        <span><h1>Total of deaths:</h1>{totalDeaths}</span>
        <span><h1>Recovered Cases:</h1>{recoveredCases}</span>
      </div>
      <div className='author'>
        <div>
          Made by {' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href='https://www.linkedin.com/in/adrianberia2013/'>Adrian Beria</a>
        </div>
        <div>
          Check my {' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href='https://twitter.com/Adrberia'>Twitter</a>
          {' '} and {' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href='https://github.com/Radinax'>Github</a>
        </div>
      </div>
    </aside>
  )
  return(
    <div className='dashboard '>
      {children}
      {menu}
    </div>
  )
}

export default Dashboard
