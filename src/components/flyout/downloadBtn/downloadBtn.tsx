import { useAppSelector } from '../../../app/hooks';

export default function DownloadBtn() {
  const favList = useAppSelector((state) => state.favourites);
  let csvFile = '';
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

  if (formattedFavList.length) {
    const titles = Object.keys(formattedFavList[0]);
    const array = [];
    array.push(titles);
    formattedFavList.forEach((item) => {
      array.push(Object.values(item));
    });
    array.forEach((data) => {
      csvFile += `${data.map((item) => `"${item}"`).join(',')}\n`;
    });
  }

  const blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
  const objectUrl = URL.createObjectURL(blob);

  return (
    <a
      className="w-[140px] py-[7px] px-[15px] rounded-[5px] bg-[#ac3b61] text-amber-50 hover:bg-[#edc7b7] hover:text-black"
      data-testid="download"
      href={objectUrl}
      download={`${favList.length}_characters.csv`}
    >
      Download
    </a>
  );
}
