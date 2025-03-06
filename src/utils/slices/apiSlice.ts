import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse, Character } from '@/utils/interface';

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

export const { useGetCharactersQuery, useGetCharacterByIdQuery } = apiSlice;
