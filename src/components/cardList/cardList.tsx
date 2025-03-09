'use client';

import { Character } from '@/utils/interface';
import Cards from '../cards/cards';
import Flyout from '../flyout/flyout';
import InputClient from '../input/input';
import Pagination from '../pagination/pagination';
import { useTheme } from '../../utils/context/useThemeHook';

interface CardListProps {
  currentPage: number;
  totalPages: number;
  characters: Character[];
}

export default function CardsList({
  currentPage,
  totalPages,
  characters,
}: CardListProps) {
  const { isDarkTheme } = useTheme();
  return (
    <div
      className={`min-h-screen flex w-full flex-col items-center ${
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
            <div className="w-100% flex flex-wrap">
              <Cards characters={characters} />
            </div>
          </div>
        </div>
      </div>
      <Flyout />
    </div>
  );
}
