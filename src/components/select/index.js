import React from 'react'

const Select = ({ name, value, onChange, values }) => {
  return(
    <select name={name} value={value} onChange={onChange} required>
      {values.map(c => <option key={c} value={c}>{c}</option>)}
    </select>
  )
}

export default Select
