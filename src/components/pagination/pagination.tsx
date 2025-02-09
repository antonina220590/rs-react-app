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

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      changePage(currentPage + 1);
    }
  };
  return (
    <div className="flex gap-14">
      <button
        className="bg-[#ac3b61] text-amber-50 px-14 py-3 rounded-[5px] hover:bg-[#123C69] disabled:bg-gray-500"
        style={{ cursor: 'pointer' }}
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        data-testid="prevBtn"
      >
        Prev
      </button>
      <input
        className="bg-white text-black text-3xl font-bold w-[60px] h-[30px] px-7 py-8 text-center"
        readOnly
        name="page"
        value={currentPage}
        type="text"
        data-testid="pageNum"
      ></input>
      <button
        className="bg-[#ac3b61] text-amber-50 px-14 rounded-[5px] hover:bg-[#123C69] disabled:bg-gray-500"
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
