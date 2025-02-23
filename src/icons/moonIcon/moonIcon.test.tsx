import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MoonIcon from './moonIcon';

describe('MoonIcon Component', () => {
  test('renders without crashing', () => {
    render(<MoonIcon />);
    const svgElement = screen.getByTestId('moon');
    expect(svgElement).toBeInTheDocument();
  });

  test('applies custom props', () => {
    render(<MoonIcon width={50} height={50} fill="red" />);
    const svgElement = screen.getByTestId('moon');

    expect(svgElement).toHaveAttribute('width', '50');
    expect(svgElement).toHaveAttribute('height', '50');
  });

  test('renders the correct viewBox', () => {
    render(<MoonIcon />);
    const svgElement = screen.getByTestId('moon');
    expect(svgElement).toHaveAttribute('viewBox', '0 0 26 26');
  });

  test('renders path with correct attributes', () => {
    render(<MoonIcon />);
    const pathElement = screen.getByTestId('moon').querySelector('path');

    expect(pathElement).toHaveAttribute('stroke', 'currentColor');
  });
});
