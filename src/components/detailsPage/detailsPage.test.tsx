import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DetailsPage from './detailsPage';
import { DetailsPageProps, Character } from '../../utils/interface';
import { describe, expect, MockedFunction, test, vi } from 'vitest';
import { ThemeContext } from '../../utils/context/useThemeHook';
import * as UseThemeHook from '../../utils/context/useThemeHook';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

const createMockRouter = (
  overrides: Partial<AppRouterInstance> = {}
): AppRouterInstance => ({
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  replace: vi.fn(),
  push: vi.fn(),
  prefetch: vi.fn(),
  ...overrides,
});

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  image: 'http://example.com/rick.png',
  status: 'Alive',
  gender: 'Male',
  species: 'Human',
  type: '',
  origin: { name: 'Earth', url: 'earth-url' },
  location: { name: 'Earth', url: 'earth-url' },
  episode: ['episode1', 'episode2'],
  url: 'character-url',
  created: '2017',
};
const renderWithProviders = (
  props: Partial<DetailsPageProps>,
  isDarkTheme: boolean = false
) => {
  const useThemeSpy = vi.spyOn(UseThemeHook, 'useTheme');
  useThemeSpy.mockReturnValue({ isDarkTheme, toggleTheme: vi.fn() });

  return render(
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme: vi.fn() }}>
      <DetailsPage {...{ character: mockCharacter }} {...props} />
    </ThemeContext.Provider>
  );
};

