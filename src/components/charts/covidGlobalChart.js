import React, { useState, useEffect } from 'react'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
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
    const countries = !isEmpty(data) && data.map(o => o.country).sort()
    setCountries(countries)

    // Shaping our x and y axis data
    const xaxisData = ['cases', 'deaths', 'recovered']
    const yaxisData = !isEmpty(data) && data.filter(o => o.country === country).map(v => ({
        cases: v.cases,
        deaths: v.deaths,
        recovered: v.recovered
      }))[0]

    if (!isEmpty(data)) {
      setApexConfigGlobal({
        options: { ...apexConfigGlobal.options, xaxis: { categories: xaxisData } },
        series: [
          { name: 'Cases', data: Object.values(yaxisData) }
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

CovidGlobalChart.propTypes = {
  height: PropTypes.string,
  data: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.array
  ]),
  countryHandler: PropTypes.func,
  width: PropTypes.string
}

export default CovidGlobalChart
