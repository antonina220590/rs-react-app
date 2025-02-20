import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DetailsPage from './detailsPage';
import { renderWithProviders } from '../../utils/test-utils';
import { server } from '../../mocks/handlers/characterId';
import { vi } from 'vitest';
import * as UseThemeHook from '../../utils/context/useThemeHook';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('DetailsPage Component', () => {
  test('renders "Not Found" when character not found', async () => {
    renderWithProviders(<DetailsPage />, { route: '/character/9999' });
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    await waitFor(
      () => expect(screen.queryByTestId('spinner')).not.toBeInTheDocument(),
      { timeout: 2000 }
    );
  });
  test('renders character details successfully', async () => {
    renderWithProviders(<DetailsPage />, { route: `/character/1` });
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    await waitFor(
      () => expect(screen.queryByTestId('spinner')).not.toBeInTheDocument(),
      { timeout: 2000 }
    );

    expect(screen.getByTestId('characterName')).toBeInTheDocument();
    expect(screen.getByTestId('characterStatus')).toBeInTheDocument();
    expect(screen.getByTestId('characterSpecies')).toBeInTheDocument();
    expect(screen.getByTestId('characterGender')).toBeInTheDocument();
  });
  test('shows loading indicator while fetching', async () => {
    renderWithProviders(<DetailsPage />, { route: '/details/1' });
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    await waitFor(
      () => expect(screen.queryByTestId('spinner')).not.toBeInTheDocument(),
      { timeout: 2000 }
    );
  });
  test('applies correct theme styles for dark theme', async () => {
    const useThemeSpy = vi.spyOn(UseThemeHook, 'useTheme');
    useThemeSpy.mockReturnValue({ isDarkTheme: true, toggleTheme: vi.fn() });
    renderWithProviders(<DetailsPage />, { route: `/character/1` });
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    await waitFor(
      () => expect(screen.queryByTestId('spinner')).not.toBeInTheDocument(),
      { timeout: 2000 }
    );
    const name = screen.getByTestId('characterName');
    const button = screen.getByTestId('closeCardBtn');

    expect(name).toHaveClass('font-bold text-5xl p-15 text-white');
    expect(button).toHaveClass(
      'w-[150px] h-[50px] cursor-pointer rounded-md bg-neutral-300 text-black hover:bg-white text-3xl border-none'
    );

    useThemeSpy.mockRestore();
  });
  test('applies correct theme styles for light theme', async () => {
    const useThemeSpy = vi.spyOn(UseThemeHook, 'useTheme');
    useThemeSpy.mockReturnValue({ isDarkTheme: false, toggleTheme: vi.fn() });
    renderWithProviders(<DetailsPage />, { route: `/character/1` });
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    await waitFor(
      () => expect(screen.queryByTestId('spinner')).not.toBeInTheDocument(),
      { timeout: 2000 }
    );
    const name = screen.getByTestId('characterName');
    const button = screen.getByTestId('closeCardBtn');

    expect(name).toHaveClass('font-bold text-5xl p-15 text-black');
    expect(button).toHaveClass(
      'w-[150px] h-[50px] cursor-pointer rounded-md bg-[#ac3b61] text-white hover:bg-[#edc7b7] text-3xl border-none'
    );

    useThemeSpy.mockRestore();
  });
});
