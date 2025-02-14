import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Character } from '../../utils/interface';
import { deleteFromFav } from '../../utils/slices/favouritesSlice';

export default function Flyout() {
  const favList = useAppSelector((state) => state.favourites);
  const dispatch = useAppDispatch();

  const deleteAll = () => {
    favList.forEach((character: Character) => {
      dispatch(deleteFromFav(character));
    });
  };
  return (
    <>
      {favList.length > 0 && (
        <div className=" fixed bottom-0 flex justify-around items-center w-[70%] h-[10%] bg-amber-200 rounded-[5px]">
          <button
            type="button"
            className="w-[140px] py-[7px] px-[15px] rounded-[5px] bg-[#ac3b61] text-amber-50 hover:bg-[#edc7b7] hover:text-black"
            style={{ cursor: 'pointer' }}
            onClick={deleteAll}
          >
            Unselect All
          </button>
          <span className="text-3xl font-bold">
            {favList.length} items added to favourites
          </span>
          <button>Download All</button>
        </div>
      )}
    </>
  );
}
