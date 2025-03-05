import { http, HttpResponse, delay } from 'msw';
import { setupServer } from 'msw/node';
import { Character } from '../../utils/interface';

const mockCharacter: Character = {
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
};

const server = setupServer(
  http.get(
    'https://rickandmortyapi.com/api/character/:id',
    async ({ params }) => {
      const { id } = params;
      if (id && Number(id) === 1) {
        await delay(2000);
        HttpResponse.json(mockCharacter);
      }
      return HttpResponse.json(
        { error: 'Character not found' },
        { status: 404 }
      );
    }
  )
);

export { server, mockCharacter };
