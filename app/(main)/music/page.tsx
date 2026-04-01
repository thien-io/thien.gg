'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal, StaggerList, fadeUp, scaleIn, slideLeft, slideRight } from '@/lib/animations';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Music2, Headphones, Heart, Play, Disc3, Radio, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const TOP_ARTISTS = [
  { name: 'Tame Impala',      genre: 'Psychedelic Rock', plays: 3842, color: 'from-purple-600 to-pink-500',    emoji: '🌀' },
  { name: 'Kendrick Lamar',   genre: 'Hip-Hop',          plays: 2910, color: 'from-red-600 to-orange-500',     emoji: '🎤' },
  { name: 'Fred again..',     genre: 'Electronic',       plays: 2634, color: 'from-blue-600 to-cyan-400',      emoji: '⚡' },
  { name: 'Mac Miller',       genre: 'Hip-Hop/Jazz',     plays: 2205, color: 'from-emerald-600 to-teal-400',   emoji: '🎵' },
  { name: 'Bon Iver',         genre: 'Indie Folk',       plays: 1998, color: 'from-amber-700 to-yellow-500',   emoji: '🌲' },
  { name: 'Tyler, the Creator',genre:'Hip-Hop/Alternative',plays:1847, color:'from-green-600 to-lime-400',    emoji: '🌈' },
];

const TOP_TRACKS = [
  { title: 'The Less I Know The Better', artist: 'Tame Impala',        duration: '3:36', plays: 487, color: '#7c3aed' },
  { title: 'PRIDE.',                     artist: 'Kendrick Lamar',     duration: '4:29', plays: 412, color: '#dc2626' },
  { title: 'Marea (we\'ve lost dancing)', artist: 'Fred again..',      duration: '5:12', plays: 398, color: '#0284c7' },
  { title: 'Circles',                    artist: 'Mac Miller',         duration: '3:59', plays: 376, color: '#059669' },
  { title: 'Skinny Love',                artist: 'Bon Iver',           duration: '3:58', plays: 355, color: '#b45309' },
  { title: 'NEW MAGIC WAND',             artist: 'Tyler, the Creator', duration: '3:01', plays: 332, color: '#16a34a' },
  { title: 'Breathe Deeper',             artist: 'Tame Impala',        duration: '6:51', plays: 318, color: '#7c3aed' },
  { title: 'Ladders',                    artist: 'Mac Miller',         duration: '4:12', plays: 301, color: '#059669' },
  { title: 'Holocene',                   artist: 'Bon Iver',           duration: '5:37', plays: 289, color: '#b45309' },
  { title: 'EARFQUAKE',                  artist: 'Tyler, the Creator', duration: '2:59', plays: 274, color: '#16a34a' },
];

const GENRES = [
  { name: 'Hip-Hop',           pct: 34, color: '#ef4444' },
  { name: 'Alternative/Indie', pct: 28, color: '#8b5cf6' },
  { name: 'Electronic',        pct: 18, color: '#06b6d4' },
  { name: 'R&B/Soul',          pct: 12, color: '#f59e0b' },
  { name: 'Rock',              pct: 8,  color: '#22c55e' },
];

const PLAYLISTS = [
  { name: 'Late Night Coding',  tracks: 47, desc: 'Lo-fi beats to debug by 🌙',         color: 'from-slate-800 to-blue-900' },
  { name: 'Pre-Game Hype',      tracks: 23, desc: 'Get in the zone before ranked ⚔️',  color: 'from-red-900 to-orange-800' },
  { name: 'Sunday Morning',     tracks: 31, desc: 'Slow, warm, and caffeinated ☕',     color: 'from-amber-900 to-yellow-800' },
  { name: 'Gym Sesh',           tracks: 38, desc: 'Absolute bangers only 💪',           color: 'from-green-900 to-emerald-800' },
  { name: 'Introspective Hours',tracks: 55, desc: 'For when you\'re feeling a lot 🌌', color: 'from-purple-900 to-pink-900' },
  { name: 'Road Trip',          tracks: 62, desc: 'Windows down, volume up 🚗',         color: 'from-cyan-900 to-teal-800' },
];

const RECENT_MOODS = [
  { emoji: '🌙', label: 'Night Drive',    desc: 'Lofi / Chillwave' },
  { emoji: '⚡', label: 'Locked In',      desc: 'Electronic / Hyperpop' },
  { emoji: '🌿', label: 'Chill Mode',     desc: 'Indie Folk / Acoustic' },
  { emoji: '🔥', label: 'Hyped Up',       desc: 'Hip-Hop / Trap' },
];

