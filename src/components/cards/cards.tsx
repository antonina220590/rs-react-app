import { Link } from 'react-router';
import { CardsProps } from '../../utils/interface';

function Cards({ characters }: CardsProps) {
  return (
    <div className="flex flex-wrap gap-20 m-7 p-10 justify-evenly ">
      {characters.map((character) => (
        <Link
          to={`/character/${character.id}${window.location.search}`}
          key={character.id}
        >
          <div className="flex flex-col items-center w-[300px] h-[400px] bg-gray-500/70 backdrop-blur-lg border border-white/18 rounded-xl shadow-xl justify-end">
            <div className="">
              <h3 className="font-bold text-4xl p-15">{character.name}</h3>
            </div>
            <div className="pb-[10px]">
              <img className="h-[280px]" src={character.image} alt="image" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Cards;
