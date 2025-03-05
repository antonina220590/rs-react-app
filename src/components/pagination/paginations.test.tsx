import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from './pagination';
import { describe, expect, test, vi } from 'vitest';
import * as UseThemeHook from '../../utils/context/useThemeHook';
import { ThemeContext } from '../../utils/context/useThemeHook';

const mockThemeContext = {
  isDarkTheme: false,
  toggleTheme: vi.fn(),
};

const renderWithProviders = (
  props: {
    currentPage: number;
    totalPages: number;
    changePage: (page: number) => void;
  },
  isDarkTheme: boolean = false
) => {
  const useThemeSpy = vi.spyOn(UseThemeHook, 'useTheme');
  useThemeSpy.mockReturnValue({ isDarkTheme, toggleTheme: vi.fn() });

  return render(
    <ThemeContext.Provider value={mockThemeContext}>
      <Pagination {...props} />
    </ThemeContext.Provider>
  );
};

describe('Pagination Component', () => {
  test.skip('renders pagination controls correctly', () => {
    renderWithProviders({
      currentPage: 2,
      totalPages: 5,
      changePage: vi.fn(),
    });

    expect(screen.getByTestId('prevBtn')).toBeInTheDocument();
    expect(screen.getByTestId('pageNum')).toHaveValue('2');
    expect(screen.getByTestId('nextBtn')).toBeInTheDocument();
  });

  test.skip('disables Prev button on first page', () => {
    renderWithProviders({
      currentPage: 1,
      totalPages: 5,
      changePage: vi.fn(),
    });

    expect(screen.getByTestId('prevBtn')).toBeDisabled();
  });

  test.skip('disables Next button on last page', () => {
    renderWithProviders({
      currentPage: 5,
      totalPages: 5,
      changePage: vi.fn(),
    });

    expect(screen.getByTestId('nextBtn')).toBeDisabled();
  });

  test.skip('calls changePage with correct page on Prev click', () => {
    const changePageMock = vi.fn();
    renderWithProviders({
      currentPage: 3,
      totalPages: 5,
      changePage: changePageMock,
    });

    const prevButton = screen.getByTestId('prevBtn');
    fireEvent.click(prevButton);

    expect(changePageMock).toHaveBeenCalledWith(2);
  });

  test.skip('calls changePage with correct page on Next click', () => {
    const changePageMock = vi.fn();
    renderWithProviders({
      currentPage: 3,
      totalPages: 5,
      changePage: changePageMock,
    });

    const nextButton = screen.getByTestId('nextBtn');
    fireEvent.click(nextButton);

    expect(changePageMock).toHaveBeenCalledWith(4);
  });

  test.skip('applies correct theme styles for dark theme', () => {
    renderWithProviders(
      {
        currentPage: 2,
        totalPages: 5,
        changePage: vi.fn(),
      },
      true
    );

    const prevButton = screen.getByTestId('prevBtn');
    expect(prevButton).toHaveClass('bg-neutral-300');
  });

  test.skip('applies correct theme styles for light theme', () => {
    renderWithProviders({
      currentPage: 2,
      totalPages: 5,
      changePage: vi.fn(),
    });

    const prevButton = screen.getByTestId('prevBtn');
    expect(prevButton).toHaveClass('bg-[#ac3b61]');
  });
});
