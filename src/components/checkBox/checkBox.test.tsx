import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Character } from '../../utils/interface';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { setupStore } from '../../app/store';
import Heart from './checkBox';

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  image: 'http://example.com/rick.png',
  status: 'Alive',
  gender: 'Male',
  species: 'Human',
};

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

describe('Checkbox Component', () => {
  afterEach(cleanup);

  const renderWithProviders = (component: React.ReactNode) => {
    const store = setupStore();

    return render(<Provider store={store}>{component}</Provider>);
  };

  test('renders heart as unchecked initially', () => {
    renderWithProviders(<Heart character={mockCharacter} />);
    const heartLabel = screen.getByTestId(`heart-label-${mockCharacter.id}`);
    expect(heartLabel).toHaveClass('text-[#eee2dc]');
    expect(heartLabel).not.toHaveClass('text-[#ac3b61]');
  });

  test('initial state of favourites is empty', () => {
    const store = setupStore();
    const state = store.getState();
    expect(state.favourites).toEqual([]);
  });
});
