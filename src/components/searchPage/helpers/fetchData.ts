import { getApiData } from '../../../utils/api';
import { Character } from '../../../utils/interface';

export default function fetchData(
  searchQuery: string = '',
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>
) {
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  setIsLoading(true);
  setErrorMessage(null);
  getApiData(searchQuery)
    .then((data) => {
      delay(300).then(() => {
        setCharacters(data.results || []);
        setIsLoading(false);
      });
    })
    .catch((error) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred.';
      setErrorMessage(errorMessage);
      setIsLoading(false);
    });
}
