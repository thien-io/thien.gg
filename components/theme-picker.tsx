'use client';

import React, { useState } from 'react';
import { useSiteTheme, THEMES, type ThemeId } from '@/lib/site-theme';
import { cn } from '@/lib/utils';
import { Palette, Check, X } from 'lucide-react';

const SWATCHES: Record<ThemeId, string> = {
  pixel:     '#22c55e',
  terminal:  '#4ade80',
  miami:     '#ff3cac',
  paper:     '#c2500a',
  retro:     '#f59e0b',
  nord:      '#5e81ac',
  synthwave: '#c084fc',
  dracula:   '#bd93f9',
  solarized: '#268bd2',
  forest:    '#4ade80',
  sunset:    '#f97316',
  ocean:     '#22d3ee',
};

export function ThemePicker({ collapsed }: { collapsed: boolean }) {
  const { themeId, setThemeId } = useSiteTheme();
  const [open, setOpen] = useState(false);
  const currentTheme = THEMES.find(t => t.id === themeId);

  const popover = (
    <div className="w-52 rounded-xl border border-border/80 bg-sidebar shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-border/60">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Theme</span>
        <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="py-1">
        {THEMES.map((t) => (
          <button
            key={t.id}
            onClick={() => { setThemeId(t.id); setOpen(false); }}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors',
              themeId === t.id
                ? 'bg-primary/10 text-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            )}
          >
            <span
              className="w-3 h-3 rounded-full shrink-0 border border-white/20"
              style={{ background: SWATCHES[t.id] }}
            />
            <span className="flex-1 text-left">{t.emoji} {t.label}</span>
            {themeId === t.id && <Check className="w-3.5 h-3.5 text-primary shrink-0" />}
          </button>
        ))}
      </div>
    </div>
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
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <div className="absolute left-12 bottom-0 z-50">{popover}</div>
          </>
        )}
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
          style={{ background: SWATCHES[themeId] }}
        />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute bottom-full left-0 mb-2 z-50">{popover}</div>
        </>
      )}
    </div>
  );
}
