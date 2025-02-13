import { ChangeEvent } from 'react';
import {
  saveToLocalStorage,
  useSearchQuery,
} from '../../utils/localStorageHook';
import { InputProps } from '../../utils/interface';

function Input({ onSearch }: InputProps) {
  const [searchState, setSearchState] = useSearchQuery();

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
        className="bg-[#ac3b61] text-amber-50 p-5 rounded-[5px] hover:bg-[#edc7b7] hover:text-black"
        onClick={handleSearchClick}
        style={{ cursor: 'pointer' }}
        data-testid="searchBtn"
      >
        Search
      </button>
    </>
  );
}

export default Input;
