import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useTheme } from '../../utils/context/useThemeHook';
import { Character } from '../../utils/interface';
import { deleteFromFav } from '../../utils/slices/favouritesSlice';
import DownloadBtn from './downloadBtn/downloadBtn';

export default function Flyout() {
  const favList = useAppSelector((state) => state.favourites);
  const dispatch = useAppDispatch();
  const { isDarkTheme } = useTheme();

  const deleteAll = () => {
    favList.forEach((character: Character) => {
      dispatch(deleteFromFav(character));
    });
  };
  return (
    <>
      {favList.length > 0 && (
        <div
          data-testid="flyout"
          className=" fixed bottom-0 flex justify-around items-center w-[70%] h-[9%] bg-gray-500/70 backdrop-blur-lg border border-white/18 rounded-xl shadow-xl"
        >
          <button
            type="button"
            className={`w-[140px] py-[7px] px-[15px] rounded-[5px] ${isDarkTheme ? 'bg-neutral-300' : 'bg-[#ac3b61]'} ${isDarkTheme ? 'text-black' : 'text-white'} ${isDarkTheme ? 'hover:bg-white' : 'hover:bg-[#edc7b7]'}`}
            style={{ cursor: 'pointer' }}
            onClick={deleteAll}
            data-testid="unselectBtn"
          >
            Unselect All
          </button>
          <span className="text-3xl font-bold">
            {favList.length} items added to favourites
          </span>
          <DownloadBtn />
        </div>
      )}
    </>
  );
}
