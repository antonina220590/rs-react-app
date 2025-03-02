import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import Spinner from './spinners';

describe('Spinner', () => {
  it.skip('renders the spinner component', () => {
    render(<Spinner />);

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('animate-spin');
    expect(spinner).toHaveAttribute('role', 'status');

    const loadingText = screen.getByText(/Loading.../i);
    expect(loadingText).toBeInTheDocument();
    expect(loadingText).toHaveClass(
      '!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'
    );
  });
});
