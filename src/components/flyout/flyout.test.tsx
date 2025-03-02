import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Flyout from './flyout';
import { Character } from '../../utils/interface';
import { vi } from 'vitest';
import { renderWithProviders } from '../../utils/test-utils';

global.URL.createObjectURL = vi.fn();

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

describe('Flyout Component', () => {
  const mockCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    image: 'http://example.com/rick.png',
    status: 'Alive',
    gender: 'Male',
    species: 'Human',
  };

  test.skip('renders Flyout when favourites are present', () => {
    const preloadedState = {
      favourites: [mockCharacter],
    };

    renderWithProviders(<Flyout />, { preloadedState });

    expect(screen.getByText('1 items added to favourites')).toBeInTheDocument();
    expect(screen.getByText('Unselect All')).toBeInTheDocument();
  });

  test.skip('does not render Flyout when favourites are empty', () => {
    const preloadedState = {
      favourites: [],
    };

    renderWithProviders(<Flyout />, { preloadedState });

    expect(
      screen.queryByText('items added to favourites')
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Unselect All')).not.toBeInTheDocument();
  });

  test.skip('calls deleteFromFav for each character when "Unselect All" is clicked', () => {
    const preloadedState = {
      favourites: [mockCharacter],
    };

    const { store } = renderWithProviders(<Flyout />, { preloadedState });

    const unselectAllButton = screen.getByText('Unselect All');
    fireEvent.click(unselectAllButton);

    const dispatchedActions = store.getState().favourites;
    expect(dispatchedActions).toEqual([]);
  });
});
