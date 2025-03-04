import { useEffect, useRef, useCallback } from 'react';
import SearchIcon from '../../icons/searchIcon/searchIcon';
import ThemeBtn from '../themeButton/themeBtn';
import { useTheme } from '../../utils/context/useThemeHook';
import { useRouter } from 'next/router';

interface InputProps {
  initialSearchQuery: string;
}

interface QueryParams {
  search?: string;
  page?: string;
  id?: string | string[];
  [key: string]: string | string[] | undefined;
}

const DEBOUNCE_DELAY = 500;

function Input({ initialSearchQuery }: InputProps) {
  const { isDarkTheme } = useTheme();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = useCallback(
    (query: string) => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }

      timeoutIdRef.current = setTimeout(() => {
        const trimmedQuery = query.trim();
        const newQuery: QueryParams = {
          ...router.query,
          search: trimmedQuery,
          page: '1',
        };
        if (trimmedQuery) {
          newQuery.search = trimmedQuery;
        } else {
          delete newQuery.search;
        }

        delete newQuery.id;

        if (newQuery.id !== undefined) {
          delete newQuery.id;
        }

        router.push({ pathname: router.pathname, query: newQuery });
      }, DEBOUNCE_DELAY);
    },
    [router]
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <input
        ref={inputRef}
        className={`my-[20px] px-5 py-[10px] w-[250px] text-[20px] rounded-[5px] ${isDarkTheme ? 'bg-white text-black' : 'bg-white'}`}
        name="input"
        type="text"
        placeholder="search....."
        defaultValue={initialSearchQuery}
        data-testid="inputElement"
      />
      <button
        type="button"
        className={`${isDarkTheme ? 'bg-neutral-300' : 'bg-[#ac3b61]'} ${isDarkTheme ? 'text-black' : 'text-white'} p-3 rounded-[5px] cursor-pointer ${isDarkTheme ? 'hover:bg-white' : 'hover:bg-[#edc7b7]'}`}
        onClick={() => {
          handleSearch(inputRef.current?.value || '');
        }}
        data-testid="searchBtn"
      >
        <SearchIcon className="w-[30px]" />
      </button>
      <ThemeBtn />
    </>
  );
}

export default Input;
