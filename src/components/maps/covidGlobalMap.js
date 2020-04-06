import React from 'react'
import PropTypes from 'prop-types'
import { Map, TileLayer, Marker, Tooltip } from 'react-leaflet'

const CovidVenezuelaMap = ({ data }) => {
  const position = [30, 0]
  const zoom = 4

  const markers = data.map(o => {
    const { lat, long } = o.countryInfo
    return (
      <Marker key={o.country} position={[lat, long]}>
        <Tooltip opacity={1}>
          <h1>{o.country}</h1>
          <div>Cases: {o.cases}</div>
          <div>Deaths: {o.deaths || 0}</div>
          <div>Recovered: {o.recovered || 0}</div>
        </Tooltip>
      </Marker>
    )
  })

  return (
    <Map center={position} zoom={zoom} style={{ width: '100%', height: '100vh'}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
      />
      {markers}
    </Map>
  );
}

CovidVenezuelaMap.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.array
  ])
}


export default CovidVenezuelaMap
