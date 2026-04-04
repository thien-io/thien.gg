import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('mode') ?? '30';

  const { data, error } = await supabase
    .from('wpm_leaderboard')
    .select('*')
    .eq('mode', mode)
    .order('wpm', { ascending: false })
    .limit(15);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, wpm, accuracy, mode } = body;

  if (!name?.trim() || typeof wpm !== 'number' || typeof accuracy !== 'number') {
    return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 });
  }
  if (name.trim().length > 24) {
    return NextResponse.json({ error: 'Name too long (max 24 chars).' }, { status: 400 });
  }
  if (wpm < 1 || wpm > 300) {
    return NextResponse.json({ error: 'Invalid WPM.' }, { status: 400 });
  }
  if (accuracy < 0 || accuracy > 100) {
    return NextResponse.json({ error: 'Invalid accuracy.' }, { status: 400 });
  }
  const validModes = ['15', '30', '60', '120'];
  if (!validModes.includes(String(mode))) {
    return NextResponse.json({ error: 'Invalid mode.' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('wpm_leaderboard')
    .insert({ name: name.trim(), wpm: Math.round(wpm), accuracy: Math.round(accuracy), mode: String(mode) })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Compute rank within this mode
  const { count } = await supabase
    .from('wpm_leaderboard')
    .select('*', { count: 'exact', head: true })
    .eq('mode', String(mode))
    .gt('wpm', Math.round(wpm));

  return NextResponse.json({ ...data, rank: (count ?? 0) + 1 }, { status: 201 });
}
