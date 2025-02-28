import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse, Character, RootStateApi } from '../interface';
import { HYDRATE } from 'next-redux-wrapper';
import { Action, PayloadAction } from '@reduxjs/toolkit';

const BASE_URL = 'https://rickandmortyapi.com/api/character';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

function isHydrateAction(
  action: Action
): action is PayloadAction<RootStateApi> {
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
        if (searchQuery && searchQuery.trim() !== '') {
          params.append('name', searchQuery.trim());
        }
        if (currentPage && currentPage > 1) {
          params.append('page', currentPage.toString());
        }
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
