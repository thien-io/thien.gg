'use client';

import React, {
  useState, useEffect, useRef, useCallback, useMemo,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal, fadeUp, scaleIn, StaggerList } from '@/lib/animations';
import { generateWords } from '@/lib/words';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  RotateCcw, Trophy, Crown, Medal, Loader2,
  Keyboard, Clock, Target, Zap, Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

// ── Types & constants ─────────────────────────────────────────────────────────
const MODES = [15, 30, 60, 120] as const;
type Mode = typeof MODES[number];
const WORD_COUNT = 80; // words pre-generated in the pool

type CharState = 'pending' | 'correct' | 'incorrect' | 'extra';

interface WordState {
  chars: { char: string; state: CharState }[];
  typed: string;
  done: boolean; // word fully submitted
}

interface LeaderEntry {
  id: number;
  name: string;
  wpm: number;
  accuracy: number;
  mode: string;
  created_at: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function calcWpm(correctChars: number, elapsedSeconds: number): number {
  if (elapsedSeconds <= 0) return 0;
  return Math.round((correctChars / 5) / (elapsedSeconds / 60));
}

function buildWordState(word: string): WordState {
  return {
    chars: word.split('').map(ch => ({ char: ch, state: 'pending' })),
    typed: '',
    done: false,
  };
}

function applyTypedToWord(word: WordState, typed: string): WordState {
  const target = word.chars.map(c => c.char).join('');
  const chars = target.split('').map((ch, i): { char: string; state: CharState } => {
    if (i >= typed.length) return { char: ch, state: 'pending' };
    return { char: ch, state: typed[i] === ch ? 'correct' : 'incorrect' };
  });
  // extra characters
  for (let i = target.length; i < typed.length; i++) {
    chars.push({ char: typed[i], state: 'extra' });
  }
  return { ...word, chars, typed };
}

// ── Rank medal ────────────────────────────────────────────────────────────────
function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <Crown className="w-4 h-4 text-yellow-400 shrink-0" />;
  if (rank === 2) return <Medal className="w-4 h-4 text-slate-400 shrink-0" />;
  if (rank === 3) return <Medal className="w-4 h-4 text-amber-600 shrink-0" />;
  return <span className="w-4 text-xs text-muted-foreground font-mono text-center shrink-0">#{rank}</span>;
}

