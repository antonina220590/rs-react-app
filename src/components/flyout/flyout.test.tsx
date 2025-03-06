import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Character } from '../../utils/interface';
import { describe, expect, test, vi } from 'vitest';
import * as UseThemeHook from '../../utils/context/useThemeHook';
import { ThemeContext } from '../../utils/context/useThemeHook';
import { Provider } from 'react-redux';
import { makeStore } from '../../store/store';
import { addToFav } from '../../utils/slices/favouritesSlice';
import Flyout from './flyout';

global.URL.createObjectURL = vi.fn();

const mockThemeContext = {
  isDarkTheme: false,
  toggleTheme: vi.fn(),
};

const mockCharacters: Character[] = [
  {
    id: 1,
    name: 'Rick',
    status: '',
    gender: '',
    species: '',
    image: '',
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
    name: 'Morty',
    status: '',
    gender: '',
    species: '',
    image: '',
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
  mockCharacters.forEach((char) => {
    store.dispatch(addToFav(char));
  });
  return render(
    <Provider store={store}>
      <ThemeContext.Provider value={mockThemeContext}>
        {component}
      </ThemeContext.Provider>
    </Provider>
  );
};

describe('Flyout Component', () => {
  test('renders Flyout when favourites list is not empty', () => {
    renderWithProviders(<Flyout />);
    expect(screen.getByTestId('flyout')).toBeInTheDocument();
    expect(screen.getByText('2 items added to favourites')).toBeInTheDocument();
  });

  test('does not render Flyout when favourites list is empty', () => {
    const store = makeStore();
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={mockThemeContext}>
          <Flyout />
        </ThemeContext.Provider>
      </Provider>
    );
    expect(screen.queryByTestId('flyout')).toBeNull();
  });

  test('dispatches deleteFromFav for each item when "Unselect All" is clicked', () => {
    const store = makeStore();
    mockCharacters.forEach((char) => {
      store.dispatch(addToFav(char));
    });

    render(
      <Provider store={store}>
        <ThemeContext.Provider value={mockThemeContext}>
          <Flyout />
        </ThemeContext.Provider>
      </Provider>
    );

    const unselectAllButton = screen.getByTestId('unselectBtn');
    fireEvent.click(unselectAllButton);

    const updatedState = store.getState().favourites;
    expect(updatedState).toEqual([]);
  });

  test('applies correct theme styles for dark theme', () => {
    const useThemeSpy = vi.spyOn(UseThemeHook, 'useTheme');
    useThemeSpy.mockReturnValue({ isDarkTheme: true, toggleTheme: vi.fn() });

    renderWithProviders(<Flyout />);

    const unselectAllButton = screen.getByTestId('unselectBtn');
    expect(unselectAllButton).toHaveClass('bg-neutral-300');

    useThemeSpy.mockRestore();
  });

  test('applies correct theme styles for light theme', () => {
    const useThemeSpy = vi.spyOn(UseThemeHook, 'useTheme');
    useThemeSpy.mockReturnValue({ isDarkTheme: false, toggleTheme: vi.fn() });

    renderWithProviders(<Flyout />);

    const unselectAllButton = screen.getByTestId('unselectBtn');
    expect(unselectAllButton).toHaveClass('bg-[#ac3b61]');

    useThemeSpy.mockRestore();
  });

  test('renders DownloadBtn', () => {
    renderWithProviders(<Flyout />);
    expect(screen.getByTestId('download')).toBeInTheDocument();
  });
});
