import { getApiData } from '../../../utils/api';
import { Character } from '../../../utils/interface';

async function fetchData(
  searchQuery: string = '',
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>
) {
  setIsLoading(true);
  setErrorMessage(null);
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  try {
    const data = await getApiData(searchQuery);
    await delay(300);
    setCharacters(data.results || []);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred.';
    setErrorMessage(errorMessage);
  } finally {
    setIsLoading(false);
  }
}

export default fetchData;
