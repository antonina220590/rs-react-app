import SearchPage from '../components/searchPage/searchPage';
import { useTheme } from '../utils/context/useThemeHook';

export default function Home() {
  const { isDarkTheme } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col items-center ${isDarkTheme ? 'bg-[#474b4f]' : 'bg-[#bab2b5]'} bg-cover`}
    >
      <SearchPage />
    </div>
  );
}
