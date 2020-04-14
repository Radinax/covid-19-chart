import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom'
import Select from '../../components/select'

const name = 'Select view'
const values = ['Venezuela Map', 'Chart by states in Venezuela', 'Chart by Countries', 'World Map']
const value = values[0]
const onChange = () => null

describe('if Select is working correctly', () => {
  it('renders', () => {
    const { asFragment } = render(
      <Select name={name} values={values} value={value} onChange={onChange}/>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('that the value shown is "Venezuela Map"', () => {
    const { getByTestId } = render(
      <Select name={name} values={values} value={value} onChange={onChange}/>
    )
    expect(getByTestId('select').value).toBe(value)
  })

  test('when user changes the option when it clicks the element', () => {
    const handleChange = e => expect(e.target.value).toBe(values[2])

    const { asFragment, container } = render(
      <Select name={name} values={values} value={value} onChange={handleChange}/>
    )
    const select = container.querySelector(`select[name="${name}"]`)
    wait(() => {
      fireEvent.change(select, {
        target: {
          value: values[2]
        }
      })
    })
    expect(asFragment()).toMatchSnapshot()
  })
})