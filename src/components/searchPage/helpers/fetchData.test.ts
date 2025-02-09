import fetchData from './fetchData';
import { getApiData } from '../../../utils/api';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('../../../utils/api', () => ({
  getApiData: vi.fn(),
}));

describe('fetchData', () => {
  it('fetched data and updates state', async () => {
    const mockData = { results: [{ id: 1, name: 'Rick' }] };
    (getApiData as jest.Mock).mockResolvedValue(mockData);

    const setCharacters = vi.fn();
    const setIsLoading = vi.fn();
    const setErrorMessage = vi.fn();

    await fetchData('', 1, setCharacters, setIsLoading, setErrorMessage);

    expect(setCharacters).toHaveBeenCalledWith(mockData.results);
    expect(setIsLoading).toHaveBeenCalledWith(true);
    expect(setIsLoading).toHaveBeenCalledWith(false);
  });

  it('handles errors correctly', async () => {
    (getApiData as jest.Mock).mockRejectedValue(new Error('API Error'));

    const setCharacters = vi.fn();
    const setIsLoading = vi.fn();
    const setErrorMessage = vi.fn();

    await fetchData('', 1, setCharacters, setIsLoading, setErrorMessage);

    expect(setErrorMessage).toHaveBeenCalledWith('API Error');
    expect(setCharacters).not.toHaveBeenCalled();
    expect(setIsLoading).toHaveBeenCalledWith(true);
    expect(setIsLoading).toHaveBeenCalledWith(false);
  });

  it('handles unexpected errors', async () => {
    (getApiData as jest.Mock).mockRejectedValue('Unexpected Error');

    const setCharacters = vi.fn();
    const setIsLoading = vi.fn();
    const setErrorMessage = vi.fn();

    await fetchData('', 1, setCharacters, setIsLoading, setErrorMessage);

    expect(setErrorMessage).toHaveBeenCalledWith(
      'An unexpected error occurred.'
    );
  });
});
