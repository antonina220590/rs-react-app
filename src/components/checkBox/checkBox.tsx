import React, { useEffect, useState } from 'react';
import { Character } from '../../utils/interface';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToFav, deleteFromFav } from '../../utils/slices/favouritesSlice';

interface HeartProps {
  character: Character;
}

const Heart = ({ character }: HeartProps) => {
  const dispatch = useAppDispatch();
  const favourites = useAppSelector((state) => state.favourites);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const isFavorite = favourites.some(
      (fav: Character) => fav.id === character.id
    );
    setIsChecked(isFavorite);
  }, [favourites, character.id]);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsChecked((prev) => !prev);

    if (!isChecked) {
      dispatch(addToFav(character));
    } else {
      dispatch(deleteFromFav(character));
    }
  };
  return (
    <div className="h-[80px] flex">
      <input
        id={`${character.id}`}
        type="checkbox"
        className="peer absolute left-[-100vw]"
        checked={isChecked}
        readOnly
      />
      <label
        htmlFor={`${character.id}`}
        onClick={handleClick}
        className={`cursor-pointer text-6xl self-center transition-colors duration-200 ease-in-out hover:text-gray-500 select-none
          ${isChecked ? 'text-[#ac3b61] animate-heart' : 'text-[#aab8c2]'}`}
        style={{ cursor: 'pointer' }}
      >
        ❤
      </label>
    </div>
  );
};

export default Heart;
