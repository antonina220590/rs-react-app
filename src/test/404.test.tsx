import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { describe, it, expect, vi } from 'vitest';
import Error404Page from '../app/not-found';

describe('Error404Page', () => {
  it('renders the 404 error page with the correct content', () => {
    render(<Error404Page />);

    const errorCode = screen.getByText('44');
    expect(errorCode).toBeInTheDocument();

    const errorMessage = screen.getByText(/Oooop! Something went wrong!/i);
    expect(errorMessage).toBeInTheDocument();

    const homeButton = screen.getByRole('button', { name: /GET ME HOME/i });
    expect(homeButton).toBeInTheDocument();
  });

  it('refreshes the page when the button is clicked', () => {
    const mockReplace = vi.fn();
    const originalLocation = window.location;

    const mockLocation = {
      ...originalLocation,
      replace: mockReplace,
    };

    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
    });

    render(<Error404Page />);

    const homeButton = screen.getByRole('button', { name: /GET ME HOME/i });
    fireEvent.click(homeButton);

    expect(mockReplace).toHaveBeenCalledWith('/');

    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true,
    });
  });
});
