import { NextResponse } from 'next/server';

const descriptionCache = new Map();

async function getWikipediaDescription(article) {
  try {
    const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${article}`);
    const data = await response.json();
    return data.extract || 'Descrição não encontrada.';
  } catch (error) {
    return 'Descrição não encontrada.';
  }
}

function getDescriptionFromHTML(html) {
    const metaDescriptionMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
    const ogDescriptionMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
    const paragraphMatch = html.match(/<p[^>]*>([^<]+)<\/p>/i);

    if (metaDescriptionMatch) {
      return metaDescriptionMatch[1];
    }
    
    if (ogDescriptionMatch) {
      return ogDescriptionMatch[1];
    }
    
    if (paragraphMatch) {
      return paragraphMatch[1];
    }
    
    return undefined;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  
  if (!url) {
    return NextResponse.json({ error: 'URL é obrigatória' }, { status: 400 });
  }

  if (descriptionCache.has(url)) {
    return NextResponse.json(descriptionCache.get(url));
  }
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      descriptionCache.set(url, { error: 'Erro ao buscar descrição.', status: 400 });
      return NextResponse.json({ error: 'Erro ao buscar descrição.', status: 400 });
    }
    
    let description = undefined;

    if (url.includes('wikipedia.org')) {
      const article = url.split('/').pop();
      description = await getWikipediaDescription(article);
    } else {
      const html = await response.text();
      description = getDescriptionFromHTML(html);
    }

    // Limitar descrição a 200 caracteres
    if (description && description.length > 200) {
      description = description.substring(0, 200) + '...';
    }
    
    descriptionCache.set(url, { description: description });
    return NextResponse.json({ description: description });
  } catch (error) {
    console.error('Erro ao buscar descrição:', error);
    descriptionCache.set(url, { error: 'Erro ao buscar descrição.', status: 400 });
    return NextResponse.json({ error: 'Erro ao buscar descrição.' }, { status: 400 });
  }
}