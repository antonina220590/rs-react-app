import SearchPage from '../components/searchPage/searchPage';
import { useTheme } from '../utils/context/useThemeHook';
import { GetServerSideProps } from 'next';
import { ApiResponse, Character, PageProps } from '../utils/interface';
import { wrapper } from '../services/store';
import { apiSlice } from '../utils/slices/apiSlice';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error !== null && 'status' in error;
}

function isSerializedError(error: unknown): error is SerializedError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'name' in error &&
    'message' in error
  );
}

const getServerSideProps: GetServerSideProps<PageProps> =
  wrapper.getServerSideProps((store) => async (context) => {
    const { query } = context;
    const searchQuery =
      (Array.isArray(query.search) ? query.search[0] : query.search) || '';
    const currentPage =
      parseInt(
        (Array.isArray(query.page) ? query.page[0] : query.page) || '1',
        10
      ) || 1;
    const characterId =
      (Array.isArray(query.id) ? query.id[0] : query.id) || null;

    let initialData: ApiResponse = {
      info: { count: 0, pages: 0, next: null, prev: null },
      results: [],
    };
    let initialCharacter: Character | null = null;
    let error: string | null = null;
    let notFound = false;

    if (characterId) {
      let characterPromise;
      try {
        characterPromise = store.dispatch(
          apiSlice.endpoints.getCharacterById.initiate(characterId)
        );
        const characterResult = await characterPromise;

        if ('error' in characterResult) {
          console.error(
            'Error fetching character details:',
            characterResult.error
          );
        } else if (characterResult.data) {
          initialCharacter = characterResult.data;
        }
      } catch (charError: unknown) {
        console.error(
          'Unexpected error fetching character details:',
          charError
        );
      } finally {
        if (characterPromise) {
          characterPromise.unsubscribe();
        }
      }
    }
    let charactersPromise;
    try {
      charactersPromise = store.dispatch(
        apiSlice.endpoints.getCharacters.initiate({ searchQuery, currentPage })
      );
      const charactersResult = await charactersPromise;

      if ('error' in charactersResult) {
        let err = '';
        if (
          typeof charactersResult.error === 'object' &&
          charactersResult.error !== null &&
          'status' in charactersResult.error
        ) {
          err = `API Error: Status ${charactersResult.error.status}`;
          if ('data' in charactersResult.error) {
            err += ` - ${JSON.stringify(charactersResult.error.data)}`;
          }
        }
        error = err || 'Failed to fetch characters';
        notFound = false;
      } else if (
        !charactersResult.data ||
        charactersResult.data.results.length === 0
      ) {
        notFound = true;
        error = 'No characters found';
      } else {
        initialData = charactersResult.data;
        notFound = false;
        error = null;
      }
    } catch (fetchError: unknown) {
      console.error('Error fetching data in getServerSideProps:', fetchError);

      if (isFetchBaseQueryError(fetchError)) {
        error = `API Error: Status ${fetchError.status}`;
        if ('data' in fetchError) {
          error += ` - ${JSON.stringify(fetchError.data)}`;
        }
      } else if (isSerializedError(fetchError)) {
        error = `Serialized Error: ${fetchError.message}`;
      } else {
        error = 'An unexpected error occurred';
      }
      notFound = false;
    } finally {
      if (charactersPromise) {
        charactersPromise.unsubscribe();
      }
    }
    return {
      props: {
        initialData,
        initialCharacter,
        isFromServer: true,
        error,
        notFound,
      },
    };
  });

function Home({ initialData, initialCharacter, error, notFound }: PageProps) {
  const { isDarkTheme } = useTheme();

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (notFound) {
    return <p>no results</p>;
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center ${
        isDarkTheme ? 'bg-[#474b4f]' : 'bg-[#bab2b5]'
      } bg-cover`}
    >
      <SearchPage
        initialData={initialData}
        initialCharacter={initialCharacter}
        error={error}
        notFound={notFound}
      />
    </div>
  );
}

export default Home;
export { getServerSideProps };
