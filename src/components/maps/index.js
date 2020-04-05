import React from 'react'
import PropTypes from 'prop-types'
import { Map, TileLayer, Marker, Tooltip } from 'react-leaflet'

const coordinates = [
  { state: 'Caracas', lat: 10.491, lng: -66.902 },
  { state: 'Miranda', lat: 10.250, lng: -66.416 },
  { state: 'Aragua', lat: 10.235, lng: -67.591 },
  { state: 'La Guaira', lat: 10.599, lng: -66.934 },
  { state: 'Los Roques', lat: 11.857, lng: -66.757 },
  { state: 'Barinas', lat: 8.622, lng: -70.207 },
  { state: 'Zulia', lat: 10.666, lng: -71.612 },
  { state: 'Falcón', lat: 11.404, lng: -69.673 },
  { state: 'Anzoátegui', lat: 10.136, lng: -64.686 },
  { state: 'Apure', lat: 7.887, lng: -67.472 },
  { state: 'Mérida', lat: 8.589, lng: -71.156 },
  { state: 'Cojedes', lat: 9.661, lng: -68.582 },
  { state: 'Monagas', lat: 9.745, lng: -63.183 },
  { state: 'Nueva Esparta', lat: 10.957, lng: -63.869 },
  { state: 'Guárico', lat: 9.911, lng: -67.353 },
  { state: 'Bolivar', lat: 8.129, lng: -63.540 },
  { state: 'Yaracuy', lat: 10.079, lng: -69.126 },
  { state: 'Sucre', lat: 10.453, lng: -64.182 }
  // { state: 'Estado no definido', lat: 10.064, lng: -69.357 },
]

const CovidMap = ({ data }) => {
  const position = [8.5, -66]
  const zoom = 7
  let arr = []
  const cities = data.cities || []
  
  cities.forEach(service => {
    coordinates.forEach(o => {
      if(service.state === o.state) {
        arr.push({ ...service, ...o })
      }
    })
  })

  const markers = arr.map(state => (
    <Marker key={state.state} position={[state.lat, state.lng]}>
      <Tooltip opacity={1}>
        <h1>{state.state}</h1>
        <div>Cases: {state.cases}</div>
        <div>Deaths: {state.deaths || 0}</div>
      </Tooltip>
    </Marker>
  ))

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

CovidMap.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.array
  ])
}


export default CovidMap
