import { notFound } from 'next/navigation';
import { getCharacterById, getCharacters } from '@/utils/api/api';
import { Character, Info } from '@/utils/interface';
import CardList from '@/components/cardList/cardList';
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
    <CardList
      currentPage={currentPage}
      totalPages={totalPages}
      characters={characters}
      characterData={characterData}
    />
  );
}
