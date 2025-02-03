import { useEffect, useState } from 'react';
import { Character } from '../../utils/interface';
import Input from '../input/input';
import Cards from '../cards/cards';
import Spinner from '../spinner/spinners';
import fetchData from './helpers/fetchData';
import handleSearch from './helpers/handleSearch';
import { useSearchQuery } from '../../utils/localStorage';

function SearchPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useSearchQuery();
  useEffect(
    function () {
      fetchData(searchQuery, setCharacters, setIsLoading, setErrorMessage);
    },
    [searchQuery, setCharacters, setIsLoading, setErrorMessage]
  );

  return (
    <div className="w-[90%] flex flex-col items-center">
      <div className="w-[95%] m-10 bg-[#123c69] backdrop-blur-2xl border rounded-xl items-center justify-center mb-8 gap-15 flex flex-wrap">
        <Input onSearch={(query) => handleSearch(query, setSearchQuery)} />
      </div>

      <div className="w-[95%] min-h-dvh m-10 bg-[#123c69] backdrop-blur-2xl border rounded-xl mb-8 gap-15 justify-center items-center flex flex-wrap">
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
          <div className="w-50% flex flex-wrap">
            <Cards characters={characters} />
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
