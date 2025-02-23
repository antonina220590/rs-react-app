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
  },
});

export const { addToFav, deleteFromFav } = favouritesSlice.actions;
export default favouritesSlice.reducer;
