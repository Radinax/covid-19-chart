import { 
  createSlice,
  getDefaultMiddleware,
  configureStore,
  createAsyncThunk 
} from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import axios from 'axios'

// API
export const fetchCovidVenezuelaData = createAsyncThunk(
  'covidDataVenezuela/fetchingCovidDataVenezuela',
  async country => {
    const response = await axios.get(`https://coronavirus-cities-api.now.sh/country/${country}`)
    return response.data
  }
)

export const fetchCovidGlobalData = createAsyncThunk(
  'covidDataGlobal/fetchingCovidGlobalData',
  async () => {
    const response = await axios.get('https://corona.lmao.ninja/countries')
    return response.data
  }
)

// Initial State
const initialState = {
    data: [],
    loading: false,
    error: ""
};

// Slice
const sliceCovidVenezuela = createSlice({
  name: 'covidDataVenezuela',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCovidVenezuelaData.pending]: (state) => {
      state.loading = true
    },
    [fetchCovidVenezuelaData.fulfilled]: (state, action) => {
      state.data = action.payload
      state.loading = false
      state.error = false
    },
    [fetchCovidVenezuelaData.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error
    }
  }
})

const sliceCovidGlobal = createSlice({
  name: 'covidDataGlobal',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCovidGlobalData.pending]: (state) => {
      state.loading = true
    },
    [fetchCovidGlobalData.fulfilled]: (state, action) => {
      state.data = action.payload
      state.loading = false
      state.error = false
    },
    [fetchCovidGlobalData.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error
    }
  }
})

// Actions
export const {
  fetchingCovidDataVenezuela,
  fetchingCovidDataVenezuelaSuccess,
  fetchingCovidDataVenezuelaError } = sliceCovidVenezuela.actions

// Reducers
export const covidVenezuelaReducer = sliceCovidVenezuela.reducer
export const covidGlobalReducer = sliceCovidGlobal.reducer

const reducer = combineReducers({
  covidVenezuela: covidVenezuelaReducer,
  covidGlobal: covidGlobalReducer
})

// Configuring our store which will be used in Provider to enable Global State
export const store = configureStore({
  reducer: reducer,
  middleware: [...getDefaultMiddleware({
    serializableCheck: false,
  })]
})
