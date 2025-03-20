import { useEffect, useState } from 'react';
import fetchData from '../../api/api';
import { Country } from '../../interface';
import { regions } from '../../constants';
import CountryCard from '../coutry-card/cards';
import DropDownElement from '../filter-input/drop-down';
import SortCountries from '../sort-input/sorting';
export default function CoutriesList() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetchData()
      .then((data) => setCountries(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const filteredCountries =
    selectedRegion === 'All'
      ? countries
      : countries.filter((country) => country.region === selectedRegion);

  const sortedCountries = [...filteredCountries].sort((a, b) => {
    return sortOrder === 'asc'
      ? a.population - b.population
      : b.population - a.population;
  });

  return (
    <main>
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
                <CountryCard country={country} />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
