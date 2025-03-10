import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import COUNTRIES from '../countries/country-list';

interface CoutryState {
  countries: string[];
}

const initialState: CoutryState = {
  countries: COUNTRIES,
};

const countriesSlice = createSlice({
  name: 'countriesList',
  initialState,
  reducers: {
    setCountries(state, action: PayloadAction<string[]>) {
      state.countries = action.payload;
    },
  },
});

export const { setCountries } = countriesSlice.actions;

export const countriesReducer = countriesSlice.reducer;
