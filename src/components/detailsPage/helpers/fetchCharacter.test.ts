import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fetchCharacter } from './fetchCharacter';
import { Character } from '../../../utils/interface';

describe('fetchCharacter', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const mockSuccessfulFetch = (mockCharacter: Character) => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => mockCharacter,
      })
    ) as unknown as typeof fetch;
  };

  const mockErrorFetch = (status: number) => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status,
        json: async () => ({}),
      })
    ) as unknown as typeof fetch;
  };

  const mockNetworkErrorFetch = () => {
    global.fetch = vi.fn(() =>
      Promise.reject(new Error('Network error'))
    ) as unknown as typeof fetch;
  };

  it('should return character data when API call is successful', async () => {
    const mockCharacter: Character = {
      id: 1,
      name: 'Rick Sanchez',
      image: 'http://example.com/rick.png',
      status: 'Alive',
      gender: 'Male',
      species: 'Human',
    };

    mockSuccessfulFetch(mockCharacter);

    const result = await fetchCharacter('1');

    expect(result).toEqual(mockCharacter);
    expect(fetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/1'
    );
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should return null when API returns an error', async () => {
    mockErrorFetch(404);

    const result = await fetchCharacter('999');

    expect(result).toBeNull();
    expect(fetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/999'
    );
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should return null on network error', async () => {
    mockNetworkErrorFetch();

    const result = await fetchCharacter('1');

    expect(result).toBeNull();
    expect(fetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/1'
    );
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
