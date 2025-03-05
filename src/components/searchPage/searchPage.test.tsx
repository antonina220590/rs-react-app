import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeStore } from '../../services/store';
import '@testing-library/jest-dom';
import SearchPage from './searchPage';
import { vi } from 'vitest';
import { mockApiResponse } from '../../mocks/handlers/characters';
import { ThemeContext } from '../../utils/context/useThemeHook';
import {
  useGetCharacterByIdQuery,
  useGetCharactersQuery,
} from '../../utils/slices/apiSlice';
import { mockCharacter } from '../../mocks/handlers/characterId';
import { addToFav } from '../../utils/slices/favouritesSlice';
import { ApiResponse, Character } from '../../utils/interface';

interface MockRouter {
  query: { page: string; id: string | undefined; search?: string };
  isReady: boolean;
  push: ReturnType<typeof vi.fn>;
  pathname: string;
  events: {
    on: ReturnType<typeof vi.fn>;
    off: ReturnType<typeof vi.fn>;
  };
  asPath: string;
}

global.URL.createObjectURL = vi.fn();

const mockThemeContext = {
  isDarkTheme: false,
  toggleTheme: vi.fn(),
};
const mockCharacterDetails: Character = {
  id: 1,
  name: 'Rick Sanchez',
  image: 'http://example.com/rick.png',
  status: 'Alive',
  gender: 'Male',
  species: 'Human',
  type: '',
  origin: {
    name: 'Earth',
    url: '',
  },
  location: {
    name: 'Earth',
    url: '',
  },
  episode: [],
  url: '',
  created: '',
};

const mockRouter: MockRouter = {
  query: { page: '1', id: undefined },
  isReady: true,
  push: vi.fn().mockImplementation((route) => {
    mockRouter.query = route.query;
  }),
  pathname: '/',
  events: {
    on: vi.fn(),
    off: vi.fn(),
  },
  get asPath() {
    const queryParams = new URLSearchParams();
    for (const key in this.query) {
      if (this.query[key] !== undefined) {
        queryParams.append(key, String(this.query[key]));
      }
    }
    return Object.keys(this.query).length > 0
      ? `${this.pathname}?${queryParams.toString()}`
      : this.pathname;
  },
};

vi.mock('next/router', () => ({
  useRouter: () => mockRouter,
}));

vi.mock('../../utils/slices/apiSlice', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('../../utils/slices/apiSlice')>();
  return {
    ...actual,
    useGetCharacterByIdQuery: vi.fn(() => ({
      data: undefined,
      error: null,
      isLoading: false,
      isFetching: false,
    })),
    useGetCharactersQuery: vi.fn(),
  };
});

vi.mock('next/router', () => ({
  useRouter: () => mockRouter,
}));

const mockUseGetCharacterByIdQuery = vi.fn();
const mockUseGetCharactersQuery = vi.fn();

const setup = (
  initialData: ApiResponse,
  initialCharacter: Character | null = null
) => {
  const store = makeStore();
  return render(
    <ThemeContext.Provider value={mockThemeContext}>
      <Provider store={store}>
        <SearchPage
          initialData={initialData}
          initialCharacter={initialCharacter}
        />
      </Provider>
    </ThemeContext.Provider>
  );
};

describe('SearchPage Component', async () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockRouter.query = { page: '1', id: undefined };
    mockRouter.pathname = '/';
    (useGetCharactersQuery as ReturnType<typeof vi.fn>).mockReset();
    (useGetCharacterByIdQuery as ReturnType<typeof vi.fn>).mockReset();
  });

  test('renders search input', () => {
    setup(mockApiResponse);
    expect(screen.getByPlaceholderText('search.....')).toBeInTheDocument();
  });
  test('displays character cards', async () => {
    (useGetCharactersQuery as jest.Mock).mockReturnValue([
      vi.fn(),
      { data: mockApiResponse, error: null, isLoading: false },
    ]);

    setup(mockApiResponse);

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  test('handles search input changes', async () => {
    (useGetCharactersQuery as jest.Mock).mockReturnValue([
      vi.fn(),
      { data: mockApiResponse, error: null, isLoading: false },
    ]);

    setup(mockApiResponse);

    const input = screen.getByPlaceholderText(
      'search.....'
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Morty' } });

    expect(input.value).toBe('Morty');
  });
  test('disables previous button when on the first page', async () => {
    (useGetCharactersQuery as jest.Mock).mockReturnValue([
      vi.fn(),
      { data: mockApiResponse, error: null, isLoading: false },
    ]);

    setup(mockApiResponse);

    const previousButton = screen.getByTestId('prevBtn');
    expect(previousButton).toBeDisabled();
  });
  test('shows Flyout when checkbox is checked', async () => {
    (useGetCharactersQuery as jest.Mock).mockReturnValue([
      vi.fn(),
      { data: mockApiResponse, error: null, isLoading: false },
    ]);

    setup(mockApiResponse);

    const checkBox = screen.getByTestId(`heart-label-${mockCharacter.id}`);
    fireEvent.click(checkBox);

    await waitFor(() => {
      const store = makeStore();
      store.dispatch(addToFav(mockCharacter));
      expect(screen.getByTestId('flyout')).toBeInTheDocument();
    });
  });

  test('opens character details on card click', async () => {
    mockUseGetCharactersQuery.mockReturnValue({
      data: mockApiResponse,
      error: null,
      isLoading: false,
      isFetching: false,
    });

    mockUseGetCharacterByIdQuery.mockReturnValue({
      data: mockCharacterDetails,
      error: null,
      isLoading: false,
      isFetching: false,
    });
    setup(mockApiResponse);
    const card = await screen.findByText('Rick Sanchez');
    fireEvent.click(card);
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith({
        pathname: '/',
        query: { page: '1', id: 1 },
      });
    });
  });

  test('closes character details on close button click', async () => {
    mockRouter.query = { page: '1', id: '1' };

    mockUseGetCharactersQuery.mockReturnValue({
      data: mockApiResponse,
      error: null,
      isLoading: false,
      isFetching: false,
    });

    mockUseGetCharacterByIdQuery.mockImplementation((id) => {
      return id === '1'
        ? {
            data: mockCharacterDetails,
            error: null,
            isLoading: false,
            isFetching: false,
          }
        : {
            data: undefined,
            error: null,
            isLoading: false,
            isFetching: false,
          };
    });

    setup(mockApiResponse, mockCharacterDetails);

    const closeButton = await screen.findByTestId('closeCardBtn');
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith({
        pathname: '/',
        query: { page: '1' },
      });
    });
  });

  test('correctly initializes with initialData if provided', () => {
    mockUseGetCharactersQuery.mockReturnValue({
      data: mockApiResponse,
      error: null,
      isLoading: false,
      isFetching: false,
    });
    setup(mockApiResponse);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  test('does not navigate to invalid page on pagination', async () => {
    mockUseGetCharactersQuery.mockReturnValue({
      data: {
        ...mockApiResponse,
        info: { ...mockApiResponse.info, pages: 2 },
      },
      error: null,
      isLoading: false,
      isFetching: false,
    });

    setup({ ...mockApiResponse, info: { ...mockApiResponse.info, pages: 2 } });

    const nextPageButton = screen.getByTestId('nextBtn');
    fireEvent.click(nextPageButton);

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith({
        pathname: '/',
        query: { page: '2' },
      });
    });

    fireEvent.click(nextPageButton);

    await waitFor(() => {
      expect(mockRouter.push).not.toHaveBeenCalledWith({
        pathname: '/',
        query: { page: '3' },
      });
    });
  });
});