function GenreBar({ genre, pct, color }: { genre: string; pct: number; color: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = React.useRef(false);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !inView.current) { inView.current = true; setVisible(true); } });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref}>
      <div className="flex items-center justify-between mb-1.5 text-sm">
        <span>{genre}</span>
        <span className="text-muted-foreground font-mono text-xs">{pct}%</span>
      </div>
      <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
        <motion.div className="h-full rounded-full" style={{ background: color }}
          initial={{ width: '0%' }}
          animate={visible ? { width: `${pct}%` } : { width: '0%' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export default function MusicPage() {
  const [playing, setPlaying] = useState<number | null>(null);
  const totalPlays = TOP_ARTISTS.reduce((a, b) => a + b.plays, 0);

  return (
    <div className="space-y-8 pb-10">
      <ScrollReveal variants={fadeUp}>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold font-display gradient-text flex items-center gap-2.5 flex-wrap">
            <Music2 className="w-6 h-6 shrink-0" /> Music
          </h1>
          <p className="text-muted-foreground mt-1">My music taste, top tracks, and playlists</p>
        </div>
      </ScrollReveal>

      {/* Quick stats */}
      <StaggerList className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: Headphones, label: 'Total Plays',   value: (totalPlays / 1000).toFixed(1) + 'k' },
          { icon: Heart,      label: 'Liked Songs',   value: '847' },
          { icon: Disc3,      label: 'Playlists',     value: '34' },
          { icon: Radio,      label: 'Top Genre',     value: 'Hip-Hop' },
        ].map(s => (
          <motion.div key={s.label} variants={scaleIn}>
            <Card className="text-center hover:border-primary/30 transition-colors">
              <CardContent className="pt-4 pb-4">
                <s.icon className="w-4 h-4 mx-auto mb-1.5 text-primary" />
                <p className="text-xl font-bold font-display">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </StaggerList>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Artists */}
        <ScrollReveal variants={slideLeft}>
          <Card>
            <CardContent className="pt-5">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Top Artists
              </h2>
              <div className="space-y-3">
                {TOP_ARTISTS.map((a, i) => (
                  <div key={a.name} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground font-mono w-4 text-center">{i + 1}</span>
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${a.color} flex items-center justify-center text-lg shrink-0`}>
                      {a.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{a.name}</p>
                      <p className="text-xs text-muted-foreground">{a.genre}</p>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">{a.plays.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Genre breakdown */}
        <ScrollReveal variants={slideRight}>
          <Card>
            <CardContent className="pt-5">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <Disc3 className="w-4 h-4" /> Genre Breakdown
              </h2>
              <div className="space-y-4">
                {GENRES.map(g => <GenreBar key={g.name} genre={g.name} pct={g.pct} color={g.color} />)}
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>

      {/* Top Tracks */}
      <ScrollReveal variants={fadeUp}>
        <Card>
          <CardContent className="pt-5">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <Music2 className="w-4 h-4" /> Top Tracks
            </h2>
            <div className="space-y-1">
              {TOP_TRACKS.map((track, i) => (
                <button
                  key={i}
                  onClick={() => setPlaying(playing === i ? null : i)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left group',
                    playing === i ? 'bg-primary/10 border border-primary/20' : 'hover:bg-accent'
                  )}
                >
                  <span className="w-5 text-center text-xs text-muted-foreground font-mono group-hover:hidden">
                    {i + 1}
                  </span>
                  <Play className={cn('w-3.5 h-3.5 shrink-0 hidden group-hover:block', playing === i ? 'text-primary' : 'text-muted-foreground')} />
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: track.color }} />
                  <div className="flex-1 min-w-0">
                    <p className={cn('text-sm font-medium truncate', playing === i && 'text-primary')}>{track.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">{track.plays}</span>
                  <span className="text-xs text-muted-foreground font-mono ml-2">{track.duration}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </ScrollReveal>

      {/* Playlists */}
      <ScrollReveal variants={fadeUp}>
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
            <Radio className="w-4 h-4" /> Playlists
          </h2>
          <StaggerList className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PLAYLISTS.map((pl, i) => (
              <motion.div key={i} variants={scaleIn}>
                <Card className="overflow-hidden hover:border-primary/40 transition-colors cursor-pointer group">
                  <div className={`h-20 bg-gradient-to-br ${pl.color} flex items-end p-3 relative`}>
                    <Play className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardContent className="p-3">
                    <p className="font-semibold text-sm">{pl.name}</p>
                    <p className="text-xs text-muted-foreground">{pl.desc}</p>
                    <p className="text-xs text-muted-foreground mt-1">{pl.tracks} tracks</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </StaggerList>
        </div>
      </ScrollReveal>

      {/* Mood moods */}
      <ScrollReveal variants={fadeUp}>
        <Card>
          <CardContent className="pt-5">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Recent Moods</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {RECENT_MOODS.map(m => (
                <div key={m.label} className="text-center p-3 rounded-xl bg-muted/30 border hover:border-primary/30 transition-colors cursor-pointer">
                  <div className="text-2xl mb-1">{m.emoji}</div>
                  <p className="text-sm font-semibold">{m.label}</p>
                  <p className="text-xs text-muted-foreground">{m.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </ScrollReveal>
    </div>
  );
}
