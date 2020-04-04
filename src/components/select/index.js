import React from 'react'

const styles = {
  height: '1rem', margin: '1rem'
}

const Select = ({ name, value, onChange, values }) => {
  return(
    <select style={styles} name={name} value={value} onChange={onChange} required>
      {values.map(c => <option key={c} value={c}>{c}</option>)}
    </select>
  )
}

export default Select
