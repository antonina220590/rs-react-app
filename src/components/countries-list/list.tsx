import { useEffect, useState } from 'react';
import fetchData from '../../api/api';
import { Country } from '../../interface';
import CountryCard from '../coutry-card/cards';

export default function CoutriesList() {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    fetchData()
      .then((data) => setCountries(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <main>
      <div className="flex flex-wrap gap-5 justify-around m-5">
        {countries.map((country) => {
          return (
            <div key={country.cca3}>
              <CountryCard country={country} />
            </div>
          );
        })}
      </div>
    </main>
  );
}
