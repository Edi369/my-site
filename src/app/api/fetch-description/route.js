import { NextResponse } from 'next/server';
import ogs from 'open-graph-scraper';

const descriptionCache = new Map();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  
  if (!url) {
    return NextResponse.json({ error: 'URL é obrigatória' }, { status: 400 });
  }

  if (descriptionCache.has(url)) {
    return NextResponse.json({ description: descriptionCache.get(url) });
  }
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Falha ao buscar página' }, { status: response.status });
    }
    
    const { result } = await ogs({ url });
    const description = result.ogDescription || result.twitterDescription || result.description;

    descriptionCache.set(url, description);
    
    return NextResponse.json({ description });
  } catch (error) {
    console.error('Erro ao buscar descrição:', error);
    return NextResponse.json({ error: 'Falha ao buscar descrição' }, { status: 500 });
  }
}