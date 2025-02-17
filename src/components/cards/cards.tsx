import { Link } from 'react-router';
import { CardsProps } from '../../utils/interface';
import Heart from '../checkBox/checkBox';

function Cards({ characters }: CardsProps) {
  return (
    <div className="flex flex-wrap gap-20 m-7 p-10 justify-evenly ">
      {characters.map((character) => (
        <Link
          to={`/character/${character.id}${window.location.search}`}
          key={character.id}
          className="flex flex-col items-center w-[300px] h-[520px] bg-gray-500/70 backdrop-blur-lg border border-white/18 rounded-xl shadow-xl justify-start"
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
            <h3 className="font-bold text-4xl p-10">{character.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Cards;
