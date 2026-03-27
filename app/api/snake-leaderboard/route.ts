import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  const { data, error } = await supabase
    .from('snake_leaderboard')
    .select('*')
    .order('score', { ascending: false })
    .limit(10);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, score } = body;

  if (!name?.trim() || typeof score !== 'number') {
    return NextResponse.json({ error: 'Name and score are required.' }, { status: 400 });
  }

  if (name.trim().length > 20) {
    return NextResponse.json({ error: 'Name too long (max 20 chars).' }, { status: 400 });
  }

  if (score < 10 || score > 99999) {
    return NextResponse.json({ error: 'Invalid score.' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('snake_leaderboard')
    .insert({ name: name.trim(), score })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Check rank
  const { count } = await supabase
    .from('snake_leaderboard')
    .select('*', { count: 'exact', head: true })
    .gt('score', score);

  return NextResponse.json({ ...data, rank: (count ?? 0) + 1 }, { status: 201 });
}
