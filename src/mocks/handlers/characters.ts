import { http, HttpResponse, delay } from 'msw';
import { setupServer } from 'msw/node';
import { ApiResponse, Character } from '../../utils/interface';

const mockCharacters: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    type: '',
    origin: {
      name: '',
      url: '',
    },
    location: {
      name: '',
      url: '',
    },
    episode: [],
    url: '',
    created: '',
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    type: '',
    origin: {
      name: '',
      url: '',
    },
    location: {
      name: '',
      url: '',
    },
    episode: [],
    url: '',
    created: '',
  },
];

const mockApiResponse: ApiResponse = {
  info: {
    count: 2,
    pages: 1,
    next: null,
    prev: null,
  },
  results: mockCharacters,
};

const server = setupServer(
  http.get('https://rickandmortyapi.com/api/character', async ({ request }) => {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get('name');
    await delay(200);

    if (searchQuery) {
      const filteredCharacters = mockCharacters.filter((character) =>
        character.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return HttpResponse.json({
        ...mockApiResponse,
        results: filteredCharacters,
      });
    }
    return HttpResponse.json(mockApiResponse);
  })
);

export { server, mockApiResponse };
