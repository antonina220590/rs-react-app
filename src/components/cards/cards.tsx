import { Link } from 'react-router';
import { CardsProps } from '../../utils/interface';
import Heart from '../checkBox/checkBox';

function Cards({ characters }: CardsProps) {
  return (
    <div className="flex flex-wrap gap-20 m-7 p-10 justify-evenly ">
      {characters.map((character) => (
        <div
          key={character.id}
          className="flex flex-col items-center w-[300px] h-[520px] bg-gray-500/70 backdrop-blur-lg border border-white/18 rounded-xl shadow-xl justify-end"
        >
          <Heart character={character} />
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

          <div className="h-[100px]">
            <Link
              to={`/character/${character.id}${window.location.search}`}
              key={character.id}
            >
              <button
                type="button"
                className="w-[140px] py-[7px] px-[15px] rounded-[5px] bg-[#ac3b61] text-amber-50 hover:bg-[#edc7b7] hover:text-black"
                style={{ cursor: 'pointer' }}
              >
                Learn More
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;
