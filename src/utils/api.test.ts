import { getApiData } from './api';
import { vi } from 'vitest';

global.fetch = vi.fn();

const mockApiResponse = {
  info: {
    count: 100,
    pages: 5,
    next: null,
    prev: null,
  },
  results: [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      gender: 'Male',
      species: 'Human',
      image: 'http://example.com/image1.jpg',
    },
  ],
};

describe('getApiData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should construct the URL correctly with searchQuery and currentPage', async () => {
    const searchQuery = 'Rick';
    const currentPage = 2;

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    const result = await getApiData(searchQuery, currentPage);
    expect(fetch).toHaveBeenCalledWith(
      `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(searchQuery)}&page=${currentPage}`
    );
    expect(result).toEqual(mockApiResponse);
  });

  it('should construct the URL correctly with only searchQuery', async () => {
    const searchQuery = 'Morty';

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    const result = await getApiData(searchQuery);
    expect(fetch).toHaveBeenCalledWith(
      `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(searchQuery)}`
    );
    expect(result).toEqual(mockApiResponse);
  });

  it('should construct the URL correctly with only currentPage', async () => {
    const currentPage = 3;

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    const result = await getApiData(undefined, currentPage);
    expect(fetch).toHaveBeenCalledWith(
      `https://rickandmortyapi.com/api/character?page=${currentPage}`
    );
    expect(result).toEqual(mockApiResponse);
  });

  it('should throw an error if the fetch response is not ok', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      json: async () => ({
        message: 'Resource not found',
      }),
    });

    await expect(getApiData('Rick')).rejects.toThrow(
      'HTTP error! status: 404, message: Resource not found'
    );
  });

  it('should throw an error for unexpected responses', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      json: async () => ({}),
    });

    await expect(getApiData('Rick')).rejects.toThrow(
      'HTTP error! status: 500, message: Internal Server Error'
    );
  });
});
