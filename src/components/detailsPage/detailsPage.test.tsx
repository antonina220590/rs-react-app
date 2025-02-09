import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useParams } from 'react-router';
import DetailsPage from './detailsPage';
import { fetchCharacter } from './helpers/fetchCharacter';
import { vi } from 'vitest';
import * as router from 'react-router';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: vi.fn(),
  };
});

vi.mock('./helpers/fetchCharacter');

describe('DetailsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('renders loading spinner initially', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (fetchCharacter as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );

    render(<DetailsPage />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders error message if fetchCharacter fails', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (fetchCharacter as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch')
    );

    render(<DetailsPage />);

    await waitFor(() => {
      expect(screen.getByText(/error: failed to fetch/i)).toBeInTheDocument();
    });
  });

  it('renders character details successfully', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    const mockCharacter = {
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      image: 'https://example.com/rick.png',
    };
    (fetchCharacter as jest.Mock).mockResolvedValue(mockCharacter);

    render(<DetailsPage />);

    await waitFor(() => {
      expect(screen.getByText(/rick sanchez/i)).toBeInTheDocument();
      expect(screen.getByText(/status:/i)).toBeInTheDocument();
      expect(screen.getByText(/alive/i)).toBeInTheDocument();
      expect(screen.getByText(/species:/i)).toBeInTheDocument();
      expect(screen.getByText(/human/i)).toBeInTheDocument();
      expect(screen.getByText(/gender:/i)).toBeInTheDocument();
      expect(screen.getByText(/male/i)).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute(
        'src',
        'https://example.com/rick.png'
      );
    });
  });

  it('closes the card when the close button is clicked', async () => {
    const mockNavigate = vi.fn();
    vi.spyOn(router, 'useParams').mockReturnValue({ id: '1' });
    vi.spyOn(router, 'useNavigate').mockReturnValue(mockNavigate);

    const mockCharacter = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      image: 'https://example.com/rick.png',
    };
    vi.mocked(fetchCharacter).mockResolvedValue(mockCharacter);
    render(<DetailsPage />);

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    const closeBtn = screen.getByTestId('closeCardBtn');
    fireEvent.click(closeBtn);

    expect(mockNavigate).toHaveBeenCalled();
    expect(closeBtn).toBeInTheDocument();
  });

  it('navigates to the correct URL when closing the card', async () => {
    const mockNavigate = vi.fn();
    vi.spyOn(router, 'useParams').mockReturnValue({ id: '1' });
    vi.spyOn(router, 'useNavigate').mockReturnValue(mockNavigate);

    const mockCharacter = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      image: 'https://example.com/rick.png',
    };
    vi.mocked(fetchCharacter).mockResolvedValue(mockCharacter);

    render(<DetailsPage />);
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    const closeBtn = screen.getByTestId('closeCardBtn');
    fireEvent.click(closeBtn);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
