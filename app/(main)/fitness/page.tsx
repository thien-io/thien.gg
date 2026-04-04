'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal, StaggerList, fadeUp, scaleIn, slideLeft, slideRight } from '@/lib/animations';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dumbbell, Flame, Zap, TrendingUp, Clock, Calendar, Target, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const CURRENT_STATS = {
  weight: '72 kg',
  height: '175 cm',
  bodyFat: '15%',
  streak: 18,
  workoutsThisMonth: 14,
  totalWorkouts: 186,
  totalVolume: '284,400 kg',
};

const LIFTS = [
  { exercise: 'Bench Press',    max: 100, unit: 'kg', pr: true,  progress: 15,  history: [60,70,80,85,90,95,100] },
  { exercise: 'Squat',          max: 130, unit: 'kg', pr: true,  progress: 22,  history: [80,90,100,110,115,125,130] },
  { exercise: 'Deadlift',       max: 160, unit: 'kg', pr: false, progress: 18,  history: [100,110,125,135,145,155,160] },
  { exercise: 'OHP',            max: 65,  unit: 'kg', pr: false, progress: 10,  history: [40,45,50,55,58,62,65] },
  { exercise: 'Pull-ups',       max: 15,  unit: 'reps',pr: true, progress: 8,   history: [5,7,9,10,12,13,15] },
  { exercise: 'Dips',           max: 20,  unit: 'reps',pr: false,progress: 5,   history: [8,10,12,14,16,18,20] },
];

const WORKOUT_LOG = [
  { date: 'Today',      type: 'Push',  exercises: ['Bench Press 4×5', 'OHP 3×8', 'Incline DB 3×10', 'Tricep Pushdown 4×12'], duration: 65, calories: 420, volume: '8,200 kg' },
  { date: 'Yesterday',  type: 'Rest',  exercises: [], duration: 0, calories: 0, volume: '0 kg' },
  { date: '2 days ago', type: 'Pull',  exercises: ['Deadlift 3×5', 'Pull-ups 4×8', 'Barbell Row 3×8', 'Bicep Curl 3×12'], duration: 70, calories: 480, volume: '9,100 kg' },
  { date: '3 days ago', type: 'Legs',  exercises: ['Squat 4×5', 'RDL 3×8', 'Leg Press 3×12', 'Calf Raise 4×15'], duration: 75, calories: 550, volume: '11,400 kg' },
  { date: '4 days ago', type: 'Push',  exercises: ['Bench Press 4×5', 'OHP 3×8', 'Cable Fly 3×12'], duration: 60, calories: 390, volume: '7,800 kg' },
  { date: '5 days ago', type: 'Rest',  exercises: [], duration: 0, calories: 0, volume: '0 kg' },
  { date: '6 days ago', type: 'Pull',  exercises: ['Deadlift 3×5', 'Pull-ups 4×8', 'Face Pull 3×15'], duration: 65, calories: 430, volume: '8,600 kg' },
];

const TYPE_COLORS: Record<string, string> = {
  Push:  'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Pull:  'bg-orange-500/20 text-orange-400 border-orange-500/30',
  Legs:  'bg-green-500/20 text-green-400 border-green-500/30',
  Rest:  'bg-muted text-muted-foreground border-border',
  Cardio:'bg-red-500/20 text-red-400 border-red-500/30',
  Full:  'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

// Mini sparkline for PR history
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 80, h = 24;
  const pts = data.map((v, i) => `${(i / (data.length-1)) * w},${h - ((v - min) / range) * h}`).join(' ');
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((v, i) => (
        <circle key={i} cx={(i / (data.length-1)) * w} cy={h - ((v - min) / range) * h} r={i === data.length-1 ? 3 : 1.5}
          fill={i === data.length-1 ? color : 'transparent'} stroke={color} strokeWidth="1" />
      ))}
    </svg>
  );
}

// 7-day workout calendar grid
const WEEK_DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const ACTIVITY_GRID = Array.from({ length: 16 }, (_, week) =>
  WEEK_DAYS.map((_, day) => {
    const rand = Math.random();
    if (rand < 0.3) return 0;
    if (rand < 0.55) return 1;
    if (rand < 0.75) return 2;
    return 3;
  })
);
const HEAT_COLORS = ['bg-muted/30', 'bg-primary/25', 'bg-primary/50', 'bg-primary'];

