import { useEffect, useState } from 'react';
import fetchData from '../../api/api';
import { Country } from '../../interface';
import { regions } from '../../constants';
import CountryCard from '../coutry-card/cards';
import DropDownElement from '../filter-input/drop-down';
import SortCountries from '../sort-input/sorting';
import SearchInput from '../search-input/search';
export default function CoutriesList() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visitedCountries, setVisitedCountries] = useState<string[]>([]);

  useEffect(() => {
    fetchData()
      .then((data) => setCountries(data))
      .catch((error) => console.error('Error fetching data:', error));

    const savedVisitedCountries = localStorage.getItem('visitedCountries');
    if (savedVisitedCountries) {
      setVisitedCountries(JSON.parse(savedVisitedCountries));
    }
  }, []);

  const handleToggleVisited = (cca3: string, isVisited: boolean) => {
    setVisitedCountries((prev) => {
      let newVisited;
      if (isVisited) {
        newVisited = [...prev, cca3];
      } else {
        newVisited = prev.filter((id) => id !== cca3);
      }
      localStorage.setItem('visitedCountries', JSON.stringify(newVisited));
      return newVisited;
    });
  };

  const searchedCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const searchedCountries = useMemo(() => {
  //   return countries.filter((country) =>
  //     country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  // }, [countries, searchQuery]);

  const filteredCountries =
    selectedRegion === 'All'
      ? searchedCountries
      : searchedCountries.filter(
          (country) => country.region === selectedRegion
        );

  // const filteredCountries = useMemo(() => {
  //   return selectedRegion === 'All'
  //     ? searchedCountries
  //     : searchedCountries.filter(
  //         (country) => country.region === selectedRegion
  //       );
  // }, [searchedCountries, selectedRegion]);

  const sortedCountries = [...filteredCountries].sort((a, b) => {
    return sortOrder === 'asc'
      ? a.population - b.population
      : b.population - a.population;
  });

  // const sortedCountries = useMemo(() => {
  //   return [...filteredCountries].sort((a, b) => {
  //     return sortOrder === 'asc'
  //       ? a.population - b.population
  //       : b.population - a.population;
  //   });
  // }, [filteredCountries, sortOrder]);

  return (
    <main>
      <SearchInput searchQuery={searchQuery} onSearch={setSearchQuery} />
      <div className="flex flex-col">
        <div className="flex justify-around">
          <DropDownElement
            options={regions}
            selectedValue={selectedRegion}
            onSelect={setSelectedRegion}
            placeholder="Filter by region"
          />
          <SortCountries
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
          />
        </div>
        <div className="flex flex-wrap gap-8 justify-evenly m-5">
          {sortedCountries.map((country) => {
            return (
              <div key={country.cca3}>
                <CountryCard
                  country={country}
                  isVisited={visitedCountries.includes(country.cca3)}
                  onToggleVisited={handleToggleVisited}
                />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
