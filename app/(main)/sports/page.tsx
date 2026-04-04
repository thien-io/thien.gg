'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal, StaggerList, fadeUp, scaleIn, slideLeft, slideRight } from '@/lib/animations';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Target, Zap, TrendingUp, Activity, Medal, Flag, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const SPORTS_PROFILE = {
  favouriteTeam: 'Manchester City',
  country: 'Vietnam 🇻🇳',
  yearsActive: 8,
};

const SPORTS = [
  { name: 'Football', emoji: '⚽', level: 'Intermediate', role: 'Midfielder', years: 8, highlights: ['Top scorer in college league 2022', 'Club team finalist 2023'] },
  { name: 'Basketball', emoji: '🏀', level: 'Casual', role: 'Point Guard', years: 4, highlights: ['3-point contest winner 2021'] },
  { name: 'Table Tennis', emoji: '🏓', level: 'Advanced', role: 'Attacker', years: 10, highlights: ['University champion 2022', 'Ranked #3 in district'] },
  { name: 'Badminton', emoji: '🏸', level: 'Intermediate', role: 'Singles', years: 5, highlights: ['Club doubles champion 2023'] },
  { name: 'Swimming', emoji: '🏊', level: 'Beginner', role: 'Freestyle', years: 2, highlights: [] },
];

const FOOTBALL_STATS = {
  matches: 84,
  goals: 23,
  assists: 31,
  winRate: 62,
  cleanSheets: 14,
  yellowCards: 7,
};

const SEASON_RESULTS = [
  { match: 'vs Team Alpha',   result: 'W', score: '3-1', goals: 2, assists: 0 },
  { match: 'vs The Lions',    result: 'W', score: '2-0', goals: 0, assists: 1 },
  { match: 'vs Blue United',  result: 'L', score: '1-2', goals: 1, assists: 0 },
  { match: 'vs City FC',      result: 'D', score: '1-1', goals: 0, assists: 1 },
  { match: 'vs River Plate',  result: 'W', score: '4-2', goals: 1, assists: 2 },
  { match: 'vs Eagles SC',    result: 'W', score: '2-1', goals: 0, assists: 0 },
  { match: 'vs Town United',  result: 'L', score: '0-3', goals: 0, assists: 0 },
  { match: 'vs FC Nomads',    result: 'W', score: '3-0', goals: 1, assists: 1 },
];

const EPL_TABLE = [
  { pos: 1,  team: 'Manchester City', p: 38, gd: 62, pts: 91 },
  { pos: 2,  team: 'Arsenal',         p: 38, gd: 56, pts: 89 },
  { pos: 3,  team: 'Liverpool',       p: 38, gd: 48, pts: 82 },
  { pos: 4,  team: 'Aston Villa',     p: 38, gd: 28, pts: 68 },
  { pos: 5,  team: 'Tottenham',       p: 38, gd: 21, pts: 66 },
];

const ACHIEVEMENTS = [
  { title: 'Golden Boot',       sport: 'Football',     desc: 'Top scorer in college league', year: '2022', icon: '⚽' },
  { title: 'University Champion', sport: 'Table Tennis', desc: 'Singles champion',           year: '2022', icon: '🏓' },
  { title: 'Club Finalist',     sport: 'Football',     desc: 'Runner-up in cup final',       year: '2023', icon: '🏆' },
  { title: 'District Ranked',   sport: 'Table Tennis', desc: '#3 in district rankings',      year: '2023', icon: '🎖️' },
];

