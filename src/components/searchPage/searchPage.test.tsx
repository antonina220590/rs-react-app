import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import SearchPage from './searchPage';
import { MemoryRouter } from 'react-router';

const mockApiResponse = {
  info: {
    count: 100,
    pages: 5,
    next: 'http://example.com/api/characters?page=2',
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
    {
      id: 2,
      name: 'Morty Smith',
      status: 'Alive',
      gender: 'Male',
      species: 'Human',
      image: 'http://example.com/image2.jpg',
    },
  ],
};

vi.mock('../../utils/localStorage', () => ({
  useSearchQuery: vi.fn().mockReturnValue(['', vi.fn()]),
  useSearchParams: vi.fn().mockReturnValue([new URLSearchParams(''), vi.fn()]),
}));

vi.mock('./helpers/fetchData', () => {
  return {
    __esModule: true,
    default: vi.fn(),
  };
});

describe('SearchPage', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve(mockApiResponse),
    } as Response);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the search input', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    expect(screen.getByTestId('inputElement')).toBeInTheDocument();
  });
});
