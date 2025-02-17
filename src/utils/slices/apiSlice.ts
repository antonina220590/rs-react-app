import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse, Character } from '../interface';

const BASE_URL = 'https://rickandmortyapi.com/api/character';

export const apiSlice = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCharacters: builder.query<
      ApiResponse,
      { searchQuery?: string; currentPage?: number }
    >({
      query: ({ searchQuery, currentPage }) => {
        let url = '';
        if (searchQuery) {
          url += `/?name=${encodeURIComponent(searchQuery)}`;
        }
        if (currentPage) {
          url += `${searchQuery ? '&' : '?'}page=${currentPage}`;
        }
        return url;
      },
    }),
    getCharacterById: builder.query<Character, number>({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } = apiSlice;
