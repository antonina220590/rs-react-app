import React, { useState } from 'react';

interface HeartProps {
  id: string;
}

const Heart = ({ id }: HeartProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsChecked(!isChecked);
  };
  return (
    <div className="h-[80px] flex">
      <input
        id={id}
        type="checkbox"
        className="peer absolute left-[-100vw]"
        checked={isChecked}
        onChange={() => {}}
      />
      <label
        htmlFor={id}
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
