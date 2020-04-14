import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom'
import Table from '../../components/table'
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter'
import { sortOnClick } from '../../utils/sortOnClick'

const headerData = ['country', 'recovered', 'deaths']
const bodyData = [
  { country: 'A', recovered: '1', deaths: '2' },
  { country: 'B', recovered: '2', deaths: '1' },
]

describe('if Select is working correctly', () => {
  it('renders', () => {
    const { asFragment } = render(<Table headerData={headerData} bodyData={bodyData} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('has buttons elements in the header', () => {
    const { container } = render(<Table headerData={headerData} bodyData={bodyData} />)
    expect(container.querySelector('button')).toBeTruthy()
  })

  test('headerData props is mapping correctly into thead', () => {
    const { container } = render(<Table headerData={headerData} bodyData={bodyData} />)
    const expectedText = headerData.reduce((prev, next) => {
      return capitalizeFirstLetter(prev) + capitalizeFirstLetter(next)
    })
    expect(container.querySelector('thead')).toHaveTextContent(expectedText)
  })

  test('bodyData is showing correct values in its row', () => {
    const { container } = render(<Table headerData={headerData} bodyData={bodyData} />)
    const tableBody = container.querySelector('tbody')
    const tableRow = tableBody.children
    // First cell of our first row inside our table body
    expect(tableRow[0].children[0]).toHaveTextContent(bodyData[0].country)
    // Second cell of our first row inside our table body
    expect(tableRow[0].children[1]).toHaveTextContent(bodyData[0].recovered)
    // Third cell of our first row inside our table body
    expect(tableRow[0].children[2]).toHaveTextContent(bodyData[0].deaths)
    // First cell of our second row inside our table body
    expect(tableRow[1].children[0]).toHaveTextContent(bodyData[1].country)
    // Second cell of our second row inside our table body
    expect(tableRow[1].children[1]).toHaveTextContent(bodyData[1].recovered)
    // Third cell of our second row inside our table body
    expect(tableRow[1].children[2]).toHaveTextContent(bodyData[1].deaths)
  })

  test('asc data', () => {
    const sortedData = sortOnClick(true, headerData[1], [...bodyData])
    const { asFragment, container } = render(<Table headerData={headerData} bodyData={sortedData} />)
    const tableBody = container.querySelector('tbody')
    const tableRow = tableBody.children
    // It should be the opposite of the previous unit test since we show ASC values
    expect(tableRow[0].children[0]).toHaveTextContent(bodyData[1].country)
    expect(tableRow[0].children[1]).toHaveTextContent(bodyData[1].recovered)
    expect(tableRow[0].children[2]).toHaveTextContent(bodyData[1].deaths)
    expect(tableRow[1].children[0]).toHaveTextContent(bodyData[0].country)
    expect(tableRow[1].children[1]).toHaveTextContent(bodyData[0].recovered)
    expect(tableRow[1].children[2]).toHaveTextContent(bodyData[0].deaths)
    expect(asFragment()).toMatchSnapshot()
  })

  test('desc data', () => {
    const sortedData = sortOnClick(false, headerData[1], [...bodyData])
    const { asFragment, container } = render(<Table headerData={headerData} bodyData={sortedData} />)
    const tableBody = container.querySelector('tbody')
    const tableRow = tableBody.children
    // It should be the opposite of the previous unit test since we show ASC values
    expect(tableRow[0].children[0]).toHaveTextContent(bodyData[0].country)
    expect(tableRow[0].children[1]).toHaveTextContent(bodyData[0].recovered)
    expect(tableRow[0].children[2]).toHaveTextContent(bodyData[0].deaths)
    expect(tableRow[1].children[0]).toHaveTextContent(bodyData[1].country)
    expect(tableRow[1].children[1]).toHaveTextContent(bodyData[1].recovered)
    expect(tableRow[1].children[2]).toHaveTextContent(bodyData[1].deaths)
    expect(asFragment()).toMatchSnapshot()
  })
})
