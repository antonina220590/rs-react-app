import { memo } from 'react';
import { SortControlsProps } from '../../interface';

const SortCountries = memo(function SortCountries({
  sortOrder,
  onSortOrderChange,
}: SortControlsProps) {
  return (
    <div>
      <select
        value={sortOrder}
        onChange={(e) => onSortOrderChange(e.target.value as 'asc' | 'desc')}
        className="w-[150px] bg-[#2E3944] p-2 rounded-md m-5 text-[#D3D9D4]"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
});

export default SortCountries;
