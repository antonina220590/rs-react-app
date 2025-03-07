import { notFound } from 'next/navigation';
import Cards from '@/components/cards/cards';
import { getCharacters } from '@/utils/api/api';
import InputClient from '@/components/input/input';
interface HomePageSearchParams {
  name?: string | string[];
  page?: string | string[];
  id?: string | string[];
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

  console.log('HomePage: searchParams:', searchParams);

  const { data: charactersData, error: charactersError } = await getCharacters({
    searchParams: searchParamsLoaded,
    baseUrl,
  });
  // const characterId = searchParamsLoaded.id?.at(0);
  // let _characterData: Character | null = null;

  // if (characterId) {
  //   const characterResult = await getCharacterById({
  //     id: characterId,
  //     baseUrl,
  //   });
  //   if (!characterResult.error) {
  //     _characterData = characterResult.data;
  //   }
  // }

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

  const { results: characters } = charactersData;

  return (
    <div className="flex">
      <div className="flex-1 border-r p-4 overflow-y-auto">
        <InputClient />
        <Cards characters={characters} />
      </div>
      {/* {characterData && <DetailsPage character={characterData} />} */}
    </div>
  );
}
