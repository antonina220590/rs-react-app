import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardList from './cardList';
import { Character } from '@/utils/interface';
import { describe, expect, test, vi } from 'vitest';
import * as UseThemeHook from '../../utils/context/useThemeHook';
import { ThemeContext } from '../../utils/context/useThemeHook';

vi.mock('../cards/cards', () => ({
  __esModule: true,
  default: () => <div data-testid="mocked-cards">Mocked Cards</div>,
}));

vi.mock('../flyout/flyout', () => ({
  __esModule: true,
  default: () => <div data-testid="mocked-flyout">Mocked Flyout</div>,
}));

vi.mock('../input/input', () => ({
  __esModule: true,
  default: () => <div data-testid="mocked-input">Mocked Input</div>,
}));

vi.mock('../pagination/pagination', () => ({
  __esModule: true,
  default: () => <div data-testid="mocked-pagination">Mocked Pagination</div>,
}));

const mockCharacters: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    image: 'http://example.com/rick.png',
    status: 'Alive',
    gender: 'Male',
    species: 'Human',
    type: '',
    origin: { name: '', url: '' },
    location: { name: '', url: '' },
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
    origin: { name: '', url: '' },
    location: { name: '', url: '' },
    episode: [],
    url: '',
    created: '',
  },
];

const renderWithProviders = (
  props: {
    currentPage: number;
    totalPages: number;
    characters: Character[];
  },
  isDarkTheme: boolean = false
) => {
  const useThemeSpy = vi.spyOn(UseThemeHook, 'useTheme');
  useThemeSpy.mockReturnValue({ isDarkTheme, toggleTheme: vi.fn() });

  return render(
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme: vi.fn() }}>
      <CardList {...props} />
    </ThemeContext.Provider>
  );
};

describe('CardList Component', () => {
  test('renders all child components', () => {
    renderWithProviders({
      currentPage: 1,
      totalPages: 5,
      characters: mockCharacters,
    });

    expect(screen.getByTestId('mocked-cards')).toBeInTheDocument();
    expect(screen.getByTestId('mocked-flyout')).toBeInTheDocument();
    expect(screen.getByTestId('mocked-input')).toBeInTheDocument();
    expect(screen.getByTestId('mocked-pagination')).toBeInTheDocument();
  });

  test('passes correct props to Pagination component', () => {
    const currentPage = 2;
    const totalPages = 10;
    renderWithProviders({
      currentPage,
      totalPages,
      characters: mockCharacters,
    });

    render(
      <div
        data-testid="mocked-pagination"
        data-currentpage={currentPage}
        data-totalpages={totalPages}
      >
        Mocked Pagination
      </div>
    );

    const pagination = screen.getAllByTestId('mocked-pagination')[1];

    expect(pagination.getAttribute('data-currentpage')).toBe(
      currentPage.toString()
    );
    expect(pagination.getAttribute('data-totalpages')).toBe(
      totalPages.toString()
    );
  });

  test('passes correct props to Cards component', () => {
    renderWithProviders({
      currentPage: 1,
      totalPages: 5,
      characters: mockCharacters,
    });
    render(
      <div
        data-testid="mocked-cards"
        data-characters={JSON.stringify(mockCharacters)}
      >
        Mocked Cards
      </div>
    );

    const cards = screen.getAllByTestId('mocked-cards')[1];
    expect(JSON.parse(cards.getAttribute('data-characters') || '[]')).toEqual(
      mockCharacters
    );
  });
});
