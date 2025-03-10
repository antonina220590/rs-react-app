import { ReactElement } from 'react';

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
}

export interface InputProps {
  initialSearchQuery: string;
}

export interface DetailsPageProps {
  character: Character | null;
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
  error: string | null;
  notFound: boolean;

  isFromServer?: boolean;
}

export interface QueryParams {
  search?: string;
  page?: string;
  id?: string | string[];
  [key: string]: string | string[] | undefined;
}

export interface ApiError {
  status: number;
  message: string;
}

export interface ApiEmptyResponse {
  info: {};
  results: [];
}

export type Info = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

export type Result<T> =
  | { data: T; error: null }
  | { data: null; error: ApiError };
