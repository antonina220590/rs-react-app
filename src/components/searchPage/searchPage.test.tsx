import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeStore } from '../../services/store';
import '@testing-library/jest-dom';
import SearchPage from './searchPage';
import { vi } from 'vitest';
import { mockApiResponse } from '../../mocks/handlers/characters';
import { ThemeContext } from '../../utils/context/useThemeHook';
import {
  useGetCharacterByIdQuery,
  useLazyGetCharactersQuery,
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
const mockCharacterDetails: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    image: 'http://example.com/rick.png',
    status: 'Alive',
    gender: 'Male',
    species: 'Human',
  },
];

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
  const actual = (await importOriginal()) as {
    useLazyGetCharactersQuery: jest.Mock;
    useGetCharacterByIdQuery: jest.Mock;
  };
  return {
    ...actual,
    useLazyGetCharactersQuery: vi
      .fn()
      .mockReturnValue([
        vi.fn(),
        { data: null, error: null, isLoading: false },
      ]),
    useGetCharacterByIdQuery: vi.fn().mockImplementation((id) => {
      return { data: mockCharacterDetails, error: null, isLoading: false };
    }),
  };
});

let mockSearchQuery = '';

const triggerMock = vi.fn();
vi.mock('next/router', () => ({
  useRouter: () => mockRouter,
}));

vi.mock('../../utils/localStorageHook', () => ({
  useSearchQuery: () => {
    return [
      mockSearchQuery,
      (newValue: string) => {
        mockSearchQuery = newValue;
      },
    ];
  },
}));

const emptyApiResponse: ApiResponse = {
  info: {
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  },
  results: [],
};

const setup = (initialData: ApiResponse) => {
  const store = makeStore();
  return render(
    <ThemeContext.Provider value={mockThemeContext}>
      <Provider store={store}>
        <SearchPage initialData={initialData} />
      </Provider>
    </ThemeContext.Provider>
  );
};

describe('SearchPage Component', async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders search input', () => {
    setup(mockApiResponse);
    expect(screen.getByPlaceholderText('search.....')).toBeInTheDocument();
  });

  test('displays error message', async () => {
    (useLazyGetCharactersQuery as jest.Mock).mockReturnValue([
      vi.fn(),
      {
        data: null,
        error: { status: 404, data: 'Not found' },
        isLoading: false,
      },
    ]);

    setup(mockApiResponse);

    await waitFor(() =>
      expect(screen.getByText(/Error: 404 - Not found/i)).toBeInTheDocument()
    );
  });

  test('displays no results found message', async () => {
    (useLazyGetCharactersQuery as jest.Mock).mockReturnValue([
      vi.fn(),
      { data: { results: [] }, error: null, isLoading: false },
    ]);

    setup(mockApiResponse);

    await waitFor(() =>
      expect(
        screen.getByText(/No results found for your search/i)
      ).toBeInTheDocument()
    );
  });

  test('displays character cards', async () => {
    (useLazyGetCharactersQuery as jest.Mock).mockReturnValue([
      vi.fn(),
      { data: mockApiResponse, error: null, isLoading: false },
    ]);

    setup(mockApiResponse);

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  test('handles search input changes', async () => {
    (useLazyGetCharactersQuery as jest.Mock).mockReturnValue([
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
  test('displays message when search input is empty', async () => {
    (useLazyGetCharactersQuery as jest.Mock).mockReturnValue([
      vi.fn(),
      { data: { results: [] }, error: null, isLoading: false },
    ]);

    setup(mockApiResponse);

    const input = screen.getByPlaceholderText(
      'search.....'
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: '' } });

    await waitFor(() => {
      expect(
        screen.getByText(/No results found for your search/i)
      ).toBeInTheDocument();
    });
  });
  test('disables previous button when on the first page', async () => {
    (useLazyGetCharactersQuery as jest.Mock).mockReturnValue([
      vi.fn(),
      { data: mockApiResponse, error: null, isLoading: false },
    ]);

    setup(mockApiResponse);

    const previousButton = screen.getByTestId('prevBtn');
    expect(previousButton).toBeDisabled();
  });
  test('shows Flyout when checkbox is checked', async () => {
    (useLazyGetCharactersQuery as jest.Mock).mockReturnValue([
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
    const trigger = vi.fn();
    (useLazyGetCharactersQuery as jest.Mock).mockReturnValue([
      trigger,
      {
        data: mockApiResponse,
        error: null,
        isLoading: false,
        isFetching: false,
      },
    ]);

    (useGetCharacterByIdQuery as jest.Mock).mockReturnValue({
      data: mockCharacterDetails,
      error: null,
      isLoading: false,
    });
    setup(mockApiResponse);

    const card = await screen.findByText('Rick Sanchez');
    fireEvent.click(card);

    await waitFor(
      () => {
        expect(mockRouter.push).toHaveBeenCalledWith(
          {
            pathname: '/',
            query: { page: '1', id: 1 },
          },
          undefined,
          { shallow: true }
        );
      },
      { timeout: 3000 }
    );
  });
  test('closes character details on close button click', async () => {
    mockRouter.query = { page: '1', id: '1' };
    const trigger = vi.fn();
    (useLazyGetCharactersQuery as jest.Mock).mockReturnValue([
      trigger,
      {
        data: mockApiResponse,
        error: null,
        isLoading: false,
        isFetching: false,
      },
    ]);

    (useGetCharacterByIdQuery as jest.Mock).mockReturnValue({
      data: mockCharacterDetails,
      error: null,
      isLoading: false,
    });
    setup(mockApiResponse);

    const closeButton = await screen.findByTestId('closeCardBtn');
    expect(closeButton).toBeInTheDocument();
    await act(() => fireEvent.click(closeButton));
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith(
        {
          pathname: '/',
          query: { page: '1' },
        },
        undefined,
        { shallow: true }
      );
    });
  });
  test('correctly initializes with initialData if provided', () => {
    setup(mockApiResponse);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });
  test('does not navigate to invalid page on pagination', async () => {
    (useLazyGetCharactersQuery as jest.Mock).mockReturnValue([
      vi.fn(),
      {
        data: { info: { pages: 2, count: 2, next: '', prev: '' }, results: [] },
        error: null,
        isLoading: false,
      },
    ]);
    setup({ info: { pages: 2, count: 2, next: '', prev: '' }, results: [] });

    const nextPageButton = screen.getByTestId('nextBtn');
    await act(() => fireEvent.click(nextPageButton));
    await act(() => fireEvent.click(nextPageButton));

    await waitFor(() => {
      expect(mockRouter.push).not.toHaveBeenCalledWith(
        {
          pathname: '/',
          query: { page: '3' },
        },
        undefined,
        { shallow: true }
      );
    });
  });
  test('navigates to the correct page on pagination button click', async () => {
    (useLazyGetCharactersQuery as jest.Mock).mockReturnValue([
      vi.fn(),
      { data: mockApiResponse, error: null, isLoading: false },
    ]);
    setup(mockApiResponse);

    const nextPageButton = screen.getByTestId('nextBtn');
    await act(() => fireEvent.click(nextPageButton));

    await waitFor(() => {
      expect(mockRouter.query).toEqual({ page: '2', id: undefined });
    });
  });
  test('renders loading state initially', () => {
    (useLazyGetCharactersQuery as jest.Mock).mockReturnValue([
      vi.fn(),
      { data: null, error: null, isLoading: true },
    ]);
    setup(emptyApiResponse);
    expect(
      screen.getByText('No results found for your search.')
    ).toBeInTheDocument();
  });
});
