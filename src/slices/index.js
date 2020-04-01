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
    const response = await axios.get('https://api.covidnow.com/v1/global/countries')
    return response.data.data
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

const reducer = combineReducers({
  covidVenezuela: sliceCovidVenezuela.reducer,
  covidGlobal: sliceCovidGlobal.reducer,
})

// Destructuring the actions we're gonna use in the app
export const {
  fetchingCovidDataVenezuela,
  fetchingCovidDataVenezuelaSuccess,
  fetchingCovidDataVenezuelaError
} = sliceCovidVenezuela.actions
export const {
  fetchingCovidGlobalData,
  fetchingCovidGlobalDataSuccess,
  fetchingCovidGlobalDataError
} = sliceCovidGlobal.actions

// Configuring our store which will be used in Provider to enable Global State
export const store = configureStore({
  reducer: reducer,
  middleware: [...getDefaultMiddleware({
    serializableCheck: false,
  })]
})
