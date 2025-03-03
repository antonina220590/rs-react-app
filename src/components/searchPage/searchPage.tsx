import { useCallback, useEffect, useRef } from 'react';
import Input from '../input/input';
import Cards from '../cards/cards';
import { useSearchQuery } from '../../utils/localStorageHook';
import Pagination from '../pagination/pagination';
import { useRouter } from 'next/router';
import Flyout from '../flyout/flyout';
import {
  useGetCharacterByIdQuery,
  useLazyGetCharactersQuery,
} from '../../utils/slices/apiSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useTheme } from '../../utils/context/useThemeHook';
import DetailsPage from '../detailsPage/detailsPage';
import { ApiResponse } from '../../utils/interface';

const isFetchBaseQueryError = (
  error: unknown
): error is FetchBaseQueryError => {
  return (error as FetchBaseQueryError).status !== undefined;
};
const DEBOUNCE_DELAY = 500;

function SearchPage({ initialData }: { initialData: ApiResponse }) {
  const router = useRouter();
  const { search, page, id } = router.query;

  const [searchQuery, setSearchQuery] = useSearchQuery();
  const currentPage = typeof page === 'string' ? parseInt(page, 10) : 1;

  const { isDarkTheme } = useTheme();

  const [trigger, { data, error, isLoading }] = useLazyGetCharactersQuery();

  const {
    data: characterData,
    error: characterError,
    isLoading: isCharacterLoading,
    isFetching,
  } = useGetCharacterByIdQuery(id ? String(id) : '', { skip: !id });

  useEffect(() => {
    if (router.isReady) {
      const actualSearch = typeof search === 'string' ? search : '';
      trigger({ searchQuery: actualSearch, currentPage });
    }
  }, [search, page, router.isReady, trigger, currentPage]);

  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = useCallback(
    (query: string) => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }

      timeoutIdRef.current = setTimeout(() => {
        const trimmedQuery = query.trim();
        setSearchQuery(trimmedQuery);
        const newQuery: {
          search?: string;
          page: string;
          id?: string | string[];
        } = {
          ...router.query,
          search: trimmedQuery,
          page: '1',
        };
        if (!trimmedQuery) {
          delete newQuery.search;
        }
        router.push({ pathname: router.pathname, query: newQuery }, undefined, {
          shallow: true,
        });
      }, DEBOUNCE_DELAY);
    },
    [router, setSearchQuery]
  );

  const handlePageChange = (newPage: number) => {
    if (data && newPage > 0 && newPage <= data.info.pages) {
      const newQuery = { ...router.query, page: newPage.toString() };
      router.push({ pathname: router.pathname, query: newQuery }, undefined, {
        shallow: true,
      });
    }
  };

  const handleCardClick = (charId: number) => {
    router.push(
      { pathname: router.pathname, query: { ...router.query, id: charId } },
      undefined,
      { shallow: true }
    );
  };

  const closeCard = () => {
    const { id, ...restQuery } = router.query;
    router.push({ pathname: router.pathname, query: restQuery }, undefined, {
      shallow: true,
    });
  };
  const displayData = data ? data : initialData;
  const totalPages = displayData?.info?.pages || 1;

  if (!initialData) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>...isLoading</p>
      </div>
    );
  }

  return (
    <div className="w-[90%] flex flex-col items-center">
      <div
        className={`w-[95%] m-10 rounded-xl items-center justify-center mb-8 gap-15 flex flex-wrap relative ${
          isDarkTheme ? 'bg-[#19181A]' : 'bg-[#eee2dc]'
        }`}
      >
        <Input onSearch={handleSearch} />
      </div>
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          changePage={handlePageChange}
        />
      </div>

      <div className="flex flex-row w-[95%] relative mt-[20px] justify-center">
        <div
          className={`w-[95%] min-h-dvh ml-[10px] mr-[10px] ${
            isDarkTheme ? 'bg-[#19181A]' : 'bg-[#eee2dc]'
          } backdrop-blur-2xl rounded-xl mb-8 gap-15 justify-center items-center flex flex-wrap flex-row`}
        >
          {isLoading && !displayData ? (
            <p>...loading</p>
          ) : error ? (
            <div className="bg-gray-500/70 backdrop-blur-lg border border-white/18 rounded-xl shadow-xl h-[200px] flex items-center">
              <p className="text-amber-50 text-4xl p-5">
                Error:
                {isFetchBaseQueryError(error)
                  ? ` ${error.status} - ${
                      typeof error.data === 'string'
                        ? error.data
                        : 'Unknown error'
                    }`
                  : 'An unexpected error occurred.'}
              </p>
            </div>
          ) : !displayData || displayData.results.length === 0 ? (
            <div className="bg-gray-500/70 backdrop-blur-lg border border-white/18 rounded-xl shadow-xl h-[200px] flex items-center">
              <p className="text-amber-50 text-4xl p-5">
                No results found for your search.
              </p>
            </div>
          ) : (
            <div className="flex">
              <div className="w-50% flex flex-wrap">
                <Cards
                  characters={displayData.results}
                  onCardClick={handleCardClick}
                />
              </div>
            </div>
          )}
        </div>
        {id && (
          <DetailsPage
            character={characterData}
            closeCard={closeCard}
            fetching={isFetching}
            error={characterError}
          />
        )}
      </div>
      <Flyout />
    </div>
  );
}

export default SearchPage;
