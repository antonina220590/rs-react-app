import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes } from 'react-router';
import Cards from './cards';
import { Character } from '../../utils/interface';
import { describe, expect, test, vi } from 'vitest';
import { Route } from 'react-router';
import * as UseThemeHook from '../../utils/context/useThemeHook';
import { Provider } from 'react-redux';
import { RootState, setupStore } from '../../services/store';

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

const mockCharacters: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    image: 'http://example.com/rick.png',
    status: 'Alive',
    gender: 'Male',
    species: 'Human',
  },
  {
    id: 2,
    name: 'Morty Smith',
    image: 'http://example.com/morty.png',
    status: 'Alive',
    gender: 'Male',
    species: 'Human',
  },
];

describe('Cards Component', () => {
  test('renders character cards correctly', () => {
    renderWithProviders(<Cards characters={mockCharacters} />);

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(mockCharacters.length);
    expect(images[0]).toHaveAttribute('src', mockCharacters[0].image);
    expect(images[1]).toHaveAttribute('src', mockCharacters[1].image);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(mockCharacters.length);
    expect(links[0]).toHaveAttribute('href', '/character/1');
    expect(links[1]).toHaveAttribute('href', '/character/2');
  });

  test('applies correct theme styles for dark theme', () => {
    const useThemeSpy = vi.spyOn(UseThemeHook, 'useTheme');
    useThemeSpy.mockReturnValue({ isDarkTheme: true, toggleTheme: vi.fn() });
    renderWithProviders(<Cards characters={mockCharacters} />);

    const cards = screen.getAllByRole('link');
    cards.forEach((card) => {
      expect(card).toHaveClass(
        'flex flex-col items-center w-[300px] h-[450px] bg-[#474b4f] rounded-2xl justify-start'
      );
    });

    useThemeSpy.mockRestore();
  });

  test('applies correct theme styles for light theme', () => {
    const useThemeSpy = vi.spyOn(UseThemeHook, 'useTheme');
    useThemeSpy.mockReturnValue({ isDarkTheme: false, toggleTheme: vi.fn() });
    renderWithProviders(<Cards characters={mockCharacters} />);

    const cards = screen.getAllByRole('link');
    cards.forEach((card) => {
      expect(card).toHaveClass(
        'flex flex-col items-center w-[300px] h-[450px] bg-[#bab2b5] rounded-2xl justify-start'
      );
    });

    useThemeSpy.mockRestore();
  });
});
