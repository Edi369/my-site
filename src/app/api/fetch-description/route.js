import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

const descriptionCache = new Map();

async function getWikipediaDescription(article) {
  const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${article}`);
  const data = await response.json();
  return data.extract;
}

function getDescription(html) {
  const $ = cheerio.load(html);
  return $('meta[property="og:description"]').attr('content') ||
    $('meta[name="twitter:description"]').attr('content') ||
    $('meta[name="description"]').attr('content') ||
    $('p').first().text().substring(0, 200) + '...' ||
    undefined;
}

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
      descriptionCache.set(url, undefined);
      return NextResponse.json({ "description": undefined });
    }
    
    const html = await response.text();
    let description = undefined;

    if (url.includes('wikipedia.org')) {
      description = await getWikipediaDescription( url.split('/').pop() );
    } else {
      description = getDescription(html);
    }

    description = description.substring(0, 200) + '...';

    descriptionCache.set(url, description);
    return NextResponse.json({ description });
  } catch (error) {
    console.error('Erro ao buscar descrição:', error);
    return NextResponse.json({ error: 'Falha ao buscar descrição' }, { status: 500 });
  }
}