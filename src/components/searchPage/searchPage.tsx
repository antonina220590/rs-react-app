import { useEffect, useState } from 'react';
import { ApiResponse, Character } from '../../utils/interface';
import Input from '../input/input';
import Cards from '../cards/cards';
import Spinner from '../spinner/spinners';
import fetchData from './helpers/fetchData';
import { useSearchQuery } from '../../utils/localStorage';
import Pagination from '../pagination/pagination';
import { Outlet, useSearchParams } from 'react-router';

function SearchPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useSearchQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<ApiResponse | null>(null);
  const currentQuery = searchParams.get('search') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    if (searchQuery !== (searchParams.get('search') || '')) {
      if (searchQuery.trim() !== '') {
        setSearchParams({ page: '1', search: searchQuery });
      } else {
        setSearchParams({ page: '1' });
      }
    }
  }, [searchParams, searchQuery, setSearchParams]);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      const apiResponse = await fetchData(
        currentQuery,
        currentPage,
        setCharacters,
        setIsLoading,
        setErrorMessage
      );

      if (apiResponse) {
        setData(apiResponse);
      }
    };

    fetchDataFromAPI();
  }, [currentPage, currentQuery]);

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
      <div className="w-[95%] m-10 bg-[#123c69] backdrop-blur-2xl border rounded-xl items-center justify-center mb-8 gap-15 flex flex-wrap">
        <Input onSearch={handleSearch} />
      </div>
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={data ? data.info.pages : 42}
          changePage={handlePageChange}
        />
      </div>

      <div className="w-[95%] min-h-dvh m-10 bg-[#123c69] backdrop-blur-2xl border rounded-xl mb-8 gap-15 justify-center items-center flex flex-wrap flex-row">
        {isLoading ? (
          <Spinner />
        ) : errorMessage ? (
          <div className="bg-gray-500/70 backdrop-blur-lg border border-white/18 rounded-xl shadow-xl h-[200px] flex items-center">
            <p className="text-amber-50 text-4xl p-5">Error: {errorMessage}</p>
          </div>
        ) : characters.length === 0 ? (
          <div className="bg-gray-500/70 backdrop-blur-lg border border-white/18 rounded-xl shadow-xl h-[200px] flex items-center">
            <p className="text-amber-50 text-4xl p-5">
              No results found for your search.
            </p>
          </div>
        ) : (
          <div className="flex">
            <div className="w-50% flex flex-wrap">
              <Cards characters={characters} />
            </div>
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
