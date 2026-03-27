-- ============================================================
-- thien.gg — Supabase Database Setup
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. Guestbook table
create table if not exists public.guestbook (
  id         bigserial primary key,
  name       text        not null check (char_length(name) between 1 and 50),
  message    text        not null check (char_length(message) between 1 and 300),
  avatar_url text,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.guestbook enable row level security;

-- Allow anyone to read guestbook entries
create policy "guestbook_select"
  on public.guestbook for select
  using (true);

-- Allow anyone to insert guestbook entries
create policy "guestbook_insert"
  on public.guestbook for insert
  with check (true);

-- (Optional) Only you (authenticated) can delete entries
create policy "guestbook_delete"
  on public.guestbook for delete
  using (auth.role() = 'authenticated');

-- Index for fast ordering
create index if not exists guestbook_created_at_idx
  on public.guestbook (created_at desc);

-- ============================================================
-- 2. Snake leaderboard table
-- ============================================================

create table if not exists public.snake_leaderboard (
  id         bigserial primary key,
  name       text        not null check (char_length(name) between 1 and 20),
  score      integer     not null check (score > 0),
  created_at timestamptz not null default now()
);

alter table public.snake_leaderboard enable row level security;

-- Anyone can read the leaderboard
create policy "snake_leaderboard_select"
  on public.snake_leaderboard for select
  using (true);

-- Anyone can submit a score
create policy "snake_leaderboard_insert"
  on public.snake_leaderboard for insert
  with check (true);

-- Only authenticated users (you) can delete entries
create policy "snake_leaderboard_delete"
  on public.snake_leaderboard for delete
  using (auth.role() = 'authenticated');

-- Fast top-10 queries
create index if not exists snake_leaderboard_score_idx
  on public.snake_leaderboard (score desc);
