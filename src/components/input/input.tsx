import { ChangeEvent } from 'react';
import {
  saveToLocalStorage,
  useSearchQuery,
} from '../../utils/localStorageHook';
import { InputProps } from '../../utils/interface';
import ThemeBtn from '../themeButton/themeBtn';
import SearchIcon from '../../icons/searchIcon/searchIcon';
import { useTheme } from '../../utils/context/useThemeHook';

function Input({ onSearch }: InputProps) {
  const [searchState, setSearchState] = useSearchQuery();
  const { isDarkTheme } = useTheme();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    if (target) {
      setSearchState(target.value.trim() || '');
    } else {
      new Error('event target is null');
    }
  };
  const handleSearchClick = () => {
    onSearch(searchState);
    saveToLocalStorage(searchState);
  };

  return (
    <>
      <input
        className="my-[20px] px-5 py-[10px] w-[250px] text-[20px] rounded-[5px] bg-white"
        name="input"
        type="text"
        placeholder="search....."
        onChange={handleSearchChange}
        value={searchState}
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
