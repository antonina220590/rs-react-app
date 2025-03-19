import { useEffect, useState } from 'react';
import fetchData from '../../api/api';
import { Country } from '../../interface';
import { regions } from '../../constants';
import CountryCard from '../coutry-card/cards';
import DropDownElement from '../filter-input/drop-down';
export default function CoutriesList() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  useEffect(() => {
    fetchData()
      .then((data) => setCountries(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const filteredCountries =
    selectedRegion === 'All'
      ? countries
      : countries.filter((country) => country.region === selectedRegion);

  return (
    <main>
      <div className="flex flex-col">
        <DropDownElement
          id="region-select"
          options={regions}
          selectedValue={selectedRegion}
          onSelect={setSelectedRegion}
          placeholder="Filter by region"
        />
        <div className="flex flex-wrap gap-8 justify-evenly m-5">
          {filteredCountries.map((country) => {
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
