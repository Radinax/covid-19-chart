import React from 'react'
import Chart from 'react-apexcharts'

const ApexChart = ({ options, series, type, height }) => {
  return (
    <Chart 
      options={options}
      series={series}
      type={type}
      height={height}
      width= "1000px"
    />
  )
}

export default ApexChart
