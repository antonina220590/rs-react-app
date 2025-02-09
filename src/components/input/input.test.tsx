import Input from './input';
import '@testing-library/jest-dom';
import { describe, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

const setItemMock = vi.fn();
const getItemMock = vi.fn();
const clearMock = vi.fn();

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: setItemMock,
    getItem: getItemMock,
    clear: clearMock,
  },
});

describe('Input', () => {
  it('should render component', () => {
    render(<Input onSearch={vi.fn()} />);

    const inputElement = screen.getByTestId('inputElement');
    const searchButton = screen.getByTestId('searchBtn');

    expect(searchButton).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
  });

  it('updates searchState on input change', () => {
    const mockOnSearch = vi.fn();
    render(<Input onSearch={mockOnSearch} />);

    const inputElement = screen.getByTestId('inputElement');
    const searchButton = screen.getByTestId('searchBtn');

    fireEvent.change(inputElement, { target: { value: 'Rick' } });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('Rick');
  });

  it('trims whitespace input', () => {
    const mockOnSearch = vi.fn();
    render(<Input onSearch={mockOnSearch} />);

    const inputElement = screen.getByTestId('inputElement');
    const searchButton = screen.getByTestId('searchBtn');

    fireEvent.change(inputElement, { target: { value: '   ' } });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('');
  });

  it('saves value to local staroge on click', () => {
    const mockOnSearch = vi.fn();
    render(<Input onSearch={mockOnSearch} />);

    const inputElement = screen.getByTestId('inputElement');
    const searchButton = screen.getByTestId('searchBtn');

    fireEvent.change(inputElement, { target: { value: 'Rick' } });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('Rick');
    expect(setItemMock).toHaveBeenCalledWith('searchQuery', 'Rick');
  });
});
