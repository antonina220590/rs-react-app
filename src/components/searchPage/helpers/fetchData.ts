import { getApiData } from '../../../utils/api';
import { Character } from '../../../utils/interface';

async function fetchData(
  searchQuery: string = '',
  currentPage: number,
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>
) {
  setIsLoading(true);
  setErrorMessage(null);
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  try {
    const data = await getApiData(searchQuery, currentPage);
    await delay(300);
    setCharacters(data.results || []);
    return data;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred.';
    setErrorMessage(errorMessage);
  } finally {
    setIsLoading(false);
  }
  return null;
}

export default fetchData;
