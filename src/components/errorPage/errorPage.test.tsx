import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, test } from 'vitest';
import ErrorPage from './errorPage';

describe('ErrorPage Component', () => {
  test('renders error message correctly', () => {
    const errorMessage = 'This is a test error message.';
    render(<ErrorPage message={errorMessage} />);

    const errorElement = screen.getByText(`Error: ${errorMessage}`);
    expect(errorElement).toBeInTheDocument();
  });

  test('renders with different error message', () => {
    const errorMessage = 'Another error occurred.';
    render(<ErrorPage message={errorMessage} />);

    const errorElement = screen.getByText(`Error: ${errorMessage}`);
    expect(errorElement).toBeInTheDocument();
  });

  test('renders error message with special characters', () => {
    const errorMessage = 'Error with <special> & "characters".';
    render(<ErrorPage message={errorMessage} />);
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  test('checks for correct background styles', () => {
    const errorMessage = 'Test Error';
    render(<ErrorPage message={errorMessage} />);

    const container = screen.getByText(`Error: ${errorMessage}`).parentElement;
    expect(container).toHaveClass('min-h-screen');
    expect(container).toHaveClass('justify-center');
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('flex-col');
    expect(container).toHaveClass('items-center');
    expect(container).toHaveClass('bg-[#bab2b5]');
    expect(container).toHaveClass('bg-cover');
  });
});
