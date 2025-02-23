import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SunIcon from './sunIcon';

describe('SunIcon Component', () => {
  test('renders without crashing', () => {
    render(<SunIcon />);
    const svgElement = screen.getByTestId('sunIcon');
    expect(svgElement).toBeInTheDocument();
  });

  test('applies custom props', () => {
    render(<SunIcon width={50} height={50} fill="orange" />);
    const svgElement = screen.getByTestId('sunIcon');

    expect(svgElement).toHaveAttribute('width', '50');
    expect(svgElement).toHaveAttribute('height', '50');
  });

  test('renders the correct viewBox', () => {
    render(<SunIcon />);
    const svgElement = screen.getByTestId('sunIcon');
    expect(svgElement).toHaveAttribute('viewBox', '0 0 24 24');
  });

  test('renders path with correct attributes', () => {
    render(<SunIcon />);
    const pathElement = screen.getByTestId('sunIcon').querySelector('path');

    expect(pathElement).toHaveAttribute('stroke', 'currentColor');
  });
});
