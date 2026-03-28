'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Joystick, RotateCcw, Play, Pause,
  ChevronUp, ChevronDown, ChevronLeft, ChevronRight,
  Trophy, Crown, Loader2, Medal,
} from 'lucide-react';

const CELL = 20;
const COLS = 20;
const ROWS = 20;
const W = COLS * CELL;
const H = ROWS * CELL;
const INITIAL_SPEED = 150;

type Dir = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Point = { x: number; y: number };
type GameStatus = 'idle' | 'running' | 'paused' | 'dead' | 'entering-name';

interface LeaderEntry {
  id: number;
  name: string;
  score: number;
  created_at: string;
}

function rand(max: number) { return Math.floor(Math.random() * max); }
function spawnFood(snake: Point[]): Point {
  let food: Point;
  do { food = { x: rand(COLS), y: rand(ROWS) }; }
  while (snake.some((s) => s.x === food.x && s.y === food.y));
  return food;
}
function nextHead(head: Point, dir: Dir): Point {
  switch (dir) {
    case 'UP':    return { x: head.x, y: head.y - 1 };
    case 'DOWN':  return { x: head.x, y: head.y + 1 };
    case 'LEFT':  return { x: head.x - 1, y: head.y };
    case 'RIGHT': return { x: head.x + 1, y: head.y };
  }
}

const INIT_SNAKE: Point[] = [
  { x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 },
];

function RankMedal({ rank }: { rank: number }) {
  if (rank === 1) return <Crown className="w-4 h-4 text-yellow-400 shrink-0" />;
  if (rank === 2) return <Medal className="w-4 h-4 text-slate-400 shrink-0" />;
  if (rank === 3) return <Medal className="w-4 h-4 text-amber-600 shrink-0" />;
  return <span className="w-4 text-center text-xs text-muted-foreground font-mono shrink-0">#{rank}</span>;
}

