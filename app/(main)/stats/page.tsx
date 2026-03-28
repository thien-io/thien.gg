'use client';

import React, { useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, useInView } from 'framer-motion';
import { ScrollReveal, StaggerList, fadeUp, slideLeft, slideRight, scaleIn } from '@/lib/animations';
import {
  BarChart2, Clock, Trophy, Target, Flame, Zap,
  TrendingUp, Star, Gamepad2, Award, Calendar, Activity,
} from 'lucide-react';

// ── Data ──────────────────────────────────────────────────────────────────────
const topStats = [
  { label: 'Total Hours',   value: 6900, suffix: '+',      icon: Clock,    color: 'text-blue-400' },
  { label: 'Games Played',  value: 200,  suffix: '+',      icon: Gamepad2, color: 'text-green-400' },
  { label: 'Win Rate',      value: 54,   suffix: '%',      icon: Target,   color: 'text-red-400' },
  { label: 'Day Streak',    value: 42,   suffix: ' days',  icon: Flame,    color: 'text-orange-400' },
  { label: 'Achievements',  value: 312,  suffix: '',       icon: Award,    color: 'text-purple-400' },
  { label: 'Hours This Wk', value: 33,   suffix: 'h',      icon: Activity, color: 'text-cyan-400' },
];

const gameHours = [
  { game: 'CS2',        hours: 2200, color: '#f97316', icon: '🔫' },
  { game: 'LoL',        hours: 1800, color: '#eab308', icon: '⚔️' },
  { game: 'Valorant',   hours: 1200, color: '#ef4444', icon: '🎯' },
  { game: 'Minecraft',  hours: 500,  color: '#84cc16', icon: '⛏️' },
  { game: 'Elden Ring', hours: 120,  color: '#a855f7', icon: '⚔️' },
  { game: 'Cyberpunk',  hours: 85,   color: '#06b6d4', icon: '🌆' },
];
const maxHours = Math.max(...gameHours.map((g) => g.hours));

const weeklyActivity = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 4 },
  { day: 'Wed', hours: 1.5 },
  { day: 'Thu', hours: 5 },
  { day: 'Fri', hours: 6 },
  { day: 'Sat', hours: 8 },
  { day: 'Sun', hours: 7 },
];
const maxActivity = Math.max(...weeklyActivity.map((d) => d.hours));

const monthlyHours = [
  { month: 'Jul', hours: 48 },
  { month: 'Aug', hours: 72 },
  { month: 'Sep', hours: 55 },
  { month: 'Oct', hours: 90 },
  { month: 'Nov', hours: 68 },
  { month: 'Dec', hours: 110 },
  { month: 'Jan', hours: 95 },
  { month: 'Feb', hours: 78 },
  { month: 'Mar', hours: 102 },
];
const maxMonthly = Math.max(...monthlyHours.map((m) => m.hours));

const achievements = [
  { title: 'Diamond Grinder',   desc: 'Reached Diamond in Valorant',       icon: '💎', rare: 'Rare' },
  { title: 'The Completionist', desc: 'Finished Elden Ring 100%',           icon: '👑', rare: 'Epic' },
  { title: 'Night Owl',         desc: '500+ hours played after midnight',   icon: '🦉', rare: 'Common' },
  { title: 'Veteran',           desc: '5+ years active gaming',             icon: '🎖️', rare: 'Rare' },
  { title: 'Speed Runner',      desc: 'Sub-1h any% Hollow Knight',          icon: '⚡', rare: 'Epic' },
  { title: 'Social Butterfly',  desc: 'Gamed with 50+ different friends',   icon: '🦋', rare: 'Common' },
];

const rareColors: Record<string, string> = {
  Epic:   'bg-purple-500/20 text-purple-300 border-purple-500/30',
  Rare:   'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Common: 'bg-muted text-muted-foreground border-border',
};

// ── Sub-components ────────────────────────────────────────────────────────────

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(spanRef, { once: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;
    const startTime = performance.now();
    const duration = 1800;
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      if (spanRef.current) {
        spanRef.current.textContent = `${Math.round(eased * to).toLocaleString()}${suffix}`;
      }
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to, suffix]);

  return <span ref={spanRef}>0{suffix}</span>;
}

