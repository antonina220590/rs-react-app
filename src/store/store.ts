import { configureStore } from '@reduxjs/toolkit';
import { countriesReducer } from './slices/country-slice';
import { formsReducer } from './slices/forms-slice';

const store = configureStore({
  reducer: {
    countries: countriesReducer,
    submissions: formsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
