import { ReactElement } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export interface Character {
  id: number;
  name: string;
  status: string;
  gender: string;
  species: string;
  image: string;
  type: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  episode: string[];
  url: string;
  created: string;
}

export interface CardsProps {
  characters: Character[];
  onCardClick: ({ id }: { id: number }) => void;
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
  changePage: (_page: number) => void;
}

export interface InputProps {
  initialSearchQuery: string;
}

export interface DetailsPageProps {
  character: Character;
  closeCard: () => void;
  fetching: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}

export interface SearchPageProps {
  initialData: ApiResponse;
  initialCharacter: Character | null;
  error?: string | null | undefined;
  notFound?: boolean;
}

export interface PageProps {
  initialData: ApiResponse;
  initialCharacter: Character | null;
  error: string | null | undefined;
  notFound?: boolean;
}
