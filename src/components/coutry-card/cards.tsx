import { CountryCardProps } from '../../interface';
export default function CountryCard({ country }: CountryCardProps) {
  return (
    <div className="flex flex-col max-h-[350px] rounded-md shadow-md hover:scale-105 hover:shadow-xl transition duration-300">
      <img
        className="h-[200px] w-[300px] rounded-t-md"
        src={country.flags.png}
        alt={country.name.common}
      />
      <div className="flex flex-col h-[110px] bg-[#2E3944] rounded-b-md max-w-[300px]">
        <h2 className="text-center font-bold text-2xl text-[#D3D9D4]">
          {country.name.common}
        </h2>
        <p className="text-[#D3D9D4]">Population: {country.population}</p>
        <p className="text-[#D3D9D4]">Region: {country.region}</p>
      </div>
    </div>
  );
}
