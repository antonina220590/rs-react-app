import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from './input';
import { describe, expect, test, vi } from 'vitest';
import * as UseThemeHook from '../../utils/context/useThemeHook';
import { ThemeContext } from '../../utils/context/useThemeHook';
import * as LocalStorageHook from '../../utils/localStorageHook';

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    query: {},
    isReady: true,
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
  }),
}));

const mockThemeContext = {
  isDarkTheme: false,
  toggleTheme: vi.fn(),
};

const renderWithProviders = (
  onSearch: (query: string) => void,
  isDarkTheme: boolean = false
) => {
  const useThemeSpy = vi.spyOn(UseThemeHook, 'useTheme');
  useThemeSpy.mockReturnValue({ isDarkTheme, toggleTheme: vi.fn() });

  return render(
    <ThemeContext.Provider value={mockThemeContext}>
      <Input onSearch={onSearch} />
    </ThemeContext.Provider>
  );
};

describe('Input Component', () => {
  test('updates input value on change', () => {
    renderWithProviders(vi.fn());

    const inputElement = screen.getByTestId('inputElement');
    fireEvent.change(inputElement, { target: { value: 'Rick' } });

    expect(inputElement).toHaveValue('Rick');
  });

  test.skip('applies correct theme styles for dark theme', () => {
    renderWithProviders(vi.fn(), true);

    const searchButton = screen.getByTestId('searchBtn');
    expect(searchButton).toHaveClass('bg-neutral-300');
  });

  test.skip('applies correct theme styles for light theme', () => {
    renderWithProviders(vi.fn());

    const searchButton = screen.getByTestId('searchBtn');
    expect(searchButton).toHaveClass('bg-[#ac3b61]');
  });

  test.skip('focuses input on mount', () => {
    renderWithProviders(vi.fn());

    const inputElement = screen.getByTestId('inputElement');
    expect(inputElement).toHaveFocus();
  });

  test.skip('renders ThemeBtn', () => {
    renderWithProviders(vi.fn());
    expect(screen.getByTestId('themeBtn')).toBeInTheDocument();
  });

  test.skip('initializes with search query from localStorage', () => {
    const useSearchQuerySpy = vi.spyOn(LocalStorageHook, 'useSearchQuery');
    useSearchQuerySpy.mockReturnValue(['Rick', vi.fn()]);

    renderWithProviders(vi.fn());

    const inputElement = screen.getByTestId('inputElement');
    expect(inputElement).toHaveValue('Rick');

    useSearchQuerySpy.mockRestore();
  });
});
