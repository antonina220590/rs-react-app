import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import Spinner from './spinners';

let mockThemeValue = { isDarkTheme: false };

vi.mock('../../utils/context/useThemeHook', () => ({
  useTheme: () => mockThemeValue,
}));

describe('Spinner Component', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders spinner with data-testid', () => {
    render(<Spinner />);
    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();
  });

  it('renders spinner with black text in light theme', () => {
    mockThemeValue = { isDarkTheme: false };
    render(<Spinner />);
    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toHaveClass('text-black');
  });

  it('renders spinner with white text in dark theme', () => {
    mockThemeValue = { isDarkTheme: true };
    render(<Spinner />);
    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toHaveClass('text-white');
  });

  it('applies default classes for animation and appearance', () => {
    render(<Spinner />);
    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toHaveClass('inline-block');
    expect(spinnerElement).toHaveClass('h-70');
    expect(spinnerElement).toHaveClass('w-70');
    expect(spinnerElement).toHaveClass('animate-spin');
    expect(spinnerElement).toHaveClass('rounded-full');
    expect(spinnerElement).toHaveClass('border-10');
    expect(spinnerElement).toHaveClass('border-solid');
    expect(spinnerElement).toHaveClass('border-current');
    expect(spinnerElement).toHaveClass('border-e-transparent');
    expect(spinnerElement).toHaveClass('align-[-0.125em]');
    expect(spinnerElement).toHaveClass('text-surface');
    expect(spinnerElement).toHaveClass(
      'motion-reduce:animate-[spin_1.5s_linear_infinite]'
    );
  });
});
