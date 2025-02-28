import SearchPage from '../components/searchPage/searchPage';
import { useTheme } from '../utils/context/useThemeHook';
import { GetServerSideProps } from 'next';
import { ApiResponse } from '../utils/interface';
import { wrapper } from '../services/store';
import { apiSlice } from '../utils/slices/apiSlice';

const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { query } = context;

    let searchQuery: string = '';
    if (query.search) {
      if (Array.isArray(query.search)) {
        searchQuery = query.search[0];
        console.warn(
          'Multiple search parameters detected. Using the first one.'
        );
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
      const result = await store.dispatch(
        apiSlice.endpoints.getCharacters.initiate({ searchQuery, currentPage })
      );

      if ('error' in result) {
        console.log(
          'getServerSideProps: Returning notFound: true (RTK Query error)',
          result.error
        );
        return {
          notFound: true,
        };
      }

      if (!result.data || result.data.results.length === 0) {
        console.log('getServerSideProps: Returning notFound: true (no data)');
        return {
          notFound: true,
        };
      }

      return {
        props: {
          initialData: result.data,
          initialSearchQuery: searchQuery,
          initialPage: currentPage,
        },
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      console.log('getServerSideProps: Returning notFound: true (catch error)');
      // return {
      //   props: {
      //     initialData: {
      //       results: [],
      //       info: { count: 0, pages: 0, next: null, prev: null },
      //     },
      //     initialSearchQuery: searchQuery,
      //     initialPage: currentPage,
      //   },
      // };
      return {
        notFound: true,
      };
    }
  }
);

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
