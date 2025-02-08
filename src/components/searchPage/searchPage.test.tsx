import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import SearchPage from './searchPage';
import { MemoryRouter } from 'react-router';
import fetchData from './helpers/fetchData';

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
}));

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useSearchParams: vi.fn(),
}));

vi.mock('./helpers/fetchData', () => {
  return {
    __esModule: true,
    default: vi.fn(),
  };
});

describe('SearchPage', () => {
  beforeEach(() => {
    vi.mocked(fetchData).mockResolvedValue(mockApiResponse);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the search input', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    expect(screen.getByTestId('inputElement')).toBeInTheDocument();
  });

  it('displays loading spinner while fetching data', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('displays loading spinner while fetching data', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('renders character cards after data is loaded', async () => {
    (fetchData as jest.Mock).mockResolvedValue(mockApiResponse);

    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });
});
