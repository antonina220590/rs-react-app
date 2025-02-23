import { fireEvent, screen, waitFor } from '@testing-library/react';
import SearchPage from './searchPage';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../../utils/test-utils';
import { server } from '../../mocks/handlers/characters';
import { http, HttpResponse } from 'msw';
import * as UseThemeHook from '../../utils/context/useThemeHook';
import { vi } from 'vitest';
import { Character } from '../../utils/interface';
import { setupStore } from '../../app/store';
import { addToFav } from '../../utils/slices/favouritesSlice';

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  image: 'http://example.com/rick.png',
  status: 'Alive',
  gender: 'Male',
  species: 'Human',
};
global.URL.createObjectURL = vi.fn();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('SearchPage Component', () => {
  test('renders characters on successful API call', async () => {
    renderWithProviders(<SearchPage />, { route: '/?page=1' });

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    });
  });

  test('renders no results message when no characters found', async () => {
    server.use(
      http.get('https://rickandmortyapi.com/api/character', () => {
        return HttpResponse.json({
          info: { count: 0, pages: 1, next: null, prev: null },
          results: [],
        });
      })
    );

    renderWithProviders(<SearchPage />, { route: '/?page=1' });
    await waitFor(() => {
      expect(
        screen.getByText('No results found for your search.')
      ).toBeInTheDocument();
    });
  });
  test('shows loading indicator while fetching', async () => {
    renderWithProviders(<SearchPage />, { route: '/?page=2' });
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    await waitFor(
      () => expect(screen.queryByTestId('spinner')).not.toBeInTheDocument(),
      { timeout: 500 }
    );
  });

  test('renders error message on API error', async () => {
    server.use(
      http.get('https://rickandmortyapi.com/api/character', () => {
        return HttpResponse.json(
          { error: 'Internal Server Error' },
          { status: 500 }
        );
      })
    );

    renderWithProviders(<SearchPage />, { route: '/?page=1' });
    await waitFor(() => {
      expect(screen.getByText(/Error: 500/)).toBeInTheDocument();
    });
  });

  test('filters characters based on search query', async () => {
    renderWithProviders(<SearchPage />, { route: '/?page=1&search=Rick' });
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    await waitFor(
      () => expect(screen.queryByTestId('spinner')).not.toBeInTheDocument(),
      { timeout: 500 }
    );
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  test('applies correct theme styles for dark theme', async () => {
    const useThemeSpy = vi.spyOn(UseThemeHook, 'useTheme');
    useThemeSpy.mockReturnValue({ isDarkTheme: true, toggleTheme: vi.fn() });
    renderWithProviders(<SearchPage />, { route: `/?page=1` });
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    await waitFor(
      () => expect(screen.queryByTestId('spinner')).not.toBeInTheDocument(),
      { timeout: 500 }
    );
    const name = screen.getByTestId('searchBtn');
    expect(name).toHaveClass(
      'bg-neutral-300 text-black p-3 rounded-[5px] cursor-pointer hover:bg-white'
    );
    useThemeSpy.mockRestore();
  });
  test('applies correct theme styles for dark theme', async () => {
    const useThemeSpy = vi.spyOn(UseThemeHook, 'useTheme');
    useThemeSpy.mockReturnValue({ isDarkTheme: false, toggleTheme: vi.fn() });
    renderWithProviders(<SearchPage />, { route: `/?page=1` });
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    await waitFor(
      () => expect(screen.queryByTestId('spinner')).not.toBeInTheDocument(),
      { timeout: 500 }
    );
    const name = screen.getByTestId('searchBtn');
    expect(name).toHaveClass(
      'bg-[#ac3b61] text-white p-3 rounded-[5px] cursor-pointer hover:bg-[#edc7b7]'
    );
    useThemeSpy.mockRestore();
  });
  test('the checkbox to be on the page', async () => {
    renderWithProviders(<SearchPage />, { route: '/?page=1' });
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    await waitFor(
      () => expect(screen.queryByTestId('spinner')).not.toBeInTheDocument(),
      { timeout: 500 }
    );
    const checkBox = screen.getByTestId(`heart-label-${mockCharacter.id}`);
    expect(checkBox).toBeInTheDocument();
  });
  test('the checkbox to be on the page', async () => {
    renderWithProviders(<SearchPage />, { route: '/?page=1' });
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    await waitFor(
      () => expect(screen.queryByTestId('spinner')).not.toBeInTheDocument(),
      { timeout: 500 }
    );
    const checkBox = screen.getByTestId(`heart-label-${mockCharacter.id}`);
    expect(checkBox).toBeInTheDocument();
    fireEvent.click(checkBox);
  });
  test('renders flyout when favourites are present', async () => {
    renderWithProviders(<SearchPage />, { route: '/?page=1' });
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    await waitFor(
      () => expect(screen.queryByTestId('spinner')).not.toBeInTheDocument(),
      { timeout: 500 }
    );
    const checkBox = screen.getByTestId(`heart-label-${mockCharacter.id}`);
    expect(checkBox).toBeInTheDocument();
    fireEvent.click(checkBox);
    const store = setupStore();
    store.dispatch(addToFav(mockCharacter));
    expect(screen.getByTestId('flyout')).toBeInTheDocument();
  });
});
