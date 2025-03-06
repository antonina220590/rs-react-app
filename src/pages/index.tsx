import SearchPage from '../components/searchPage/searchPage';
import { useTheme } from '../utils/context/useThemeHook';
import { GetServerSideProps } from 'next';
import { ApiResponse, Character } from '../utils/interface';
import { wrapper } from '../store/store';
import { apiSlice } from '../utils/slices/apiSlice';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import Custom404 from './404';
import ErrorPage from '../components/errorPage/errorPage';

export interface PageProps {
  initialData: ApiResponse;
  initialCharacter: Character | null;
  error: string | null;

  isFromServer?: boolean;

  code?: number | null;
}

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
    let code: number | null = null;

    if (characterId) {
      let characterPromise;
      try {
        characterPromise = store.dispatch(
          apiSlice.endpoints.getCharacterById.initiate(characterId)
        );
        const characterResult = await characterPromise;

        if ('error' in characterResult) {
          if (
            isFetchBaseQueryError(characterResult.error) &&
            characterResult.error.status === 404
          ) {
            error = 'Character not found';
            code = 404;
          } else {
            if (isFetchBaseQueryError(characterResult.error)) {
              error = `API Error (Character Details): Status ${characterResult.error.status}`;
              if (
                'data' in characterResult.error &&
                typeof characterResult.error.data === 'object'
              ) {
                error += ` - ${JSON.stringify(characterResult.error.data)}`;
              } else if ('data' in characterResult.error) {
                error += ` - ${String(characterResult.error.data)}`;
              }
            } else if (isSerializedError(characterResult.error)) {
              error = `API Error (Character Details): ${characterResult.error.message}`;
            } else {
              error = 'Failed to fetch character details';
            }
          }
        } else if (characterResult.data) {
          initialCharacter = characterResult.data;
        }
      } catch (charError: unknown) {
        console.error(
          'Unexpected error fetching character details:',
          charError
        );
        if (isFetchBaseQueryError(charError)) {
          error = `API Error (Character Details): Status ${charError.status}`;
          if ('data' in charError) {
            error += ` - ${JSON.stringify(charError.data)}`;
          }
        } else if (isSerializedError(charError)) {
          error = `API Error (Character Details): ${charError.message}`;
        } else {
          error =
            'An unexpected error occurred while fetching character details';
        }
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
        if (
          isFetchBaseQueryError(charactersResult.error) &&
          charactersResult.error.status === 404
        ) {
          error = 'Characters not found';
          code = 404;
        } else if (isFetchBaseQueryError(charactersResult.error)) {
          error = `API Error (Character Details): Status ${charactersResult.error.status}`;
          if (
            'data' in charactersResult.error &&
            typeof charactersResult.error.data === 'object'
          ) {
            error += ` - ${JSON.stringify(charactersResult.error.data)}`;
          } else if ('data' in charactersResult.error) {
            error += ` - ${String(charactersResult.error.data)}`;
          }
        } else if (isSerializedError(charactersResult.error)) {
          error = `API Error (Character List): ${charactersResult.error.message}`;
        } else {
          error = 'Failed to fetch characters';
        }
      } else if (
        !charactersResult.data ||
        charactersResult.data.results.length === 0
      ) {
        error = 'No characters found';
      } else {
        initialData = charactersResult.data;
      }
    } catch (fetchError: unknown) {
      console.error('Error fetching data in getServerSideProps:', fetchError);
      if (isFetchBaseQueryError(fetchError)) {
        error = `API Error: Status ${fetchError.status}`;
        if ('data' in fetchError) {
          error += ` - ${JSON.stringify(fetchError.data)}`;
        }
      } else if (isSerializedError(fetchError)) {
        error = `${fetchError.message}`;
      } else {
        error = 'An unexpected error occurred';
      }
    } finally {
      if (charactersPromise) {
        charactersPromise.unsubscribe();
      }
    }
    if (error === 'Character not found') {
      initialCharacter = null;
    }

    return {
      props: {
        initialData,
        initialCharacter,
        isFromServer: true,
        error,
        code,
      },
    };
  });

function Home({ initialData, initialCharacter, error, code }: PageProps) {
  const { isDarkTheme } = useTheme();

  if (error) {
    if (code === 404) {
      return <Custom404 />;
    }
    return <ErrorPage message={error} />;
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
      />
    </div>
  );
}

export default Home;
export { getServerSideProps };
