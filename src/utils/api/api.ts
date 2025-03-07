import { ApiEmptyResponse, ApiResponse, Character } from '@/utils/interface';
interface ApiError {
  status: number;
  message: string;
}
const RICK_AND_MORTY_API = 'https://rickandmortyapi.com/api/character';

type Result<T> = { data: T; error: null } | { data: null; error: ApiError };
export async function getCharacters({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  baseUrl: string;
}): Promise<Result<ApiResponse | ApiEmptyResponse>> {
  const searchParamsLoaded = await Promise.resolve(searchParams);

  const searchQuery = searchParamsLoaded.name
    ? Array.isArray(searchParamsLoaded.name)
      ? searchParamsLoaded.name.join(',')
      : searchParamsLoaded.name
    : '';
  const currentPage = Number(
    searchParamsLoaded.page
      ? Array.isArray(searchParamsLoaded.page)
        ? searchParamsLoaded.page[0]
        : searchParamsLoaded.page
      : '1'
  );

  const params = new URLSearchParams();
  if (searchQuery) params.append('name', searchQuery);
  if (currentPage) params.append('page', currentPage.toString());
  const url = `${RICK_AND_MORTY_API}?${params.toString()}`;
  try {
    const res = await fetch(url, { next: { revalidate: 86400 } });

    if (!res.ok) {
      if (res.status === 404) {
        return { data: { info: {}, results: [] }, error: null };
      }
      const errorText = await res.text();
      console.error('Error fetching characters:', res.status, errorText);
      return {
        data: null,
        error: {
          status: res.status,
          message: `Error fetching characters: ${errorText}`,
        },
      };
    }

    const data: ApiResponse = await res.json();
    return { data, error: null };
  } catch (error) {
    console.error('getCharacters: Error during fetch or parsing:', error);
    return {
      data: null,
      error: { status: 500, message: 'Fetch or parsing error' },
    };
  }
}

export async function getCharacterById({
  id,
}: {
  id: string;
  baseUrl: string;
}): Promise<Result<Character>> {
  const url = `${RICK_AND_MORTY_API}/${id}`;

  const res = await fetch(url, { next: { revalidate: 86400 } });

  if (!res.ok) {
    if (res.status === 404) {
      return {
        data: null,
        error: { status: 404, message: 'Character not found' },
      };
    }
    const errorText = await res.text();
    console.error('Error fetching character:', res.status, errorText);
    return {
      data: null,
      error: {
        status: res.status,
        message: `Error fetching character: ${errorText}`,
      },
    };
  }

  const data: Character = await res.json();
  return { data, error: null };
}
