import SearchPage from '../components/searchPage/searchPage';
import { useTheme } from '../utils/context/useThemeHook';
import { GetServerSideProps } from 'next';
import { ApiResponse } from '../utils/interface';

const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;

  let searchQuery: string = '';
  if (query.search) {
    if (Array.isArray(query.search)) {
      searchQuery = query.search.join(',');
      console.warn('Multiple search parameters detected. Using the first one.');
    } else if (typeof query.search === 'string') {
      searchQuery = query.search;
    } else {
      console.error('Invalid search parameter type.');
    }
  }

  let currentPage: number = 1;
  if (query.page) {
    if (Array.isArray(query.page)) {
      currentPage = parseInt(query.page[0], 10) || 1;
      console.warn('Multiple page parameters detected. Using the first one.');
    } else if (typeof query.page === 'string') {
      currentPage = parseInt(query.page, 10) || 1;
    } else {
      console.error('Invalid page parameter type.');
    }
  }

  try {
    const res = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(
        searchQuery
      )}&page=${currentPage}`
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const initialData: ApiResponse = await res.json();
    return { props: { initialData } };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        initialData: {
          results: [],
          info: { count: 0, pages: 0, next: null, prev: null },
        },
      },
    };
  }
};

function Home({ initialData }: { initialData: ApiResponse }) {
  const { isDarkTheme } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col items-center ${isDarkTheme ? 'bg-[#474b4f]' : 'bg-[#bab2b5]'} bg-cover`}
    >
      <SearchPage initialData={initialData} />
    </div>
  );
}
export default Home;
export { getServerSideProps };
