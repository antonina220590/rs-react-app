'use client';

import MoonIcon from '../../icons/moonIcon/moonIcon';
import SunIcon from '../../icons/sunIcon/sunIcon';
import { useTheme } from '../../utils/context/useThemeHook';

function ThemeBtn() {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <button
      data-testid="themeBtn"
      onClick={toggleTheme}
      className={`${isDarkTheme ? 'bg-neutral-300' : 'bg-[#ac3b61]'} ${isDarkTheme ? 'text-black' : 'text-white'} p-3 rounded-[5px] cursor-pointer ${isDarkTheme ? 'hover:bg-white' : 'hover:bg-[#edc7b7]'}`}
    >
      {isDarkTheme ? (
        <SunIcon className={`w-[30px]`} />
      ) : (
        <MoonIcon className="w-[30px]" />
      )}
    </button>
  );
}

export default ThemeBtn;
