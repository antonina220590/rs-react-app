import { render, screen, fireEvent } from '@testing-library/react';
import Input from './input';
import '@testing-library/jest-dom';
import { useTheme } from '../../utils/context/useThemeHook';
import { useRouter } from 'next/router';
import { vi, Mock } from 'vitest';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('../../utils/context/useThemeHook', () => ({
  useTheme: vi.fn(),
}));

const mockPush = vi.fn();

const setup = (initialSearchQuery = '', isDarkTheme = false) => {
  (useTheme as Mock).mockReturnValue({ isDarkTheme });
  (useRouter as Mock).mockReturnValue({
    query: {},
    push: mockPush,
    pathname: '/',
  });

  return render(<Input initialSearchQuery={initialSearchQuery} />);
};

describe('Input Component', () => {
  beforeEach(() => {
    mockPush.mockClear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });
  it('renders the input field with the correct placeholder', () => {
    setup();
    expect(screen.getByPlaceholderText('search.....')).toBeInTheDocument();
  });

  it('sets initial search query correctly', () => {
    const initialQuery = 'Rick';
    setup(initialQuery);
    const inputElement = screen.getByPlaceholderText(
      'search.....'
    ) as HTMLInputElement;
    expect(inputElement.value).toBe(initialQuery);
  });

  it('calls router.push with correct query on button click after debounce', async () => {
    setup();
    const inputElement = screen.getByPlaceholderText(
      'search.....'
    ) as HTMLInputElement;
    const searchButton = screen.getByTestId('searchBtn');

    fireEvent.change(inputElement, { target: { value: 'Morty' } });
    fireEvent.click(searchButton);

    vi.advanceTimersByTime(510);
    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/',
      query: { search: 'Morty', page: '1' },
    });
  }, 10000);

  it('calls router.push with correct query (empty search) on button click after debounce', async () => {
    setup();
    const inputElement = screen.getByPlaceholderText(
      'search.....'
    ) as HTMLInputElement;
    const searchButton = screen.getByTestId('searchBtn');

    fireEvent.change(inputElement, { target: { value: '' } });
    fireEvent.click(searchButton);

    vi.advanceTimersByTime(510);

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/',
      query: { page: '1' },
    });
  });

  it('handles multiple searches with debounce', async () => {
    setup();
    const input = screen.getByPlaceholderText(
      'search.....'
    ) as HTMLInputElement;
    const searchBtn = screen.getByTestId('searchBtn');
    fireEvent.change(input, { target: { value: 'Rick' } });
    fireEvent.click(searchBtn);
    vi.advanceTimersByTime(250);
    fireEvent.change(input, { target: { value: 'Morty' } });
    fireEvent.click(searchBtn);
    vi.advanceTimersByTime(250);
    fireEvent.change(input, { target: { value: 'Summer' } });
    fireEvent.click(searchBtn);
    vi.advanceTimersByTime(600);
    expect(mockPush).toHaveBeenCalledTimes(1);
  });

  it('should focus the input on mount', () => {
    setup();
    const inputElement = screen.getByPlaceholderText('search.....');
    expect(inputElement).toHaveFocus();
  });

  it('applies dark theme styles correctly', () => {
    setup('', true);
    const inputElement = screen.getByPlaceholderText('search.....');
    const searchButton = screen.getByTestId('searchBtn');

    expect(inputElement).toHaveClass('bg-white text-black');
    expect(searchButton).toHaveClass(
      'bg-neutral-300 text-black hover:bg-white'
    );
  });

  it('applies light theme styles correctly', () => {
    setup('', false);
    const inputElement = screen.getByPlaceholderText('search.....');
    const searchButton = screen.getByTestId('searchBtn');

    expect(inputElement).toHaveClass('bg-white');
    expect(searchButton).toHaveClass(
      'bg-[#ac3b61] text-white hover:bg-[#edc7b7]'
    );
  });
  test('renders ThemeBtn', () => {
    setup();
    expect(screen.getByTestId('themeBtn')).toBeInTheDocument();
  });
});
