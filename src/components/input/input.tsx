import { useState, useEffect, useRef } from 'react';
import { useSearchQuery } from '../../utils/localStorageHook';
import SearchIcon from '../../icons/searchIcon/searchIcon';
import ThemeBtn from '../themeButton/themeBtn';
import { useTheme } from '../../utils/context/useThemeHook';
import { InputProps } from '../../utils/interface';

function Input({ onSearch }: InputProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchQuery, updateSearchQuery] = useSearchQuery();
  const inputRef = useRef<HTMLInputElement>(null);
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(inputValue);
    updateSearchQuery(inputValue);
  };

  // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === 'Enter') {
  //     handleSearch();
  //   }
  // };

  return (
    <>
      <input
        ref={inputRef}
        className="my-[20px] px-5 py-[10px] w-[250px] text-[20px] rounded-[5px] bg-white"
        name="input"
        type="text"
        placeholder="search....."
        onChange={handleInputChange}
        value={inputValue}
        data-testid="inputElement"
      ></input>
      <button
        className={`${isDarkTheme ? 'bg-neutral-300' : 'bg-[#ac3b61]'} ${isDarkTheme ? 'text-black' : 'text-white'} p-3 rounded-[5px] cursor-pointer ${isDarkTheme ? 'hover:bg-white' : 'hover:bg-[#edc7b7]'}`}
        onClick={handleSearchClick}
        style={{ cursor: 'pointer' }}
        data-testid="searchBtn"
      >
        <SearchIcon className="w-[30px]" />
      </button>
      <ThemeBtn />
    </>
  );
}

export default Input;
