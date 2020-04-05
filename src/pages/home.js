import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
// Actions
import { fetchCovidGlobalData, fetchCovidVenezuelaData } from '../slices'
// Components
import CovidGlobalChart from '../components/charts/covidGlobalChart'
import CovidVenezuelaChart from '../components/charts/covidVenezuelaChart'
import CovidMap from '../components/maps'
import Dashboard from '../components/dashboard'
import Select from '../components/select'
// Styles
import './styles.css'

const mapDispatchToProps = ({ fetchCovidVenezuelaData, fetchCovidGlobalData })
const mapStateToProps = state => ({
  covidVenezuela: {
    data: state.covidVenezuela.data,
    loading: state.covidVenezuela.loading
  },
  covidGlobal: {
    data: state.covidGlobal.data,
    loading: state.covidGlobal.loading
  }
})

const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
const isMobile = vw < 450

const selectOptions = ['Venezuela Map', 'Chart by states in Venezuela', 'Chart by Countries']

const Home = ({ fetchCovidVenezuelaData, fetchCovidGlobalData, covidVenezuela, covidGlobal }) => {
  const [view, setView] = useState(selectOptions[0])
  const [venezuelaData, setVenezuelaData] = useState([])
  const [globalData, setGlobalData] = useState({})
  const [selectedCountry, setSelectedCountry] = useState('Venezuela')

  const dashboardData = view === selectOptions[2]
    ? globalData[selectedCountry]
    : globalData['Venezuela']

  const onChange = e => setView(e.target.value)
  const countryHandler = value => setSelectedCountry(value)

  useEffect(() => {
    // SETS DATA FOR GLOBAL AND VENEZUELA
    if (isEmpty(covidVenezuela.data)) fetchCovidVenezuelaData('venezuela')
    if (isEmpty(covidGlobal.data)) fetchCovidGlobalData('Venezuela')
    const responseVenezuela = covidVenezuela.data || []
    const responseGlobal = covidGlobal.data || {}
    setVenezuelaData(responseVenezuela)
    setGlobalData(responseGlobal)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [covidVenezuela, fetchCovidVenezuelaData])

  const dashboard = (
    <Dashboard data={dashboardData} globalData={globalData} isMobile={isMobile}>      
      <Select
        name='Select View'
        value={view}
        values={selectOptions}
        onChange={onChange}
      />
    </Dashboard>
  )
  const covidVenezuelaChart = (
    <CovidVenezuelaChart
      isMobile={isMobile}
      data={venezuelaData}
      height={isMobile ? '1500px' : '750px'}
      width={isMobile ? '100%' : '1000px'}
    />
  )

  const covidGlobalChart = (
    <CovidGlobalChart
      countryHandler={countryHandler}
      data={globalData}
      height={isMobile ? '500px' : '600px'}
      width={isMobile ? '100%' : '1000px'}
    />
  )
  const covidMap =  <CovidMap data={venezuelaData}  />

  if (covidVenezuela.loading || covidGlobal.loading) return <div>LOADING</div>

  return (
    <div className='container'>
      {dashboard}
      {view === selectOptions[0] && covidMap}
      {view === selectOptions[1] && covidVenezuelaChart}
      {view === selectOptions[2] && covidGlobalChart}
    </div>
  )
}

Home.propTypes = {
  fetchCovidVenezuelaData: PropTypes.func,
  fetchCovidGlobalData: PropTypes.func,
  covidVenezuela: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.array
  ]),
  covidGlobal: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.array
  ])
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