export default function SnakePage() {
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const snakeRef       = useRef<Point[]>(INIT_SNAKE);
  const dirRef         = useRef<Dir>('RIGHT');
  const nextDirRef     = useRef<Dir>('RIGHT');
  const foodRef        = useRef<Point>(spawnFood(INIT_SNAKE));
  const runningRef     = useRef(false);
  const intervalRef    = useRef<ReturnType<typeof setInterval>>();
  const scoreRef       = useRef(0);
  const touchStartRef  = useRef<{ x: number; y: number } | null>(null);

  const [score, setScore]               = useState(0);
  const [speed, setSpeed]               = useState(INITIAL_SPEED);
  const [status, setStatus]             = useState<GameStatus>('idle');
  const [leaders, setLeaders]           = useState<LeaderEntry[]>([]);
  const [loadingBoard, setLoadingBoard] = useState(true);
  const [newEntryName, setNewEntryName] = useState('');
  const [submitting, setSubmitting]     = useState(false);
  const [submitError, setSubmitError]   = useState('');
  const [savedRank, setSavedRank]       = useState<number | null>(null);
  const [finalScore, setFinalScore]     = useState(0);
  const [savedName, setSavedName]       = useState('');

  const fetchLeaders = useCallback(async () => {
    setLoadingBoard(true);
    try {
      const res = await fetch('/api/snake-leaderboard');
      const data = await res.json();
      if (Array.isArray(data)) setLeaders(data);
    } catch { /* silent */ }
    finally { setLoadingBoard(false); }
  }, []);

  useEffect(() => { fetchLeaders(); }, [fetchLeaders]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const isDark = document.documentElement.classList.contains('dark');
    const bg = isDark ? '#0f1117' : '#f4f4f8';
    const gridColor = isDark ? '#1a1d2e' : '#e8e8f0';
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= COLS; x++) { ctx.beginPath(); ctx.moveTo(x*CELL,0); ctx.lineTo(x*CELL,H); ctx.stroke(); }
    for (let y = 0; y <= ROWS; y++) { ctx.beginPath(); ctx.moveTo(0,y*CELL); ctx.lineTo(W,y*CELL); ctx.stroke(); }
    snakeRef.current.forEach((seg, i) => {
      const isHead = i === 0;
      ctx.globalAlpha = Math.max(0.4, 1 - i * 0.04);
      ctx.fillStyle = isHead ? '#8b5cf6' : '#6d28d9';
      ctx.beginPath();
      ctx.roundRect(seg.x*CELL+1, seg.y*CELL+1, CELL-2, CELL-2, isHead ? 7 : 5);
      ctx.fill();
      if (isHead) {
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#fff';
        const d = dirRef.current;
        const eyes = d==='RIGHT' ? [{x:CELL-5,y:4},{x:CELL-5,y:CELL-6}]
          : d==='LEFT'  ? [{x:3,y:4},{x:3,y:CELL-6}]
          : d==='UP'    ? [{x:4,y:3},{x:CELL-6,y:3}]
          :                [{x:4,y:CELL-5},{x:CELL-6,y:CELL-5}];
        eyes.forEach((e) => { ctx.beginPath(); ctx.arc(seg.x*CELL+e.x, seg.y*CELL+e.y, 2, 0, Math.PI*2); ctx.fill(); });
      }
    });
    ctx.globalAlpha = 1;
    const food = foodRef.current;
    const pulse = Math.sin(Date.now()/200)*0.1+0.9;
    ctx.fillStyle = '#f23f42';
    ctx.shadowColor = '#f23f42';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(food.x*CELL+CELL/2, food.y*CELL+CELL/2, (CELL/2-2)*pulse, 0, Math.PI*2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }, []);

  const reset = useCallback(() => {
    clearInterval(intervalRef.current);
    snakeRef.current   = INIT_SNAKE.map((p) => ({ ...p }));
    dirRef.current     = 'RIGHT';
    nextDirRef.current = 'RIGHT';
    foodRef.current    = spawnFood(snakeRef.current);
    scoreRef.current   = 0;
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setStatus('idle');
    setSavedRank(null);
    setNewEntryName('');
    setSubmitError('');
    runningRef.current = false;
    draw();
  }, [draw]);

  const die = useCallback((currentLeaders: LeaderEntry[]) => {
    runningRef.current = false;
    clearInterval(intervalRef.current);
    const s = scoreRef.current;
    setFinalScore(s);
    const lowest = currentLeaders.length > 0 ? currentLeaders[currentLeaders.length - 1].score : 0;
    const qualifies = s > 0 && (currentLeaders.length < 10 || s > lowest);
    if (qualifies) {
      setStatus('entering-name');
    } else {
      setStatus('dead');
    }
  }, []);

  // Store leaders in a ref so tick can read it without stale closure
  const leadersRef = useRef<LeaderEntry[]>([]);
  useEffect(() => { leadersRef.current = leaders; }, [leaders]);

  const tick = useCallback(() => {
    if (!runningRef.current) return;
    dirRef.current = nextDirRef.current;
    const head = nextHead(snakeRef.current[0], dirRef.current);
    if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS
      || snakeRef.current.some((s) => s.x === head.x && s.y === head.y)) {
      die(leadersRef.current);
      return;
    }
    const ate = head.x === foodRef.current.x && head.y === foodRef.current.y;
    const newSnake = [head, ...snakeRef.current];
    if (!ate) newSnake.pop();
    snakeRef.current = newSnake;
    if (ate) {
      foodRef.current = spawnFood(newSnake);
      scoreRef.current += 10;
      setScore(scoreRef.current);
      const ns = Math.max(60, INITIAL_SPEED - Math.floor(scoreRef.current / 50) * 10);
      setSpeed((prev) => {
        if (ns !== prev) {
          clearInterval(intervalRef.current);
          intervalRef.current = setInterval(tick, ns);
        }
        return ns;
      });
    }
    draw();
  }, [draw, die]);

  const start = useCallback(() => {
    if (status === 'dead' || status === 'entering-name') reset();
    setTimeout(() => {
      runningRef.current = true;
      setStatus('running');
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(tick, INITIAL_SPEED);
    }, 0);
  }, [status, reset, tick]);

  const pause = useCallback(() => {
    if (!runningRef.current) return;
    runningRef.current = false;
    clearInterval(intervalRef.current);
    setStatus('paused');
  }, []);

  const resume = useCallback(() => {
    runningRef.current = true;
    setStatus('running');
    intervalRef.current = setInterval(tick, speed);
  }, [tick, speed]);

  const changeDir = useCallback((d: Dir) => {
    const opp: Record<Dir, Dir> = { UP:'DOWN', DOWN:'UP', LEFT:'RIGHT', RIGHT:'LEFT' };
    if (d !== opp[dirRef.current]) nextDirRef.current = d;
  }, []);

  const submitScore = useCallback(async () => {
    if (!newEntryName.trim()) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/snake-leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newEntryName.trim(), score: finalScore }),
      });
      const data = await res.json();
      if (!res.ok) { setSubmitError(data.error ?? 'Failed to save.'); return; }
      setSavedRank(data.rank);
      setSavedName(newEntryName.trim());
      await fetchLeaders();
      setStatus('dead');
    } catch {
      setSubmitError('Network error. Try again.');
    } finally {
      setSubmitting(false);
    }
  }, [newEntryName, finalScore, fetchLeaders]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (status === 'entering-name') return;
      const map: Record<string, Dir> = { ArrowUp:'UP', ArrowDown:'DOWN', ArrowLeft:'LEFT', ArrowRight:'RIGHT', w:'UP', s:'DOWN', a:'LEFT', d:'RIGHT' };
      if (map[e.key]) { e.preventDefault(); changeDir(map[e.key]); }
      if (e.key === ' ') {
        e.preventDefault();
        if (status === 'idle' || status === 'dead') start();
        else if (status === 'running') pause();
        else if (status === 'paused') resume();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [changeDir, start, pause, resume, status]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    if (status === 'idle' || status === 'dead') start();
  }, [status, start]);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;
    if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
    if (Math.abs(dx) > Math.abs(dy)) changeDir(dx > 0 ? 'RIGHT' : 'LEFT');
    else changeDir(dy > 0 ? 'DOWN' : 'UP');
  }, [changeDir]);

  useEffect(() => { draw(); }, [draw]);
  useEffect(() => {
    const obs = new MutationObserver(() => draw());
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, [draw]);
  useEffect(() => {
    let raf: number;
    const loop = () => { if (!runningRef.current) draw(); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [draw]);

  const topScore = leaders[0]?.score ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold font-display gradient-text flex items-center gap-2.5 flex-wrap">
          <Joystick className="w-6 h-6 shrink-0" /> Snake
        </h1>
        <p className="text-muted-foreground mt-1">Classic Snake — score makes the leaderboard if you're good enough!</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Game column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex gap-3 items-center flex-wrap">
            <Card className="px-4 py-2 flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Score</span>
              <span className="text-2xl font-bold font-display text-primary">{score}</span>
            </Card>
            <Card className="px-4 py-2 flex items-center gap-3">
              <Crown className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-muted-foreground">Best</span>
              <span className="text-2xl font-bold font-display">{topScore}</span>
            </Card>
            <Badge variant="outline" className="font-mono text-xs ml-auto">
              {Math.round((INITIAL_SPEED / speed) * 100)}% speed
            </Badge>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative rounded-xl overflow-hidden border-2 border-border shadow-2xl shadow-primary/10 w-full">
              <canvas
                id="snake-canvas"
                ref={canvasRef}
                width={W}
                height={H}
                className="block touch-none w-full"
                style={{ aspectRatio: '1 / 1' }}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              />

              {status === 'idle' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
                  <Joystick className="w-12 h-12 text-primary mb-4" />
                  <h2 className="text-white text-2xl font-bold font-display mb-2">SNAKE</h2>
                  <p className="text-white/60 text-sm mb-6">WASD · arrows · swipe</p>
                  <Button onClick={start} size="lg" className="gap-2 glow-primary">
                    <Play className="w-4 h-4" /> Start Game
                  </Button>
                </div>
              )}

              {status === 'paused' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
                  <Pause className="w-12 h-12 text-primary mb-4" />
                  <h2 className="text-white text-2xl font-bold font-display mb-6">PAUSED</h2>
                  <Button onClick={resume} className="gap-2">
                    <Play className="w-4 h-4" /> Resume
                  </Button>
                </div>
              )}

              {status === 'entering-name' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm px-6">
                  <div className="w-full max-w-xs bg-card rounded-2xl border border-primary/40 p-6 shadow-2xl shadow-primary/20 text-center">
                    <div className="text-4xl mb-2">🏆</div>
                    <h2 className="text-xl font-bold font-display text-primary mb-1">You made the board!</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      Score: <span className="text-foreground font-bold text-lg">{finalScore}</span>
                    </p>
                    <Input
                      autoFocus
                      placeholder="Enter your name…"
                      value={newEntryName}
                      onChange={(e) => setNewEntryName(e.target.value.slice(0, 20))}
                      onKeyDown={(e) => { if (e.key === 'Enter') submitScore(); e.stopPropagation(); }}
                      maxLength={20}
                      className="mb-3 text-center font-semibold"
                      disabled={submitting}
                    />
                    {submitError && <p className="text-xs text-destructive mb-2">{submitError}</p>}
                    <div className="flex gap-2">
                      <Button className="flex-1 gap-2" onClick={submitScore} disabled={submitting || !newEntryName.trim()}>
                        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trophy className="w-4 h-4" />}
                        {submitting ? 'Saving…' : 'Save Score'}
                      </Button>
                      <Button variant="ghost" onClick={() => setStatus('dead')} disabled={submitting} className="text-muted-foreground">
                        Skip
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{newEntryName.length}/20 chars</p>
                  </div>
                </div>
              )}

              {status === 'dead' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
                  <div className="text-center">
                    {savedRank ? (
                      <>
                        <div className="text-5xl mb-3">{savedRank === 1 ? '👑' : '🏆'}</div>
                        <h2 className="text-white text-2xl font-bold font-display mb-1">
                          {savedRank === 1 ? 'New #1!' : `Rank #${savedRank}!`}
                        </h2>
                        <p className="text-white/60 text-sm">
                          {savedName} · <span className="text-primary font-bold">{finalScore} pts</span>
                        </p>
                        {savedRank === 1 && <p className="text-yellow-400 text-xs mt-1">👑 All-time champion!</p>}
                      </>
                    ) : (
                      <>
                        <div className="text-5xl mb-3">💀</div>
                        <h2 className="text-white text-2xl font-bold font-display mb-1">GAME OVER</h2>
                        <p className="text-white/60 text-sm">
                          Score: <span className="text-primary font-bold">{finalScore}</span>
                        </p>
                        {finalScore === 0 && <p className="text-white/40 text-xs mt-1">Eat some food first! 🍎</p>}
                      </>
                    )}
                    <Button onClick={() => { reset(); setTimeout(start, 50); }} className="mt-5 gap-2">
                      <RotateCcw className="w-4 h-4" /> Play Again
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* D-pad */}
            <div className="grid grid-cols-3 gap-2 w-40">
              <div />
              <Button variant="outline" size="icon" className="h-12 w-12" onPointerDown={() => { changeDir('UP'); if (status !== 'running') start(); }}>
                <ChevronUp className="w-6 h-6" />
              </Button>
              <div />
              <Button variant="outline" size="icon" className="h-12 w-12" onPointerDown={() => { changeDir('LEFT'); if (status !== 'running') start(); }}>
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12" onPointerDown={() => {
                if (status === 'idle' || status === 'dead') start();
                else if (status === 'running') pause();
                else if (status === 'paused') resume();
              }}>
                {status === 'running' ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12" onPointerDown={() => { changeDir('RIGHT'); if (status !== 'running') start(); }}>
                <ChevronRight className="w-6 h-6" />
              </Button>
              <div />
              <Button variant="outline" size="icon" className="h-12 w-12" onPointerDown={() => { changeDir('DOWN'); if (status !== 'running') start(); }}>
                <ChevronDown className="w-6 h-6" />
              </Button>
              <div />
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Space to pause · WASD / arrows · Swipe on mobile
            </p>
          </div>
        </div>

        {/* Leaderboard column */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <div className="px-4 pt-4 pb-3 border-b bg-muted/30 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <h2 className="font-bold text-sm">Leaderboard</h2>
              <span className="text-xs text-muted-foreground ml-auto">Top 10</span>
            </div>
            <CardContent className="p-0">
              {loadingBoard ? (
                <div className="space-y-2 p-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-9 rounded-lg bg-muted animate-pulse" />
                  ))}
                </div>
              ) : leaders.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground text-sm px-4">
                  <Trophy className="w-8 h-8 mx-auto mb-2 opacity-20" />
                  <p>No scores yet.</p>
                  <p className="text-xs mt-1">Play to be first! 🐍</p>
                </div>
              ) : (
                <ul>
                  {leaders.map((entry, i) => {
                    const isYou = savedRank === i + 1 && entry.name === savedName && savedName !== '';
                    return (
                      <li key={entry.id} className={`flex items-center gap-3 px-4 py-2.5 border-b last:border-0 transition-colors ${isYou ? 'bg-primary/10' : i === 0 ? 'bg-yellow-400/5' : ''}`}>
                        <RankMedal rank={i + 1} />
                        <span className={`flex-1 text-sm font-medium truncate ${isYou ? 'text-primary font-semibold' : ''}`}>
                          {entry.name}
                          {isYou && <span className="ml-1 text-[10px] bg-primary/20 text-primary px-1 rounded">you</span>}
                        </span>
                        <span className="text-sm font-bold font-mono tabular-nums">{entry.score.toLocaleString()}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4 pb-4 space-y-1.5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">How to play</p>
              {[
                ['🎮', 'WASD / Arrow keys'],
                ['👆', 'Swipe on mobile'],
                ['⏸️', 'Space to pause'],
                ['🍎', '+10 pts per food'],
                ['⚡', 'Gets faster over time'],
                ['🏆', 'Top 10 go on the board!'],
              ].map(([icon, text]) => (
                <p key={text} className="text-xs text-muted-foreground flex items-center gap-2">
                  <span>{icon}</span> {text}
                </p>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
