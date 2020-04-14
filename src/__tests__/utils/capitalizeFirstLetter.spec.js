import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter'

const headerData = ['country', 'recovered', 'test']

it('Uppercase when we pass an array', () => {
  const reduced = headerData.reduce((prev, next) => {
    return capitalizeFirstLetter(prev) + capitalizeFirstLetter(next)
  })
  expect(reduced).toBe('CountryRecoveredTest')
})