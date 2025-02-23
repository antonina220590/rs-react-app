import { useTheme } from '../../utils/context/useThemeHook';
import { PaginationProps } from '../../utils/interface';

export default function Pagination({
  currentPage,
  totalPages,
  changePage,
}: PaginationProps) {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      changePage(currentPage - 1);
    }
  };
  const { isDarkTheme } = useTheme();

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      changePage(currentPage + 1);
    }
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
