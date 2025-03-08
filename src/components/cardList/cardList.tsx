'use client';

import { Character } from '@/utils/interface';
import Cards from '../cards/cards';
import Flyout from '../flyout/flyout';
import InputClient from '../input/input';
import Pagination from '../pagination/pagination';
import DetailsPage from '../detailsPage/detailsPage';
import { useTheme } from '../../utils/context/useThemeHook';

interface CardListProps {
  currentPage: number;
  totalPages: number;
  characters: Character[];
  characterData: Character | null;
}

export default function CardsList({
  currentPage,
  totalPages,
  characters,
  characterData,
}: CardListProps) {
  const { isDarkTheme } = useTheme();
  return (
    <div
      className={`min-h-screen flex flex-col items-center ${
        isDarkTheme ? 'bg-[#474b4f]' : 'bg-[#bab2b5]'
      } bg-cover`}
    >
      <div
        className={`w-[95%] m-10 rounded-xl items-center justify-center mb-8 gap-15 flex flex-wrap relative ${
          isDarkTheme ? 'bg-[#19181A]' : 'bg-[#eee2dc]'
        }`}
      >
        <InputClient />
      </div>
      <div>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
      <div className="flex flex-row w-[95%] relative mt-[20px] justify-center">
        <div
          className={`w-[95%] min-h-dvh ml-[10px] mr-[10px] ${
            isDarkTheme ? 'bg-[#19181A]' : 'bg-[#eee2dc]'
          } backdrop-blur-2xl rounded-xl mb-8 gap-15 justify-center items-center flex flex-wrap flex-row`}
        >
          <div className="flex">
            <div className="w-50% flex flex-wrap">
              <Cards characters={characters} />
            </div>
          </div>
        </div>
        {characterData && <DetailsPage character={characterData} />}
      </div>
      <Flyout />
    </div>
  );
}
