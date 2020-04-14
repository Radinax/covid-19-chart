import { filterByCountry } from '../../utils/filterByCountry'

const data = [
  { country: 'Spain', recovered: 123, deaths: 3, cases: 8 },
  { country: 'Venezuela', recovered: 234, deaths: 4, cases: 1 },
  { country: 'Brazil', recovered: 456, deaths: 5, cases: 3 },
  { country: 'Norway', recovered: 789, deaths: 7, cases: 5 }
]

it('Filters Data', () => {
  const venezuelaData = filterByCountry(data, 'Venezuela')
  expect(venezuelaData).toBe(data[1])
})
