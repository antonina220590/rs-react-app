import { combineReducers, configureStore } from '@reduxjs/toolkit';
import favouritesSlice from '../utils/slices/favouritesSlice';
import { apiSlice } from '../utils/slices/apiSlice';

const rootReducer = combineReducers({
  favourites: favouritesSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
});
export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
