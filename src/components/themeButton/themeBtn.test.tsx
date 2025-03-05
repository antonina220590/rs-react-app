import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThemeBtn from './themeBtn';
import { vi } from 'vitest';
import { ThemeProvider } from '../../utils/context/themeContext';

const mockToggleTheme = vi.fn();

const renderThemeBtn = (isDarkTheme: boolean) => {
  const _mockThemeValue = {
    isDarkTheme,
    toggleTheme: mockToggleTheme,
  };

  return render(
    <ThemeProvider>
      <ThemeBtn />
    </ThemeProvider>
  );
};

describe('ThemeBtn Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('displays Moon icon when in light theme', () => {
    renderThemeBtn(false);

    const button = screen.getByTestId('themeBtn');
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId('moon')).toBeInTheDocument();
  });
});
