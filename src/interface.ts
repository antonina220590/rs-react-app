export interface Country {
  name: {
    common: string;
    official: string;
  };
  population: number;
  region: string;
  flags: {
    png: string;
    svg: string;
  };
  cca3: string;
}

export interface CountryCardProps {
  country: Country;
}

export interface DropDownProps {
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  id?: string;
}

export interface SortControlsProps {
  sortOrder: 'asc' | 'desc';
  onSortOrderChange: (value: 'asc' | 'desc') => void;
}

export interface SearchProps {
  searchQuery: string;
  onSearch: (value: string) => void;
}
