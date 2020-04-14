import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom'
import Dashboard from '../../components/dashboard'
import Select from '../../components/select'

// Dashboard props
const globalData = [
  { country: 'Spain', recovered: 123, deaths: 3, cases: 8 },
  { country: 'Venezuela', recovered: 234, deaths: 333, cases: 1009 },
  { country: 'Brazil', recovered: 456, deaths: 5, cases: 3 },
  { country: 'Norway', recovered: 789, deaths: 7, cases: 5 }
]
const data = globalData[1]

// Select props
const name = 'Select view'
const values = ['Venezuela Map', 'Chart by states in Venezuela', 'Chart by Countries', 'World Map']
const value = values[0]
const onChange = () => null

describe('Dashboard is working correctly', () => {
  it('renders', () => {
    const select = <Select name={name} values={values} value={value} onChange={onChange} />
    const { asFragment } = render(
      <Dashboard data={data} globalData={globalData}>{select}</Dashboard>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('has select, table and social-media elements as child', () => {
    const select = (
      <Select name={name} values={values} value={value} onChange={onChange}/>
    )
    const { getByTestId } = render(
      <Dashboard data={data} globalData={globalData}>{select}</Dashboard>
    )
    expect(getByTestId('dashboard')).toContainElement(getByTestId('select'))
    expect(getByTestId('dashboard')).toContainElement(getByTestId('social-media'))
    expect(getByTestId('dashboard')).toContainElement(getByTestId('table'))
  })

  it('shows correct values of cases, deaths and recovering', () => {
    const { getByTestId } = render(
      <Dashboard data={data} globalData={globalData} />
    )
    // Recovered cases
    expect(getByTestId('dashboard')).toHaveTextContent('234')
    // Death cases
    expect(getByTestId('dashboard')).toHaveTextContent('333')
    // Confirmed cases
    expect(getByTestId('dashboard')).toHaveTextContent('1009')
  })
})
