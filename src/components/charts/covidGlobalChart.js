import React, { useState, useEffect } from 'react'
import isEmpty from 'lodash/isEmpty'
// Components
import ApexChart from '../ApexChart'
// utils
import defaultConfig from '../../utils/apexDefaultConfig'
import './styles.css'

const CovidGlobalChart = ({ height, data, countryHandler, width }) => {
  const [apexConfigGlobal, setApexConfigGlobal] = useState(defaultConfig('COVID-19 GLOBAL'))
  const [country, setCountry] = useState('Venezuela')
  const [countries, setCountries] = useState([])

  const onChangeSelect = e => setCountry(e.target.value)
  
  useEffect(() => {
    const countries = !isEmpty(data) && Object.keys(data).sort()
    setCountries(countries)
    // Shaping our x and y axis data
    const xaxisData = !isEmpty(data) && Object.keys(data[country].nationwide)
    const yaxisData = !isEmpty(data) && Object.values(data[country].nationwide)
    if (!isEmpty(data)) {
      setApexConfigGlobal({
        options: { ...apexConfigGlobal.options, xaxis: { categories: xaxisData.slice(1) } },
        series: [
          { name: 'Cases', data: yaxisData.slice(1) }
        ] 
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, data])

  useEffect(() => countryHandler(country), [country, countryHandler])

  const Select = !isEmpty(countries) && (
    <select className='select' value={country} onChange={onChangeSelect}>
      {countries.map(country => (
        <option key={country} value={country}>{country}</option>
      ))}
    </select>
  )

  return (
    <div style={{ display:'flex', alignItems: 'center', flexDirection: 'column' }}>
      {Select}
      <ApexChart
        height={height}
        width={width}
        type='bar'
        options={apexConfigGlobal.options}
        series={apexConfigGlobal.series}
      />
    </div>
  )
}

export default CovidGlobalChart
