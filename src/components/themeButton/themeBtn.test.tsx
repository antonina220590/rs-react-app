import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThemeBtn from './themeBtn';
import * as UseThemeHook from '../../utils/context/useThemeHook';
import { vi } from 'vitest';
import { RootState, makeStore } from '../../services/store';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router';
import { ThemeContext } from '../../utils/context/useThemeHook';
import { ThemeProvider } from '../../utils/context/themeContext';

const mockToggleTheme = vi.fn();

const renderThemeBtn = (isDarkTheme: boolean) => {
  const mockThemeValue = {
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
