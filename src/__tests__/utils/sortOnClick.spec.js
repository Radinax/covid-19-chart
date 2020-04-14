import { sortOnClick } from '../../utils/sortOnClick.js'

const headerData = ['country', 'recovered', 'test']
const bodyData = [
  { country: 'A', recovered: '1', deaths: '2' },
  { country: 'B', recovered: '2', deaths: '1' },
]

it('shows ascendent values', () => {
  const sortedData = sortOnClick(true, headerData[1], bodyData)
  expect(sortedData[0].recovered).toBe('2')
})

it('shows descendant values', () => {
  const sortedData = sortOnClick(false, headerData[1], bodyData)
  expect(sortedData[0].recovered).toBe('1')
})
