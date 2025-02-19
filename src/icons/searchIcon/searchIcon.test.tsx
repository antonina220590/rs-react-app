import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchIcon from './searchIcon';

describe('SearchIcon Component', () => {
  test('renders without crashing', () => {
    render(<SearchIcon />);
    const svgElement = screen.getByTestId('searchIcon');
    expect(svgElement).toBeInTheDocument();
  });

  test('applies custom props', () => {
    render(<SearchIcon width={50} height={50} fill="red" />);
    const svgElement = screen.getByTestId('searchIcon');

    expect(svgElement).toHaveAttribute('width', '50');
    expect(svgElement).toHaveAttribute('height', '50');
  });

  test('renders the correct viewBox', () => {
    render(<SearchIcon />);
    const svgElement = screen.getByTestId('searchIcon');
    expect(svgElement).toHaveAttribute('viewBox', '0 -0.5 25 25');
  });

  test('renders path with correct attributes', () => {
    render(<SearchIcon />);
    const paths = screen.getByTestId('searchIcon').querySelectorAll('path');

    expect(paths[0]).toHaveAttribute('stroke', 'currentColor');
    expect(paths[1]).toHaveAttribute('stroke', 'currentColor');
  });
});
