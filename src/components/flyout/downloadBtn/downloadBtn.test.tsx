import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DownloadBtn from './downloadBtn';
import * as UseThemeHook from '../../../utils/context/useThemeHook';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { RootState, makeStore } from '../../../services/store';
import { MemoryRouter, Route, Routes } from 'react-router';
import { Character } from '../../../utils/interface';

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
  const store = makeStore();

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

describe('DownloadBtn Component', () => {
  beforeAll(() => {
    global.URL.createObjectURL = vi.fn().mockReturnValue('mocked-url');
    global.URL.revokeObjectURL = vi.fn();
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test.skip('renders without crashing', () => {
    renderWithProviders(<DownloadBtn />, { favourites: mockCharacters });
    expect(screen.getByTestId('download')).toBeInTheDocument();
  });

  test.skip('applies correct classes based on light theme', () => {
    const useThemeSpy = vi.spyOn(UseThemeHook, 'useTheme');
    useThemeSpy.mockReturnValue({ isDarkTheme: false, toggleTheme: vi.fn() });
    renderWithProviders(<DownloadBtn />);
    const button = screen.getByTestId('download');

    expect(button).toHaveClass('bg-[#ac3b61]');
  });

  test.skip('applies correct classes based on dark theme', () => {
    const useThemeSpy = vi.spyOn(UseThemeHook, 'useTheme');
    useThemeSpy.mockReturnValue({ isDarkTheme: true, toggleTheme: vi.fn() });
    renderWithProviders(<DownloadBtn />);
    const button = screen.getByTestId('download');

    expect(button).toHaveClass('bg-neutral-300');
  });

  test.skip('creates download link with correct filename', () => {
    renderWithProviders(<DownloadBtn />, { favourites: mockCharacters });
    const button = screen.getByTestId('download');

    expect(button).toHaveAttribute('download', '2_characters.csv');
  });

  test.skip('creates CSV content correctly and href attribute is set correctly', async () => {
    renderWithProviders(<DownloadBtn />, { favourites: mockCharacters });

    const button = screen.getByTestId('download');

    await waitFor(() => {
      expect(button).toHaveAttribute('href', 'mocked-url');
    });

    expect(button).toHaveAttribute('download', '2_characters.csv');
  });

  test.skip('prevents downloading if href is not set', async () => {
    renderWithProviders(<DownloadBtn />, {
      favourites: [],
    });

    const button = screen.getByTestId('download');
    expect(button).toHaveAttribute('href', undefined);

    fireEvent.click(button);
    expect(button).toHaveAttribute('href', undefined);
  });
});
