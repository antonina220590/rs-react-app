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
    const errorData = await res.json();
    const errorMessage =
      errorData.message || res.statusText || 'An unexpected error occurred.';

    throw new Error(
      `HTTP error! status: ${res.status}, message: ${errorMessage}`
    );
  }

  return res.json();
}
