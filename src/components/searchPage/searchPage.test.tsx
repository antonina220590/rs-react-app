import { vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
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
const mockSetSearchParams = vi.fn();

vi.mock('../../utils/localStorage', () => ({
  useSearchQuery: vi.fn().mockReturnValue(['', vi.fn()]),
}));

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useSearchParams: vi.fn(() => [new URLSearchParams(), mockSetSearchParams]),
}));

vi.mock('./helpers/fetchData', () => {
  return {
    __esModule: true,
    default: vi.fn(),
  };
});

describe('SearchPage', () => {
  // beforeEach(() => {
  //   vi.mocked(fetchData).mockResolvedValue(mockApiResponse);
  // });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it.skip('renders the search input', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    expect(screen.getByTestId('inputElement')).toBeInTheDocument();
  });

  it.skip('displays loading spinner while fetching data', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it.skip('displays loading spinner while fetching data', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it.skip('renders character cards after data is loaded', async () => {
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

  it.skip('performs a search and updates the URL parameters', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    const searchInput = screen.getByTestId('inputElement');
    const searchButton = screen.getByTestId('searchBtn');
    const searchQuery = 'Rick';

    fireEvent.change(searchInput, { target: { value: searchQuery } });
    fireEvent.click(searchButton);
    expect(screen.getByDisplayValue(searchQuery)).toBeInTheDocument();
  });
});
