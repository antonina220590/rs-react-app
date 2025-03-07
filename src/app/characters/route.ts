import { ApiResponse } from '@/utils/interface';
import { NextResponse } from 'next/server';

const API_BASE_URL = 'https://rickandmortyapi.com/api/character';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name') || '';
    const page = searchParams.get('page') || '1';

    const url = new URL(API_BASE_URL);
    if (name) url.searchParams.append('name', name);
    if (page) url.searchParams.append('page', page);

    const res = await fetch(url.toString());

    if (!res.ok) {
      if (res.status === 404) {
        return NextResponse.json({ info: {}, results: [] }, { status: 200 });
      }
      const errorText = await res.text();
      return NextResponse.json(
        { message: `Failed to fetch characters: ${errorText}` },
        { status: res.status }
      );
    }

    const data: ApiResponse = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { message: `Failed to fetch characters: ${errorMessage}` },
      { status: 500 }
    );
  }
}
