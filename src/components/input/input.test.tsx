import Input from './input';
import '@testing-library/jest-dom';
import { describe, expect, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test-utils';

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
  it.skip('should render component', () => {
    renderWithProviders(<Input onSearch={vi.fn()} />);

    const inputElement = screen.getByTestId('inputElement');
    const searchButton = screen.getByTestId('searchBtn');

    expect(searchButton).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
  });

  test.skip('updates searchState on input change', () => {
    const mockOnSearch = vi.fn();
    renderWithProviders(<Input onSearch={mockOnSearch} />);

    const inputElement = screen.getByTestId('inputElement');
    const searchButton = screen.getByTestId('searchBtn');

    fireEvent.change(inputElement, { target: { value: 'Rick' } });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('Rick');
  });

  test.skip('trims whitespace input', () => {
    const mockOnSearch = vi.fn();
    renderWithProviders(<Input onSearch={mockOnSearch} />);

    const inputElement = screen.getByTestId('inputElement');
    const searchButton = screen.getByTestId('searchBtn');

    fireEvent.change(inputElement, { target: { value: '   ' } });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('');
  });

  it.skip('saves value to local staroge on click', () => {
    const mockOnSearch = vi.fn();
    renderWithProviders(<Input onSearch={mockOnSearch} />);

    const inputElement = screen.getByTestId('inputElement');
    const searchButton = screen.getByTestId('searchBtn');

    fireEvent.change(inputElement, { target: { value: 'Rick' } });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('Rick');
    expect(setItemMock).toHaveBeenCalledWith('searchQuery', 'Rick');
  });
});
