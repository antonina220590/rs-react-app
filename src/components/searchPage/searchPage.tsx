import { useEffect } from 'react';
import Input from '../input/input';
import Cards from '../cards/cards';
import Spinner from '../spinner/spinners';
import { useSearchQuery } from '../../utils/localStorageHook';
import Pagination from '../pagination/pagination';
import { Outlet, useSearchParams } from 'react-router';
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
  const [searchQuery, setSearchQuery] = useSearchQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentQuery = searchParams.get('search') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const { isDarkTheme } = useTheme();

  const { data, error, isLoading } = useGetCharactersQuery({
    searchQuery: currentQuery,
    currentPage,
  });

  useEffect(() => {
    if (searchQuery !== (searchParams.get('search') || '')) {
      if (searchQuery.trim() !== '') {
        setSearchParams({ page: '1', search: searchQuery });
      } else {
        setSearchParams({ page: '1' });
      }
    }
  }, [searchParams, searchQuery, setSearchParams]);

  const handlePageChange = (newPage: number) => {
    if (data && newPage <= data.info.pages) {
      const newParams: { page: string; search?: string } = {
        page: newPage.toString(),
      };
      if (searchQuery.trim() !== '') {
        newParams.search = searchQuery;
      }
      setSearchParams(newParams);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() !== '') {
      setSearchParams({ page: '1', query: query });
    } else {
      setSearchParams({ page: '1' });
    }
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
        <Outlet />
      </div>
      <Flyout />
    </div>
  );
}

export default SearchPage;
