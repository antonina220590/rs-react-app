import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes } from 'react-router';
import Cards from './cards';
import { Character } from '../../utils/interface';
import { describe, expect, test } from 'vitest';
import { Route } from 'react-router';

const mockCharacters: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    image: 'http://example.com/rick.png',
    status: 'Alive',
    gender: 'Male',
    species: 'Human',
  },
  {
    id: 2,
    name: 'Morty Smith',
    image: 'http://example.com/morty.png',
    status: 'Alive',
    gender: 'Male',
    species: 'Human',
  },
];
describe('Cards Component', () => {
  test('renders character cards correctly', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Cards characters={mockCharacters} />} />
        </Routes>
      </MemoryRouter>
    );
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(mockCharacters.length);
    expect(images[0]).toHaveAttribute('src', mockCharacters[0].image);
    expect(images[1]).toHaveAttribute('src', mockCharacters[1].image);

    const links = screen.getAllByRole('link');
    expect(links.length).toBe(mockCharacters.length);
    expect(links[0]).toHaveAttribute('href', '/character/1');
    expect(links[1]).toHaveAttribute('href', '/character/2');
  });
});