// ── Main component ────────────────────────────────────────────────────────────
export default function TypePage() {
  const [mode, setMode] = useState<Mode>(30);

  // Word states
  const [words, setWords] = useState<WordState[]>([]);
  const [currentWord, setCurrentWord] = useState(0);
  const [currentInput, setCurrentInput] = useState('');

  // Timer
  const [timeLeft, setTimeLeft] = useState<number>(mode);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const startTimeRef = useRef<number>(0);

  // Stats (live)
  const [liveWpm, setLiveWpm] = useState(0);
  const correctCharsRef = useRef(0);
  const totalCharsRef = useRef(0);

  // Results
  const [finalWpm, setFinalWpm] = useState(0);
  const [finalAccuracy, setFinalAccuracy] = useState(0);

  // Name entry + leaderboard
  const [showNameEntry, setShowNameEntry] = useState(false);
  const [entryName, setEntryName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [savedRank, setSavedRank] = useState<number | null>(null);
  const [savedName, setSavedName] = useState('');

  // Leaderboard
  const [leaders, setLeaders] = useState<LeaderEntry[]>([]);
  const [loadingBoard, setLoadingBoard] = useState(true);
  const [boardMode, setBoardMode] = useState<Mode>(30);

  // Scroll / caret refs
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const caretRef = useRef<HTMLDivElement>(null);

  // ── Init / reset ────────────────────────────────────────────────────────────
  const reset = useCallback((newMode?: Mode) => {
    const m = newMode ?? mode;
    clearInterval(timerRef.current);
    const raw = generateWords(WORD_COUNT);
    setWords(raw.map(buildWordState));
    setCurrentWord(0);
    setCurrentInput('');
    setTimeLeft(m);
    setStarted(false);
    setFinished(false);
    setLiveWpm(0);
    setShowNameEntry(false);
    setSavedRank(null);
    setSavedName('');
    setSubmitError('');
    correctCharsRef.current = 0;
    totalCharsRef.current = 0;
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [mode]);

  const changeMode = useCallback((m: Mode) => {
    setMode(m);
    setBoardMode(m);
    reset(m);
  }, [reset]);

  useEffect(() => { reset(); }, []); // eslint-disable-line

  // ── Fetch leaderboard ───────────────────────────────────────────────────────
  const fetchLeaders = useCallback(async (m: Mode) => {
    setLoadingBoard(true);
    try {
      const res = await fetch(`/api/wpm-leaderboard?mode=${m}`);
      const data = await res.json();
      if (Array.isArray(data)) setLeaders(data);
    } catch { /* silent */ }
    finally { setLoadingBoard(false); }
  }, []);

  useEffect(() => { fetchLeaders(boardMode); }, [boardMode, fetchLeaders]);

  // ── Timer ───────────────────────────────────────────────────────────────────
  const finish = useCallback(() => {
    clearInterval(timerRef.current);
    setFinished(true);
    setStarted(false);

    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    const wpm = calcWpm(correctCharsRef.current, elapsed);
    const acc = totalCharsRef.current > 0
      ? Math.round((correctCharsRef.current / totalCharsRef.current) * 100)
      : 100;

    setFinalWpm(wpm);
    setFinalAccuracy(acc);

    // Check if qualifies for top 15
    const wouldQualify = wpm > 0;
    if (wouldQualify) setShowNameEntry(true);
  }, []);

  useEffect(() => {
    if (!started) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          finish();
          return 0;
        }
        // Update live WPM every second
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        setLiveWpm(calcWpm(correctCharsRef.current, elapsed));
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [started, finish]);

  // ── Caret position ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!caretRef.current || !wordRefs.current[currentWord] || !containerRef.current) return;
    const wordEl = wordRefs.current[currentWord];
    if (!wordEl) return;

    // Find the char span at current input length
    const charEls = wordEl.querySelectorAll<HTMLSpanElement>('[data-char]');
    const targetEl = charEls[currentInput.length] ?? charEls[charEls.length - 1];

    const containerRect = containerRef.current.getBoundingClientRect();
    const scrollTop = containerRef.current.scrollTop;

    let left = 0, top = 0, height = 0;
    if (targetEl) {
      const r = targetEl.getBoundingClientRect();
      left = r.left - containerRect.left + (currentInput.length >= charEls.length ? r.width : 0);
      top  = r.top  - containerRect.top + scrollTop;
      height = r.height;
    } else {
      const r = wordEl.getBoundingClientRect();
      left = r.left - containerRect.left;
      top  = r.top  - containerRect.top + scrollTop;
      height = r.height;
    }

    caretRef.current.style.left   = `${left}px`;
    caretRef.current.style.top    = `${top}px`;
    caretRef.current.style.height = `${height}px`;
  }, [currentWord, currentInput, words]);

  // ── Auto-scroll to keep current word visible ────────────────────────────────
  useEffect(() => {
    const el = wordRefs.current[currentWord];
    const container = containerRef.current;
    if (!el || !container) return;
    const elRect = el.getBoundingClientRect();
    const cRect  = container.getBoundingClientRect();
    if (elRect.bottom > cRect.bottom - 8) {
      container.scrollTop += elRect.bottom - cRect.bottom + 48;
    }
  }, [currentWord]);

  // ── Keyboard handler ────────────────────────────────────────────────────────
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (finished) return;

    // Start timer on first keypress
    if (!started && e.key.length === 1) {
      setStarted(true);
      startTimeRef.current = Date.now();
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      reset();
      return;
    }

    if (e.key === ' ') {
      e.preventDefault();
      if (!currentInput.trim()) return; // don't advance on empty

      // Submit current word
      const wordTarget = words[currentWord].chars
        .filter(c => c.state !== 'extra')
        .map(c => c.char).join('');
      const trimmed = currentInput.trimEnd();

      // Count correct/total chars for this word
      const chars = trimmed.split('');
      chars.forEach((ch, i) => {
        totalCharsRef.current++;
        if (wordTarget[i] === ch) correctCharsRef.current++;
      });

      setWords(prev => {
        const next = [...prev];
        next[currentWord] = { ...applyTypedToWord(next[currentWord], trimmed), done: true };
        return next;
      });
      setCurrentWord(prev => prev + 1);
      setCurrentInput('');
      return;
    }

    if (e.key === 'Backspace') {
      if (currentInput === '' && currentWord > 0) {
        // Allow backing up to previous word if it wasn't correct
        const prevWord = words[currentWord - 1];
        if (prevWord && !prevWord.chars.every(c => c.state === 'correct')) {
          e.preventDefault();
          setCurrentWord(prev => prev - 1);
          setCurrentInput(prevWord.typed);
          return;
        }
      }
    }
  }, [finished, started, currentInput, currentWord, words, reset]);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (finished) return;
    const val = e.target.value;
    setCurrentInput(val);
    setWords(prev => {
      const next = [...prev];
      next[currentWord] = applyTypedToWord(next[currentWord], val);
      return next;
    });
  }, [finished, currentWord]);

  // ── Submit score ─────────────────────────────────────────────────────────────
  const submitScore = useCallback(async () => {
    if (!entryName.trim()) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/wpm-leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: entryName.trim(),
          wpm: finalWpm,
          accuracy: finalAccuracy,
          mode: String(mode),
        }),
      });
      const data = await res.json();
      if (!res.ok) { setSubmitError(data.error ?? 'Failed to save.'); return; }
      setSavedRank(data.rank);
      setSavedName(entryName.trim());
      setShowNameEntry(false);
      await fetchLeaders(mode);
    } catch {
      setSubmitError('Network error. Try again.');
    } finally {
      setSubmitting(false);
    }
  }, [entryName, finalWpm, finalAccuracy, mode, fetchLeaders]);

  // ── Render words ─────────────────────────────────────────────────────────────
  const renderedWords = useMemo(() => words.map((word, wi) => (
    <span
      key={wi}
      ref={el => { wordRefs.current[wi] = el; }}
      className={cn(
        'inline-block mr-2 mb-1',
        word.done && word.chars.every(c => c.state === 'correct' || c.state === 'pending')
          ? '' : ''
      )}
    >
      {word.chars.map((ch, ci) => (
        <span
          key={ci}
          data-char
          className={cn(
            'font-mono text-[1.35rem] leading-relaxed tracking-wide transition-colors duration-75',
            ch.state === 'correct'   && 'text-foreground',
            ch.state === 'incorrect' && 'text-red-500',
            ch.state === 'extra'     && 'text-red-400 underline',
            ch.state === 'pending'   && 'text-muted-foreground/50',
            wi === currentWord && ch.state === 'pending' && 'text-muted-foreground/40',
          )}
        >
          {ch.char}
        </span>
      ))}
    </span>
  )), [words, currentWord]);

  // Timer bar percent
  const timerPct = (timeLeft / mode) * 100;

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <ScrollReveal variants={fadeUp}>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold font-display gradient-text">
            Type
          </h1>
          <p className="text-muted-foreground mt-1">How fast can you type? Tab to restart.</p>
        </div>
      </ScrollReveal>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* ── Left: test area ── */}
        <div className="lg:col-span-2 space-y-4">

          {/* Mode selector + timer */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex gap-1.5">
              {MODES.map(m => (
                <button
                  key={m}
                  onClick={() => changeMode(m)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-mono font-semibold transition-all duration-200',
                    mode === m
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  )}
                >
                  {m}s
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {/* Live WPM during test */}
              {started && !finished && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground"
                >
                  <Zap className="w-3.5 h-3.5 text-primary" />
                  <span className="font-mono font-bold text-foreground text-lg">{liveWpm}</span>
                  <span className="text-xs">wpm</span>
                </motion.div>
              )}

              {/* Timer */}
              <div className={cn(
                'font-mono text-3xl font-bold tabular-nums transition-colors',
                timeLeft <= 5 && started ? 'text-red-400' : 'text-primary'
              )}>
                {timeLeft}
              </div>

              <Button variant="ghost" size="icon" onClick={() => reset()} title="Restart (Tab)">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Timer progress bar */}
          <div className="h-0.5 bg-muted/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              style={{ width: `${timerPct}%` }}
              transition={{ duration: 0.5, ease: 'linear' }}
            />
          </div>

          {/* ── Word display ── */}
          <div
            className={cn(
              'relative rounded-xl border bg-card p-5 cursor-text select-none overflow-hidden',
              'transition-all duration-200',
              finished && 'opacity-30 pointer-events-none',
            )}
            style={{ height: 168 }}
            onClick={() => inputRef.current?.focus()}
          >
            {/* Animated caret */}
            <div
              ref={caretRef}
              className="absolute w-0.5 bg-primary animate-pulse rounded-full pointer-events-none"
              style={{ transition: 'left 0.06s, top 0.12s' }}
            />

            {/* Words scroll container */}
            <div
              ref={containerRef}
              className="h-full overflow-hidden"
            >
              <div className="leading-relaxed">
                {renderedWords}
              </div>
            </div>
          </div>

          {/* Hidden input */}
          <input
            ref={inputRef}
            value={currentInput}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            className="opacity-0 absolute pointer-events-none w-px h-px"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Typing input"
            disabled={finished}
          />

          {/* Click to focus hint */}
          {!started && !finished && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm text-muted-foreground/60"
            >
              Click the text above or start typing to begin
            </motion.p>
          )}

          {/* ── Results overlay ── */}
          <AnimatePresence>
            {finished && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-xl border bg-card p-6"
              >
                {/* Big WPM display */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
                      <Zap className="w-3 h-3" /> wpm
                    </p>
                    <p className="text-5xl font-bold font-display gradient-text">{finalWpm}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
                      <Target className="w-3 h-3" /> acc
                    </p>
                    <p className="text-5xl font-bold font-display text-foreground">{finalAccuracy}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3" /> time
                    </p>
                    <p className="text-5xl font-bold font-display text-muted-foreground">{mode}s</p>
                  </div>
                </div>

                {/* Rank display if saved */}
                {savedRank && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-4 p-3 rounded-lg bg-primary/10 border border-primary/20 text-center"
                  >
                    <p className="text-sm font-semibold text-primary">
                      {savedRank === 1 ? '👑 New #1!' : `🏆 Rank #${savedRank} on the ${mode}s board!`}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{savedName} · {finalWpm} WPM</p>
                  </motion.div>
                )}

                {/* Name entry */}
                {showNameEntry && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mb-4 p-4 rounded-lg bg-muted/50 border"
                  >
                    <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-400" />
                      Save your score to the leaderboard
                    </p>
                    <div className="flex gap-2">
                      <Input
                        autoFocus
                        placeholder="Your name…"
                        value={entryName}
                        onChange={e => setEntryName(e.target.value.slice(0, 24))}
                        onKeyDown={e => { if (e.key === 'Enter') submitScore(); e.stopPropagation(); }}
                        maxLength={24}
                        className="font-mono"
                        disabled={submitting}
                      />
                      <Button
                        onClick={submitScore}
                        disabled={submitting || !entryName.trim()}
                        className="gap-2 shrink-0"
                      >
                        {submitting
                          ? <Loader2 className="w-4 h-4 animate-spin" />
                          : <Check className="w-4 h-4" />
                        }
                        Save
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => setShowNameEntry(false)}
                        disabled={submitting}
                        className="shrink-0"
                      >
                        Skip
                      </Button>
                    </div>
                    {submitError && (
                      <p className="text-xs text-destructive mt-2">{submitError}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1.5">
                      {entryName.length}/24 chars
                    </p>
                  </motion.div>
                )}

                <Button
                  onClick={() => reset()}
                  size="lg"
                  className="w-full gap-2 glow-primary"
                >
                  <RotateCcw className="w-4 h-4" /> Try Again
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Keyboard shortcut hint */}
          <div className="flex gap-4 text-xs text-muted-foreground/60 justify-center">
            <span><kbd className="font-mono bg-muted/50 px-1.5 py-0.5 rounded text-xs">Tab</kbd> restart</span>
            <span><kbd className="font-mono bg-muted/50 px-1.5 py-0.5 rounded text-xs">Space</kbd> next word</span>
            <span><kbd className="font-mono bg-muted/50 px-1.5 py-0.5 rounded text-xs">Backspace</kbd> fix</span>
          </div>
        </div>

        {/* ── Right: leaderboard ── */}
        <div className="space-y-4">
          {/* Board mode tabs */}
          <div className="flex gap-1">
            {MODES.map(m => (
              <button
                key={m}
                onClick={() => { setBoardMode(m); fetchLeaders(m); }}
                className={cn(
                  'flex-1 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all',
                  boardMode === m
                    ? 'bg-primary/15 text-primary border border-primary/30'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                )}
              >
                {m}s
              </button>
            ))}
          </div>

          <Card className="overflow-hidden">
            <div className="px-4 pt-4 pb-3 border-b bg-muted/20 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <h2 className="font-bold text-sm">Leaderboard</h2>
              <Badge variant="outline" className="ml-auto text-xs font-mono">{boardMode}s</Badge>
            </div>
            <CardContent className="p-0">
              {loadingBoard ? (
                <div className="space-y-1 p-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-9 rounded-lg bg-muted/50 animate-pulse" />
                  ))}
                </div>
              ) : leaders.length === 0 ? (
                <div className="text-center py-10 text-sm text-muted-foreground px-4">
                  <Keyboard className="w-8 h-8 mx-auto mb-2 opacity-20" />
                  <p>No scores yet.</p>
                  <p className="text-xs mt-1">Be the first!</p>
                </div>
              ) : (
                <ul>
                  {leaders.map((entry, i) => {
                    const isYou = savedRank === i + 1 && entry.name === savedName && savedName !== '' && String(boardMode) === entry.mode;
                    return (
                      <motion.li
                        key={entry.id}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className={cn(
                          'flex items-center gap-2.5 px-4 py-2.5 border-b last:border-0 transition-colors',
                          isYou ? 'bg-primary/8' : i === 0 ? 'bg-yellow-400/5' : ''
                        )}
                      >
                        <RankBadge rank={i + 1} />
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            'text-sm font-semibold truncate',
                            isYou && 'text-primary'
                          )}>
                            {entry.name}
                            {isYou && (
                              <span className="ml-1.5 text-[10px] bg-primary/20 text-primary px-1.5 rounded-full">you</span>
                            )}
                          </p>
                          <p className="text-[10px] text-muted-foreground">{entry.accuracy}% acc</p>
                        </div>
                        <span className="text-sm font-bold font-mono tabular-nums text-primary">
                          {entry.wpm}
                          <span className="text-xs font-normal text-muted-foreground ml-0.5">wpm</span>
                        </span>
                      </motion.li>
                    );
                  })}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* WPM scale reference */}
          <Card>
            <CardContent className="pt-4 pb-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">WPM Scale</p>
              <div className="space-y-2">
                {[
                  { label: 'Beginner',     range: '< 30',   color: 'bg-slate-500' },
                  { label: 'Average',      range: '30–50',  color: 'bg-blue-500' },
                  { label: 'Good',         range: '50–70',  color: 'bg-green-500' },
                  { label: 'Fast',         range: '70–100', color: 'bg-yellow-500' },
                  { label: 'Pro',          range: '100–130',color: 'bg-orange-500' },
                  { label: 'Elite',        range: '130+',   color: 'bg-red-500' },
                ].map(tier => (
                  <div key={tier.label} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${tier.color}`} />
                    <span className="text-xs text-muted-foreground flex-1">{tier.label}</span>
                    <span className="text-xs font-mono text-muted-foreground/70">{tier.range}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
