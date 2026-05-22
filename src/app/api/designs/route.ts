import { NextRequest, NextResponse } from 'next/server';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: 'Supabase not configured. Using static data fallback.' },
      { status: 503 }
    );
  }

  const supabase = getSupabase();
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
