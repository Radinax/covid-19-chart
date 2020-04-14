import React from 'react'
import PropTypes from 'prop-types'

const styles = {
  height: '1rem', margin: '1rem'
}

const Select = ({ name, value, onChange, values }) => {
  return(
    <select data-testid="select" style={styles} name={name} value={value} onChange={onChange} required>
      {values.map(c => <option key={c} value={c}>{c}</option>)}
    </select>
  )
}

Select.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  values: PropTypes.arrayOf(PropTypes.string)
}

export default Select
