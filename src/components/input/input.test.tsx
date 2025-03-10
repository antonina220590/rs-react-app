import { render, screen } from '@testing-library/react';
import InputClient from './input';
import '@testing-library/jest-dom';
import { useTheme } from '../../utils/context/useThemeHook';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  vi,
  Mock,
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  MockedFunction,
} from 'vitest';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('../../utils/context/useThemeHook', () => ({
  useTheme: vi.fn(),
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

describe('InputClient Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  test('renders the input field with the correct placeholder', () => {
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

    (useTheme as Mock).mockReturnValue({ isDarkTheme: false });
    render(<InputClient />);
    expect(screen.getByPlaceholderText('search.....')).toBeInTheDocument();
  });

  it('sets initial search query correctly', () => {
    const initialQuery = 'Rick';
    const pushMock = vi.fn();
    const mockRouter = createMockRouter({ push: pushMock });
    (useRouter as MockedFunction<typeof useRouter>).mockReturnValue(mockRouter);

    const searchParams = new URLSearchParams();
    searchParams.set('name', initialQuery);
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
        append: () => {},
        delete: () => {},
        set: () => {},
        sort: () => {},
        size: 0,
      }
    );

    (useTheme as Mock).mockReturnValue({ isDarkTheme: false });
    render(<InputClient />);
    const inputElement = screen.getByPlaceholderText(
      'search.....'
    ) as HTMLInputElement;

    expect(inputElement.defaultValue).toBe(initialQuery);
  });

  it('should focus the input on mount', () => {
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
    (useTheme as Mock).mockReturnValue({ isDarkTheme: false });
    render(<InputClient />);
    const inputElement = screen.getByPlaceholderText('search.....');
    expect(inputElement).toHaveFocus();
  });

  test('applies dark theme styles correctly', () => {
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
    (useTheme as Mock).mockReturnValue({ isDarkTheme: true });
    render(<InputClient />);
    const inputElement = screen.getByPlaceholderText('search.....');
    const searchButton = screen.getByTestId('searchBtn');

    expect(inputElement).toHaveClass('bg-white text-black');
    expect(searchButton).toHaveClass(
      'bg-neutral-300 text-black hover:bg-white'
    );
  });
});
