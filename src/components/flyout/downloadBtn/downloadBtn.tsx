'use client';
import { useAppSelector } from '../../../store/hooks';
import { useTheme } from '../../../utils/context/useThemeHook';

export default function DownloadBtn() {
  const { isDarkTheme } = useTheme();
  const favList = useAppSelector((state) => state.favourites);

  let csvFile = '';
  let objectUrl = '';

  if (favList.length > 0) {
    const formattedFavList = favList.map((character) => ({
      id: character.id,
      name: character.name,
      status: character.status,
      species: character.species,
      type: character.type,
      gender: character.gender,
      origin: character.origin?.name,
      location: character.location?.name,
      image: character.image,
      episode: character.episode,
    }));

    const titles = Object.keys(formattedFavList[0]);
    const array: string[][] = [];
    array.push(titles);
    formattedFavList.forEach((item) => {
      const values = Object.values(item)
        .map((value) => {
          if (typeof value === 'number') {
            return value.toString();
          } else if (typeof value === 'string') {
            return value;
          } else if (value === undefined || value === null) {
            return '';
          } else if (Array.isArray(value)) {
            return value.join(', ');
          } else {
            console.error(
              'Unexpected data type in formattedFavList:',
              value,
              typeof value
            );
            return '';
          }
        })
        .filter((val) => val !== '');
      array.push(values);
    });
    array.forEach((data) => {
      csvFile += `${data.map((item) => `"${item}"`).join(',')}\n`;
    });
    const blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    objectUrl = URL.createObjectURL(blob);
  }
  return (
    <a
      className={`w-[140px] py-[7px] px-[15px] rounded-[5px] ${isDarkTheme ? 'bg-neutral-300' : 'bg-[#ac3b61]'} ${isDarkTheme ? 'text-black' : 'text-white'} ${isDarkTheme ? 'hover:bg-white' : 'hover:bg-[#edc7b7]'}`}
      data-testid="download"
      href={objectUrl}
      download={`${favList.length}_characters.csv`}
    >
      Download
    </a>
  );
}