function StatCard({ label, value, icon: Icon, color }: { label: string; value: string | number; icon: React.ElementType; color: string }) {
  return (
    <Card className="text-center hover:border-primary/30 transition-colors">
      <CardContent className="pt-4 pb-4">
        <Icon className={`w-5 h-5 mx-auto mb-2 ${color}`} />
        <p className="text-2xl font-bold font-display">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}

export default function SportsPage() {
  const [activeSport, setActiveSport] = useState('Football');
  const sport = SPORTS.find(s => s.name === activeSport) ?? SPORTS[0];

  return (
    <div className="space-y-8 pb-10">
      <ScrollReveal variants={fadeUp}>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold font-display gradient-text">
            Sports
          </h1>
          <p className="text-muted-foreground mt-1">My athletic life, stats, and favourite teams</p>
        </div>
      </ScrollReveal>

      {/* Sport selector */}
      <ScrollReveal variants={fadeUp}>
        <div className="flex gap-2 flex-wrap">
          {SPORTS.map(s => (
            <button key={s.name}
              onClick={() => setActiveSport(s.name)}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all border',
                activeSport === s.name
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              <span>{s.emoji}</span>{s.name}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Sport profile */}
      <ScrollReveal variants={scaleIn}>
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl">{sport.emoji}</span>
                  <div>
                    <h2 className="text-xl font-bold">{sport.name}</h2>
                    <p className="text-sm text-muted-foreground">{sport.role} · {sport.years} years</p>
                  </div>
                </div>
                {sport.highlights.length > 0 && (
                  <ul className="space-y-1 mt-3">
                    {sport.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="w-3.5 h-3.5 text-yellow-400 shrink-0" />{h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <Badge variant={
                sport.level === 'Advanced' ? 'default' :
                sport.level === 'Intermediate' ? 'secondary' : 'outline'
              }>
                {sport.level}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </ScrollReveal>

      {/* Football stats */}
      {activeSport === 'Football' && (
        <>
          <StaggerList className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {[
              { label: 'Matches',    value: FOOTBALL_STATS.matches,         icon: Flag,       color: 'text-blue-400' },
              { label: 'Goals',      value: FOOTBALL_STATS.goals,           icon: Target,     color: 'text-green-400' },
              { label: 'Assists',    value: FOOTBALL_STATS.assists,         icon: Zap,        color: 'text-yellow-400' },
              { label: 'Win Rate',   value: `${FOOTBALL_STATS.winRate}%`,   icon: TrendingUp, color: 'text-primary' },
              { label: 'Clean Sheets',value: FOOTBALL_STATS.cleanSheets,   icon: Activity,   color: 'text-cyan-400' },
              { label: 'Yellows',    value: FOOTBALL_STATS.yellowCards,     icon: Medal,      color: 'text-orange-400' },
            ].map(s => (
              <motion.div key={s.label} variants={scaleIn}>
                <StatCard {...s} />
              </motion.div>
            ))}
          </StaggerList>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent results */}
            <ScrollReveal variants={slideLeft}>
              <Card>
                <CardContent className="pt-5">
                  <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Recent Matches</h2>
                  <div className="space-y-2">
                    {SEASON_RESULTS.map((m, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <span className={cn('w-6 h-6 rounded text-xs font-bold flex items-center justify-center shrink-0',
                          m.result === 'W' ? 'bg-green-500/20 text-green-400' :
                          m.result === 'L' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        )}>{m.result}</span>
                        <span className="flex-1 text-muted-foreground truncate">{m.match}</span>
                        <span className="font-mono text-xs">{m.score}</span>
                        {m.goals > 0 && <Badge variant="secondary" className="text-[10px] px-1.5 py-0">⚽{m.goals}</Badge>}
                        {m.assists > 0 && <Badge variant="outline" className="text-[10px] px-1.5 py-0">🅰️{m.assists}</Badge>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Fav team / EPL mini table */}
            <ScrollReveal variants={slideRight}>
              <Card>
                <CardContent className="pt-5">
                  <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Favourite Team</h2>
                  <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-sky-500/10 border border-sky-500/20">
                    <span className="text-3xl">🩵</span>
                    <div>
                      <p className="font-bold text-sky-400">Manchester City</p>
                      <p className="text-xs text-muted-foreground">Premier League · Est. 1880</p>
                    </div>
                  </div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">PL Standings</h3>
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-muted-foreground">
                        <th className="text-left pb-1.5 font-medium">#</th>
                        <th className="text-left pb-1.5 font-medium">Team</th>
                        <th className="text-right pb-1.5 font-medium">P</th>
                        <th className="text-right pb-1.5 font-medium">GD</th>
                        <th className="text-right pb-1.5 font-medium font-bold">Pts</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-1">
                      {EPL_TABLE.map(row => (
                        <tr key={row.team} className={cn('border-t border-border/40', row.team === 'Manchester City' && 'text-sky-400 font-semibold')}>
                          <td className="py-1.5">{row.pos}</td>
                          <td className="py-1.5">{row.team}</td>
                          <td className="py-1.5 text-right text-muted-foreground">{row.p}</td>
                          <td className="py-1.5 text-right text-muted-foreground">{row.gd > 0 ? `+${row.gd}` : row.gd}</td>
                          <td className="py-1.5 text-right font-bold">{row.pts}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </>
      )}

      {/* Achievements */}
      <ScrollReveal variants={fadeUp}>
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
            <Medal className="w-4 h-4" /> Achievements
          </h2>
          <StaggerList className="grid sm:grid-cols-2 gap-3">
            {ACHIEVEMENTS.map((a, i) => (
              <motion.div key={i} variants={scaleIn}>
                <Card className="hover:border-primary/30 transition-colors">
                  <CardContent className="pt-4 pb-4 flex items-center gap-3">
                    <span className="text-2xl shrink-0">{a.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{a.title}</p>
                      <p className="text-xs text-muted-foreground">{a.desc}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <Badge variant="outline" className="text-xs">{a.year}</Badge>
                      <p className="text-[10px] text-muted-foreground mt-1">{a.sport}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </StaggerList>
        </div>
      </ScrollReveal>
    </div>
  );
}
