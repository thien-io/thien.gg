'use client';

import React, { useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Pixel-art tennis sprites — 8 wide × 14 tall, scale = 4px per pixel
// Colors:
//   skin    #FFCBA4   shadow-skin #D4956A
//   blue    #3B82F6   dark-blue   #1D4ED8
//   red     #EF4444   dark-red    #B91C1C
//   white   #F8FAFC   grey        #94A3B8
//   hair-L  #1E293B   hair-R      #92400E
//   shoe    #F1F5F9   sole        #CBD5E1
// ─────────────────────────────────────────────────────────────────────────────

const SK = '#FFCBA4';  // skin
const SS = '#D4956A';  // skin shadow
const B1 = '#3B82F6';  // blue shirt
const B2 = '#1D4ED8';  // blue dark
const R1 = '#EF4444';  // red shirt
const R2 = '#B91C1C';  // red dark
const WH = '#F8FAFC';  // white / shoe
const GR = '#94A3B8';  // grey / shoe sole
const HL = '#1E293B';  // left-player hair
const HR = '#92400E';  // right-player hair
const __  = null;       // transparent

// ── Left player (idle, facing right) ─────────────────────────────────────────
const L_IDLE: (string|null)[][] = [
  [__,  HL,  HL,  HL,  HL,  __,  __,  __],  // hair top
  [__,  SK,  SK,  SK,  SK,  HL,  __,  __],  // head
  [__,  SK,  SS,  SK,  SK,  HL,  __,  __],  // head with shadow
  [__,  SK,  SK,  SK,  SK,  __,  __,  __],  // chin
  [__,  B2,  B1,  B1,  B1,  B1,  SK,  __],  // collar + arm start
  [__,  B2,  B1,  B1,  B1,  B1,  SK,  __],  // torso
  [SK,  B2,  B1,  B1,  B1,  B1,  SK,  SK],  // arms wide
  [__,  B2,  B1,  B1,  B1,  B1,  __,  __],  // torso lower
  [__,  B2,  B2,  WH,  WH,  B1,  __,  __],  // shorts waist
  [__,  B2,  B2,  __,  __,  B1,  __,  __],  // shorts legs split
  [__,  SK,  SK,  __,  __,  SK,  SK,  __],  // bare legs
  [__,  SK,  SK,  __,  __,  SK,  SK,  __],  // legs lower
  [__,  WH,  WH,  __,  __,  WH,  WH,  __],  // shoes
  [__,  GR,  GR,  __,  __,  GR,  GR,  __],  // soles
];

// ── Left player swing frame (right arm raised) ────────────────────────────────
const L_SWING: (string|null)[][] = [
  [__,  HL,  HL,  HL,  HL,  __,  __,  __],
  [__,  SK,  SK,  SK,  SK,  HL,  __,  __],
  [__,  SK,  SS,  SK,  SK,  HL,  SK,  SK],  // arm swings up-right
  [__,  SK,  SK,  SK,  SK,  __,  SK,  __],
  [__,  B2,  B1,  B1,  B1,  B1,  __,  __],
  [__,  B2,  B1,  B1,  B1,  B1,  __,  __],
  [SK,  B2,  B1,  B1,  B1,  B1,  __,  __],  // left arm out
  [__,  B2,  B1,  B1,  B1,  B1,  __,  __],
  [__,  B2,  B2,  WH,  WH,  B1,  __,  __],
  [__,  B2,  B2,  __,  __,  B1,  __,  __],
  [__,  SK,  SK,  __,  __,  SK,  SK,  __],
  [__,  SK,  SK,  __,  __,  SK,  SK,  __],
  [__,  WH,  WH,  __,  __,  WH,  WH,  __],
  [__,  GR,  GR,  __,  __,  GR,  GR,  __],
];

// ── Right player (mirrored, red shirt) ────────────────────────────────────────
function mirrorSprite(s: (string|null)[][]): (string|null)[][] {
  return s.map(row => [...row].reverse());
}
function recolor(s: (string|null)[][], map: Record<string, string>): (string|null)[][] {
  return s.map(row => row.map(c => (c && map[c]) ? map[c] : c));
}

const redMap: Record<string,string> = { [B1]: R1, [B2]: R2, [HL]: HR };
const R_IDLE  = recolor(mirrorSprite(L_IDLE),  redMap);
const R_SWING = recolor(mirrorSprite(L_SWING), redMap);

// ── Racket frames ─────────────────────────────────────────────────────────────
// Small racket: 4 wide × 6 tall
const RACKET_H = '#A16207'; // handle
const RACKET_F = '#D97706'; // frame
const RACKET_S = '#FDE68A'; // strings (semi-transparent look)

// ── Constants ─────────────────────────────────────────────────────────────────
const SCALE = 4;          // screen px per sprite pixel
const SPW   = 8 * SCALE;  // sprite width  = 32
const SPH   = 14 * SCALE; // sprite height = 56
const BALL_R = 6;

function drawPixels(
  ctx: CanvasRenderingContext2D,
  sprite: (string|null)[][],
  x: number, y: number, sc = SCALE
) {
  sprite.forEach((row, ry) => row.forEach((c, rx) => {
    if (c) {
      ctx.fillStyle = c;
      ctx.fillRect(Math.round(x + rx*sc), Math.round(y + ry*sc), sc, sc);
    }
  }));
}

function drawRacket(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,   // centre of racket head
  swinging: boolean,
  facingRight: boolean
) {
  const sc = SCALE;
  const hx = facingRight ? cx - sc/2 : cx - sc/2;
  const hy = cy;

  // Handle (2×4 pixels below head)
  ctx.fillStyle = RACKET_H;
  ctx.fillRect(Math.round(hx), Math.round(hy + sc*3), sc*2, sc*4);

  // Head outline (oval)
  ctx.strokeStyle = RACKET_F;
  ctx.lineWidth = sc * 0.9;
  ctx.beginPath();
  ctx.ellipse(
    Math.round(hx + sc),
    Math.round(hy + sc),
    sc * 1.6, sc * 2.2, 0, 0, Math.PI * 2
  );
  ctx.stroke();

  // Strings
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = 'rgba(253, 230, 138, 0.7)';
  for (let i = -1; i <= 1; i++) {
    ctx.beginPath();
    ctx.moveTo(hx + sc + i*sc*0.8, hy - sc*0.8);
    ctx.lineTo(hx + sc + i*sc*0.8, hy + sc*2.5);
    ctx.stroke();
  }
  for (let j = -1; j <= 1; j++) {
    ctx.beginPath();
    ctx.moveTo(hx - sc*0.6, hy + sc + j*sc*0.7);
    ctx.lineTo(hx + sc*2.6, hy + sc + j*sc*0.7);
    ctx.stroke();
  }
}

export function TennisHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    // Logical size
    const W = 480;
    const H = 150;
    canvas.width  = W;
    canvas.height = H;

    const FLOOR_Y = H - 18;

    // Player x positions — leave room so racket + ball always visible
    const L_X  = 14;                    // left player left edge
    const R_X  = W - SPW - 14;         // right player left edge

    // Ball boundaries — never go past player racket zone
    const BALL_MIN_X = L_X + SPW + 4;
    const BALL_MAX_X = R_X - 4;

    // Ball state
    let bx = W / 2;
    let by = FLOOR_Y - SPH * 0.4;
    let vx = 4.2;
    let vy = -5.0;
    const GRAV = 0.22;

    // Hit state
    let lSwing = false, rSwing = false, swingTick = 0;
    let t = 0;

    const draw = () => {
      t++;
      ctx.clearRect(0, 0, W, H);

      // Background
      const isDark = document.documentElement.classList.contains('dark');
      ctx.fillStyle = isDark ? '#0d1117' : '#f0f4f8';
      ctx.fillRect(0, 0, W, H);

      // Subtle scanline texture
      ctx.fillStyle = isDark ? 'rgba(255,255,255,0.012)' : 'rgba(0,0,0,0.022)';
      for (let y = 0; y < H; y += 6) ctx.fillRect(0, y, W, 3);

      // Floor
      ctx.fillStyle = isDark ? '#22c55e' : '#16a34a';
      ctx.fillRect(0, FLOOR_Y, W, 2);
      ctx.fillStyle = isDark ? 'rgba(34,197,94,0.10)' : 'rgba(22,163,74,0.07)';
      ctx.fillRect(0, FLOOR_Y + 2, W, H - FLOOR_Y - 2);

      // Centre net
      const netX = W / 2;
      const netTop = FLOOR_Y - 34;
      ctx.strokeStyle = isDark ? '#334155' : '#cbd5e1';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      for (let ny = netTop; ny < FLOOR_Y; ny += 6) {
        ctx.beginPath(); ctx.moveTo(netX - 10, ny); ctx.lineTo(netX + 10, ny); ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.fillStyle = isDark ? '#475569' : '#94a3b8';
      ctx.fillRect(netX - 1, netTop, 2, FLOOR_Y - netTop);
      ctx.fillStyle = isDark ? '#64748B' : '#cbd5e1';
      ctx.fillRect(netX - 11, netTop - 2, 22, 3);

      // ── Physics ──────────────────────────────────────────────────────────
      bx += vx;
      by += vy;
      vy += GRAV;

      // Floor bounce
      if (by + BALL_R >= FLOOR_Y) {
        by = FLOOR_Y - BALL_R;
        vy = -Math.abs(vy) * 0.58;
        if (Math.abs(vy) < 1.5) vy = -2.8;
      }

      // Clamp X to keep ball between paddles — reverse vx at the boundary
      if (bx - BALL_R <= BALL_MIN_X && vx < 0) {
        bx = BALL_MIN_X + BALL_R;
        vx = Math.abs(vx) * 1.06;
        vy = -(4.5 + Math.random() * 1.5);
        lSwing = true; swingTick = 20;
      }
      if (bx + BALL_R >= BALL_MAX_X && vx > 0) {
        bx = BALL_MAX_X - BALL_R;
        vx = -Math.abs(vx) * 1.06;
        vy = -(4.5 + Math.random() * 1.5);
        rSwing = true; swingTick = 20;
      }

      // Speed cap / floor
      const maxV = 7.5, minV = 3.2;
      if (Math.abs(vx) > maxV) vx = Math.sign(vx) * maxV;
      if (Math.abs(vx) < minV) vx = Math.sign(vx) * minV;

      if (swingTick > 0) {
        swingTick--;
        if (swingTick === 0) { lSwing = false; rSwing = false; }
      }

      // ── Sprites + rackets ────────────────────────────────────────────────
      const lBob = Math.round(Math.sin(t * 0.08) * 1.5);
      const rBob = Math.round(Math.sin(t * 0.08 + Math.PI) * 1.5);
      const lY   = FLOOR_Y - SPH + lBob;
      const rY   = FLOOR_Y - SPH + rBob;

      // Left player
      drawPixels(ctx, lSwing ? L_SWING : L_IDLE, L_X, lY);
      // Left racket
      const lRacketX = lSwing
        ? L_X + SPW - SCALE       // swinging: racket up-right
        : L_X + SPW;
      const lRacketY = lSwing
        ? lY + SCALE * 2           // raised
        : lY + SCALE * 6;          // resting
      drawRacket(ctx, lRacketX + SCALE, lRacketY, lSwing, true);

      // Right player
      drawPixels(ctx, rSwing ? R_SWING : R_IDLE, R_X, rY);
      const rRacketX = rSwing
        ? R_X - SCALE * 3
        : R_X - SCALE * 2;
      const rRacketY = rSwing
        ? rY + SCALE * 2
        : rY + SCALE * 6;
      drawRacket(ctx, rRacketX + SCALE, rRacketY, rSwing, false);

      // ── Ball ──────────────────────────────────────────────────────────────
      // Shadow
      const shadowAmt = Math.max(0.1, 1 - (FLOOR_Y - by) / 90);
      ctx.fillStyle = `rgba(0,0,0,${shadowAmt * 0.25})`;
      ctx.beginPath();
      ctx.ellipse(bx, FLOOR_Y + 3, BALL_R * shadowAmt * 1.6, 3 * shadowAmt, 0, 0, Math.PI*2);
      ctx.fill();

      // Ball body
      ctx.fillStyle = '#CDEB0A';
      ctx.shadowColor = '#CDEB0A';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(bx, by, BALL_R, 0, Math.PI*2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Seam
      ctx.strokeStyle = '#8BAD00';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(bx, by, BALL_R * 0.6, 0.5, 2.3);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(bx, by, BALL_R * 0.6, Math.PI + 0.5, Math.PI + 2.3);
      ctx.stroke();

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full rounded-xl border border-border block"
      style={{ imageRendering: 'pixelated' }}
    />
  );
}
