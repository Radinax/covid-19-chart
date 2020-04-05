import React from 'react'
import PropTypes from 'prop-types'
import Chart from 'react-apexcharts'

const ApexChart = ({ options, series, type, height, width }) => {
  return (
    <Chart 
      options={options}
      series={series}
      type={type}
      height={height}
      width={width}
    />
  )
}

ApexChart.propTypes = {
  options: PropTypes.shape({}),
  series: PropTypes.arrayOf(PropTypes.shape({})),
  type: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string
}

export default ApexChart
