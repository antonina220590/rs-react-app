import Pagination from './pagination';
import '@testing-library/jest-dom';
import { describe, expect, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test-utils';

const currentPage = 1;
const totalPages = 42;
const changePageMock = vi.fn();

describe('Pagination', () => {
  it('renders component with given data correctly ', () => {
    renderWithProviders(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        changePage={changePageMock}
      />
    );

    const prevButton = screen.getByTestId('prevBtn');
    expect(prevButton).toBeDisabled();

    const nextButton = screen.getByTestId('nextBtn');
    expect(nextButton).toBeEnabled();

    const input = screen.getByTestId('pageNum');
    expect(input).toHaveValue(currentPage.toString());
  });

  it('should enable Prev button when the currentPage is greater than 1', () => {
    renderWithProviders(
      <Pagination
        currentPage={5}
        totalPages={totalPages}
        changePage={changePageMock}
      />
    );
    const prevButton = screen.getByTestId('prevBtn');
    expect(prevButton).toBeEnabled();
  });

  it('should disable Next button when the currentPage is equal to totalPages', () => {
    renderWithProviders(
      <Pagination
        currentPage={totalPages}
        totalPages={totalPages}
        changePage={changePageMock}
      />
    );
    const nextButton = screen.getByTestId('nextBtn');
    expect(nextButton).toBeDisabled();
  });

  it('should enable Next button when the currentPage is less than totalPages', () => {
    renderWithProviders(
      <Pagination
        currentPage={40}
        totalPages={totalPages}
        changePage={changePageMock}
      />
    );
    const nextButton = screen.getByTestId('nextBtn');
    expect(nextButton).toBeEnabled();
  });

  it('should change page with currentPage - 1 when Prev button is clicked', () => {
    renderWithProviders(
      <Pagination
        currentPage={2}
        totalPages={totalPages}
        changePage={changePageMock}
      />
    );
    const prevButton = screen.getByTestId('prevBtn');
    fireEvent.click(prevButton);
    expect(changePageMock).toBeCalledWith(1);
  });

  it('should change page with currentPage + 1 when Next button is clicked', () => {
    renderWithProviders(
      <Pagination
        currentPage={2}
        totalPages={totalPages}
        changePage={changePageMock}
      />
    );
    const nextButton = screen.getByTestId('nextBtn');
    fireEvent.click(nextButton);
    expect(changePageMock).toBeCalledWith(3);
  });
});
