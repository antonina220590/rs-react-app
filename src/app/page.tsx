import { notFound } from 'next/navigation';
import { getCharacterById, getCharacters } from '@/utils/api/api';
import { Character, Info, Result } from '@/utils/interface';
import CardList from '@/components/cardList/cardList';
import ErrorPage from '@/components/errorPage/errorPage';
import { Suspense } from 'react';
import Loader from '@/components/loader/loader';
import DetailsPage from '@/components/detailsPage/detailsPage';
import DetailsSpinner from '@/components/detailsSpinner/detailsSpinner';

interface HomePageSearchParams {
  name?: string | string[];
  page?: string;
  id?: string;
  [key: string]: string | string[] | undefined;
}

export default function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <Suspense fallback={<Loader />}>
      <HomePageContent searchParams={searchParams} />
    </Suspense>
  );
}

async function DetailsPageWrapper({
  promise,
}: {
  promise: Promise<Result<Character>>;
}) {
  'use client';
  const characterResult = await promise;

  if (characterResult.error) {
    if (characterResult.error.status === 404) {
      notFound();
    } else {
      return (
        <div>Error fetching character: {characterResult.error.message}</div>
      );
    }
  }

  return <DetailsPage character={characterResult.data} />;
}

async function HomePageContent({
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
  let characterPromise: Promise<Result<Character>> | null = null;

  if (characterId) {
    characterPromise = getCharacterById({ id: characterId });
  }

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

      {characterPromise && (
        <Suspense fallback={<DetailsSpinner />}>
          <DetailsPageWrapper promise={characterPromise} />
        </Suspense>
      )}
    </div>
  );
}
