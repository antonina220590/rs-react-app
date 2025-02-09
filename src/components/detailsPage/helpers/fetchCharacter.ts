import { Character } from '../../../utils/interface';

export async function fetchCharacter(id: string): Promise<Character | null> {
  const url = `https://rickandmortyapi.com/api/character/${id}`;
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    await delay(300);
    return await res.json();
  } catch (error: unknown) {
    console.error('Error fetching character:', error);
    return null;
  }
}
