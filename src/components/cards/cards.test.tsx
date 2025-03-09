import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cards from './cards';
import { Character } from '../../utils/interface';
import { describe, expect, MockedFunction, test, vi } from 'vitest';
import * as UseThemeHook from '../../utils/context/useThemeHook';
import { ThemeContext } from '../../utils/context/useThemeHook';
import { Provider } from 'react-redux';
import { makeStore } from '../../store/store';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

const mockCharacters: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    image: 'http://example.com/rick.png',
    status: 'Alive',
    gender: 'Male',
    species: 'Human',
    type: '',
    origin: {
      name: '',
      url: '',
    },
    location: {
      name: '',
      url: '',
    },
    episode: [],
    url: '',
    created: '',
  },
  {
    id: 2,
    name: 'Morty Smith',
    image: 'http://example.com/morty.png',
    status: 'Alive',
    gender: 'Male',
    species: 'Human',
    type: '',
    origin: {
      name: '',
      url: '',
    },
    location: {
      name: '',
      url: '',
    },
    episode: [],
    url: '',
    created: '',
  },
];

const renderWithProviders = (component: React.ReactNode) => {
  const store = makeStore();
  return render(
    <Provider store={store}>
      <ThemeContext.Provider
        value={{ isDarkTheme: false, toggleTheme: vi.fn() }}
      >
        {component}
      </ThemeContext.Provider>
    </Provider>
  );
};

describe('Cards Component', () => {
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
  // const pushMock = vi.fn();
  // (useRouter as MockedFunction<typeof useRouter>).mockReturnValue({
  //   push: pushMock,
  // } as Pick<AppRouterInstance, 'push'>);
  // (useSearchParams as any).mockReturnValue(new URLSearchParams());

  // renderWithProviders(<Cards characters={mockCharacters} />);
  test('renders character cards correctly', async () => {
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
        // Исправленный forEach: теперь 3 аргумента
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

    renderWithProviders(<Cards characters={mockCharacters} />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(mockCharacters.length);

    expect(screen.getByTestId('character-image-1')).toBeInTheDocument();
    expect(screen.getByTestId('character-image-2')).toBeInTheDocument();
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
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

    const useThemeSpy = vi.spyOn(UseThemeHook, 'useTheme');
    useThemeSpy.mockReturnValue({ isDarkTheme: true, toggleTheme: vi.fn() });

    renderWithProviders(<Cards characters={mockCharacters} />);

    const card = screen.getByText(/Rick Sanchez/i);
    expect(card).toHaveClass('text-white');

    useThemeSpy.mockRestore();
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

    const useThemeSpy = vi.spyOn(UseThemeHook, 'useTheme');
    useThemeSpy.mockReturnValue({ isDarkTheme: false, toggleTheme: vi.fn() });

    renderWithProviders(<Cards characters={mockCharacters} />);

    const card = screen.getByText(/Rick Sanchez/i);
    expect(card).toHaveClass('text-black');

    useThemeSpy.mockRestore();
  });

  test('calls router.push with correct URL when a card is clicked', async () => {
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

    renderWithProviders(<Cards characters={mockCharacters} />);

    const card = screen.getByText(/Rick Sanchez/i);
    fireEvent.click(card);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/?id=1');
    });
  });
  test('calls router.push with correct URL when a card is clicked with existing search params', async () => {
    const pushMock = vi.fn();
    const mockRouter = createMockRouter({ push: pushMock });
    (useRouter as MockedFunction<typeof useRouter>).mockReturnValue(mockRouter);

    const initialSearchParams = new URLSearchParams();
    initialSearchParams.set('page', '2');

    // Мокаем useSearchParams, возвращая объект с методами, работающими с initialSearchParams
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
          throw new Error('Function not implemented');
        },
        delete: function (): void {
          throw new Error('Function not implemented');
        },
        set: function (): void {
          throw new Error('Function not implemented');
        },
        sort: function (): void {
          throw new Error('Function not implemented');
        },
        size: 0,
      }
    );

    renderWithProviders(<Cards characters={mockCharacters} />);

    const card = screen.getByText(/Morty Smith/i);
    fireEvent.click(card);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/?page=2&id=2');
    });
  });
});
