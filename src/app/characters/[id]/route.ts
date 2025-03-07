import { NextResponse } from 'next/server';
const API_BASE_URL = 'https://rickandmortyapi.com/api/character';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const res = await fetch(`${API_BASE_URL}/${id}`);

    if (!res.ok) {
      if (res.status === 404) {
        return NextResponse.json(
          { message: 'Character not found' },
          { status: 404 }
        );
      }
      const errorText = await res.text();
      console.error('Error fetching character by id', res.status, errorText);
      return NextResponse.json(
        { message: `Failed to fetch character: ${errorText}` },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in API route:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { message: `Failed to fetch character: ${errorMessage}` },
      { status: 500 }
    );
  }
}
