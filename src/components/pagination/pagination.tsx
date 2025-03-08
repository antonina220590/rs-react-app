'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTheme } from '../../utils/context/useThemeHook';
import { PaginationProps } from '../../utils/interface';
import { useCallback } from 'react';

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const { isDarkTheme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);

      params.set(name, value);

      if (name === 'page' && !value) {
        params.delete(name);
      }
      params.delete('id');
      return params.toString();
    },
    [searchParams]
  );

  const changePage = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
        const newUrl = `/?${createQueryString('page', newPage.toString())}`;
        router.push(newUrl);
      }
    },
    [router, totalPages, createQueryString]
  );

  const handlePrevClick = () => {
    changePage(currentPage - 1);
  };

  const handleNextClick = () => {
    changePage(currentPage + 1);
  };
  return (
    <div className="flex gap-14">
      <button
        className={`${isDarkTheme ? 'bg-neutral-300' : 'bg-[#ac3b61]'} ${isDarkTheme ? 'text-black' : 'text-white'} px-14 py-3 rounded-[5px] ${isDarkTheme ? 'hover:bg-white' : 'hover:bg-[#edc7b7]'} disabled:bg-gray-500`}
        style={{ cursor: 'pointer' }}
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        data-testid="prevBtn"
      >
        Prev
      </button>
      <input
        className={` ${isDarkTheme ? 'bg-[#19181A]' : 'bg-white'} ${isDarkTheme ? 'text-white' : 'text-black'} t text-3xl font-bold w-[60px] h-[30px] px-7 py-8 text-center`}
        readOnly
        name="page"
        value={currentPage}
        type="text"
        data-testid="pageNum"
      ></input>
      <button
        className={`${isDarkTheme ? 'bg-neutral-300' : 'bg-[#ac3b61]'} ${isDarkTheme ? 'text-black' : 'text-white'} px-14 py-3 rounded-[5px] ${isDarkTheme ? 'hover:bg-white' : 'hover:bg-[#edc7b7]'} disabled:bg-gray-500`}
        style={{ cursor: 'pointer' }}
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        data-testid="nextBtn"
      >
        Next
      </button>
    </div>
  );
}
