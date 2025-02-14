export default function Flyout() {
  return (
    <div className="fixed bottom-0 flex justify-around items-center w-[70%] h-[10%] bg-amber-200 rounded-[5px]">
      <button
        type="button"
        className="w-[140px] py-[7px] px-[15px] rounded-[5px] bg-[#ac3b61] text-amber-50 hover:bg-[#edc7b7] hover:text-black"
        style={{ cursor: 'pointer' }}
      >
        Unselect All
      </button>
      <span>items added to favourites</span>
      <button>Download All</button>
    </div>
  );
}
