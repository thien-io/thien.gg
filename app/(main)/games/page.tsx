'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ScrollReveal, StaggerList, fadeUp, scaleIn } from '@/lib/animations';
import { games, type Game } from '@/lib/games-data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Star, Clock, Gamepad2, Heart, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STATUS_CONFIG = {
  playing:   { label: 'Playing',      color: 'bg-online/20 text-online border-online/30' },
  completed: { label: 'Completed',    color: 'bg-primary/20 text-primary border-primary/30' },
  dropped:   { label: 'Dropped',      color: 'bg-dnd/20 text-dnd border-dnd/30' },
  want:      { label: 'Want to Play', color: 'bg-idle/20 text-idle border-idle/30' },
};

type StatusFilter = 'all' | Game['status'];

function GameCard({ game }: { game: Game }) {
  const status = STATUS_CONFIG[game.status];
  return (
    <Card className="group overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 h-full">
      <div className="relative h-36 overflow-hidden bg-muted">
        <Image src={game.image} alt={game.name} fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        {game.favorite && (
          <div className="absolute top-2 right-2">
            <Heart className="w-4 h-4 text-red-400 fill-red-400" />
          </div>
        )}
        <div className="absolute bottom-2 left-2 right-2">
          <h3 className="text-white font-bold font-display text-lg leading-tight line-clamp-1">{game.name}</h3>
        </div>
      </div>
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-2">
          <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full border', status.color)}>
            {status.label}
          </span>
          {game.rating && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="w-3 h-3 text-idle fill-idle" />{game.rating}/10
            </span>
          )}
        </div>
        {game.hours && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
            <Clock className="w-3 h-3" />{game.hours.toLocaleString()}h
          </div>
        )}
        {game.description && <p className="text-xs text-muted-foreground line-clamp-2">{game.description}</p>}
        <div className="flex flex-wrap gap-1 mt-2">
          {game.genre.slice(0, 2).map((g) => (
            <Badge key={g} variant="secondary" className="text-xs px-1.5 py-0">{g}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function GamesPage() {
  const [filter, setFilter] = useState<StatusFilter>('all');
  const filtered = filter === 'all' ? games : games.filter((g) => g.status === filter);
  const counts = {
    all:       games.length,
    playing:   games.filter((g) => g.status === 'playing').length,
    completed: games.filter((g) => g.status === 'completed').length,
    dropped:   games.filter((g) => g.status === 'dropped').length,
    want:      games.filter((g) => g.status === 'want').length,
  };
  const totalHours = games.reduce((acc, g) => acc + (g.hours ?? 0), 0);

  return (
    <div className="space-y-6">
      <ScrollReveal variants={fadeUp}>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold font-display gradient-text">Games</h1>
          <p className="text-muted-foreground mt-1">{games.length} games · {totalHours.toLocaleString()} hours total</p>
        </div>
      </ScrollReveal>

      <StaggerList className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(['playing', 'completed', 'dropped', 'want'] as const).map((status) => {
          const cfg = STATUS_CONFIG[status];
          return (
            <motion.div key={status} variants={scaleIn}
              className={cn('rounded-xl border p-3 text-center cursor-pointer transition-all', cfg.color)}
              onClick={() => setFilter(status)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <p className="text-2xl font-bold font-display">{counts[status]}</p>
              <p className="text-xs font-medium mt-0.5">{cfg.label}</p>
            </motion.div>
          );
        })}
      </StaggerList>

      <ScrollReveal variants={fadeUp}>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {(['all', 'playing', 'completed', 'dropped', 'want'] as const).map((f) => (
            <Button key={f} variant={filter === f ? 'default' : 'outline'} size="sm"
              className="capitalize h-8 text-xs" onClick={() => setFilter(f)}>
              {f === 'all' ? 'All' : STATUS_CONFIG[f].label}
              <span className="ml-1.5 opacity-60">{counts[f]}</span>
            </Button>
          ))}
        </div>
      </ScrollReveal>

      <StaggerList className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((game) => (
          <motion.div key={game.id} variants={scaleIn}>
            <GameCard game={game} />
          </motion.div>
        ))}
      </StaggerList>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Gamepad2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No games in this category yet.</p>
        </div>
      )}
    </div>
  );
}
