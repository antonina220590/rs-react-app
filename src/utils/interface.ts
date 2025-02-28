import { ReactElement } from 'react';
import favouritesSlice from './slices/favouritesSlice';
import {
  BaseQueryFn,
  CombinedState,
  FetchArgs,
  FetchBaseQueryError,
  QueryDefinition,
} from '@reduxjs/toolkit/query';

export interface Character {
  id?: number;
  name?: string;
  status?: string;
  gender?: string;

  species?: string;
  image?: string;
  type?: string;
  origin?: {
    name?: string;
    url?: string;
  };
  location?: {
    name?: string;
    url?: string;
  };
  episode?: string[];
}

export interface CardsProps {
  characters: Character[];
  onCardClick: (id?: number) => void;
}

export interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export interface IProps {
  children: React.ReactNode;
  fallback?: ReactElement;
}

export interface IState {
  hasError: boolean;
  errorMessage: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  changePage: (page: number) => void;
}

export interface InputProps {
  onSearch: (searchQuery: string) => void;
}

export interface DetailsPageProps {
  character: Character;
  closeCard: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

  fetching: boolean;
}

export type RootStateApi = {
  favourites: ReturnType<typeof favouritesSlice>;
  rickAndMortyApi: CombinedState<
    {
      getCharacters: QueryDefinition<
        { searchQuery?: string; currentPage?: number },
        BaseQueryFn<
          string | FetchArgs,
          unknown,
          FetchBaseQueryError,
          object,
          object
        >,
        never,
        ApiResponse,
        'rickAndMortyApi'
      >;
      getCharacterById: QueryDefinition<
        string,
        BaseQueryFn<
          string | FetchArgs,
          unknown,
          FetchBaseQueryError,
          object,
          object
        >,
        never,
        Character,
        'rickAndMortyApi'
      >;
    },
    never,
    'rickAndMortyApi'
  >;
};
