import React from 'react'

const Button = ({ onClick, toggle }) => {
  return(
    <div style={{ marginBottom: '20px', marginTop: '20px' }}>    
      <button onClick={onClick}>{toggle ? 'Switch to all countries' : "Switch to Venezuela's states"}</button>
    </div>
  )
}

export default Button
