import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, test } from 'vitest';
import Loader from './loader';

describe('Loader Component', () => {
  test('renders the loading text correctly', () => {
    render(<Loader />);
    const loadingElement = screen.getByText('...Loading');
    expect(loadingElement).toBeInTheDocument();
  });

  test('checks for correct text styling', () => {
    render(<Loader />);
    const loadingElement = screen.getByText('...Loading');
    expect(loadingElement).toHaveClass('text-4xl');
    expect(loadingElement).toHaveClass('text-zinc-600');
  });

  test('checks for correct container styles', () => {
    render(<Loader />);
    const container = screen.getByText('...Loading').parentElement;
    expect(container).toHaveClass('min-h-screen');
    expect(container).toHaveClass('justify-center');
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('flex-col');
    expect(container).toHaveClass('items-center');
    expect(container).toHaveClass('bg-[#bab2b5]');
    expect(container).toHaveClass('bg-cover');
  });

  test('renders "Loading" with three dots', () => {
    render(<Loader />);
    expect(screen.getByText('...Loading')).toBeInTheDocument();
  });
});
