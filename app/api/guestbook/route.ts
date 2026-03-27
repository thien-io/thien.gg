import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  const { data, error } = await supabase
    .from('guestbook')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, message, avatar_url } = body;

  if (!name?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Name and message are required.' }, { status: 400 });
  }

  if (name.trim().length > 50) {
    return NextResponse.json({ error: 'Name too long (max 50 chars).' }, { status: 400 });
  }

  if (message.trim().length > 300) {
    return NextResponse.json({ error: 'Message too long (max 300 chars).' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('guestbook')
    .insert({ name: name.trim(), message: message.trim(), avatar_url: avatar_url ?? null })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
