import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from './errorBoundary';

const ProblematicComponent = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  it('renders children normally when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('catches an error and displays an error message', () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /reload page/i })
    ).toBeInTheDocument();
  });
});
