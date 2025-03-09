import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DownloadBtn from './downloadBtn';
import * as UseThemeHook from '../../../utils/context/useThemeHook';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { makeStore } from '../../../store/store';
import { Character } from '../../../utils/interface';
import { setFavourites } from '../../../utils/slices/favouritesSlice';

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

vi.mock('../../../utils/context/useThemeHook', () => ({
  ThemeContext: {
    Provider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  },
  useTheme: () => mockThemeContext,
}));

const mockCharacters: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    image: 'http://example.com/rick.png',
    status: 'Alive',
    gender: 'Male',
    species: 'Human',
    origin: { name: 'Earth (C-137)', url: 'http://example.com/earth' },
    location: { name: 'Citadel of Ricks', url: 'http://example.com/citadel' },
    episode: ['http://example.com/episode/1', 'http://example.com/episode/2'],
    type: '',
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
    origin: {
      name: 'Earth (Replacement Dimension)',
      url: 'http://example.com/earth2',
    },
    location: {
      name: 'Earth (Replacement Dimension)',
      url: 'http://example.com/earth2',
    },
    episode: ['http://example.com/episode/1'],
    type: '',
    url: '',
    created: '',
  },
];

const renderWithProviders = (
  component: React.ReactNode,
  initialState?: Character[]
) => {
  const store = makeStore();

  if (initialState) {
    store.dispatch(setFavourites(initialState));
  }

  return render(
    <Provider store={store}>
      <UseThemeHook.ThemeContext.Provider value={mockThemeContext}>
        {component}
      </UseThemeHook.ThemeContext.Provider>
    </Provider>
  );
};

describe('DownloadBtn Component', () => {
  beforeEach(() => {
    global.URL.createObjectURL = vi.fn().mockReturnValue('mocked-url');
    global.URL.revokeObjectURL = vi.fn();
    vi.clearAllMocks();
  });

  test.skip('renders without crashing', () => {
    renderWithProviders(<DownloadBtn />);
    expect(screen.getByTestId('download')).toBeInTheDocument();
  });

  test.skip('applies correct classes based on light theme', () => {
    renderWithProviders(<DownloadBtn />);
    const button = screen.getByTestId('download');
    expect(button).toHaveClass('bg-[#ac3b61]');
    expect(button).toHaveClass('text-white');
  });

  test.skip('applies correct classes based on dark theme', () => {
    const useThemeSpy = vi.spyOn(UseThemeHook, 'useTheme');
    useThemeSpy.mockReturnValue({ isDarkTheme: true, toggleTheme: vi.fn() });
    renderWithProviders(<DownloadBtn />);
    const button = screen.getByTestId('download');
    expect(button).toHaveClass('bg-neutral-300');
    expect(button).toHaveClass('text-black');
    useThemeSpy.mockRestore();
  });

  test.skip('creates download link with correct filename', () => {
    renderWithProviders(<DownloadBtn />, mockCharacters);
    const button = screen.getByTestId('download');
    expect(button).toHaveAttribute('download', '2_characters.csv');
  });

  test.skip('creates CSV content correctly and href attribute is set correctly', async () => {
    const createObjectURLMock = vi.fn().mockReturnValue('mocked-url');
    global.URL.createObjectURL = createObjectURLMock;

    renderWithProviders(<DownloadBtn />, mockCharacters);
    const button = screen.getByTestId('download');

    await waitFor(() => {
      expect(button).toHaveAttribute('href', 'mocked-url');
    });

    expect(createObjectURLMock).toHaveBeenCalledTimes(1);
    const blob: Blob = createObjectURLMock.mock.calls[0][0];
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('text/csv;charset=utf-8;');

    const reader = new FileReader();
    reader.onload = () => {
      const csvContent = reader.result as string;
      const expectedCSV = `"id","name","status","species","type","gender","origin","location","image","episode"\n"1","Rick Sanchez","Alive","Human","","Male","Earth (C-137)","Citadel of Ricks","http://example.com/rick.png","http://example.com/episode/1, http://example.com/episode/2"\n"2","Morty Smith","Alive","Human","","Male","Earth (Replacement Dimension)","Earth (Replacement Dimension)","http://example.com/morty.png","http://example.com/episode/1"\n`;
      expect(csvContent).toBe(expectedCSV);
    };

    reader.readAsText(blob);
    expect(button).toHaveAttribute('download', '2_characters.csv');
  });

  test.skip('prevents downloading if href is not set (empty favorites)', async () => {
    const createObjectURLMock = vi.fn().mockReturnValue('mocked-url');
    global.URL.createObjectURL = createObjectURLMock;
    renderWithProviders(<DownloadBtn />, []);
    expect(createObjectURLMock).not.toHaveBeenCalled();
  });
  test.skip('handles different data types in favorites', async () => {
    const mixedData: Character[] = [
      {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        gender: 'Male',
        species: '123',
        origin: { name: 'Earth (C-137)', url: 'http://example.com/earth' },
        location: {
          name: 'Citadel of Ricks',
          url: 'http://example.com/citadel',
        },
        episode: [
          'http://example.com/episode/1',
          'http://example.com/episode/2',
        ],
        type: '',
        url: '',
        created: '',
        image: '',
      },
    ];
    renderWithProviders(<DownloadBtn />, mixedData);
    const button = screen.getByTestId('download');
    expect(button).toHaveAttribute('download', '1_characters.csv');
  });
});
