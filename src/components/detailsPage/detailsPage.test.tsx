import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DetailsPage from './detailsPage';
import { DetailsPageProps } from '../../utils/interface';
import { describe, expect, test, vi } from 'vitest';
import * as UseThemeHook from '../../utils/context/useThemeHook';
import { ThemeContext } from '../../utils/context/useThemeHook';

const mockThemeContext = {
  isDarkTheme: false,
  toggleTheme: vi.fn(),
};

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  image: 'http://example.com/rick.png',
  status: 'Alive',
  gender: 'Male',
  species: 'Human',
};

const renderWithProviders = (
  props: DetailsPageProps,
  isDarkTheme: boolean = false
) => {
  const useThemeSpy = vi.spyOn(UseThemeHook, 'useTheme');
  useThemeSpy.mockReturnValue({ isDarkTheme, toggleTheme: vi.fn() });

  return render(
    <ThemeContext.Provider value={mockThemeContext}>
      <DetailsPage {...props} />
    </ThemeContext.Provider>
  );
};

describe.skip('DetailsPage Component', () => {
  test('renders character details correctly', () => {
    renderWithProviders(
      {
        character: mockCharacter,
        closeCard: vi.fn(),
        fetching: false,
        error: false,
      },
      false
    );

    const image = screen.getByRole('img');
    expect(image.getAttribute('src')).toMatch(
      /^\/_next\/image\?url=http%3A%2F%2Fexample.com%2Frick.png/
    );

    expect(screen.getByTestId('characterName')).toHaveTextContent(
      'Rick Sanchez'
    );
    expect(screen.getByTestId('characterStatus')).toHaveTextContent('Alive');
    expect(screen.getByTestId('characterSpecies')).toHaveTextContent('Human');
    expect(screen.getByTestId('characterGender')).toHaveTextContent('Male');
  });

  test.skip('renders spinner when fetching', () => {
    renderWithProviders({
      character: mockCharacter,
      closeCard: vi.fn(),
      fetching: true,
      error: false,
    });

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test.skip('renders Custom404 when error is true', () => {
    renderWithProviders({
      character: mockCharacter,
      closeCard: vi.fn(),
      fetching: false,
      error: true,
    });

    expect(
      screen.getByText('Oooop! Something went wrong!')
    ).toBeInTheDocument();
  });

  test.skip('applies correct theme styles for dark theme', () => {
    renderWithProviders(
      {
        character: mockCharacter,
        closeCard: vi.fn(),
        fetching: false,
        error: false,
      },
      true
    );

    const nameElement = screen.getByTestId('characterName');
    expect(nameElement).toHaveClass('text-white');
  });

  test.skip('applies correct theme styles for light theme', () => {
    renderWithProviders({
      character: mockCharacter,
      closeCard: vi.fn(),
      fetching: false,
      error: false,
    });

    const nameElement = screen.getByTestId('characterName');
    expect(nameElement).toHaveClass('text-black');
  });

  test.skip('calls closeCard when Close button is clicked', () => {
    const closeCardMock = vi.fn();
    renderWithProviders({
      character: mockCharacter,
      closeCard: closeCardMock,
      fetching: false,
      error: false,
    });

    const closeButton = screen.getByTestId('closeCardBtn');
    fireEvent.click(closeButton);
    expect(closeCardMock).toHaveBeenCalledTimes(1);
  });
});
