import { useCallback } from 'react';
import Input from '../input/input';
import Cards from '../cards/cards';
import Pagination from '../pagination/pagination';
import { useRouter } from 'next/router';
import Flyout from '../flyout/flyout';
import { useGetCharacterByIdQuery } from '../../utils/slices/apiSlice';
import { useTheme } from '../../utils/context/useThemeHook';
import DetailsPage from '../detailsPage/detailsPage';
import { QueryParams, SearchPageProps } from '../../utils/interface';

function SearchPage({
  initialData,
  initialCharacter,
  error,
  notFound,
}: SearchPageProps) {
  const router = useRouter();
  const { search, page, id } = router.query;

  const searchQuery = typeof search === 'string' ? search : '';
  const currentPage = typeof page === 'string' ? parseInt(page, 10) : 1;
  const { isDarkTheme } = useTheme();

  const {
    data: characterData,
    error: characterError,
    isLoading: characterLoading,
    isFetching,
  } = useGetCharacterByIdQuery(id ? String(id) : '', {
    skip: !id,
  });

  const displayCharacter = initialCharacter || characterData;

  const handlePageChange = useCallback(
    (newPage: number) => {
      const newQuery: QueryParams = {
        ...router.query,
        page: newPage.toString(),
      };
      if (newQuery.id) {
        delete newQuery.id;
      }
      router.push({ pathname: router.pathname, query: newQuery });
    },
    [router]
  );

  const handleCardClick = useCallback(
    (charId: number) => {
      console.log(characterLoading);
      router.push({
        pathname: router.pathname,
        query: { ...router.query, id: charId },
      });
    },
    [router]
  );

  const closeCard = useCallback(() => {
    const { id, ...restQuery } = router.query;

    if (typeof id === 'string' || typeof id === 'undefined') {
      router.push({ pathname: router.pathname, query: restQuery });
    } else {
      console.error('Unexpected type for id:', id);
    }
  }, [router]);

  const displayData = initialData;

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (notFound) {
    return <p>no results</p>;
  }

  return (
    <div className="w-[90%] flex flex-col items-center">
      <div
        className={`w-[95%] m-10 rounded-xl items-center justify-center mb-8 gap-15 flex flex-wrap relative ${
          isDarkTheme ? 'bg-[#19181A]' : 'bg-[#eee2dc]'
        }`}
      >
        <Input initialSearchQuery={searchQuery} />
      </div>
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={initialData.info.pages || 1}
          changePage={handlePageChange}
        />
      </div>

      <div className="flex flex-row w-[95%] relative mt-[20px] justify-center">
        <div
          className={`w-[95%] min-h-dvh ml-[10px] mr-[10px] ${
            isDarkTheme ? 'bg-[#19181A]' : 'bg-[#eee2dc]'
          } backdrop-blur-2xl rounded-xl mb-8 gap-15 justify-center items-center flex flex-wrap flex-row`}
        >
          {!displayData || displayData.results.length === 0 ? (
            <p>no results</p>
          ) : (
            <div className="flex">
              <div className="w-50% flex flex-wrap">
                <Cards
                  characters={displayData.results}
                  onCardClick={handleCardClick}
                />
              </div>
            </div>
          )}
        </div>
        {id && displayCharacter && (
          <DetailsPage
            character={displayCharacter}
            closeCard={closeCard}
            fetching={isFetching}
            error={characterError}
            loading={characterLoading}
          />
        )}
      </div>
      <Flyout />
    </div>
  );
}
export default SearchPage;
