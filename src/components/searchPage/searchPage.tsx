import { useEffect } from 'react';
import Input from '../input/input';
import Cards from '../cards/cards';
import Spinner from '../spinner/spinners';
import { useSearchQuery } from '../../utils/localStorageHook';
import Pagination from '../pagination/pagination';
import { useRouter } from 'next/router';
import Flyout from '../flyout/flyout';
import { useGetCharactersQuery } from '../../utils/slices/apiSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useTheme } from '../../utils/context/useThemeHook';

const isFetchBaseQueryError = (
  error: unknown
): error is FetchBaseQueryError => {
  return (error as FetchBaseQueryError).status !== undefined;
};

function SearchPage() {
  const router = useRouter();
  const { search, page } = router.query;
  const currentQuery = typeof search === 'string' ? search : '';
  const currentPage = typeof page === 'string' ? parseInt(page, 10) : 1;
  const [searchQuery, setSearchQuery] = useSearchQuery();
  const { isDarkTheme } = useTheme();

  const { data, error, isLoading } = useGetCharactersQuery({
    searchQuery: currentQuery,
    currentPage,
  });

  useEffect(() => {
    if (searchQuery !== currentQuery) {
      const query: { page?: string; search?: string } = { page: '1' };
      if (searchQuery.trim() !== '') {
        query.search = searchQuery;
      }
      router.push({ pathname: router.pathname, query }, undefined, {
        shallow: true,
      });
    }
  }, [searchQuery, currentQuery, router]);

  const handlePageChange = (newPage: number) => {
    if (data && newPage <= data.info.pages) {
      const query: { page?: string; search?: string } = {
        page: newPage.toString(),
      };
      if (currentQuery.trim() !== '') {
        query.search = currentQuery;
      }
      router.push({ pathname: router.pathname, query });
    }
  };

  // const handleSearch = (query: string) => {
  //   const newQuery: { page?: string; search?: string } = { page: '1' };
  //   if (query.trim() !== '') {
  //     newQuery.search = query;
  //   }
  //   router.push({ pathname: router.pathname, query: newQuery });
  // };

  const handleSearch = (query: string) => {
    // Обновляем searchQuery через хук
    setSearchQuery(query);
  };

  return (
    <div className="w-[90%] flex flex-col items-center">
      <div
        className={`w-[95%] m-10 rounded-xl items-center justify-center mb-8 gap-15 flex flex-wrap relative ${isDarkTheme ? 'bg-[#19181A]' : 'bg-[#eee2dc]'}`}
      >
        <Input onSearch={handleSearch} />
      </div>
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={data && data.info ? data.info.pages : 42}
          changePage={handlePageChange}
        />
      </div>

      <div className="flex flex-row w-[95%] relative mt-[20px] justify-center">
        <div
          className={`w-[95%] min-h-dvh ml-[10px] mr-[10px] ${isDarkTheme ? 'bg-[#19181A]' : 'bg-[#eee2dc]'} backdrop-blur-2xl rounded-xl mb-8 gap-15 justify-center items-center flex flex-wrap flex-row`}
        >
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <div className="bg-gray-500/70 backdrop-blur-lg border border-white/18 rounded-xl shadow-xl h-[200px] flex items-center">
              <p className="text-amber-50 text-4xl p-5">
                Error:{' '}
                {isFetchBaseQueryError(error)
                  ? `${error.status} - ${error.data && typeof error.data === 'string' ? error.data : (error.data as { error?: string }).error || 'No additional information available.'}`
                  : 'An unexpected error occurred.'}
              </p>
            </div>
          ) : !data || data.results.length === 0 ? (
            <div className="bg-gray-500/70 backdrop-blur-lg border border-white/18 rounded-xl shadow-xl h-[200px] flex items-center">
              <p className="text-amber-50 text-4xl p-5">
                No results found for your search.
              </p>
            </div>
          ) : (
            <div className="flex">
              <div className="w-50% flex flex-wrap">
                <Cards characters={data.results} />{' '}
              </div>
            </div>
          )}
        </div>
      </div>
      <Flyout />
    </div>
  );
}

export default SearchPage;