function AnimatedHBar({ pct, color, delay = 0 }: { pct: number; color: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="h-2.5 bg-muted/50 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: '0%' }}
        animate={inView ? { width: `${pct}%` } : { width: '0%' }}
        transition={{ duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

function AnimatedVBar({ pct, color, delay = 0, heightPx = 96 }: { pct: number; color: string; delay?: number; heightPx?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="relative bg-muted/40 rounded-sm overflow-hidden flex-1" style={{ height: heightPx }}>
      <motion.div
        className="absolute bottom-0 left-0 right-0 rounded-sm"
        style={{ background: color }}
        initial={{ height: '0%' }}
        animate={inView ? { height: `${pct}%` } : { height: '0%' }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function StatsPage() {
  return (
    <div className="space-y-10 pb-10">
      {/* Header */}
      <ScrollReveal variants={fadeUp}>
        <h1 className="text-3xl sm:text-4xl font-bold font-display gradient-text flex items-center gap-2.5 flex-wrap">
 Stats
        </h1>
        <p className="text-muted-foreground mt-1">Gaming statistics & performance overview</p>
      </ScrollReveal>

      {/* Stat cards */}
      <StaggerList className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {topStats.map((stat) => (
          <motion.div key={stat.label} variants={scaleIn}>
            <Card className="hover:border-primary/40 transition-colors duration-300">
              <CardContent className="pt-5 pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
                <p className={`text-2xl font-bold font-display ${stat.color}`}>
                  <Counter to={stat.value} suffix={stat.suffix} />
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </StaggerList>

      {/* Hours by game + Weekly */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ScrollReveal variants={slideLeft}>
          <Card className="h-full">
            <CardContent className="pt-5">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4" /> Hours by Game
              </h2>
              <div className="space-y-4">
                {gameHours.map((g, i) => (
                  <div key={g.game}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium flex items-center gap-2">
                        <span>{g.icon}</span>{g.game}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">{g.hours.toLocaleString()}h</span>
                    </div>
                    <AnimatedHBar pct={(g.hours / maxHours) * 100} color={g.color} delay={i * 0.1} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        <ScrollReveal variants={slideRight}>
          <Card className="h-full">
            <CardContent className="pt-5">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4" /> This Week
              </h2>
              <div className="flex items-end gap-2" style={{ height: 100 }}>
                {weeklyActivity.map((d, i) => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <AnimatedVBar pct={(d.hours / maxActivity) * 100} color="hsl(var(--primary))" delay={i * 0.08} heightPx={84} />
                    <span className="text-[10px] text-muted-foreground">{d.day}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
                <span>Total this week</span>
                <span className="font-semibold text-foreground font-mono">
                  {weeklyActivity.reduce((a, d) => a + d.hours, 0).toFixed(0)}h
                </span>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>

      {/* Monthly trend */}
      <ScrollReveal variants={fadeUp}>
        <Card>
          <CardContent className="pt-5">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4" /> Monthly Hours (last 9 months)
            </h2>
            <div className="flex items-end gap-1.5" style={{ height: 120 }}>
              {monthlyHours.map((m, i) => (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[9px] text-muted-foreground">{m.hours}h</span>
                  <AnimatedVBar
                    pct={(m.hours / maxMonthly) * 100}
                    color={m.hours === maxMonthly ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.45)'}
                    delay={i * 0.07}
                    heightPx={88}
                  />
                  <span className="text-[10px] text-muted-foreground">{m.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </ScrollReveal>

      {/* Ranked Performance */}
      <ScrollReveal variants={fadeUp}>
        <Card>
          <CardContent className="pt-5">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-5">
              <Zap className="w-4 h-4" /> Ranked Performance
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { game: 'Valorant', rank: 'Diamond 2', wins: 312, losses: 267, color: '#a78bfa' },
                { game: 'LoL',      rank: 'Plat 1',    wins: 420, losses: 380, color: '#67e8f9' },
                { game: 'CS2',      rank: '14k ELO',   wins: 890, losses: 780, color: '#fbbf24' },
              ].map((r) => {
                const wr = (r.wins / (r.wins + r.losses)) * 100;
                return (
                  <div key={r.game} className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">{r.game}</span>
                      <Badge variant="outline" className="text-xs font-mono" style={{ color: r.color }}>{r.rank}</Badge>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                        <span>Win Rate</span>
                        <span className="font-mono text-foreground">{wr.toFixed(1)}%</span>
                      </div>
                      <AnimatedHBar pct={wr} color={r.color} />
                      <div className="flex justify-between text-xs mt-1">
                        <span className="text-green-400">{r.wins}W</span>
                        <span className="text-red-400">{r.losses}L</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </ScrollReveal>

      {/* Achievements */}
      <ScrollReveal variants={fadeUp}>
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-4">
            <Star className="w-4 h-4" /> Achievements
          </h2>
          <StaggerList className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {achievements.map((a) => (
              <motion.div key={a.title} variants={scaleIn}>
                <Card className="hover:border-primary/30 transition-colors duration-300">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl shrink-0">{a.icon}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-sm font-semibold">{a.title}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded border ${rareColors[a.rare]}`}>{a.rare}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{a.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </StaggerList>
        </div>
      </ScrollReveal>

      {/* Fun stats */}
      <ScrollReveal variants={fadeUp}>
        <Card className="border-primary/20">
          <CardContent className="pt-5">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4" /> Fun Facts
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {[
                { emoji: '☕', label: 'Coffees Drank',  value: '2,847' },
                { emoji: '💀', label: 'Times Died',     value: '48,392' },
                { emoji: '🎯', label: 'Headshots',      value: '12,441' },
                { emoji: '🌙', label: 'Late Nights',    value: '627' },
              ].map((f) => (
                <div key={f.label} className="space-y-1">
                  <div className="text-3xl">{f.emoji}</div>
                  <div className="text-lg font-bold font-display">{f.value}</div>
                  <div className="text-xs text-muted-foreground">{f.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </ScrollReveal>
    </div>
  );
}
