import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse, Character } from '../interface';
import { HYDRATE } from 'next-redux-wrapper';
import { Action, PayloadAction } from '@reduxjs/toolkit';

const BASE_URL = 'https://rickandmortyapi.com/api/character';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

function isHydrateAction(action: Action): action is PayloadAction<{
  [apiSlice.reducerPath]: ReturnType<typeof apiSlice.reducer>;
}> {
  return action.type === HYDRATE;
}

export const apiSlice = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery,
  extractRehydrationInfo(action, { reducerPath }) {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
    return undefined;
  },
  endpoints: (builder) => ({
    getCharacters: builder.query<
      ApiResponse,
      { searchQuery?: string; currentPage?: number }
    >({
      query: ({ searchQuery, currentPage }) => {
        const params = new URLSearchParams();
        if (searchQuery) params.append('name', searchQuery);
        if (currentPage) params.append('page', currentPage.toString());
        return `?${params.toString()}`;
      },
    }),
    getCharacterById: builder.query<Character, string>({
      query: (id) => `/${id}`,
    }),
  }),
});

export const {
  useGetCharactersQuery,
  useGetCharacterByIdQuery,
  useLazyGetCharactersQuery,
} = apiSlice;
