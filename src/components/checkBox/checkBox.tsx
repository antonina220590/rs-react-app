import React, { useEffect, useState } from 'react';
import { Character } from '../../utils/interface';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToFav, deleteFromFav } from '../../utils/slices/favouritesSlice';
import { useTheme } from '../../utils/context/useThemeHook';

interface HeartProps {
  character: Character;
}

const Heart = ({ character }: HeartProps) => {
  const dispatch = useAppDispatch();
  const favourites = useAppSelector((state) => state.favourites);
  const [isChecked, setIsChecked] = useState(false);
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    const isFavorite = favourites.some(
      (fav: Character) => fav.id === character.id
    );
    setIsChecked(isFavorite);
  }, [favourites, character.id]);

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsChecked((prev) => !prev);

    if (!isChecked) {
      dispatch(addToFav(character));
    } else {
      dispatch(deleteFromFav(character));
    }
  };
  return (
    <div className="flex justify-center" onClick={(e) => e.stopPropagation()}>
      <input
        id={`${character.id}`}
        type="checkbox"
        className="peer absolute left-[-100vw] hidden"
        checked={isChecked}
        readOnly
      />
      <label
        htmlFor={`${character.id}`}
        onClick={handleClick}
        className={`cursor-pointer p-[10px] text-6xl self-center transition-colors duration-200 ease-in-out select-none

          ${isChecked ? 'text-[#ac3b61] animate-heart' : isDarkTheme ? 'text-[#19181A]' : 'text-[#eee2dc]'}`}
        style={{ cursor: 'pointer' }}
      >
        ❤
      </label>
    </div>
  );
};

export default Heart;
