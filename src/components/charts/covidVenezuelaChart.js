import React, { useState, useEffect } from 'react'
import isEmpty from 'lodash/isEmpty'
// Components
import ApexChart from '../ApexChart'
// utils
import defaultConfig from '../../utils/apexDefaultConfig'

const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
const isMobile = vw < 450

const CovidVenezuelaChart = ({ data, height }) => {
  const [apexConfig, setApexConfig] = useState(defaultConfig('COVID-19 VENEZUELA', isMobile))
  
  useEffect(() => {
    const xaxisDataVenezuela = !isEmpty(data) && data.cities.map(o => o.state)
    const yaxisCases = !isEmpty(data) && data.cities.map(o => o.cases)
    const yaxisDeaths = !isEmpty(data) && data.cities.map(o => o.deaths)
    if (!isEmpty(data)) {
      setApexConfig({
        options: { ...apexConfig.options, xaxis: { categories: xaxisDataVenezuela } },
        series: [
          { name: 'Cases', data: yaxisCases },
          { name: 'Deaths', data: yaxisDeaths }
        ] 
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <ApexChart
      type='bar'
      options={apexConfig.options}
      series={apexConfig.series}
      height={height}
    />
  )
}

export default CovidVenezuelaChart
