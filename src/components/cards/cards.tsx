import { Link } from 'react-router';
import { CardsProps } from '../../utils/interface';
import Heart from '../checkBox/checkBox';
import { useTheme } from '../../utils/context/useThemeHook';

function Cards({ characters }: CardsProps) {
  const { isDarkTheme } = useTheme();

  return (
    <div className="flex flex-wrap gap-20 m-7 p-10 justify-evenly ">
      {characters.map((character) => (
        <Link
          to={`/character/${character.id}${window.location.search}`}
          key={character.id}
          className={`flex flex-col items-center w-[300px] h-[450px] ${isDarkTheme ? 'bg-[#474b4f]' : 'bg-[#bab2b5]'} rounded-2xl justify-start`}
        >
          <Heart character={character} />{' '}
          <div className="pb-[10px]">
            <img
              className="h-[280px]"
              src={character.image}
              alt={`${character.name} image`}
              data-testid={`character-image-${character.id}`}
            />
          </div>
          <div className="h-[90px]">
            <h3
              className={`font-bold text-4xl p-10 ${isDarkTheme ? 'text-white' : 'text-black'}`}
            >
              {character.name}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Cards;
