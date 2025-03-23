import { memo } from 'react';
import { DropDownProps } from '../../interface';

const DropDownElement = memo(function DropDownElement({
  options,
  selectedValue,
  onSelect,
  placeholder,
}: DropDownProps) {
  return (
    <select
      className="w-[150px] bg-[#2E3944] p-2 rounded-md m-5 text-[#D3D9D4]"
      value={selectedValue}
      onChange={(e) => onSelect(e.target.value)}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
});

export default DropDownElement;