export default function FitnessPage() {
  const [expandedWorkout, setExpandedWorkout] = useState<number | null>(0);

  return (
    <div className="space-y-8 pb-10">
      <ScrollReveal variants={fadeUp}>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold font-display gradient-text">
            Fitness
          </h1>
          <p className="text-muted-foreground mt-1">Workout logs, PRs, and progress tracking</p>
        </div>
      </ScrollReveal>

      {/* Quick stats */}
      <StaggerList className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: Flame,      label: 'Day Streak',     value: `${CURRENT_STATS.streak}🔥`,    color: 'text-orange-400' },
          { icon: Calendar,   label: 'This Month',     value: CURRENT_STATS.workoutsThisMonth, color: 'text-blue-400' },
          { icon: Dumbbell,   label: 'Total Workouts', value: CURRENT_STATS.totalWorkouts,     color: 'text-primary' },
          { icon: TrendingUp, label: 'Total Volume',   value: CURRENT_STATS.totalVolume,       color: 'text-green-400' },
        ].map(s => (
          <motion.div key={s.label} variants={scaleIn}>
            <Card className="text-center hover:border-primary/30 transition-colors">
              <CardContent className="pt-4 pb-4">
                <s.icon className={`w-4 h-4 mx-auto mb-1.5 ${s.color}`} />
                <p className="text-xl font-bold font-display">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </StaggerList>

      {/* Body stats + activity heatmap */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ScrollReveal variants={slideLeft}>
          <Card>
            <CardContent className="pt-5">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <Target className="w-4 h-4" /> Body Stats
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Weight', value: CURRENT_STATS.weight },
                  { label: 'Height', value: CURRENT_STATS.height },
                  { label: 'Body Fat', value: CURRENT_STATS.bodyFat },
                ].map(s => (
                  <div key={s.label} className="text-center p-3 rounded-xl bg-muted/30 border">
                    <p className="text-lg font-bold font-display">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-xl bg-primary/10 border border-primary/20">
                <p className="text-xs font-semibold text-primary mb-1">Current Goal</p>
                <p className="text-sm text-muted-foreground">Recomposition — maintain weight while increasing strength. Target: 120kg squat, 110kg bench, 170kg deadlift.</p>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        <ScrollReveal variants={slideRight}>
          <Card>
            <CardContent className="pt-5">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Activity (16 weeks)
              </h2>
              <div className="flex gap-1">
                {ACTIVITY_GRID.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-1">
                    {week.map((intensity, di) => (
                      <div key={di} className={cn('w-3 h-3 rounded-sm', HEAT_COLORS[intensity])} title={`Week ${wi+1} ${WEEK_DAYS[di]}`} />
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                <span>Less</span>
                {HEAT_COLORS.map((c, i) => <div key={i} className={cn('w-3 h-3 rounded-sm', c)} />)}
                <span>More</span>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>

      {/* Personal Records */}
      <ScrollReveal variants={fadeUp}>
        <Card>
          <CardContent className="pt-5">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4" /> Personal Records
            </h2>
            <div className="space-y-3">
              {LIFTS.map((lift, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-semibold">{lift.exercise}</span>
                      {lift.pr && <Badge className="text-[10px] px-1.5 py-0 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">PR</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground">+{lift.progress}% this year</p>
                  </div>
                  <div className="shrink-0">
                    <Sparkline data={lift.history} color="hsl(var(--primary))" />
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold font-display font-mono">{lift.max}</p>
                    <p className="text-xs text-muted-foreground">{lift.unit}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </ScrollReveal>

      {/* Workout Log */}
      <ScrollReveal variants={fadeUp}>
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4" /> Recent Workouts
          </h2>
          <div className="space-y-2">
            {WORKOUT_LOG.map((w, i) => (
              <Card key={i} className={cn('overflow-hidden', w.type === 'Rest' && 'opacity-60')}>
                <button
                  className="w-full text-left p-4"
                  onClick={() => w.type !== 'Rest' && setExpandedWorkout(expandedWorkout === i ? null : i)}
                  disabled={w.type === 'Rest'}
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold">{w.date}</span>
                        <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full border', TYPE_COLORS[w.type])}>
                          {w.type}
                        </span>
                      </div>
                      {w.type !== 'Rest' && (
                        <div className="flex gap-3 mt-0.5 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{w.duration}min</span>
                          <span className="flex items-center gap-1"><Flame className="w-3 h-3" />{w.calories} kcal</span>
                          <span className="flex items-center gap-1"><Dumbbell className="w-3 h-3" />{w.volume}</span>
                        </div>
                      )}
                    </div>
                    {w.type !== 'Rest' && (
                      <div className="ml-auto">
                        {expandedWorkout === i ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                      </div>
                    )}
                  </div>
                </button>
                {expandedWorkout === i && w.type !== 'Rest' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden' }}
                    className="border-t border-border/50"
                  >
                    <div className="px-4 pb-3 pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {w.exercises.map((ex, ei) => (
                          <Badge key={ei} variant="secondary" className="text-xs">{ex}</Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
