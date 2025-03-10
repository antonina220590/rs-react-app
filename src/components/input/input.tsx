'use client';

import { useCallback, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchIcon from '../../icons/searchIcon/searchIcon';
import ThemeBtn from '../themeButton/themeBtn';
import { useTheme } from '../../utils/context/useThemeHook';

const DEBOUNCE_DELAY = 500;

function InputClient() {
  const { isDarkTheme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const initialSearchQuery = searchParams.get('name') || '';

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      if (name === 'name' && !value) {
        params.delete('name');
      }
      params.delete('id');
      params.set('page', '1');
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = useCallback(
    (query: string) => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }

      timeoutIdRef.current = setTimeout(() => {
        const trimmedQuery = query.trim();
        const newUrl = `/?${createQueryString('name', trimmedQuery)}`;
        router.push(newUrl);
      }, DEBOUNCE_DELAY);
    },
    [router, createQueryString]
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

export default InputClient;
