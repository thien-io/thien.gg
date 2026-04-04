'use client';

import React, { useState } from 'react';
import { useSiteTheme, THEMES, type ThemeId } from '@/lib/site-theme';
import { cn } from '@/lib/utils';
import { Palette, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Swatch colours map
const SWATCHES: Record<string, string> = {
  pixel:     '#22c55e', terminal:  '#4ade80', miami:     '#ff3cac',
  paper:     '#c2500a', retro:     '#f59e0b', nord:      '#5e81ac',
  synthwave: '#c084fc', dracula:   '#bd93f9', solarized: '#268bd2',
  forest:    '#4ade80', sunset:    '#f97316', ocean:     '#22d3ee',
  catppuccin:'#cba6f7', gruvbox:   '#d79921', monokai:   '#a6e22e',
  tokyo:     '#7aa2f7', rose:      '#f43f5e', coffee:    '#a87c4f',
  slate:     '#64748b', crimson:   '#dc143c', aurora:    '#56de8f',
  lavender:  '#967bb6', monochrome:'#888888', gotham:    '#2aa198',
  cobalt:    '#0088ff', matrix:    '#00ff41', candy:     '#ff6eb4',
  espresso:  '#6f4e37', arctic:    '#9ecde7', volcanic:  '#ff4500',
  neon:      '#ffff00', parchment: '#8b6914',
  // New 10
  obsidian:  '#818cf8', bubblegum: '#f472b6', midnight:  '#3b82f6',
  sakura:    '#f87171', hacker:    '#22c55e', vaporwave: '#f0abfc',
  autumn:    '#f97316', steel:     '#94a3b8', gold:      '#f59e0b',
  blueprint: '#7dd3fc',
};

export function ThemePicker({ collapsed }: { collapsed: boolean }) {
  const { themeId, setThemeId } = useSiteTheme();
  const [open, setOpen] = useState(false);

  const popover = (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="w-52 rounded-xl border border-border bg-sidebar shadow-2xl overflow-hidden"
    >
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-border/60">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Theme <span className="font-mono text-muted-foreground/60">({THEMES.length})</span>
        </span>
        <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="py-1 max-h-80 overflow-y-auto">
        {THEMES.map((t) => (
          <motion.button
            key={t.id}
            onClick={() => { setThemeId(t.id as ThemeId); setOpen(false); }}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-1.5 text-sm transition-colors',
              themeId === t.id
                ? 'bg-primary/10 text-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            )}
            whileHover={{ x: 2 }}
            transition={{ duration: 0.12 }}
          >
            <span
              className="w-3 h-3 rounded-full shrink-0 border border-white/20"
              style={{ background: SWATCHES[t.id] ?? '#888' }}
            />
            <span className="flex-1 text-left truncate">{t.emoji} {t.label}</span>
            {themeId === t.id && <Check className="w-3.5 h-3.5 text-primary shrink-0" />}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );

  if (collapsed) {
    return (
      <div className="relative">
        <button
          onClick={() => setOpen(o => !o)}
          className="flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          title="Change theme"
        >
          <Palette className="w-4 h-4" />
        </button>
        <AnimatePresence>
          {open && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
              <div className="absolute left-12 bottom-0 z-50">{popover}</div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={cn(
          'w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors',
          open && 'bg-accent text-foreground'
        )}
      >
        <Palette className="w-4 h-4 shrink-0" />
        <span className="flex-1 text-left">Theme</span>
        <span
          className="w-2.5 h-2.5 rounded-full border border-white/20 shrink-0"
          style={{ background: SWATCHES[themeId] ?? '#888' }}
        />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <div className="absolute bottom-full left-0 mb-2 z-50">{popover}</div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
