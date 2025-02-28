import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThemeBtn from './themeBtn';
import * as UseThemeHook from '../../utils/context/useThemeHook';
import { vi } from 'vitest';
import { RootState, setupStore } from '../../services/store';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router';

const mockThemeContext = {
  isDarkTheme: false,
  toggleTheme: vi.fn(),
};

vi.mock('../../utils/context/useThemeHook', () => ({
  ThemeContext: {
    Provider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  },
  useTheme: () => mockThemeContext,
}));

const renderWithProviders = (
  component: React.ReactNode,
  preloadedState?: Partial<RootState>
) => {
  const store = setupStore(preloadedState);

  return render(
    <Provider store={store}>
      <UseThemeHook.ThemeContext.Provider value={mockThemeContext}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={component} />
          </Routes>
        </MemoryRouter>
      </UseThemeHook.ThemeContext.Provider>
    </Provider>
  );
};

describe('ThemeBtn Component', () => {
  test('renders with MoonIcon when theme is light', () => {
    const useThemeSpy = vi.spyOn(UseThemeHook, 'useTheme');
    useThemeSpy.mockReturnValue({ isDarkTheme: false, toggleTheme: vi.fn() });
    renderWithProviders(<ThemeBtn />);
    expect(screen.getByTestId('moon')).toBeInTheDocument();
  });

  test('renders with SunIcon when theme is dark', () => {
    const useThemeSpy = vi.spyOn(UseThemeHook, 'useTheme');
    useThemeSpy.mockReturnValue({ isDarkTheme: true, toggleTheme: vi.fn() });

    renderWithProviders(<ThemeBtn />);
    expect(screen.getByTestId('sunIcon')).toBeInTheDocument();
  });

  test('calls toggleTheme on button click', () => {
    const mockToggleTheme = vi.fn();
    const useThemeSpy = vi.spyOn(UseThemeHook, 'useTheme');
    useThemeSpy.mockReturnValue({
      isDarkTheme: false,
      toggleTheme: mockToggleTheme,
    });

    renderWithProviders(<ThemeBtn />);
    const button = screen.getByTestId('themeBtn');
    fireEvent.click(button);
    expect(mockToggleTheme).toHaveBeenCalled();
  });

  test('applies correct classes based on light theme', () => {
    const mockToggleTheme = vi.fn();
    const useThemeSpy = vi.spyOn(UseThemeHook, 'useTheme');
    useThemeSpy.mockReturnValue({
      isDarkTheme: false,
      toggleTheme: mockToggleTheme,
    });

    renderWithProviders(<ThemeBtn />);
    const button = screen.getByTestId('themeBtn');

    expect(button).toHaveClass(
      'bg-[#ac3b61] text-white p-3 rounded-[5px] cursor-pointer hover:bg-[#edc7b7]'
    );
  });

  test('applies correct classes based on dark theme', () => {
    const mockToggleTheme = vi.fn();
    const useThemeSpy = vi.spyOn(UseThemeHook, 'useTheme');
    useThemeSpy.mockReturnValue({
      isDarkTheme: true,
      toggleTheme: mockToggleTheme,
    });

    renderWithProviders(<ThemeBtn />);
    const button = screen.getByTestId('themeBtn');

    expect(button).toHaveClass(
      'bg-neutral-300 text-black p-3 rounded-[5px] cursor-pointer hover:bg-white'
    );
  });
});
