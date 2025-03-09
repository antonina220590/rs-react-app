import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Character } from '../../utils/interface';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { AppStore, makeStore } from '../../store/store';
import Heart from './checkBox';

const mockCharacter: Character = {
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
  let store: AppStore;

  beforeEach(() => {
    store = makeStore();
  });

  afterEach(() => {
    cleanup();
  });

  const renderWithProviders = (component: React.ReactNode) => {
    return render(<Provider store={store}>{component}</Provider>);
  };

  test.skip('renders heart as unchecked initially', () => {
    renderWithProviders(<Heart character={mockCharacter} />);
    const heartLabel = screen.getByTestId(`heart-label-${mockCharacter.id}`);
    expect(heartLabel).toHaveClass('text-[#eee2dc]');
    expect(heartLabel).not.toHaveClass('text-[#ac3b61]');
  });

  test('initial state of favourites is empty', () => {
    const store = makeStore();
    const state = store.getState();
    expect(state.favourites).toEqual([]);
  });

  test('adds character to favourites on click', () => {
    renderWithProviders(<Heart character={mockCharacter} />);
    const heartLabel = screen.getByTestId(`heart-label-${mockCharacter.id}`);

    fireEvent.click(heartLabel);

    const state = store.getState();
    expect(state.favourites).toContainEqual(mockCharacter);
    expect(heartLabel).toHaveClass('text-[#ac3b61]');
  });

  test('removes character from favourites on second click', () => {
    renderWithProviders(<Heart character={mockCharacter} />);
    const heartLabel = screen.getByTestId(`heart-label-${mockCharacter.id}`);

    fireEvent.click(heartLabel);
    fireEvent.click(heartLabel);

    const state = store.getState();
    expect(state.favourites).not.toContainEqual(mockCharacter);
    expect(heartLabel).not.toHaveClass('text-[#ac3b61]');
  });

  test('stops propagation of click event', () => {
    const onClickMock = vi.fn();
    const stopPropagationSpy = vi.spyOn(Event.prototype, 'stopPropagation');

    render(
      <div onClick={onClickMock}>
        <Provider store={store}>
          <Heart character={mockCharacter} />
        </Provider>
      </div>
    );

    const heartLabel = screen.getByTestId(`heart-label-${mockCharacter.id}`);
    fireEvent.click(heartLabel);
    expect(stopPropagationSpy).toHaveBeenCalled();
    expect(onClickMock).not.toHaveBeenCalled();

    stopPropagationSpy.mockRestore();
  });
});
