'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollReveal, fadeUp } from '@/lib/animations';
import { Play, RotateCcw, Pause, Gamepad2 } from 'lucide-react';

// ── Portrait layout: paddles on top/bottom, ball moves vertically ─────────────
const W = 320;
const H = 480;
const PAD_W = 64;
const PAD_H = 10;
const PAD_SPEED = 6;
const BALL_R = 7;
const AI_SPEED = 4.2;
const WIN_SCORE = 7;

type GameStatus = 'idle' | 'running' | 'paused' | 'won' | 'lost';

interface GS {
  // Player paddle (bottom): X position
  playerX: number;
  // AI paddle (top): X position
  aiX: number;
  bx: number; by: number;
  vx: number; vy: number;
  ps: number; as: number;
  keys: Set<string>;
  touchX: number | null;
  lastTouchX: number | null;
}

function fresh(): GS {
  return {
    playerX: W / 2 - PAD_W / 2,
    aiX: W / 2 - PAD_W / 2,
    bx: W / 2, by: H / 2,
    vx: 3 * (Math.random() > 0.5 ? 1 : -1),
    vy: 4.5,
    ps: 0, as: 0,
    keys: new Set(),
    touchX: null,
    lastTouchX: null,
  };
}

export default function PongPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gs        = useRef<GS>(fresh());
  const statRef   = useRef<GameStatus>('idle');
  const rafRef    = useRef<number>();

  const [status, setStatus] = useState<GameStatus>('idle');
  const [scores, setScores] = useState({ p: 0, a: 0 });
  const [touching, setTouching] = useState(false);

  // ── Main render loop ──────────────────────────────────────────────────────
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const s = gs.current;

    if (statRef.current === 'running') {
      // ── Player input (bottom paddle, moves horizontally) ──────────────────
      if (s.keys.has('ArrowLeft') || s.keys.has('a') || s.keys.has('A'))
        s.playerX = Math.max(0, s.playerX - PAD_SPEED);
      if (s.keys.has('ArrowRight') || s.keys.has('d') || s.keys.has('D'))
        s.playerX = Math.min(W - PAD_W, s.playerX + PAD_SPEED);

      // Touch: drag player paddle
      if (s.touchX !== null) {
        const target = s.touchX - PAD_W / 2;
        const diff   = target - s.playerX;
        s.playerX   += Math.sign(diff) * Math.min(Math.abs(diff), PAD_SPEED * 1.8);
        s.playerX    = Math.max(0, Math.min(W - PAD_W, s.playerX));
      }

      // AI tracks ball horizontally
      const aiMid = s.aiX + PAD_W / 2;
      if (aiMid < s.bx - 6) s.aiX = Math.min(W - PAD_W, s.aiX + AI_SPEED);
      else if (aiMid > s.bx + 6) s.aiX = Math.max(0, s.aiX - AI_SPEED);

      // ── Ball physics ──────────────────────────────────────────────────────
      s.bx += s.vx;
      s.by += s.vy;

      // Left / right wall bounce
      if (s.bx <= BALL_R) { s.bx = BALL_R; s.vx = Math.abs(s.vx); }
      if (s.bx >= W - BALL_R) { s.bx = W - BALL_R; s.vx = -Math.abs(s.vx); }

      // Player paddle (bottom): y = H - 24 - PAD_H → top edge = H-24-PAD_H
      const playerTop = H - 24 - PAD_H;
      if (
        s.vy > 0 &&
        s.by + BALL_R >= playerTop &&
        s.by + BALL_R <= playerTop + PAD_H + 4 &&
        s.bx >= s.playerX - BALL_R &&
        s.bx <= s.playerX + PAD_W + BALL_R
      ) {
        s.vy = -Math.min(Math.abs(s.vy) * 1.06, 13);
        // spin: offset from paddle centre → horizontal velocity
        const hit = (s.bx - (s.playerX + PAD_W / 2)) / (PAD_W / 2);
        s.vx = hit * 7;
        s.by = playerTop - BALL_R - 1;
      }

      // AI paddle (top): top edge at y = 24
      const aiBottom = 24 + PAD_H;
      if (
        s.vy < 0 &&
        s.by - BALL_R <= aiBottom &&
        s.by - BALL_R >= 24 - 4 &&
        s.bx >= s.aiX - BALL_R &&
        s.bx <= s.aiX + PAD_W + BALL_R
      ) {
        s.vy = Math.min(Math.abs(s.vy) * 1.06, 13);
        const hit = (s.bx - (s.aiX + PAD_W / 2)) / (PAD_W / 2);
        s.vx = hit * 7;
        s.by = aiBottom + BALL_R + 1;
      }

      // Score: ball exits top = player scores; ball exits bottom = AI scores
      if (s.by < -BALL_R * 2) {
        s.ps++;
        setScores({ p: s.ps, a: s.as });
        if (s.ps >= WIN_SCORE) { statRef.current = 'won'; setStatus('won'); return; }
        s.bx = W / 2; s.by = H / 2;
        s.vx = 3 * (Math.random() > 0.5 ? 1 : -1);
        s.vy = 4.5;
      }
      if (s.by > H + BALL_R * 2) {
        s.as++;
        setScores({ p: s.ps, a: s.as });
        if (s.as >= WIN_SCORE) { statRef.current = 'lost'; setStatus('lost'); return; }
        s.bx = W / 2; s.by = H / 2;
        s.vx = 3 * (Math.random() > 0.5 ? 1 : -1);
        s.vy = -4.5;
      }
    }

    // ── Draw ─────────────────────────────────────────────────────────────────
    const isDark = document.documentElement.classList.contains('dark');
    const BG  = isDark ? '#0d1117' : '#f1f5f9';
    const FG  = isDark ? '#f0f6fc' : '#0f172a';
    const GRN = isDark ? '#22c55e' : '#16a34a';
    const RED = isDark ? '#f87171' : '#dc2626';
    const MID = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);

    // Centre dashed line (horizontal)
    ctx.setLineDash([6, 7]);
    ctx.strokeStyle = MID;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2); ctx.stroke();
    ctx.setLineDash([]);

    // Score numbers
    ctx.fillStyle = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)';
    ctx.font = 'bold 48px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(String(s.as), W / 2, H / 2 - 16);  // AI score (top half)
    ctx.fillText(String(s.ps), W / 2, H / 2 + 56);  // Player score (bottom half)

    // Labels
    ctx.fillStyle = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)';
    ctx.font = '9px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('CPU', 20, H / 2 - 8);
    ctx.fillText('YOU', 20, H / 2 + 18);

    // AI paddle (top)
    ctx.fillStyle = RED;
    ctx.beginPath();
    ctx.roundRect(s.aiX, 24, PAD_W, PAD_H, 3);
    ctx.fill();

    // Player paddle (bottom)
    ctx.fillStyle = GRN;
    ctx.beginPath();
    ctx.roundRect(s.playerX, H - 24 - PAD_H, PAD_W, PAD_H, 3);
    ctx.fill();

    // Ball glow
    ctx.shadowColor = GRN; ctx.shadowBlur = 14;
    ctx.fillStyle = FG;
    ctx.beginPath(); ctx.arc(s.bx, s.by, BALL_R, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;

    rafRef.current = requestAnimationFrame(render);
  }, []);

  // ── Controls ───────────────────────────────────────────────────────────────
  const doStart = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    gs.current = fresh();
    setScores({ p: 0, a: 0 });
    statRef.current = 'running';
    setStatus('running');
    rafRef.current = requestAnimationFrame(render);
  }, [render]);

  const doPause = useCallback(() => {
    if (statRef.current === 'running') {
      statRef.current = 'paused';
      setStatus('paused');
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    } else if (statRef.current === 'paused') {
      statRef.current = 'running';
      setStatus('running');
      rafRef.current = requestAnimationFrame(render);
    }
  }, [render]);

  const doReset = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    gs.current = fresh();
    statRef.current = 'idle';
    setStatus('idle');
    setScores({ p: 0, a: 0 });
    // draw idle
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d')!;
      const isDark = document.documentElement.classList.contains('dark');
      ctx.fillStyle = isDark ? '#0d1117' : '#f1f5f9';
      ctx.fillRect(0, 0, W, H);
    }
  }, []);

  // Keyboard
  useEffect(() => {
    const dn = (e: KeyboardEvent) => {
      gs.current.keys.add(e.key);
      if (e.key === ' ') { e.preventDefault(); doPause(); }
      if (['ArrowLeft','ArrowRight','a','d','A','D'].includes(e.key)) e.preventDefault();
    };
    const up = (e: KeyboardEvent) => gs.current.keys.delete(e.key);
    window.addEventListener('keydown', dn);
    window.addEventListener('keyup', up);
    return () => { window.removeEventListener('keydown', dn); window.removeEventListener('keyup', up); };
  }, [doPause]);

  // Touch on canvas — move player paddle horizontally
  const onTouch = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    if (e.type === 'touchend' || e.type === 'touchcancel') {
      gs.current.touchX = null;
      setTouching(false);
      return;
    }
    const t = e.touches[0];
    const x = ((t.clientX - rect.left) / rect.width) * W;
    gs.current.touchX = x;
    setTouching(true);
    if (statRef.current === 'idle' || statRef.current === 'won' || statRef.current === 'lost') doStart();
    else if (statRef.current === 'paused') doPause();
  }, [doStart, doPause]);

  // Draw idle state on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const isDark = document.documentElement.classList.contains('dark');
    ctx.fillStyle = isDark ? '#0d1117' : '#f1f5f9';
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(128,128,128,0.12)';
    ctx.setLineDash([6, 7]); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, H/2); ctx.lineTo(W, H/2); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = isDark ? '#f87171' : '#dc2626';
    ctx.beginPath(); ctx.roundRect(W/2 - PAD_W/2, 24, PAD_W, PAD_H, 3); ctx.fill();
    ctx.fillStyle = isDark ? '#22c55e' : '#16a34a';
    ctx.beginPath(); ctx.roundRect(W/2 - PAD_W/2, H - 24 - PAD_H, PAD_W, PAD_H, 3); ctx.fill();
    ctx.fillStyle = isDark ? '#f0f6fc' : '#0f172a';
    ctx.beginPath(); ctx.arc(W/2, H/2, BALL_R, 0, Math.PI*2); ctx.fill();
  }, []);

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  return (
    <div className="space-y-6 pb-10">
      <ScrollReveal variants={fadeUp}>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold font-display gradient-text flex items-center gap-2.5 flex-wrap">
Pong
          </h1>
          <p className="text-muted-foreground mt-1">First to {WIN_SCORE} wins · move your paddle left/right</p>
        </div>
      </ScrollReveal>

      {/* Layout: canvas centred, scoreboard beside on desktop */}
      <div className="flex flex-col sm:flex-row gap-6 items-start justify-center">
        {/* Canvas */}
        <div className="relative rounded-xl overflow-hidden border-2 border-border shadow-2xl shadow-primary/10 mx-auto sm:mx-0">
          <canvas
            ref={canvasRef}
            width={W} height={H}
            className="block touch-none"
            style={{ width: Math.min(W, 320), height: 'auto', aspectRatio: `${W}/${H}` }}
            onTouchStart={onTouch}
            onTouchMove={onTouch}
            onTouchEnd={onTouch}
            onTouchCancel={onTouch}
          />

          {status === 'idle' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
              <Gamepad2 className="w-12 h-12 text-primary mb-4" />
              <h2 className="text-white text-2xl font-bold font-display mb-2">PONG</h2>
              <p className="text-white/60 text-sm mb-2">You control the <span className="text-green-400">green</span> paddle</p>
              <p className="text-white/40 text-xs mb-6">← → arrows, A/D, or touch</p>
              <Button onClick={doStart} size="lg" className="gap-2 glow-primary">
                <Play className="w-4 h-4" /> Start
              </Button>
            </div>
          )}
          {status === 'paused' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
              <Pause className="w-12 h-12 text-primary mb-4" />
              <h2 className="text-white text-2xl font-bold font-display mb-6">PAUSED</h2>
              <Button onClick={doPause} className="gap-2"><Play className="w-4 h-4" />Resume</Button>
            </div>
          )}
          {status === 'won' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
              <div className="text-5xl mb-3">🏆</div>
              <h2 className="text-white text-2xl font-bold font-display mb-1">YOU WIN!</h2>
              <p className="text-white/60 text-sm mb-5">{scores.p} – {scores.a}</p>
              <Button onClick={doStart} className="gap-2 glow-primary"><RotateCcw className="w-4 h-4" />Play Again</Button>
            </div>
          )}
          {status === 'lost' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
              <div className="text-5xl mb-3">💀</div>
              <h2 className="text-white text-2xl font-bold font-display mb-1">CPU WINS</h2>
              <p className="text-white/60 text-sm mb-5">{scores.p} – {scores.a}</p>
              <Button onClick={doStart} className="gap-2"><RotateCcw className="w-4 h-4" />Try Again</Button>
            </div>
          )}
        </div>

        {/* Side panel: scores + controls */}
        <div className="flex flex-row sm:flex-col gap-3 w-full sm:w-36 shrink-0">
          <Card className="flex-1 sm:flex-none">
            <CardContent className="pt-4 pb-4 text-center">
              <p className="text-xs text-red-400 font-semibold mb-1">CPU</p>
              <p className="text-3xl font-bold font-display text-red-400">{scores.a}</p>
            </CardContent>
          </Card>
          <Card className="flex-1 sm:flex-none">
            <CardContent className="pt-4 pb-4 text-center">
              <p className="text-xs text-primary font-semibold mb-1">You</p>
              <p className="text-3xl font-bold font-display text-primary">{scores.p}</p>
            </CardContent>
          </Card>

          <div className="flex sm:flex-col gap-2 flex-1 sm:flex-none">
            {(status === 'idle' || status === 'won' || status === 'lost') && (
              <Button onClick={doStart} className="gap-1.5 flex-1 sm:w-full text-xs glow-primary">
                <Play className="w-3.5 h-3.5" />{status === 'idle' ? 'Play' : 'Again'}
              </Button>
            )}
            {(status === 'running' || status === 'paused') && (
              <Button variant="outline" onClick={doPause} className="gap-1.5 flex-1 sm:w-full text-xs">
                {status === 'paused' ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                {status === 'paused' ? 'Resume' : 'Pause'}
              </Button>
            )}
            {status !== 'idle' && (
              <Button variant="ghost" size="icon" onClick={doReset} className="shrink-0">
                <RotateCcw className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* How to play */}
      <Card>
        <CardContent className="pt-4 pb-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs text-muted-foreground">
            <div>⬅️ A / Arrow Left</div>
            <div>➡️ D / Arrow Right</div>
            <div>⏸️ Space to pause</div>
            <div>👆 Swipe left/right on mobile</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
