import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// ...
import axios from 'axios';
import {
  initialState,
  covidVenezuelaReducer, 
  fetchCovidVenezuelaData,
} from '../../slices'
import responsePayload from '../../slices/mock'

// Jest replaces every function in the axios module with empty "mock" functions that do nothing and return undefined
jest.mock('axios');

const mockStore = configureMockStore([thunk]);

describe('thunks', () => {
  it('Testing GET request', async () => {
    // Arrange
    const store = mockStore(initialState)
    // Whenever you call any AXIOS GET REQUEST you make it send the response you want
    axios.get.mockResolvedValue({data: responsePayload})
    const response = await store.dispatch(fetchCovidVenezuelaData('venezuela'))
    expect(response.payload).toEqual(responsePayload)
  })

  it('Testing successful GET request', async () => {
    const store = mockStore(initialState)
    axios.get.mockResolvedValue({data: responsePayload})
    await store.dispatch(fetchCovidVenezuelaData('venezuela'))
    const actions = store.getActions()
    const { pending, fulfilled } = fetchCovidVenezuelaData
    // Testing that the actions types are flowing correctly after the GET
    const expectedActions = [pending().type, fulfilled().type]
    const receivedAction = [actions[0].type, actions[1].type]
    expect(receivedAction).toEqual(expectedActions)
  })

  it('Testing rejected GET request', async () => {
    const store = mockStore(initialState)
    const responseError = new Error('Error fetching')
    axios.get.mockRejectedValue(responseError)
    await store.dispatch(fetchCovidVenezuelaData('venezuela'))
    const actions = store.getActions()
    const { pending, rejected } = fetchCovidVenezuelaData
    // Testing that the actions types are flowing correctly after the GET
    const expectedActions = [pending().type, rejected().type]
    const receivedAction = [actions[0].type, actions[1].type]
    expect(receivedAction).toEqual(expectedActions)
  })
});
