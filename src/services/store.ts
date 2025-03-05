import { combineReducers, configureStore } from '@reduxjs/toolkit';
import favouritesSlice from '../utils/slices/favouritesSlice';
import { createWrapper } from 'next-redux-wrapper';
import { apiSlice } from '../utils/slices/apiSlice';

const rootReducer = combineReducers({
  favourites: favouritesSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
});
export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export const wrapper = createWrapper<AppStore>(makeStore);