describe('DetailsPage Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('renders character details correctly', () => {
    const pushMock = vi.fn();
    const mockRouter = createMockRouter({ push: pushMock });
    (useRouter as MockedFunction<typeof useRouter>).mockReturnValue(mockRouter);
    const searchParams = new URLSearchParams();
    (useSearchParams as MockedFunction<typeof useSearchParams>).mockReturnValue(
      {
        get: (name: string) => searchParams.get(name),
        getAll: (name: string) => searchParams.getAll(name),
        has: (name: string) => searchParams.has(name),
        entries: () => searchParams.entries(),
        keys: () => searchParams.keys(),
        values: () => searchParams.values(),
        toString: () => searchParams.toString(),
        forEach: (
          callback: (
            value: string,
            key: string,
            parent: URLSearchParams
          ) => void
        ) => searchParams.forEach(callback),
        [Symbol.iterator]: () => searchParams[Symbol.iterator](),
        append: function (): void {
          throw new Error('Function not implemented.');
        },
        delete: function (): void {
          throw new Error('Function not implemented.');
        },
        set: function (): void {
          throw new Error('Function not implemented.');
        },
        sort: function (): void {
          throw new Error('Function not implemented.');
        },
        size: 0,
      }
    );
    renderWithProviders({});

    const image = screen.getByRole('img');

    expect(image).toBeInTheDocument();
    expect(screen.getByTestId('characterName')).toHaveTextContent(
      'Rick Sanchez'
    );
    expect(screen.getByTestId('characterStatus')).toHaveTextContent('Alive');
    expect(screen.getByTestId('characterSpecies')).toHaveTextContent('Human');
    expect(screen.getByTestId('characterGender')).toHaveTextContent('Male');
    expect(screen.getByTestId('closeCardBtn')).toBeInTheDocument();
  });
  test('applies correct theme styles for dark theme', () => {
    const pushMock = vi.fn();
    const mockRouter = createMockRouter({ push: pushMock });
    (useRouter as MockedFunction<typeof useRouter>).mockReturnValue(mockRouter);
    const searchParams = new URLSearchParams();
    (useSearchParams as MockedFunction<typeof useSearchParams>).mockReturnValue(
      {
        get: (name: string) => searchParams.get(name),
        getAll: (name: string) => searchParams.getAll(name),
        has: (name: string) => searchParams.has(name),
        entries: () => searchParams.entries(),
        keys: () => searchParams.keys(),
        values: () => searchParams.values(),
        toString: () => searchParams.toString(),
        forEach: (
          callback: (
            value: string,
            key: string,
            parent: URLSearchParams
          ) => void
        ) => searchParams.forEach(callback),
        [Symbol.iterator]: () => searchParams[Symbol.iterator](),
        append: function (): void {
          throw new Error('Function not implemented.');
        },
        delete: function (): void {
          throw new Error('Function not implemented.');
        },
        set: function (): void {
          throw new Error('Function not implemented.');
        },
        sort: function (): void {
          throw new Error('Function not implemented.');
        },
        size: 0,
      }
    );
    renderWithProviders({ character: mockCharacter }, true);

    const nameElement = screen.getByTestId('characterName');
    expect(nameElement).toHaveClass('text-white');
  });
  test('applies correct theme styles for light theme', () => {
    const pushMock = vi.fn();
    const mockRouter = createMockRouter({ push: pushMock });
    (useRouter as MockedFunction<typeof useRouter>).mockReturnValue(mockRouter);
    const searchParams = new URLSearchParams();
    (useSearchParams as MockedFunction<typeof useSearchParams>).mockReturnValue(
      {
        get: (name: string) => searchParams.get(name),
        getAll: (name: string) => searchParams.getAll(name),
        has: (name: string) => searchParams.has(name),
        entries: () => searchParams.entries(),
        keys: () => searchParams.keys(),
        values: () => searchParams.values(),
        toString: () => searchParams.toString(),
        forEach: (
          callback: (
            value: string,
            key: string,
            parent: URLSearchParams
          ) => void
        ) => searchParams.forEach(callback),
        [Symbol.iterator]: () => searchParams[Symbol.iterator](),
        append: function (): void {
          throw new Error('Function not implemented.');
        },
        delete: function (): void {
          throw new Error('Function not implemented.');
        },
        set: function (): void {
          throw new Error('Function not implemented.');
        },
        sort: function (): void {
          throw new Error('Function not implemented.');
        },
        size: 0,
      }
    );
    renderWithProviders({ character: mockCharacter }, false);
    const nameElement = screen.getByTestId('characterName');
    expect(nameElement).toHaveClass('text-black');
  });
  test('calls router.push when Close button is clicked', async () => {
    const pushMock = vi.fn();
    const mockRouter = createMockRouter({ push: pushMock });
    (useRouter as MockedFunction<typeof useRouter>).mockReturnValue(mockRouter);
    // Параметры не важны в этом тесте
    const searchParams = new URLSearchParams();
    (useSearchParams as MockedFunction<typeof useSearchParams>).mockReturnValue(
      {
        get: (name: string) => searchParams.get(name),
        getAll: (name: string) => searchParams.getAll(name),
        has: (name: string) => searchParams.has(name),
        entries: () => searchParams.entries(),
        keys: () => searchParams.keys(),
        values: () => searchParams.values(),
        toString: () => searchParams.toString(),
        forEach: (
          callback: (
            value: string,
            key: string,
            parent: URLSearchParams
          ) => void
        ) => searchParams.forEach(callback),
        [Symbol.iterator]: () => searchParams[Symbol.iterator](),
        append: function (): void {
          throw new Error('Function not implemented.');
        },
        delete: function (): void {
          throw new Error('Function not implemented.');
        },
        set: function (): void {
          throw new Error('Function not implemented.');
        },
        sort: function (): void {
          throw new Error('Function not implemented.');
        },
        size: 0,
      }
    );

    renderWithProviders({});

    const closeButton = screen.getByTestId('closeCardBtn');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/?');
    });
  });
  test('calls router.push when Close button is clicked and name exists', async () => {
    const pushMock = vi.fn();
    const mockRouter = createMockRouter({ push: pushMock });
    (useRouter as MockedFunction<typeof useRouter>).mockReturnValue(mockRouter);

    const initialSearchParams = new URLSearchParams();
    initialSearchParams.set('name', 'Rick');
    (useSearchParams as MockedFunction<typeof useSearchParams>).mockReturnValue(
      {
        get: (name: string) => initialSearchParams.get(name),
        getAll: (name: string) => initialSearchParams.getAll(name),
        has: (name: string) => initialSearchParams.has(name),
        entries: () => initialSearchParams.entries(),
        keys: () => initialSearchParams.keys(),
        values: () => initialSearchParams.values(),
        toString: () => initialSearchParams.toString(),
        forEach: (
          callback: (
            value: string,
            key: string,
            parent: URLSearchParams
          ) => void
        ) => initialSearchParams.forEach(callback),
        [Symbol.iterator]: () => initialSearchParams[Symbol.iterator](),
        append: function (): void {
          throw new Error('Function not implemented.');
        },
        delete: function (): void {
          throw new Error('Function not implemented.');
        },
        set: function (): void {
          throw new Error('Function not implemented.');
        },
        sort: function (): void {
          throw new Error('Function not implemented.');
        },
        size: 0,
      }
    );

    renderWithProviders({});

    const closeButton = screen.getByTestId('closeCardBtn');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/?name=Rick');
    });
  });
  test('calls router.push when Close button is clicked and name, page exists', async () => {
    const pushMock = vi.fn();
    const mockRouter = createMockRouter({ push: pushMock });
    (useRouter as MockedFunction<typeof useRouter>).mockReturnValue(mockRouter);

    const initialSearchParams = new URLSearchParams();
    initialSearchParams.set('name', 'Rick');
    initialSearchParams.set('page', '2');
    (useSearchParams as MockedFunction<typeof useSearchParams>).mockReturnValue(
      {
        get: (name: string) => initialSearchParams.get(name),
        getAll: (name: string) => initialSearchParams.getAll(name),
        has: (name: string) => initialSearchParams.has(name),
        entries: () => initialSearchParams.entries(),
        keys: () => initialSearchParams.keys(),
        values: () => initialSearchParams.values(),
        toString: () => initialSearchParams.toString(),
        forEach: (
          callback: (
            value: string,
            key: string,
            parent: URLSearchParams
          ) => void
        ) => initialSearchParams.forEach(callback),
        [Symbol.iterator]: () => initialSearchParams[Symbol.iterator](),
        append: function (): void {
          throw new Error('Function not implemented.');
        },
        delete: function (): void {
          throw new Error('Function not implemented.');
        },
        set: function (): void {
          throw new Error('Function not implemented.');
        },
        sort: function (): void {
          throw new Error('Function not implemented.');
        },
        size: 0,
      }
    );

    renderWithProviders({});

    const closeButton = screen.getByTestId('closeCardBtn');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/?name=Rick&page=2');
    });
  });
});
