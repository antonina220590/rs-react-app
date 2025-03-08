import { notFound } from 'next/navigation';
import Cards from '@/components/cards/cards';
import { getCharacterById, getCharacters } from '@/utils/api/api';
import InputClient from '@/components/input/input';
import { Character, Info } from '@/utils/interface';
import DetailsPage from '@/components/detailsPage/detailsPage';
import Pagination from '@/components/pagination/pagination';
import { Suspense } from 'react';
import Flyout from '@/components/flyout/flyout';
interface HomePageSearchParams {
  name?: string | string[];
  page?: string;
  id?: string;
  [key: string]: string | string[] | undefined;
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
  const { data: charactersData, error: charactersError } = await getCharacters({
    searchParams: { ...searchParamsLoaded, page: currentPage.toString() },
    baseUrl,
  });
  const characterId = searchParamsLoaded.id;
  let characterData: Character | null = null;

  if (characterId) {
    const characterResult = await getCharacterById({
      id: characterId,
    });
    if (!characterResult.error) {
      characterData = characterResult.data;
    }
  }

  if (charactersError?.status === 404) {
    return notFound();
  }

  if (charactersError) {
    return <div>Error fetching characters</div>;
  }

  if (!charactersData) {
    return <div>Loading...</div>;
  }

  if ('results' in charactersData && charactersData.results.length === 0) {
    return <div>No characters found.</div>;
  }

  const { results: characters, info } = charactersData;

  const totalPages = (info as Info)?.pages ?? 1;

  return (
    <div className="flex">
      <div className="flex-1 border-r p-4 overflow-y-auto">
        <InputClient />

        <Pagination currentPage={currentPage} totalPages={totalPages} />

        <Suspense fallback={<div>Loading...</div>}>
          <Cards characters={characters} />
        </Suspense>
      </div>
      {characterData && <DetailsPage character={characterData} />}
      <Flyout />
    </div>
  );
}
