import { memo } from 'react';
import { CountryCardProps } from '../../interface';
import classNames from 'classnames';

const CountryCard = memo(function CountryCard({
  country,
  isVisited,
  onToggleVisited,
}: CountryCardProps) {
  return (
    <div
      className={classNames(
        `${isVisited ? 'border-2 border-blue-500' : ''}`,
        'flex flex-col max-h-[350px] rounded-md shadow-md hover:scale-105 hover:shadow-xl transition duration-300 bg-[#2E3944]'
      )}
    >
      <div className="flex justify-center flex-col mt-2">
        <input
          type="checkbox"
          checked={isVisited}
          onChange={(e) => onToggleVisited(country.cca3, e.target.checked)}
        />
        <h2 className="text-center font-bold text-[#D3D9D4] max-w-[300px] bg-[#2E3944] rounded-t-md items-center p-3">
          {country.name.common}
        </h2>
      </div>
      <img
        className="h-[150px] w-[300px]"
        src={country.flags.png}
        alt={country.name.common}
      />
      <div className="flex flex-col h-[100px] bg-[#2E3944] rounded-b-md max-w-[300px] p-5 items-center">
        <p className="text-[#D3D9D4] pb-2">
          <span className="font-bold">Population:</span>{' '}
          {country.population.toLocaleString()}
        </p>
        <p className="text-[#D3D9D4]">
          <span className="font-bold">Region: </span> {country.region}
        </p>
      </div>
    </div>
  );
});

export default CountryCard;
