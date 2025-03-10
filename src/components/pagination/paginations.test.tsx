import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from './pagination';
import { describe, expect, MockedFunction, test, vi } from 'vitest';
import * as UseThemeHook from '../../utils/context/useThemeHook';
import { ThemeContext } from '../../utils/context/useThemeHook';
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

const renderWithProviders = (
  props: {
    currentPage: number;
    totalPages: number;
  },
  isDarkTheme: boolean = false
) => {
  const useThemeSpy = vi.spyOn(UseThemeHook, 'useTheme');
  useThemeSpy.mockReturnValue({ isDarkTheme, toggleTheme: vi.fn() });

  return render(
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme: vi.fn() }}>
      <Pagination {...props} />
    </ThemeContext.Provider>
  );
};

describe('Pagination Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('renders pagination controls correctly', () => {
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
    renderWithProviders({
      currentPage: 2,
      totalPages: 5,
    });

    expect(screen.getByTestId('prevBtn')).toBeInTheDocument();
    expect(screen.getByTestId('pageNum')).toHaveValue('2');
    expect(screen.getByTestId('nextBtn')).toBeInTheDocument();
  });
  test('disables Prev button on first page', () => {
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
    renderWithProviders({
      currentPage: 1,
      totalPages: 5,
    });

    expect(screen.getByTestId('prevBtn')).toBeDisabled();
  });
  test('disables Next button on last page', () => {
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
    renderWithProviders({
      currentPage: 5,
      totalPages: 5,
    });

    expect(screen.getByTestId('nextBtn')).toBeDisabled();
  });
  test('calls router.push with correct page on Prev click', async () => {
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
    renderWithProviders({
      currentPage: 3,
      totalPages: 5,
    });

    const prevButton = screen.getByTestId('prevBtn');
    fireEvent.click(prevButton);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/?page=2');
    });
  });
  test('calls router.push with correct page on Next click', async () => {
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
    renderWithProviders({
      currentPage: 3,
      totalPages: 5,
    });

    const nextButton = screen.getByTestId('nextBtn');
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/?page=4');
    });
  });
  test('calls router.push with correct page on Next click with existing search params', async () => {
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
    renderWithProviders({
      currentPage: 3,
      totalPages: 5,
    });

    const nextButton = screen.getByTestId('nextBtn');
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/?name=Rick&page=4');
    });
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
    renderWithProviders(
      {
        currentPage: 2,
        totalPages: 5,
      },
      true
    );

    const prevButton = screen.getByTestId('prevBtn');
    expect(prevButton).toHaveClass('bg-neutral-300');
    const pageNum = screen.getByTestId('pageNum');
    expect(pageNum).toHaveClass('bg-[#19181A]');
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
    renderWithProviders({
      currentPage: 2,
      totalPages: 5,
    });

    const prevButton = screen.getByTestId('prevBtn');
    expect(prevButton).toHaveClass('bg-[#ac3b61]');
    const pageNum = screen.getByTestId('pageNum');
    expect(pageNum).toHaveClass('bg-white');
  });
});
