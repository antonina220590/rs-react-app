import Image from 'next/image';
import { useTheme } from '../../utils/context/useThemeHook';
import { DetailsPageProps } from '../../utils/interface';
import Spinner from '../spinner/spinners';
import Custom404 from '../../pages/404';

function DetailsPage({
  character,
  closeCard,
  fetching,
  error,
}: DetailsPageProps) {
  const { isDarkTheme } = useTheme();

  if (error) {
    return <Custom404 />;
  }

  return (
    <div className="flex flex-wrap gap-20 pl-[10px] pr-[10px] justify-evenly flex-1">
      <div
        className={`flex flex-col items-center w-[500px] h-[710px] ${isDarkTheme ? 'bg-[#19181A]' : 'bg-[#eee2dc]'}  rounded-xl sticky top-0`}
      >
        {fetching ? (
          <div className="flex justify-center items-center h-full">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="pb-[10px] pt-[20px]">
              {character?.image ? (
                <Image
                  className="h-[350px] pt-[20px] w-auto"
                  src={`${character.image}`}
                  alt="image"
                  width={350}
                  height={350}
                  priority
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
            <div className="pb-[20px] flex flex-col items-center">
              <h3
                data-testid="characterName"
                className={`flex text-center font-bold text-5xl p-15 ${isDarkTheme ? 'text-white' : 'text-black'}`}
              >
                {character?.name}
              </h3>
              <div className="flex flex-col items-start">
                <p
                  className={`font-bold text-4xl pb-[10px] ${isDarkTheme ? 'text-white' : 'text-black'}`}
                  data-testid="characterStatus"
                >
                  Status:{' '}
                  <span className="font-normal">{character?.status}</span>
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
