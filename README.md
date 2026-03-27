# thien.gg — Gamer Profile Website

A full-stack gamer profile built with **Next.js 15**, **Tailwind CSS**, **shadcn/ui**, **Radix UI**, **Supabase**, and **Lanyard** (real-time Discord presence).

## ✨ Features

- 🎮 **Profile page** — bio, stats, setup, Discord live presence via Lanyard
- 🕹️ **Games page** — list of games with status, hours, ratings, filter by status
- 📖 **Guestbook** — visitors leave messages stored in Supabase
- 🐍 **Snake game** — playable on desktop (keyboard) and mobile (swipe + touch controls)
- 🌙 **Dark / Light mode** — toggle in sidebar, defaults to dark
- 📱 **Mobile friendly** — responsive sidebar + touch controls
- ⚡ **Real-time Discord** — Lanyard WebSocket shows current game, Spotify, status

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/yourname/thien-gg.git
cd thien-gg
npm install
```

### 2. Copy environment variables

```bash
cp .env.example .env.local
```

Then fill in the values (see sections below).

---

## 🗄️ Supabase Setup (Backend)

### Step 1 — Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and click **New project**
2. Pick a name (e.g. `thien-gg`), set a strong database password, choose a region close to you
3. Wait ~2 minutes for the project to spin up

### Step 2 — Run the SQL migration

1. In your Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click **New query**
3. Copy-paste the contents of `supabase-setup.sql` and click **Run**

This creates:
- `guestbook` table with RLS policies
- Anyone can **read** and **insert** entries
- Only authenticated users (you) can **delete**

### Step 3 — Get your API keys

1. In Supabase dashboard → **Settings** → **API**
2. Copy **Project URL** → paste as `NEXT_PUBLIC_SUPABASE_URL`
3. Copy **anon / public** key → paste as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

> ⚠️ Never put the `service_role` key in a `NEXT_PUBLIC_` variable.

---

## 🎮 Lanyard (Discord Presence)

Lanyard is a free service that exposes your Discord presence via API/WebSocket.

### Step 1 — Join the Lanyard Discord server

You MUST join this server for Lanyard to track your presence:
👉 https://discord.gg/lanyard

### Step 2 — Get your Discord User ID

1. In Discord, go to **Settings** → **Advanced** → enable **Developer Mode**
2. Right-click your username anywhere → **Copy User ID**
3. Paste it as `NEXT_PUBLIC_DISCORD_USER_ID` in `.env.local`

That's it! Lanyard automatically picks up your presence once you're in the server.

> No API key needed — Lanyard is free and open source.

---

## 🌍 Deploying to Vercel

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) for automatic deploys.

**Add environment variables in Vercel:**

1. Go to your project → **Settings** → **Environment Variables**
2. Add all three variables from `.env.local`

**Custom domain:**

1. In Vercel → **Domains** → Add `thien.gg`
2. Update your domain's DNS to point to Vercel (they'll guide you)

---

## 🎨 Customization

### Change your profile info

Edit `app/main/profile/page.tsx`:
- Update `stats`, `skills`, `techStack`, the setup table
- Change the bio text

### Change your games list

Edit `lib/games-data.ts`:
- Add/remove games from the `games` array
- Each game has: `name`, `genre`, `platform`, `status`, `hours`, `rating`, `image`, `description`, `favorite`

### Change colors / theme

Edit `tailwind.config.js` — the `primary` color is the main accent:
```js
primary: 'hsl(262 80% 58%)', // violet-purple, change this
```

Or edit CSS variables in `app/globals.css`.

### Add social links

Edit `components/layout/sidebar.tsx` → `socialLinks` array.

---

## 📁 Project Structure

```
thien-gg/
├── app/
│   ├── api/guestbook/route.ts   # Guestbook API (GET + POST)
│   ├── main/
│   │   ├── layout.tsx            # Sidebar wrapper
│   │   ├── profile/page.tsx      # Profile page
│   │   ├── games/page.tsx        # Games list
│   │   ├── guestbook/page.tsx    # Guestbook
│   │   └── snake/page.tsx        # Snake game
│   ├── layout.tsx                # Root layout + ThemeProvider
│   └── globals.css               # Design tokens + global styles
├── components/
│   ├── layout/sidebar.tsx        # Sidebar nav
│   ├── discord-presence.tsx      # Lanyard Discord widget
│   └── ui/                       # shadcn/Radix UI components
├── lib/
│   ├── supabase.ts               # Supabase client
│   ├── lanyard.ts                # Lanyard hook + types
│   ├── games-data.ts             # Your games data
│   └── utils.ts                  # cn() helper
├── supabase-setup.sql            # Run in Supabase SQL Editor
└── .env.example                  # Copy to .env.local
```

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 15 | Framework (App Router) |
| Tailwind CSS | Styling |
| shadcn/ui + Radix UI | UI components |
| Lucide React | Icons |
| next-themes | Dark/light mode |
| Supabase | Database + backend |
| Lanyard | Discord real-time presence |
| date-fns | Date formatting |

---

## 📝 .env.local Reference

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
NEXT_PUBLIC_DISCORD_USER_ID=123456789012345678
NEXT_PUBLIC_SITE_URL=https://thien.gg
```
