import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ onClick, toggle }) => {
  return(
    <div style={{ marginBottom: '20px', marginTop: '20px' }}>    
      <button onClick={onClick}>{toggle ? 'Switch to all countries' : "Switch to Venezuela's states"}</button>
    </div>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  toggle: PropTypes.bool
}

export default Button
