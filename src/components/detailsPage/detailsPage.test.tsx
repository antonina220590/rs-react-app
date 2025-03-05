import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DetailsPage from './detailsPage';
import { DetailsPageProps, Character } from '../../utils/interface';
import { describe, expect, test, vi } from 'vitest';
import { ThemeContext } from '../../utils/context/useThemeHook';
import * as UseThemeHook from '../../utils/context/useThemeHook';

const mockThemeContext = {
  isDarkTheme: false,
  toggleTheme: vi.fn(),
};

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  image: 'http://example.com/rick.png',
  status: 'Alive',
  gender: 'Male',
  species: 'Human',
  type: '',
  origin: { name: 'Earth', url: 'earth-url' },
  location: { name: 'Earth', url: 'earth-url' },
  episode: ['episode1', 'episode2'],
  url: 'character-url',
  created: '2017',
};

const renderWithProviders = (
  props: Partial<DetailsPageProps>,
  isDarkTheme: boolean = false
) => {
  const useThemeSpy = vi.spyOn(UseThemeHook, 'useTheme');
  useThemeSpy.mockReturnValue({ isDarkTheme, toggleTheme: vi.fn() });

  return render(
    <ThemeContext.Provider value={mockThemeContext}>
      <DetailsPage
        {...{
          closeCard: vi.fn(),
          fetching: false,
          character: mockCharacter,
          error: undefined,
          loading: false,
        }}
        {...props}
      />
    </ThemeContext.Provider>
  );
};

describe('DetailsPage Component', () => {
  test('renders character details correctly', () => {
    renderWithProviders({});

    const image = screen.getByRole('img');

    expect(image).toBeInTheDocument();
    expect(screen.getByTestId('characterName')).toHaveTextContent(
      'Rick Sanchez'
    );
    expect(screen.getByTestId('characterStatus')).toHaveTextContent('Alive');
    expect(screen.getByTestId('characterSpecies')).toHaveTextContent('Human');
    expect(screen.getByTestId('characterGender')).toHaveTextContent('Male');
  });

  test('renders spinner when fetching', () => {
    renderWithProviders({
      fetching: true,
      character: undefined,
      error: undefined,
    });
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('applies correct theme styles for dark theme', () => {
    renderWithProviders(
      { fetching: false, character: mockCharacter, error: undefined },
      true
    );

    const nameElement = screen.getByTestId('characterName');
    expect(nameElement).toHaveClass('text-white');
  });

  test('applies correct theme styles for light theme', () => {
    renderWithProviders(
      { fetching: false, character: mockCharacter, error: undefined },
      false
    );
    const nameElement = screen.getByTestId('characterName');
    expect(nameElement).toHaveClass('text-black');
  });

  test('calls closeCard when Close button is clicked', () => {
    const closeCardMock = vi.fn();
    renderWithProviders({
      closeCard: closeCardMock,
      fetching: false,
      error: undefined,
    });

    const closeButton = screen.getByTestId('closeCardBtn');
    fireEvent.click(closeButton);
    expect(closeCardMock).toHaveBeenCalledTimes(1);
  });
});
