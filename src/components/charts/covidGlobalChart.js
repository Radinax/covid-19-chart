import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
// Actions
import { fetchCovidGlobalData } from '../../slices'
// Components
import ApexChart from '../ApexChart'
// utils
import defaultConfig from '../../utils/apexDefaultConfig'

const mapDispatchToProps = ({ fetchCovidGlobalData })
const mapStateToProps = state => ({
  covidGlobal: {
    data: state.covidGlobal.data,
    loading: state.covidGlobal.loading
  }
})

const CovidGlobalChart = ({ fetchCovidGlobalData, loading, covidGlobal, height }) => {
  const [apexConfigGlobal, setApexConfigGlobal] = useState(defaultConfig('COVID-19 GLOBAL'))
  const [country, setCountry] = useState('Venezuela')
  const [countries, setCountries] = useState([])

  const onChangeSelect = e => setCountry(e.target.value)
  
  useEffect(() => {
    if (isEmpty(covidGlobal.data)) fetchCovidGlobalData('Venezuela')
    const response = covidGlobal.data || []
    const countries = !isEmpty(response) && Object.keys(response).sort()
    setCountries(countries)
    const xaxisData = !isEmpty(response) && Object.keys(response[country].nationwide)
    const yaxisData = !isEmpty(response) && Object.values(response[country].nationwide)
    if (!isEmpty(response)) {
      setApexConfigGlobal({
        options: { ...apexConfigGlobal.options, xaxis: { categories: xaxisData.slice(1) } },
        series: [
          { name: 'Cases', data: yaxisData.slice(1) }
        ] 
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, covidGlobal.data])

  const Select = !isEmpty(countries) && (
    <select value={country} onChange={onChangeSelect}>
      {countries.map(country => (
        <option key={country} value={country}>{country}</option>
      ))}
    </select>
  )

  if (loading) return <div>LOADING</div>

  return (
    <div>
      {Select}
      <ApexChart height={height} type='bar' options={apexConfigGlobal.options} series={apexConfigGlobal.series} />
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CovidGlobalChart)
