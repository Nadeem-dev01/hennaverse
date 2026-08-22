import { NextRequest, NextResponse } from 'next/server';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';
import { designs as staticDesigns } from '@/data/designs';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const country = searchParams.get('country');
  const style = searchParams.get('style');
  const difficulty = searchParams.get('difficulty');
  const occasion = searchParams.get('occasion');
  const search = searchParams.get('search');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = Math.min(parseInt(searchParams.get('limit') || '24', 10), 100);
  const sortBy = searchParams.get('sort') || 'created_at';
  const order = searchParams.get('order') === 'asc' ? true : false;

  if (!isSupabaseConfigured()) {
    // Fallback: handle in-memory static designs
    let filtered = staticDesigns;
    if (country && country !== 'All') {
      filtered = filtered.filter(d => d.country === country);
    }
    if (style && style !== 'All') {
      filtered = filtered.filter(d => d.style === style);
    }
    if (difficulty && difficulty !== 'All') {
      filtered = filtered.filter(d => d.difficulty === difficulty);
    }
    if (occasion && occasion !== 'All') {
      filtered = filtered.filter(d => d.occasion === occasion);
    }
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(d => 
        d.title.toLowerCase().includes(s) || 
        d.description.toLowerCase().includes(s) || 
        d.tags.some(t => t.toLowerCase().includes(s))
      );
    }

    const total = filtered.length;
    const from = (page - 1) * limit;
    const to = from + limit;
    
    // Sort logic placeholder (already mostly sorted by whatever is in index)
    
    const paginated = filtered.slice(from, to).map(d => ({
        id: d.id,
        title: d.title,
        description: d.description,
        country: d.country,
        style: d.style,
        occasion: d.occasion,
        difficulty: d.difficulty,
        image_url: d.imageUrl,
        thumbnail_url: d.imageUrl,
        tags: d.tags,
        pixabay_id: d.pixabay_id || null,
        views: d.views || 0,
        likes: d.likes || 0,
        photographer: d.photographer || null,
        source: d.source || 'static',
        created_at: new Date().toISOString()
    }));

    return NextResponse.json({
      designs: paginated,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: to < total,
      },
    });
  }

  const supabase = getSupabase();

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from('designs')
    .select('*', { count: 'exact' });

  // Apply filters
  if (country && country !== 'All') {
    query = query.eq('country', country);
  }
  if (style && style !== 'All') {
    query = query.eq('style', style);
  }
  if (difficulty && difficulty !== 'All') {
    query = query.eq('difficulty', difficulty);
  }
  if (occasion && occasion !== 'All') {
    query = query.eq('occasion', occasion);
  }

  // Full-text search
  if (search) {
    query = query.or(
      `title.ilike.%${search}%,description.ilike.%${search}%,country.ilike.%${search}%,style.ilike.%${search}%`
    );
  }

  // Sort and paginate
  const validSorts = ['created_at', 'title', 'views', 'likes', 'difficulty'];
  const sortField = validSorts.includes(sortBy) ? sortBy : 'created_at';

  query = query
    .order(sortField, { ascending: order })
    .range(from, to);

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    designs: data || [],
    pagination: {
      page,
      limit,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
      hasMore: to < (count || 0) - 1,
    },
  });
}
