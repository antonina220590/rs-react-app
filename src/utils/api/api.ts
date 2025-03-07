import { ApiResponse, Character } from '@/utils/interface';

interface ApiError {
  status: number;
  message: string;
}

type Result<T> = { data: T; error: null } | { data: null; error: ApiError };
export async function getCharacters({
  searchParams,
  baseUrl,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  baseUrl: string;
}): Promise<Result<ApiResponse>> {
  const searchParamsLoaded = await Promise.resolve(searchParams);

  const searchQuery = searchParamsLoaded.search
    ? Array.isArray(searchParamsLoaded.search)
      ? searchParamsLoaded.search.join(',')
      : searchParamsLoaded.search
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

  const url = `${baseUrl}/api/characters?${params.toString()}`;

  const res = await fetch(url, { next: { revalidate: 86400 } });

  if (!res.ok) {
    if (res.status === 404) {
      return {
        data: null,
        error: { status: 404, message: 'Characters not found' },
      };
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
}

export async function getCharacterById({
  id,
  baseUrl,
}: {
  id: string;
  baseUrl: string;
}): Promise<Result<Character>> {
  const url = `${baseUrl}/api/characters/${id}`;

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
