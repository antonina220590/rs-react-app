import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../interface';

const initialState: Character[] = [];

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addToFav: (state, action) => {
      state.push(action.payload);
    },
    deleteFromFav: (state, action: PayloadAction<Character>) => {
      const { id } = action.payload;
      if (state.length) {
        return state.filter((character: Character) => character.id !== id);
      }
      return [];
    },
    setFavourites: (state, action: PayloadAction<Character[]>) => {
      return action.payload;
    },
  },
});

export const { addToFav, deleteFromFav, setFavourites } =
  favouritesSlice.actions;
export default favouritesSlice.reducer;
