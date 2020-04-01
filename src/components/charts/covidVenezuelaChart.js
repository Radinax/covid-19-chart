import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
// Actions
import { fetchCovidVenezuelaData } from '../../slices'
// Components
import ApexChart from '../ApexChart'
// utils
import defaultConfig from '../../utils/apexDefaultConfig'

const mapDispatchToProps = ({ fetchCovidVenezuelaData })
const mapStateToProps = state => ({
  covidVenezuela: {
    data: state.covidVenezuela.data,
    loading: state.covidVenezuela.loading
  }
})

const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
const isMobile = vw < 450

const CovidVenezuelaChart = ({ fetchCovidVenezuelaData, loading, covidVenezuela, height }) => {
  const [apexConfig, setApexConfig] = useState(defaultConfig('COVID-19 VENEZUELA', isMobile))
  
  useEffect(() => {
    // SETS DATA FOR VENEZUELA
    if (isEmpty(covidVenezuela.data)) fetchCovidVenezuelaData('venezuela')
    const responseVenezuela = covidVenezuela.data || []
    const xaxisDataVenezuela = !isEmpty(responseVenezuela) && responseVenezuela.cities.map(o => o.state)
    const yaxisCases = !isEmpty(responseVenezuela) && responseVenezuela.cities.map(o => o.cases)
    const yaxisDeaths = !isEmpty(responseVenezuela) && responseVenezuela.cities.map(o => o.deaths)
    if (!isEmpty(responseVenezuela)) {
      setApexConfig({
        options: { ...apexConfig.options, xaxis: { categories: xaxisDataVenezuela } },
        series: [
          { name: 'Cases', data: yaxisCases },
          { name: 'Deaths', data: yaxisDeaths }
        ] 
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [covidVenezuela, fetchCovidVenezuelaData])

  if (loading) return <div>LOADING</div>

  return (
    <ApexChart
      type='bar'
      options={apexConfig.options}
      series={apexConfig.series}
      height={height}
    />
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CovidVenezuelaChart)
