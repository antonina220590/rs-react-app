import { memo } from 'react';
import { SearchProps } from '../../interface';

const SearchInput = memo(function SearchInput({
  searchQuery,
  onSearch,
}: SearchProps) {
  return (
    <div className="flex justify-center m-5">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search by country name..."
        className="p-3 bg-[#2E3944] rounded-md w-md text-[#D3D9D4]"
      />
    </div>
  );
});

export default SearchInput;
