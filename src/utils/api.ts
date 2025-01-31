import { ApiResponse } from './interface';
const BASE_URL = 'https://rickandmortyapi.com/api/character';

export async function getApiData(searchQuery?: string): Promise<ApiResponse> {
  let url = BASE_URL;
  if (searchQuery) {
    url += `/?name=${encodeURIComponent(searchQuery)}`;
  } else {
    url += '?';
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`API request failed. Status: ${res.status}`);
  }

  return res.json();
}
