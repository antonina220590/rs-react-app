import { ChangeEvent, useState } from 'react';
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '../../utils/localStorage';

interface InputProps {
  onSearch: (searchQuery: string) => void;
}

function Input({ onSearch }: InputProps) {
  const [searchState, setSearchState] = useState<string>(
    getFromLocalStorage() || ''
  );

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
      ></input>
      <button
        className="bg-[#ac3b61] text-amber-50 p-5 rounded-[5px]"
        onClick={handleSearchClick}
        style={{ cursor: 'pointer' }}
      >
        Search
      </button>
    </>
  );
}

export default Input;
