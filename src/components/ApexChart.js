import React from 'react'
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

export default ApexChart
