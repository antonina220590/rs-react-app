import { ReactElement } from 'react';

export interface Character {
  id?: number;
  name: string;
  status: string;
  gender: string;

  species: string;
  image: string;
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
