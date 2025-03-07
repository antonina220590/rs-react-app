'use client';

import Image from 'next/image';
import { CardsProps } from '../../utils/interface';
import Heart from '../checkBox/checkBox';
import { useTheme } from '../../utils/context/useThemeHook';
import Link from 'next/link';

function Cards({ characters }: CardsProps) {
  const { isDarkTheme } = useTheme();
  console.log('CardList: characters:', characters);

  return (
    <div className="flex flex-wrap gap-20 m-7 p-10 justify-evenly">
      {characters.map((character) => (
        <div
          key={character.id}
          className={`flex flex-col items-center w-[300px] h-[450px] ${isDarkTheme ? 'bg-[#474b4f]' : 'bg-[#bab2b5]'} rounded-2xl justify-start`}
        >
          <Heart character={character} />{' '}
          <Link href={`/characters?id=${character.id}`}>
            <div className="pb-[10px]">
              {character?.image ? (
                <Image
                  className="h-[280px] pt-[20px] w-auto"
                  src={`${character.image}`}
                  alt={`${character.name} image`}
                  width={350}
                  height={350}
                  data-testid={`character-image-${character.id}`}
                  priority
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
            <div className="h-[90px]">
              <h3
                className={`font-bold text-4xl p-10 ${isDarkTheme ? 'text-white' : 'text-black'}`}
                data-testid="nameOfCharacter"
              >
                {character.name}
              </h3>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Cards;
