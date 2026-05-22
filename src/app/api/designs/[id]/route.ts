import { NextRequest, NextResponse } from 'next/server';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: 'Supabase not configured' },
      { status: 503 }
    );
  }

  const { id } = await params;
  const designId = parseInt(id, 10);

  if (isNaN(designId)) {
    return NextResponse.json(
      { error: 'Invalid design ID' },
      { status: 400 }
    );
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('designs')
    .select('*')
    .eq('id', designId)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: 'Design not found' },
      { status: 404 }
    );
  }

  // Increment view count (fire-and-forget)
  supabase
    .from('designs')
    .update({ views: (data.views || 0) + 1 })
    .eq('id', designId)
    .then(() => {});

  return NextResponse.json({ design: data });
}
