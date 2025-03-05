import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cards from './cards';
import { Character } from '../../utils/interface';
import { describe, expect, test, vi } from 'vitest';
import * as UseThemeHook from '../../utils/context/useThemeHook';
import { ThemeContext } from '../../utils/context/useThemeHook';
import { Provider } from 'react-redux';
import { makeStore } from '../../services/store';

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    query: {},
    isReady: true,
  }),
}));

const mockThemeContext = {
  isDarkTheme: false,
  toggleTheme: vi.fn(),
};

const mockCharacters: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    image: 'http://example.com/rick.png',
    status: 'Alive',
    gender: 'Male',
    species: 'Human',
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
    name: 'Morty Smith',
    image: 'http://example.com/morty.png',
    status: 'Alive',
    gender: 'Male',
    species: 'Human',
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

const renderWithProviders = (
  component: React.ReactNode,
  _onCardClickMock: (id: number) => void
) => {
  const store = makeStore();
  return render(
    <Provider store={store}>
      <ThemeContext.Provider value={mockThemeContext}>
        {component}
      </ThemeContext.Provider>
    </Provider>
  );
};

describe('Cards Component', () => {
  test('renders character cards correctly', () => {
    const onCardClickMock: (id: number) => void = vi.fn();
    renderWithProviders(
      <Cards characters={mockCharacters} onCardClick={onCardClickMock} />,
      onCardClickMock
    );

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(mockCharacters.length);

    expect(images[0].getAttribute('src')).toMatch(
      /^\/_next\/image\?url=http%3A%2F%2Fexample.com%2Frick.png/
    );
    expect(images[1].getAttribute('src')).toMatch(
      /^\/_next\/image\?url=http%3A%2F%2Fexample.com%2Fmorty.png/
    );

    expect(screen.getByTestId('character-image-1')).toBeInTheDocument();
    expect(screen.getByTestId('character-image-2')).toBeInTheDocument();
    const card = screen.getByText(/Rick Sanchez/i);
    fireEvent.click(card);
    expect(onCardClickMock).toHaveBeenCalledWith(1);
  });

  test('applies correct theme styles for dark theme', () => {
    const onCardClickMock = vi.fn();
    const useThemeSpy = vi.spyOn(UseThemeHook, 'useTheme');
    useThemeSpy.mockReturnValue({ isDarkTheme: true, toggleTheme: vi.fn() });
    renderWithProviders(
      <Cards characters={mockCharacters} onCardClick={onCardClickMock} />,
      onCardClickMock
    );

    const card = screen.getByText(/Rick Sanchez/i);
    expect(card).toHaveClass('font-bold text-4xl p-10 text-white');

    useThemeSpy.mockRestore();
  });

  test('applies correct theme styles for light theme', () => {
    const onCardClickMock = vi.fn();
    const useThemeSpy = vi.spyOn(UseThemeHook, 'useTheme');
    useThemeSpy.mockReturnValue({ isDarkTheme: false, toggleTheme: vi.fn() });
    renderWithProviders(
      <Cards characters={mockCharacters} onCardClick={onCardClickMock} />,
      onCardClickMock
    );

    const card = screen.getByText(/Rick Sanchez/i);
    expect(card).toHaveClass('font-bold text-4xl p-10 text-black');

    useThemeSpy.mockRestore();
  });

  test('calls onCardClick when a card is clicked', () => {
    const onCardClickMock = vi.fn();
    renderWithProviders(
      <Cards characters={mockCharacters} onCardClick={onCardClickMock} />,
      onCardClickMock
    );

    const card = screen.getByText(/Rick Sanchez/i);
    fireEvent.click(card);

    expect(onCardClickMock).toHaveBeenCalledWith(1);
  });
});
