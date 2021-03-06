import React, { useState, useEffect } from 'react'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
// Components
import ApexChart from '../ApexChart'
// utils
import defaultConfig from '../../utils/apexDefaultConfig'

const CovidVenezuelaChart = ({ data, height, isMobile, width }) => {
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
      width={width}
    />
  )
}

CovidVenezuelaChart.propTypes = {
  height: PropTypes.string,
  data: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.array
  ]),
  isMobile: PropTypes.bool,
  width: PropTypes.string
}

export default CovidVenezuelaChart
