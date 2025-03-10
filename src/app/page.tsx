import { notFound } from 'next/navigation';
import { getCharacterById, getCharacters } from '@/utils/api/api';
import { Character, Info, Result } from '@/utils/interface';
import CardList from '@/components/cardList/cardList';
import ErrorPage from '@/components/errorPage/errorPage';
import DetailsPage from '@/components/detailsPage/detailsPage';

interface HomePageSearchParams {
  name?: string | string[];
  page?: string;
  id?: string;
  [key: string]: string | string[] | undefined;
}

function DetailsPageWrapper({ result }: { result: Result<Character> | null }) {
  if (!result) {
    return null;
  }

  if (result.error) {
    if (result.error.status === 404) {
      notFound();
    } else {
      return <div>Error fetching character: {result.error.message}</div>;
    }
  }

  return <DetailsPage character={result.data} />;
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: HomePageSearchParams;
}) {
  const searchParamsLoaded = await Promise.resolve(searchParams);

  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const baseUrl = `${protocol}://${process.env.NEXT_PUBLIC_VERCEL_URL || 'localhost:3000'}`;
  const currentPage =
    typeof searchParamsLoaded.page?.[0] === 'string'
      ? parseInt(searchParamsLoaded.page, 10)
      : 1;

  const characterId = searchParamsLoaded.id;

  const [charactersResult, characterResult] = await Promise.all([
    getCharacters({
      searchParams: { ...searchParamsLoaded, page: currentPage.toString() },
      baseUrl,
    }),
    characterId ? getCharacterById({ id: characterId }) : Promise.resolve(null),
  ]);

  const { data: charactersData, error: charactersError } = charactersResult;

  if (!charactersData || !('results' in charactersData)) {
    return <div>Loading...</div>;
  }

  if (charactersError) {
    return <div>Error fetching characters</div>;
  }

  if ('results' in charactersData && charactersData.results.length === 0) {
    return <ErrorPage />;
  }

  const { results: characters, info } = charactersData;
  const totalPages = (info as Info)?.pages ?? 1;

  return (
    <div className="flex flex-row">
      <CardList
        currentPage={currentPage}
        totalPages={totalPages}
        characters={characters}
      />
      {characterId && <DetailsPageWrapper result={characterResult} />}
    </div>
  );
}
