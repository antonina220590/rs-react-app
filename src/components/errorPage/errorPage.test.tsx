import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, test } from 'vitest';
import ErrorPage from './errorPage';

describe('ErrorPage Component', () => {
  test('renders error message correctly', () => {
    render(<ErrorPage />);

    const errorElement = screen.getByText('Error: character not found!');
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass('text-4xl');
  });

  test('checks for correct background styles', () => {
    render(<ErrorPage />);

    const container = screen.getByText('Error: character not found!')
      .parentElement?.parentElement;
    expect(container).toHaveClass('min-h-screen');
    expect(container).toHaveClass('justify-center');
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('flex-col');
    expect(container).toHaveClass('items-center');
    expect(container).toHaveClass('bg-[#bab2b5]');
    expect(container).toHaveClass('bg-cover');
  });

  test('button has correct styles and text', () => {
    render(<ErrorPage />);
    const button = screen.getByRole('button', { name: /GET ME HOME/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('GET ME HOME');
    expect(button).toHaveClass('bg-[#f96e4d]');
    expect(button).toHaveClass('cursor-pointer');
    expect(button).toHaveClass('border-0');
    expect(button).toHaveClass('px-6');
    expect(button).toHaveClass('py-3');
    expect(button).toHaveClass('rounded-full');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('font-bold');
    expect(button).toHaveClass('mt-4');
    expect(button).toHaveClass('hover:bg-[#e65c3f]');
    expect(button).toHaveClass('focus:outline-none');
  });
});
