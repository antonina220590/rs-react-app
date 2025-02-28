import { useTheme } from '../../utils/context/useThemeHook';
import { DetailsPageProps } from '../../utils/interface';
import Spinner from '../spinner/spinners';

function DetailsPage({ character, closeCard, fetching }: DetailsPageProps) {
  const { isDarkTheme } = useTheme();

  return (
    <div className="flex flex-wrap gap-20 pl-[10px] pr-[10px] justify-evenly flex-1">
      <div
        className={`flex flex-col items-center w-[500px] h-[700px] ${isDarkTheme ? 'bg-[#19181A]' : 'bg-[#eee2dc]'}  rounded-xl sticky top-0`}
      >
        {fetching ? (
          <div className="flex justify-center items-center h-full">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="pb-[10px] pt-[20px]">
              <img
                className="h-[350px] pt-[20px]"
                src={character?.image}
                alt="image"
              />
            </div>
            <div className="pb-[20px]">
              <h3
                data-testid="characterName"
                className={`font-bold text-5xl p-15 ${isDarkTheme ? 'text-white' : 'text-black'}`}
              >
                {character?.name}
              </h3>
              <p
                className={`font-bold text-4xl pb-[10px] ${isDarkTheme ? 'text-white' : 'text-black'}`}
                data-testid="characterStatus"
              >
                Status: <span className="font-normal">{character?.status}</span>
              </p>
              <p
                className={`font-bold text-4xl pb-[10px] ${isDarkTheme ? 'text-white' : 'text-black'}`}
              >
                Species:{' '}
                <span className="font-normal" data-testid="characterSpecies">
                  {character?.species}
                </span>
              </p>
              <p
                className={`font-bold text-4xl pb-[10px] ${isDarkTheme ? 'text-white' : 'text-black'}`}
              >
                Gender:{' '}
                <span className="font-normal" data-testid="characterGender">
                  {character?.gender}
                </span>
              </p>
            </div>
            <button
              className={`w-[150px] h-[50px] cursor-pointer rounded-md ${isDarkTheme ? 'bg-neutral-300' : 'bg-[#ac3b61]'} ${isDarkTheme ? 'text-black' : 'text-white'} ${isDarkTheme ? 'hover:bg-white' : 'hover:bg-[#edc7b7]'} text-3xl border-none`}
              type="button"
              onClick={closeCard}
              data-testid="closeCardBtn"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default DetailsPage;
