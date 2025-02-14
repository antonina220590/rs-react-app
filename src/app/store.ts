import { combineReducers, configureStore } from '@reduxjs/toolkit';
import favouritesSlice from '../utils/slices/favouritesSlice';

const rootReducer = combineReducers({
  favourites: favouritesSlice,
});
export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
