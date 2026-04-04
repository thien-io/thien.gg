'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeId =
  // Original 12
  | 'pixel' | 'terminal' | 'miami' | 'paper' | 'retro' | 'nord'
  | 'synthwave' | 'dracula' | 'solarized' | 'forest' | 'sunset' | 'ocean'
  // 12-32
  | 'catppuccin' | 'gruvbox' | 'monokai' | 'tokyo'   | 'rose'
  | 'coffee'     | 'slate'   | 'crimson' | 'aurora'  | 'lavender'
  | 'monochrome' | 'gotham'  | 'cobalt'  | 'matrix'  | 'candy'
  | 'espresso'   | 'arctic'  | 'volcanic'| 'neon'    | 'parchment'
  // NEW 10
  | 'obsidian' | 'bubblegum' | 'midnight' | 'sakura' | 'hacker'
  | 'vaporwave' | 'autumn'   | 'steel'    | 'gold'   | 'blueprint';

export interface SiteTheme {
  id: ThemeId;
  label: string;
  emoji: string;
  description: string;
  vars: Record<string, string>;
  darkMode: boolean;
  fonts: string;
  fontBody: string;
  fontDisplay: string;
  fontMono: string;
}

const T = (
  id: ThemeId, label: string, emoji: string, description: string,
  dark: boolean, fonts: string, fontBody: string, fontDisplay: string, fontMono: string,
  vars: Record<string, string>
): SiteTheme => ({ id, label, emoji, description, darkMode: dark, fonts, fontBody, fontDisplay, fontMono, vars });

const GFonts = (q: string) => `https://fonts.googleapis.com/css2?${q}&display=swap`;

export const THEMES: SiteTheme[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // ORIGINAL 12
  // ─────────────────────────────────────────────────────────────────────────
  T('pixel','Pixel','👾','Dark coder pixel art',true,
    GFonts('family=Press+Start+2P&family=Share+Tech+Mono&family=Inter:wght@400;500;600;700'),
    "'Inter',sans-serif","'Press Start 2P',monospace","'Share Tech Mono',monospace",{
    '--background':'224 20% 7%','--foreground':'210 20% 92%','--card':'224 20% 10%','--card-foreground':'210 20% 92%',
    '--popover':'224 20% 10%','--popover-foreground':'210 20% 92%','--primary':'145 80% 42%','--primary-foreground':'0 0% 0%',
    '--secondary':'224 20% 15%','--secondary-foreground':'210 20% 85%','--muted':'224 20% 13%','--muted-foreground':'215 15% 50%',
    '--accent':'224 20% 15%','--accent-foreground':'210 20% 92%','--destructive':'0 62% 50%','--destructive-foreground':'0 0% 100%',
    '--border':'224 20% 18%','--input':'224 20% 18%','--ring':'145 80% 42%','--sidebar':'224 25% 5%',
    '--sidebar-foreground':'210 15% 65%','--sidebar-border':'224 20% 13%','--radius':'0.25rem',
    '--gradient-a':'hsl(145,80%,42%)','--gradient-b':'hsl(174,80%,38%)','--gradient-c':'hsl(200,80%,45%)',
  }),
  T('terminal','Terminal','💻','Green CRT phosphor',true,
    GFonts('family=VT323&family=Share+Tech+Mono'),
    "'Share Tech Mono',monospace","'VT323',monospace","'Share Tech Mono',monospace",{
    '--background':'120 5% 4%','--foreground':'120 80% 72%','--card':'120 5% 6%','--card-foreground':'120 80% 72%',
    '--popover':'120 5% 6%','--popover-foreground':'120 80% 72%','--primary':'120 80% 55%','--primary-foreground':'120 5% 4%',
    '--secondary':'120 5% 10%','--secondary-foreground':'120 80% 60%','--muted':'120 5% 8%','--muted-foreground':'120 40% 45%',
    '--accent':'120 5% 10%','--accent-foreground':'120 80% 72%','--destructive':'0 70% 45%','--destructive-foreground':'0 0% 100%',
    '--border':'120 20% 14%','--input':'120 20% 14%','--ring':'120 80% 55%','--sidebar':'120 5% 3%',
    '--sidebar-foreground':'120 60% 55%','--sidebar-border':'120 20% 10%','--radius':'0rem',
    '--gradient-a':'hsl(120,80%,55%)','--gradient-b':'hsl(140,80%,50%)','--gradient-c':'hsl(160,80%,50%)',
  }),
  T('miami','Miami Vice','🌴','Hot pink & cyan neon',true,
    GFonts('family=Pacifico&family=Josefin+Sans:wght@400;600;700&family=Space+Mono:wght@400;700'),
    "'Josefin Sans',sans-serif","'Pacifico',cursive","'Space Mono',monospace",{
    '--background':'280 30% 7%','--foreground':'300 20% 95%','--card':'280 30% 10%','--card-foreground':'300 20% 95%',
    '--popover':'280 30% 10%','--popover-foreground':'300 20% 95%','--primary':'320 100% 60%','--primary-foreground':'0 0% 100%',
    '--secondary':'280 30% 15%','--secondary-foreground':'300 20% 85%','--muted':'280 30% 13%','--muted-foreground':'280 15% 55%',
    '--accent':'185 100% 45%','--accent-foreground':'0 0% 0%','--destructive':'0 80% 55%','--destructive-foreground':'0 0% 100%',
    '--border':'280 25% 20%','--input':'280 25% 20%','--ring':'320 100% 60%','--sidebar':'280 35% 5%',
    '--sidebar-foreground':'300 15% 70%','--sidebar-border':'280 25% 14%','--radius':'1.5rem',
    '--gradient-a':'hsl(320,100%,60%)','--gradient-b':'hsl(280,80%,60%)','--gradient-c':'hsl(185,100%,45%)',
  }),
  T('paper','Paper','📄','Light editorial serif',false,
    GFonts('family=Playfair+Display:wght@400;700;900&family=Source+Serif+4:wght@400;600&family=IBM+Plex+Mono:wght@400;500'),
    "'Source Serif 4',serif","'Playfair Display',serif","'IBM Plex Mono',monospace",{
    '--background':'40 20% 97%','--foreground':'30 10% 12%','--card':'0 0% 100%','--card-foreground':'30 10% 12%',
    '--popover':'0 0% 100%','--popover-foreground':'30 10% 12%','--primary':'20 80% 42%','--primary-foreground':'0 0% 100%',
    '--secondary':'40 15% 92%','--secondary-foreground':'30 10% 25%','--muted':'40 15% 93%','--muted-foreground':'30 8% 45%',
    '--accent':'40 15% 92%','--accent-foreground':'30 10% 12%','--destructive':'0 72% 48%','--destructive-foreground':'0 0% 100%',
    '--border':'35 12% 84%','--input':'35 12% 84%','--ring':'20 80% 42%','--sidebar':'40 18% 94%',
    '--sidebar-foreground':'30 10% 30%','--sidebar-border':'35 12% 86%','--radius':'0.5rem',
    '--gradient-a':'hsl(20,80%,42%)','--gradient-b':'hsl(30,70%,45%)','--gradient-c':'hsl(40,80%,48%)',
  }),
  T('retro','Retro DOS','🖥️','Amber DOS warmth',true,
    GFonts('family=Press+Start+2P&family=Courier+Prime:wght@400;700'),
    "'Courier Prime',monospace","'Press Start 2P',monospace","'Courier Prime',monospace",{
    '--background':'30 15% 5%','--foreground':'38 90% 70%','--card':'30 15% 8%','--card-foreground':'38 90% 70%',
    '--popover':'30 15% 8%','--popover-foreground':'38 90% 70%','--primary':'38 100% 58%','--primary-foreground':'30 15% 5%',
    '--secondary':'30 15% 12%','--secondary-foreground':'38 80% 60%','--muted':'30 15% 10%','--muted-foreground':'38 40% 45%',
    '--accent':'30 15% 12%','--accent-foreground':'38 90% 70%','--destructive':'0 80% 50%','--destructive-foreground':'0 0% 100%',
    '--border':'35 20% 16%','--input':'35 20% 16%','--ring':'38 100% 58%','--sidebar':'30 15% 3%',
    '--sidebar-foreground':'38 70% 55%','--sidebar-border':'35 18% 12%','--radius':'0rem',
    '--gradient-a':'hsl(38,100%,58%)','--gradient-b':'hsl(28,90%,52%)','--gradient-c':'hsl(18,85%,50%)',
  }),
  T('nord','Nord','🌨️','Arctic cool blue',true,
    GFonts('family=Syne:wght@400;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500'),
    "'Inter',sans-serif","'Syne',sans-serif","'JetBrains Mono',monospace",{
    '--background':'220 16% 10%','--foreground':'218 27% 88%','--card':'222 16% 13%','--card-foreground':'218 27% 88%',
    '--popover':'222 16% 13%','--popover-foreground':'218 27% 88%','--primary':'213 32% 52%','--primary-foreground':'0 0% 100%',
    '--secondary':'222 16% 18%','--secondary-foreground':'218 27% 80%','--muted':'222 16% 16%','--muted-foreground':'218 15% 52%',
    '--accent':'222 16% 20%','--accent-foreground':'218 27% 88%','--destructive':'354 42% 56%','--destructive-foreground':'0 0% 100%',
    '--border':'222 14% 20%','--input':'222 14% 20%','--ring':'213 32% 52%','--sidebar':'222 18% 8%',
    '--sidebar-foreground':'218 20% 65%','--sidebar-border':'222 14% 15%','--radius':'0.6rem',
    '--gradient-a':'hsl(213,32%,52%)','--gradient-b':'hsl(193,43%,67%)','--gradient-c':'hsl(178,36%,62%)',
  }),
  T('synthwave','Synthwave','🌃','Deep purple electric 80s',true,
    GFonts('family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@400;500;600&family=Share+Tech+Mono'),
    "'Rajdhani',sans-serif","'Orbitron',sans-serif","'Share Tech Mono',monospace",{
    '--background':'255 40% 5%','--foreground':'255 20% 95%','--card':'255 35% 8%','--card-foreground':'255 20% 95%',
    '--popover':'255 35% 8%','--popover-foreground':'255 20% 95%','--primary':'280 100% 65%','--primary-foreground':'0 0% 100%',
    '--secondary':'255 35% 13%','--secondary-foreground':'255 20% 85%','--muted':'255 35% 11%','--muted-foreground':'255 15% 55%',
    '--accent':'195 100% 55%','--accent-foreground':'0 0% 0%','--destructive':'350 90% 55%','--destructive-foreground':'0 0% 100%',
    '--border':'255 30% 18%','--input':'255 30% 18%','--ring':'280 100% 65%','--sidebar':'255 45% 4%',
    '--sidebar-foreground':'255 15% 65%','--sidebar-border':'255 30% 13%','--radius':'0.75rem',
    '--gradient-a':'hsl(280,100%,65%)','--gradient-b':'hsl(320,100%,60%)','--gradient-c':'hsl(195,100%,55%)',
  }),
  T('dracula','Dracula','🧛','Classic IDE dark palette',true,
    GFonts('family=Fira+Code:wght@400;500;600&family=Inter:wght@400;500;600;700'),
    "'Inter',sans-serif","'Fira Code',monospace","'Fira Code',monospace",{
    '--background':'231 15% 13%','--foreground':'60 30% 96%','--card':'232 14% 16%','--card-foreground':'60 30% 96%',
    '--popover':'232 14% 16%','--popover-foreground':'60 30% 96%','--primary':'265 89% 78%','--primary-foreground':'231 15% 13%',
    '--secondary':'232 14% 21%','--secondary-foreground':'60 30% 85%','--muted':'232 14% 18%','--muted-foreground':'232 10% 58%',
    '--accent':'135 94% 65%','--accent-foreground':'231 15% 13%','--destructive':'0 100% 67%','--destructive-foreground':'0 0% 100%',
    '--border':'232 14% 22%','--input':'232 14% 22%','--ring':'265 89% 78%','--sidebar':'232 17% 11%',
    '--sidebar-foreground':'60 20% 70%','--sidebar-border':'232 14% 18%','--radius':'0.5rem',
    '--gradient-a':'hsl(265,89%,78%)','--gradient-b':'hsl(326,100%,74%)','--gradient-c':'hsl(135,94%,65%)',
  }),
  T('solarized','Solarized','☀️','Classic Solarized Dark',true,
    GFonts('family=Source+Code+Pro:wght@400;500;600&family=Source+Serif+4:wght@400;600'),
    "'Source Serif 4',serif","'Source Code Pro',monospace","'Source Code Pro',monospace",{
    '--background':'193 80% 11%','--foreground':'44 87% 72%','--card':'192 81% 14%','--card-foreground':'44 87% 72%',
    '--popover':'192 81% 14%','--popover-foreground':'44 87% 72%','--primary':'205 69% 49%','--primary-foreground':'0 0% 100%',
    '--secondary':'192 81% 18%','--secondary-foreground':'44 87% 65%','--muted':'192 81% 16%','--muted-foreground':'193 40% 45%',
    '--accent':'68 100% 30%','--accent-foreground':'0 0% 100%','--destructive':'1 71% 52%','--destructive-foreground':'0 0% 100%',
    '--border':'192 60% 20%','--input':'192 60% 20%','--ring':'205 69% 49%','--sidebar':'193 85% 9%',
    '--sidebar-foreground':'44 60% 55%','--sidebar-border':'192 60% 15%','--radius':'0.4rem',
    '--gradient-a':'hsl(205,69%,49%)','--gradient-b':'hsl(175,59%,40%)','--gradient-c':'hsl(68,100%,35%)',
  }),
  T('forest','Forest','🌲','Earthy deep green',true,
    GFonts('family=Merriweather:wght@400;700&family=Cabin:wght@400;600;700&family=Inconsolata:wght@400;500'),
    "'Cabin',sans-serif","'Merriweather',serif","'Inconsolata',monospace",{
    '--background':'140 20% 6%','--foreground':'120 15% 88%','--card':'140 20% 9%','--card-foreground':'120 15% 88%',
    '--popover':'140 20% 9%','--popover-foreground':'120 15% 88%','--primary':'150 60% 42%','--primary-foreground':'0 0% 100%',
    '--secondary':'140 20% 14%','--secondary-foreground':'120 15% 80%','--muted':'140 20% 12%','--muted-foreground':'130 12% 50%',
    '--accent':'140 20% 14%','--accent-foreground':'120 15% 88%','--destructive':'5 65% 48%','--destructive-foreground':'0 0% 100%',
    '--border':'140 18% 18%','--input':'140 18% 18%','--ring':'150 60% 42%','--sidebar':'140 25% 4%',
    '--sidebar-foreground':'120 10% 60%','--sidebar-border':'140 18% 13%','--radius':'0.35rem',
    '--gradient-a':'hsl(150,60%,42%)','--gradient-b':'hsl(125,55%,38%)','--gradient-c':'hsl(80,60%,40%)',
  }),
  T('sunset','Sunset','🌅','Warm orange-red dusk',true,
    GFonts('family=Righteous&family=Nunito:wght@400;600;700&family=Courier+Prime:wght@400;700'),
    "'Nunito',sans-serif","'Righteous',cursive","'Courier Prime',monospace",{
    '--background':'15 25% 6%','--foreground':'30 30% 92%','--card':'15 25% 9%','--card-foreground':'30 30% 92%',
    '--popover':'15 25% 9%','--popover-foreground':'30 30% 92%','--primary':'22 100% 58%','--primary-foreground':'0 0% 100%',
    '--secondary':'15 25% 14%','--secondary-foreground':'30 25% 80%','--muted':'15 25% 12%','--muted-foreground':'20 15% 52%',
    '--accent':'350 85% 60%','--accent-foreground':'0 0% 100%','--destructive':'350 85% 52%','--destructive-foreground':'0 0% 100%',
    '--border':'15 22% 18%','--input':'15 22% 18%','--ring':'22 100% 58%','--sidebar':'15 30% 4%',
    '--sidebar-foreground':'25 20% 60%','--sidebar-border':'15 22% 13%','--radius':'1rem',
    '--gradient-a':'hsl(22,100%,58%)','--gradient-b':'hsl(350,85%,60%)','--gradient-c':'hsl(45,100%,55%)',
  }),
  T('ocean','Ocean','🌊','Deep sea teal-navy',true,
    GFonts('family=Exo+2:wght@400;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500'),
    "'Inter',sans-serif","'Exo 2',sans-serif","'JetBrains Mono',monospace",{
    '--background':'210 40% 7%','--foreground':'195 30% 90%','--card':'210 40% 10%','--card-foreground':'195 30% 90%',
    '--popover':'210 40% 10%','--popover-foreground':'195 30% 90%','--primary':'185 75% 42%','--primary-foreground':'0 0% 100%',
    '--secondary':'210 40% 15%','--secondary-foreground':'195 25% 80%','--muted':'210 40% 13%','--muted-foreground':'200 20% 52%',
    '--accent':'210 40% 17%','--accent-foreground':'195 30% 90%','--destructive':'5 70% 52%','--destructive-foreground':'0 0% 100%',
    '--border':'210 35% 18%','--input':'210 35% 18%','--ring':'185 75% 42%','--sidebar':'210 45% 5%',
    '--sidebar-foreground':'195 20% 62%','--sidebar-border':'210 35% 13%','--radius':'0.75rem',
    '--gradient-a':'hsl(185,75%,42%)','--gradient-b':'hsl(200,70%,50%)','--gradient-c':'hsl(215,80%,55%)',
  }),

  // ─────────────────────────────────────────────────────────────────────────
  // NEW 20 THEMES
  // ─────────────────────────────────────────────────────────────────────────

  // 13. Catppuccin Mocha
  T('catppuccin','Catppuccin','🐱','Cozy pastel dark',true,
    GFonts('family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500'),
    "'DM Sans',sans-serif","'DM Sans',sans-serif","'DM Mono',monospace",{
    '--background':'240 21% 15%','--foreground':'226 64% 88%','--card':'240 21% 18%','--card-foreground':'226 64% 88%',
    '--popover':'240 21% 18%','--popover-foreground':'226 64% 88%','--primary':'267 84% 81%','--primary-foreground':'240 21% 15%',
    '--secondary':'240 21% 22%','--secondary-foreground':'226 64% 80%','--muted':'240 21% 20%','--muted-foreground':'230 14% 62%',
    '--accent':'316 72% 76%','--accent-foreground':'240 21% 15%','--destructive':'343 81% 75%','--destructive-foreground':'240 21% 15%',
    '--border':'240 21% 25%','--input':'240 21% 25%','--ring':'267 84% 81%','--sidebar':'240 21% 12%',
    '--sidebar-foreground':'226 55% 75%','--sidebar-border':'240 21% 20%','--radius':'0.8rem',
    '--gradient-a':'hsl(267,84%,81%)','--gradient-b':'hsl(316,72%,76%)','--gradient-c':'hsl(189,71%,73%)',
  }),

  // 14. Gruvbox Dark
  T('gruvbox','Gruvbox','🟫','Warm retro IDE',true,
    GFonts('family=Inconsolata:wght@400;500;600;700&family=Bitter:wght@400;600'),
    "'Bitter',serif","'Bitter',serif","'Inconsolata',monospace",{
    '--background':'33 15% 12%','--foreground':'47 50% 80%','--card':'33 15% 15%','--card-foreground':'47 50% 80%',
    '--popover':'33 15% 15%','--popover-foreground':'47 50% 80%','--primary':'40 95% 58%','--primary-foreground':'33 15% 12%',
    '--secondary':'33 15% 20%','--secondary-foreground':'47 45% 72%','--muted':'33 15% 17%','--muted-foreground':'40 15% 52%',
    '--accent':'107 28% 52%','--accent-foreground':'33 15% 12%','--destructive':'2 65% 58%','--destructive-foreground':'0 0% 100%',
    '--border':'33 15% 22%','--input':'33 15% 22%','--ring':'40 95% 58%','--sidebar':'33 18% 9%',
    '--sidebar-foreground':'47 40% 62%','--sidebar-border':'33 15% 18%','--radius':'0.3rem',
    '--gradient-a':'hsl(40,95%,58%)','--gradient-b':'hsl(107,28%,52%)','--gradient-c':'hsl(175,40%,48%)',
  }),

  // 15. Monokai
  T('monokai','Monokai','🖤','Classic code editor',true,
    GFonts('family=Fira+Code:wght@400;500;600&family=Inter:wght@400;500;600;700'),
    "'Inter',sans-serif","'Fira Code',monospace","'Fira Code',monospace",{
    '--background':'70 8% 15%','--foreground':'60 30% 88%','--card':'70 8% 18%','--card-foreground':'60 30% 88%',
    '--popover':'70 8% 18%','--popover-foreground':'60 30% 88%','--primary':'80 100% 64%','--primary-foreground':'70 8% 15%',
    '--secondary':'70 8% 23%','--secondary-foreground':'60 25% 80%','--muted':'70 8% 20%','--muted-foreground':'60 10% 55%',
    '--accent':'325 100% 65%','--accent-foreground':'0 0% 100%','--destructive':'0 100% 62%','--destructive-foreground':'0 0% 100%',
    '--border':'70 8% 25%','--input':'70 8% 25%','--ring':'80 100% 64%','--sidebar':'70 10% 12%',
    '--sidebar-foreground':'60 20% 68%','--sidebar-border':'70 8% 20%','--radius':'0.4rem',
    '--gradient-a':'hsl(80,100%,64%)','--gradient-b':'hsl(325,100%,65%)','--gradient-c':'hsl(190,100%,60%)',
  }),

  // 16. Tokyo Night
  T('tokyo','Tokyo Night','🌆','Cool dark city night',true,
    GFonts('family=Noto+Sans+JP:wght@400;500;700&family=JetBrains+Mono:wght@400;500'),
    "'Noto Sans JP',sans-serif","'Noto Sans JP',sans-serif","'JetBrains Mono',monospace",{
    '--background':'235 21% 12%','--foreground':'220 14% 81%','--card':'235 21% 15%','--card-foreground':'220 14% 81%',
    '--popover':'235 21% 15%','--popover-foreground':'220 14% 81%','--primary':'224 72% 65%','--primary-foreground':'0 0% 100%',
    '--secondary':'235 21% 20%','--secondary-foreground':'220 14% 72%','--muted':'235 21% 17%','--muted-foreground':'220 10% 52%',
    '--accent':'290 60% 68%','--accent-foreground':'0 0% 100%','--destructive':'0 75% 62%','--destructive-foreground':'0 0% 100%',
    '--border':'235 21% 22%','--input':'235 21% 22%','--ring':'224 72% 65%','--sidebar':'235 25% 9%',
    '--sidebar-foreground':'220 10% 62%','--sidebar-border':'235 21% 18%','--radius':'0.5rem',
    '--gradient-a':'hsl(224,72%,65%)','--gradient-b':'hsl(290,60%,68%)','--gradient-c':'hsl(175,65%,52%)',
  }),

  // 17. Rose Pine
  T('rose','Rose Pine','🌹','Dark muted rose',true,
    GFonts('family=DM+Serif+Display&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500'),
    "'DM Sans',sans-serif","'DM Serif Display',serif","'DM Mono',monospace",{
    '--background':'249 22% 12%','--foreground':'245 50% 91%','--card':'249 22% 15%','--card-foreground':'245 50% 91%',
    '--popover':'249 22% 15%','--popover-foreground':'245 50% 91%','--primary':'343 35% 68%','--primary-foreground':'249 22% 12%',
    '--secondary':'249 22% 20%','--secondary-foreground':'245 40% 82%','--muted':'249 22% 17%','--muted-foreground':'245 14% 58%',
    '--accent':'196 45% 62%','--accent-foreground':'249 22% 12%','--destructive':'0 70% 62%','--destructive-foreground':'0 0% 100%',
    '--border':'249 22% 22%','--input':'249 22% 22%','--ring':'343 35% 68%','--sidebar':'249 26% 9%',
    '--sidebar-foreground':'245 30% 68%','--sidebar-border':'249 22% 18%','--radius':'0.7rem',
    '--gradient-a':'hsl(343,35%,68%)','--gradient-b':'hsl(290,40%,65%)','--gradient-c':'hsl(196,45%,62%)',
  }),

  // 18. Coffee Shop
  T('coffee','Coffee','☕','Warm brown cozy',true,
    GFonts('family=Libre+Baskerville:wght@400;700&family=Lato:wght@400;700&family=Courier+Prime:wght@400;700'),
    "'Lato',sans-serif","'Libre Baskerville',serif","'Courier Prime',monospace",{
    '--background':'25 30% 8%','--foreground':'35 40% 88%','--card':'25 30% 11%','--card-foreground':'35 40% 88%',
    '--popover':'25 30% 11%','--popover-foreground':'35 40% 88%','--primary':'30 65% 55%','--primary-foreground':'0 0% 100%',
    '--secondary':'25 30% 16%','--secondary-foreground':'35 35% 78%','--muted':'25 30% 13%','--muted-foreground':'30 15% 52%',
    '--accent':'40 100% 70%','--accent-foreground':'25 30% 8%','--destructive':'0 65% 52%','--destructive-foreground':'0 0% 100%',
    '--border':'25 25% 20%','--input':'25 25% 20%','--ring':'30 65% 55%','--sidebar':'25 35% 6%',
    '--sidebar-foreground':'30 25% 62%','--sidebar-border':'25 25% 15%','--radius':'0.6rem',
    '--gradient-a':'hsl(30,65%,55%)','--gradient-b':'hsl(40,80%,60%)','--gradient-c':'hsl(20,55%,48%)',
  }),

  // 19. Slate (clean modern)
  T('slate','Slate','🪨','Clean modern grey',true,
    GFonts('family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500'),
    "'Inter',sans-serif","'Inter',sans-serif","'JetBrains Mono',monospace",{
    '--background':'215 28% 9%','--foreground':'215 20% 90%','--card':'215 28% 12%','--card-foreground':'215 20% 90%',
    '--popover':'215 28% 12%','--popover-foreground':'215 20% 90%','--primary':'217 91% 60%','--primary-foreground':'0 0% 100%',
    '--secondary':'215 28% 17%','--secondary-foreground':'215 15% 80%','--muted':'215 28% 14%','--muted-foreground':'215 10% 55%',
    '--accent':'215 28% 20%','--accent-foreground':'215 20% 90%','--destructive':'0 72% 51%','--destructive-foreground':'0 0% 100%',
    '--border':'215 24% 20%','--input':'215 24% 20%','--ring':'217 91% 60%','--sidebar':'215 32% 7%',
    '--sidebar-foreground':'215 12% 65%','--sidebar-border':'215 24% 15%','--radius':'0.65rem',
    '--gradient-a':'hsl(217,91%,60%)','--gradient-b':'hsl(199,89%,48%)','--gradient-c':'hsl(245,58%,51%)',
  }),

  // 20. Crimson
  T('crimson','Crimson','🩸','Deep red dramatic',true,
    GFonts('family=Cinzel:wght@400;600;700&family=EB+Garamond:wght@400;500;600&family=Fira+Code:wght@400;500'),
    "'EB Garamond',serif","'Cinzel',serif","'Fira Code',monospace",{
    '--background':'0 20% 7%','--foreground':'0 10% 92%','--card':'0 20% 10%','--card-foreground':'0 10% 92%',
    '--popover':'0 20% 10%','--popover-foreground':'0 10% 92%','--primary':'0 80% 55%','--primary-foreground':'0 0% 100%',
    '--secondary':'0 20% 15%','--secondary-foreground':'0 10% 82%','--muted':'0 20% 12%','--muted-foreground':'0 8% 52%',
    '--accent':'30 90% 55%','--accent-foreground':'0 0% 100%','--destructive':'0 90% 48%','--destructive-foreground':'0 0% 100%',
    '--border':'0 18% 18%','--input':'0 18% 18%','--ring':'0 80% 55%','--sidebar':'0 25% 5%',
    '--sidebar-foreground':'0 10% 62%','--sidebar-border':'0 18% 13%','--radius':'0.2rem',
    '--gradient-a':'hsl(0,80%,55%)','--gradient-b':'hsl(15,85%,52%)','--gradient-c':'hsl(330,70%,55%)',
  }),

  // 21. Aurora Borealis
  T('aurora','Aurora','🌌','Northern lights glow',true,
    GFonts('family=Quicksand:wght@400;500;600;700&family=Space+Mono:wght@400;700'),
    "'Quicksand',sans-serif","'Quicksand',sans-serif","'Space Mono',monospace",{
    '--background':'200 40% 5%','--foreground':'180 30% 92%','--card':'200 40% 8%','--card-foreground':'180 30% 92%',
    '--popover':'200 40% 8%','--popover-foreground':'180 30% 92%','--primary':'160 85% 45%','--primary-foreground':'0 0% 0%',
    '--secondary':'200 40% 13%','--secondary-foreground':'180 25% 82%','--muted':'200 40% 10%','--muted-foreground':'185 20% 55%',
    '--accent':'285 85% 62%','--accent-foreground':'0 0% 100%','--destructive':'350 80% 52%','--destructive-foreground':'0 0% 100%',
    '--border':'200 35% 16%','--input':'200 35% 16%','--ring':'160 85% 45%','--sidebar':'200 45% 3%',
    '--sidebar-foreground':'180 20% 62%','--sidebar-border':'200 35% 12%','--radius':'1rem',
    '--gradient-a':'hsl(160,85%,45%)','--gradient-b':'hsl(200,85%,50%)','--gradient-c':'hsl(285,85%,62%)',
  }),

  // 22. Lavender
  T('lavender','Lavender','💜','Soft purple pastel',false,
    GFonts('family=Nunito:wght@400;500;600;700;800&family=Nunito+Sans:wght@400;600&family=DM+Mono:wght@400;500'),
    "'Nunito Sans',sans-serif","'Nunito',sans-serif","'DM Mono',monospace",{
    '--background':'270 40% 96%','--foreground':'270 25% 18%','--card':'0 0% 100%','--card-foreground':'270 25% 18%',
    '--popover':'0 0% 100%','--popover-foreground':'270 25% 18%','--primary':'270 72% 58%','--primary-foreground':'0 0% 100%',
    '--secondary':'270 30% 92%','--secondary-foreground':'270 25% 28%','--muted':'270 25% 93%','--muted-foreground':'270 10% 50%',
    '--accent':'310 60% 62%','--accent-foreground':'0 0% 100%','--destructive':'0 72% 52%','--destructive-foreground':'0 0% 100%',
    '--border':'270 25% 86%','--input':'270 25% 86%','--ring':'270 72% 58%','--sidebar':'270 30% 93%',
    '--sidebar-foreground':'270 20% 38%','--sidebar-border':'270 20% 88%','--radius':'1.2rem',
    '--gradient-a':'hsl(270,72%,58%)','--gradient-b':'hsl(310,60%,62%)','--gradient-c':'hsl(200,80%,58%)',
  }),

  // 23. Monochrome
  T('monochrome','Mono','⬛','Pure black and white',true,
    GFonts('family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700'),
    "'Space Grotesk',sans-serif","'Space Grotesk',sans-serif","'Space Mono',monospace",{
    '--background':'0 0% 6%','--foreground':'0 0% 94%','--card':'0 0% 9%','--card-foreground':'0 0% 94%',
    '--popover':'0 0% 9%','--popover-foreground':'0 0% 94%','--primary':'0 0% 92%','--primary-foreground':'0 0% 6%',
    '--secondary':'0 0% 14%','--secondary-foreground':'0 0% 85%','--muted':'0 0% 11%','--muted-foreground':'0 0% 52%',
    '--accent':'0 0% 18%','--accent-foreground':'0 0% 94%','--destructive':'0 0% 72%','--destructive-foreground':'0 0% 6%',
    '--border':'0 0% 18%','--input':'0 0% 18%','--ring':'0 0% 70%','--sidebar':'0 0% 4%',
    '--sidebar-foreground':'0 0% 62%','--sidebar-border':'0 0% 14%','--radius':'0.4rem',
    '--gradient-a':'hsl(0,0%,92%)','--gradient-b':'hsl(0,0%,72%)','--gradient-c':'hsl(0,0%,52%)',
  }),

  // 24. Gotham City
  T('gotham','Gotham','🦇','Dark gritty vigilante',true,
    GFonts('family=Bebas+Neue&family=Oswald:wght@400;500;600;700&family=Courier+Prime:wght@400;700'),
    "'Oswald',sans-serif","'Bebas Neue',cursive","'Courier Prime',monospace",{
    '--background':'220 15% 7%','--foreground':'220 10% 88%','--card':'220 15% 10%','--card-foreground':'220 10% 88%',
    '--popover':'220 15% 10%','--popover-foreground':'220 10% 88%','--primary':'40 95% 52%','--primary-foreground':'0 0% 0%',
    '--secondary':'220 15% 15%','--secondary-foreground':'220 10% 78%','--muted':'220 15% 12%','--muted-foreground':'220 8% 48%',
    '--accent':'220 8% 22%','--accent-foreground':'220 10% 88%','--destructive':'5 80% 52%','--destructive-foreground':'0 0% 100%',
    '--border':'220 12% 18%','--input':'220 12% 18%','--ring':'40 95% 52%','--sidebar':'220 20% 5%',
    '--sidebar-foreground':'220 8% 60%','--sidebar-border':'220 12% 14%','--radius':'0.1rem',
    '--gradient-a':'hsl(40,95%,52%)','--gradient-b':'hsl(30,90%,48%)','--gradient-c':'hsl(220,10%,62%)',
  }),

  // 25. Cobalt Blue
  T('cobalt','Cobalt','🔷','Electric cobalt dark',true,
    GFonts('family=Exo+2:wght@400;600;700;800&family=Roboto+Mono:wght@400;500'),
    "'Exo 2',sans-serif","'Exo 2',sans-serif","'Roboto Mono',monospace",{
    '--background':'220 50% 7%','--foreground':'210 30% 92%','--card':'220 50% 10%','--card-foreground':'210 30% 92%',
    '--popover':'220 50% 10%','--popover-foreground':'210 30% 92%','--primary':'210 100% 56%','--primary-foreground':'0 0% 100%',
    '--secondary':'220 50% 15%','--secondary-foreground':'210 25% 82%','--muted':'220 50% 12%','--muted-foreground':'210 15% 52%',
    '--accent':'195 100% 50%','--accent-foreground':'0 0% 0%','--destructive':'350 85% 58%','--destructive-foreground':'0 0% 100%',
    '--border':'220 45% 18%','--input':'220 45% 18%','--ring':'210 100% 56%','--sidebar':'220 55% 5%',
    '--sidebar-foreground':'210 18% 65%','--sidebar-border':'220 45% 14%','--radius':'0.6rem',
    '--gradient-a':'hsl(210,100%,56%)','--gradient-b':'hsl(195,100%,50%)','--gradient-c':'hsl(240,90%,62%)',
  }),

  // 26. Matrix
  T('matrix','Matrix','🟩','Green rain reality',true,
    GFonts('family=Share+Tech+Mono&family=VT323'),
    "'Share Tech Mono',monospace","'VT323',monospace","'Share Tech Mono',monospace",{
    '--background':'130 100% 2%','--foreground':'130 100% 65%','--card':'130 100% 4%','--card-foreground':'130 100% 65%',
    '--popover':'130 100% 4%','--popover-foreground':'130 100% 65%','--primary':'130 100% 50%','--primary-foreground':'130 100% 2%',
    '--secondary':'130 100% 7%','--secondary-foreground':'130 100% 55%','--muted':'130 100% 5%','--muted-foreground':'130 60% 38%',
    '--accent':'130 100% 35%','--accent-foreground':'130 100% 2%','--destructive':'0 100% 42%','--destructive-foreground':'0 0% 100%',
    '--border':'130 80% 12%','--input':'130 80% 12%','--ring':'130 100% 50%','--sidebar':'130 100% 2%',
    '--sidebar-foreground':'130 80% 45%','--sidebar-border':'130 80% 8%','--radius':'0rem',
    '--gradient-a':'hsl(130,100%,50%)','--gradient-b':'hsl(130,100%,38%)','--gradient-c':'hsl(130,100%,28%)',
  }),

  // 27. Candy
  T('candy','Candy','🍭','Sweet pastel rainbow',false,
    GFonts('family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600&family=DM+Mono:wght@400;500'),
    "'Nunito',sans-serif","'Fredoka',sans-serif","'DM Mono',monospace",{
    '--background':'330 100% 97%','--foreground':'290 30% 18%','--card':'0 0% 100%','--card-foreground':'290 30% 18%',
    '--popover':'0 0% 100%','--popover-foreground':'290 30% 18%','--primary':'330 100% 62%','--primary-foreground':'0 0% 100%',
    '--secondary':'200 80% 90%','--secondary-foreground':'200 40% 25%','--muted':'330 50% 94%','--muted-foreground':'290 15% 48%',
    '--accent':'160 70% 52%','--accent-foreground':'0 0% 100%','--destructive':'0 85% 58%','--destructive-foreground':'0 0% 100%',
    '--border':'330 50% 88%','--input':'330 50% 88%','--ring':'330 100% 62%','--sidebar':'330 60% 94%',
    '--sidebar-foreground':'290 20% 38%','--sidebar-border':'330 40% 89%','--radius':'2rem',
    '--gradient-a':'hsl(330,100%,62%)','--gradient-b':'hsl(280,80%,62%)','--gradient-c':'hsl(200,80%,58%)',
  }),

  // 28. Espresso
  T('espresso','Espresso','🫘','Rich dark roast',true,
    GFonts('family=Cormorant+Garamond:wght@400;500;600;700&family=Lato:wght@400;700&family=Courier+Prime:wght@400;700'),
    "'Lato',sans-serif","'Cormorant Garamond',serif","'Courier Prime',monospace",{
    '--background':'22 25% 6%','--foreground':'32 30% 88%','--card':'22 25% 9%','--card-foreground':'32 30% 88%',
    '--popover':'22 25% 9%','--popover-foreground':'32 30% 88%','--primary':'28 80% 48%','--primary-foreground':'0 0% 100%',
    '--secondary':'22 25% 14%','--secondary-foreground':'32 25% 78%','--muted':'22 25% 11%','--muted-foreground':'28 15% 50%',
    '--accent':'40 70% 62%','--accent-foreground':'22 25% 6%','--destructive':'0 70% 50%','--destructive-foreground':'0 0% 100%',
    '--border':'22 20% 18%','--input':'22 20% 18%','--ring':'28 80% 48%','--sidebar':'22 30% 4%',
    '--sidebar-foreground':'28 20% 60%','--sidebar-border':'22 20% 13%','--radius':'0.3rem',
    '--gradient-a':'hsl(28,80%,48%)','--gradient-b':'hsl(40,70%,52%)','--gradient-c':'hsl(15,65%,44%)',
  }),

  // 29. Arctic (light clean)
  T('arctic','Arctic','🧊','Crisp icy white',false,
    GFonts('family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500'),
    "'Plus Jakarta Sans',sans-serif","'Plus Jakarta Sans',sans-serif","'JetBrains Mono',monospace",{
    '--background':'210 50% 98%','--foreground':'215 35% 12%','--card':'0 0% 100%','--card-foreground':'215 35% 12%',
    '--popover':'0 0% 100%','--popover-foreground':'215 35% 12%','--primary':'199 89% 48%','--primary-foreground':'0 0% 100%',
    '--secondary':'210 40% 94%','--secondary-foreground':'215 30% 22%','--muted':'210 35% 95%','--muted-foreground':'215 15% 48%',
    '--accent':'210 40% 94%','--accent-foreground':'215 35% 12%','--destructive':'0 84% 60%','--destructive-foreground':'0 0% 100%',
    '--border':'210 30% 88%','--input':'210 30% 88%','--ring':'199 89% 48%','--sidebar':'210 40% 96%',
    '--sidebar-foreground':'215 20% 35%','--sidebar-border':'210 25% 90%','--radius':'0.75rem',
    '--gradient-a':'hsl(199,89%,48%)','--gradient-b':'hsl(215,80%,55%)','--gradient-c':'hsl(180,75%,42%)',
  }),

  // 30. Volcanic
  T('volcanic','Volcanic','🌋','Deep lava orange-red',true,
    GFonts('family=Teko:wght@400;500;600;700&family=Roboto:wght@400;500;700&family=Roboto+Mono:wght@400;500'),
    "'Roboto',sans-serif","'Teko',sans-serif","'Roboto Mono',monospace",{
    '--background':'12 30% 6%','--foreground':'20 20% 90%','--card':'12 30% 9%','--card-foreground':'20 20% 90%',
    '--popover':'12 30% 9%','--popover-foreground':'20 20% 90%','--primary':'15 100% 55%','--primary-foreground':'0 0% 100%',
    '--secondary':'12 30% 14%','--secondary-foreground':'20 18% 80%','--muted':'12 30% 11%','--muted-foreground':'15 12% 50%',
    '--accent':'40 100% 52%','--accent-foreground':'0 0% 0%','--destructive':'0 100% 52%','--destructive-foreground':'0 0% 100%',
    '--border':'12 25% 18%','--input':'12 25% 18%','--ring':'15 100% 55%','--sidebar':'12 35% 4%',
    '--sidebar-foreground':'15 15% 62%','--sidebar-border':'12 25% 14%','--radius':'0.25rem',
    '--gradient-a':'hsl(15,100%,55%)','--gradient-b':'hsl(35,100%,52%)','--gradient-c':'hsl(0,90%,52%)',
  }),

  // 31. Neon City
  T('neon','Neon','⚡','Cyberpunk neon blast',true,
    GFonts('family=Audiowide&family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono'),
    "'Rajdhani',sans-serif","'Audiowide',sans-serif","'Share Tech Mono',monospace",{
    '--background':'270 30% 4%','--foreground':'60 100% 80%','--card':'270 30% 7%','--card-foreground':'60 100% 80%',
    '--popover':'270 30% 7%','--popover-foreground':'60 100% 80%','--primary':'60 100% 50%','--primary-foreground':'270 30% 4%',
    '--secondary':'270 30% 12%','--secondary-foreground':'60 80% 70%','--muted':'270 30% 9%','--muted-foreground':'60 30% 50%',
    '--accent':'300 100% 55%','--accent-foreground':'0 0% 0%','--destructive':'0 100% 55%','--destructive-foreground':'0 0% 100%',
    '--border':'270 25% 15%','--input':'270 25% 15%','--ring':'60 100% 50%','--sidebar':'270 35% 3%',
    '--sidebar-foreground':'60 60% 55%','--sidebar-border':'270 25% 10%','--radius':'0.5rem',
    '--gradient-a':'hsl(60,100%,50%)','--gradient-b':'hsl(300,100%,55%)','--gradient-c':'hsl(190,100%,50%)',
  }),

  // 32. Parchment (warm light)
  T('parchment','Parchment','📜','Antique warm manuscript',false,
    GFonts('family=UnifrakturMaguntia&family=Crimson+Pro:wght@400;600&family=Courier+Prime:wght@400;700'),
    "'Crimson Pro',serif","'Crimson Pro',serif","'Courier Prime',monospace",{
    '--background':'40 35% 90%','--foreground':'30 30% 15%','--card':'40 30% 94%','--card-foreground':'30 30% 15%',
    '--popover':'40 30% 94%','--popover-foreground':'30 30% 15%','--primary':'24 60% 38%','--primary-foreground':'0 0% 100%',
    '--secondary':'40 25% 84%','--secondary-foreground':'30 25% 25%','--muted':'40 20% 86%','--muted-foreground':'35 12% 42%',
    '--accent':'15 70% 42%','--accent-foreground':'0 0% 100%','--destructive':'0 72% 42%','--destructive-foreground':'0 0% 100%',
    '--border':'38 22% 78%','--input':'38 22% 78%','--ring':'24 60% 38%','--sidebar':'40 28% 86%',
    '--sidebar-foreground':'30 20% 32%','--sidebar-border':'38 20% 80%','--radius':'0.2rem',
    '--gradient-a':'hsl(24,60%,38%)','--gradient-b':'hsl(35,55%,42%)','--gradient-c':'hsl(15,65%,38%)',
  }),

  // ─────────────────────────────────────────────────────────────────────────
  // NEW 10 (33-42)
  // ─────────────────────────────────────────────────────────────────────────

  // 33. Obsidian
  T('obsidian','Obsidian','🪨','Deep volcanic glass',true,
    GFonts('family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&family=DM+Mono:wght@400;500'),
    "'DM Sans',sans-serif","'DM Serif Display',serif","'DM Mono',monospace",{
    '--background':'240 8% 6%','--foreground':'240 5% 92%','--card':'240 8% 9%','--card-foreground':'240 5% 92%',
    '--popover':'240 8% 9%','--popover-foreground':'240 5% 92%','--primary':'246 100% 69%','--primary-foreground':'0 0% 100%',
    '--secondary':'240 8% 14%','--secondary-foreground':'240 5% 82%','--muted':'240 8% 12%','--muted-foreground':'240 5% 52%',
    '--accent':'246 100% 69%','--accent-foreground':'0 0% 100%','--destructive':'0 72% 51%','--destructive-foreground':'0 0% 100%',
    '--border':'240 6% 18%','--input':'240 6% 18%','--ring':'246 100% 69%','--sidebar':'240 10% 4%',
    '--sidebar-foreground':'240 4% 62%','--sidebar-border':'240 6% 14%','--radius':'0.875rem',
    '--gradient-a':'hsl(246,100%,69%)','--gradient-b':'hsl(276,90%,65%)','--gradient-c':'hsl(216,100%,65%)',
  }),

  // 34. Bubblegum
  T('bubblegum','Bubblegum','🍭','Soft pastel candy',false,
    GFonts('family=Nunito:wght@400;600;700;800;900&family=Fredoka:wght@400;500;600&family=Inconsolata:wght@400;500'),
    "'Nunito',sans-serif","'Fredoka',sans-serif","'Inconsolata',monospace",{
    '--background':'340 100% 97%','--foreground':'330 25% 18%','--card':'0 0% 100%','--card-foreground':'330 25% 18%',
    '--popover':'0 0% 100%','--popover-foreground':'330 25% 18%','--primary':'340 80% 58%','--primary-foreground':'0 0% 100%',
    '--secondary':'210 80% 92%','--secondary-foreground':'220 30% 25%','--muted':'340 40% 92%','--muted-foreground':'330 12% 48%',
    '--accent':'170 60% 78%','--accent-foreground':'170 40% 20%','--destructive':'0 72% 55%','--destructive-foreground':'0 0% 100%',
    '--border':'330 40% 86%','--input':'330 40% 86%','--ring':'340 80% 58%','--sidebar':'340 60% 93%',
    '--sidebar-foreground':'330 20% 32%','--sidebar-border':'330 35% 86%','--radius':'1.25rem',
    '--gradient-a':'hsl(340,80%,58%)','--gradient-b':'hsl(280,70%,65%)','--gradient-c':'hsl(170,60%,55%)',
  }),

  // 35. Midnight
  T('midnight','Midnight','🌙','Deep blue night',true,
    GFonts('family=Outfit:wght@300;400;500;600;700&family=Bricolage+Grotesque:wght@400;600;700&family=JetBrains+Mono:wght@400;500'),
    "'Outfit',sans-serif","'Bricolage Grotesque',sans-serif","'JetBrains Mono',monospace",{
    '--background':'224 45% 5%','--foreground':'220 30% 92%','--card':'224 40% 8%','--card-foreground':'220 30% 92%',
    '--popover':'224 40% 8%','--popover-foreground':'220 30% 92%','--primary':'217 91% 60%','--primary-foreground':'0 0% 100%',
    '--secondary':'224 40% 13%','--secondary-foreground':'220 25% 82%','--muted':'224 35% 11%','--muted-foreground':'220 15% 52%',
    '--accent':'224 40% 16%','--accent-foreground':'220 30% 92%','--destructive':'350 80% 55%','--destructive-foreground':'0 0% 100%',
    '--border':'224 35% 16%','--input':'224 35% 16%','--ring':'217 91% 60%','--sidebar':'224 50% 4%',
    '--sidebar-foreground':'220 18% 62%','--sidebar-border':'224 35% 12%','--radius':'0.75rem',
    '--gradient-a':'hsl(217,91%,60%)','--gradient-b':'hsl(240,80%,65%)','--gradient-c':'hsl(200,90%,58%)',
  }),

  // 36. Sakura
  T('sakura','Sakura','🌸','Japanese cherry blossom',false,
    GFonts('family=Noto+Serif+JP:wght@400;600&family=Zen+Kaku+Gothic+New:wght@400;500;700&family=Source+Code+Pro:wght@400;500'),
    "'Zen Kaku Gothic New',sans-serif","'Noto Serif JP',serif","'Source Code Pro',monospace",{
    '--background':'350 40% 97%','--foreground':'340 20% 15%','--card':'0 0% 100%','--card-foreground':'340 20% 15%',
    '--popover':'0 0% 100%','--popover-foreground':'340 20% 15%','--primary':'348 72% 60%','--primary-foreground':'0 0% 100%',
    '--secondary':'350 30% 92%','--secondary-foreground':'340 15% 28%','--muted':'350 25% 93%','--muted-foreground':'340 10% 48%',
    '--accent':'20 70% 78%','--accent-foreground':'20 40% 20%','--destructive':'0 78% 52%','--destructive-foreground':'0 0% 100%',
    '--border':'350 20% 86%','--input':'350 20% 86%','--ring':'348 72% 60%','--sidebar':'350 35% 93%',
    '--sidebar-foreground':'340 15% 32%','--sidebar-border':'350 18% 86%','--radius':'0.6rem',
    '--gradient-a':'hsl(348,72%,60%)','--gradient-b':'hsl(320,60%,65%)','--gradient-c':'hsl(15,70%,62%)',
  }),

  // 37. Hacker
  T('hacker','Hacker','👾','l33t sp34k terminal',true,
    GFonts('family=Share+Tech+Mono&family=VT323'),
    "'Share Tech Mono',monospace","'VT323',monospace","'Share Tech Mono',monospace",{
    '--background':'0 0% 2%','--foreground':'120 100% 60%','--card':'0 0% 4%','--card-foreground':'120 100% 60%',
    '--popover':'0 0% 4%','--popover-foreground':'120 100% 60%','--primary':'120 100% 50%','--primary-foreground':'0 0% 0%',
    '--secondary':'0 0% 8%','--secondary-foreground':'120 80% 55%','--muted':'0 0% 6%','--muted-foreground':'120 40% 38%',
    '--accent':'0 0% 10%','--accent-foreground':'120 100% 60%','--destructive':'0 100% 45%','--destructive-foreground':'0 0% 100%',
    '--border':'0 0% 12%','--input':'0 0% 12%','--ring':'120 100% 50%','--sidebar':'0 0% 1%',
    '--sidebar-foreground':'120 60% 42%','--sidebar-border':'0 0% 8%','--radius':'0rem',
    '--gradient-a':'hsl(120,100%,50%)','--gradient-b':'hsl(140,100%,45%)','--gradient-c':'hsl(100,100%,45%)',
  }),

  // 38. Vaporwave
  T('vaporwave','Vaporwave','📼','Pastel retro aesthetic',true,
    GFonts('family=Quicksand:wght@400;500;600;700&family=Righteous&family=Space+Mono:wght@400;700'),
    "'Quicksand',sans-serif","'Righteous',cursive","'Space Mono',monospace",{
    '--background':'270 20% 10%','--foreground':'290 30% 92%','--card':'270 18% 14%','--card-foreground':'290 30% 92%',
    '--popover':'270 18% 14%','--popover-foreground':'290 30% 92%','--primary':'316 80% 72%','--primary-foreground':'270 20% 10%',
    '--secondary':'270 20% 20%','--secondary-foreground':'290 25% 80%','--muted':'270 18% 17%','--muted-foreground':'270 12% 55%',
    '--accent':'186 80% 70%','--accent-foreground':'270 20% 10%','--destructive':'0 75% 55%','--destructive-foreground':'0 0% 100%',
    '--border':'270 16% 22%','--input':'270 16% 22%','--ring':'316 80% 72%','--sidebar':'270 22% 8%',
    '--sidebar-foreground':'270 14% 62%','--sidebar-border':'270 16% 16%','--radius':'1rem',
    '--gradient-a':'hsl(316,80%,72%)','--gradient-b':'hsl(270,70%,70%)','--gradient-c':'hsl(186,80%,70%)',
  }),

  // 39. Autumn
  T('autumn','Autumn','🍂','Warm fall harvest',true,
    GFonts('family=Lora:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&family=Inconsolata:wght@400;500'),
    "'Montserrat',sans-serif","'Lora',serif","'Inconsolata',monospace",{
    '--background':'20 18% 7%','--foreground':'35 25% 88%','--card':'20 18% 10%','--card-foreground':'35 25% 88%',
    '--popover':'20 18% 10%','--popover-foreground':'35 25% 88%','--primary':'25 90% 55%','--primary-foreground':'0 0% 100%',
    '--secondary':'20 18% 15%','--secondary-foreground':'35 20% 78%','--muted':'20 18% 13%','--muted-foreground':'30 12% 50%',
    '--accent':'15 80% 50%','--accent-foreground':'0 0% 100%','--destructive':'0 75% 48%','--destructive-foreground':'0 0% 100%',
    '--border':'20 15% 18%','--input':'20 15% 18%','--ring':'25 90% 55%','--sidebar':'20 20% 5%',
    '--sidebar-foreground':'30 15% 58%','--sidebar-border':'20 15% 14%','--radius':'0.5rem',
    '--gradient-a':'hsl(25,90%,55%)','--gradient-b':'hsl(15,80%,50%)','--gradient-c':'hsl(40,90%,52%)',
  }),

  // 40. Steel
  T('steel','Steel','⚙️','Industrial metal minimal',true,
    GFonts('family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@400;600;700&family=Roboto+Mono:wght@400;500'),
    "'Barlow',sans-serif","'Barlow Condensed',sans-serif","'Roboto Mono',monospace",{
    '--background':'210 8% 8%','--foreground':'210 10% 88%','--card':'210 8% 11%','--card-foreground':'210 10% 88%',
    '--popover':'210 8% 11%','--popover-foreground':'210 10% 88%','--primary':'210 15% 55%','--primary-foreground':'0 0% 100%',
    '--secondary':'210 8% 16%','--secondary-foreground':'210 8% 78%','--muted':'210 8% 14%','--muted-foreground':'210 6% 50%',
    '--accent':'210 8% 18%','--accent-foreground':'210 10% 88%','--destructive':'0 65% 48%','--destructive-foreground':'0 0% 100%',
    '--border':'210 6% 20%','--input':'210 6% 20%','--ring':'210 15% 55%','--sidebar':'210 10% 6%',
    '--sidebar-foreground':'210 6% 60%','--sidebar-border':'210 6% 15%','--radius':'0.3rem',
    '--gradient-a':'hsl(210,15%,55%)','--gradient-b':'hsl(200,20%,52%)','--gradient-c':'hsl(220,18%,58%)',
  }),

  // 41. Gold
  T('gold','Gold','✨','Luxury dark gold',true,
    GFonts('family=Cormorant+Garamond:wght@400;500;600;700&family=Raleway:wght@400;500;600&family=Courier+Prime:wght@400;700'),
    "'Raleway',sans-serif","'Cormorant Garamond',serif","'Courier Prime',monospace",{
    '--background':'40 10% 6%','--foreground':'45 30% 90%','--card':'40 10% 9%','--card-foreground':'45 30% 90%',
    '--popover':'40 10% 9%','--popover-foreground':'45 30% 90%','--primary':'43 90% 52%','--primary-foreground':'40 10% 6%',
    '--secondary':'40 10% 14%','--secondary-foreground':'45 25% 78%','--muted':'40 10% 12%','--muted-foreground':'42 12% 50%',
    '--accent':'35 70% 40%','--accent-foreground':'45 30% 90%','--destructive':'0 70% 46%','--destructive-foreground':'0 0% 100%',
    '--border':'40 12% 18%','--input':'40 12% 18%','--ring':'43 90% 52%','--sidebar':'40 12% 4%',
    '--sidebar-foreground':'43 20% 58%','--sidebar-border':'40 10% 14%','--radius':'0.6rem',
    '--gradient-a':'hsl(43,90%,52%)','--gradient-b':'hsl(35,80%,48%)','--gradient-c':'hsl(50,90%,55%)',
  }),

  // 42. Blueprint
  T('blueprint','Blueprint','📐','Technical drawing blue',false,
    GFonts('family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700'),
    "'Space Grotesk',sans-serif","'Space Grotesk',sans-serif","'Space Mono',monospace",{
    '--background':'215 65% 18%','--foreground':'210 80% 92%','--card':'215 60% 21%','--card-foreground':'210 80% 92%',
    '--popover':'215 60% 21%','--popover-foreground':'210 80% 92%','--primary':'210 100% 72%','--primary-foreground':'215 65% 15%',
    '--secondary':'215 55% 26%','--secondary-foreground':'210 70% 82%','--muted':'215 55% 24%','--muted-foreground':'210 40% 62%',
    '--accent':'215 55% 28%','--accent-foreground':'210 80% 92%','--destructive':'0 70% 55%','--destructive-foreground':'0 0% 100%',
    '--border':'215 50% 28%','--input':'215 50% 28%','--ring':'210 100% 72%','--sidebar':'215 70% 15%',
    '--sidebar-foreground':'210 50% 70%','--sidebar-border':'215 50% 22%','--radius':'0.25rem',
    '--gradient-a':'hsl(210,100%,72%)','--gradient-b':'hsl(200,90%,65%)','--gradient-c':'hsl(220,90%,68%)',
  }),
];

// ── Context ──────────────────────────────────────────────────────────────────
interface SiteThemeContextValue {
  themeId: ThemeId;
  theme: SiteTheme;
  setThemeId: (id: ThemeId) => void;
}

const SiteThemeContext = createContext<SiteThemeContextValue>({
  themeId: 'pixel',
  theme: THEMES[0],
  setThemeId: () => {},
});

export function SiteThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeIdState] = useState<ThemeId>('pixel');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('site-theme') as ThemeId | null;
      if (saved && THEMES.find((t) => t.id === saved)) setThemeIdState(saved);
    } catch {}
  }, []);

  const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0];

  useEffect(() => {
    const root = document.documentElement;
    if (theme.darkMode) root.classList.add('dark');
    else root.classList.remove('dark');
    root.setAttribute('data-site-theme', theme.id);
    Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v));
    root.style.setProperty('--font-body', theme.fontBody);
    root.style.setProperty('--font-display', theme.fontDisplay);
    root.style.setProperty('--font-mono', theme.fontMono);
    const existing = document.getElementById('site-theme-fonts') as HTMLLinkElement | null;
    if (existing) existing.href = theme.fonts;
    else {
      const link = document.createElement('link');
      link.id = 'site-theme-fonts'; link.rel = 'stylesheet'; link.href = theme.fonts;
      document.head.appendChild(link);
    }
  }, [theme]);

  const setThemeId = (id: ThemeId) => {
    setThemeIdState(id);
    try { localStorage.setItem('site-theme', id); } catch {}
  };

  return (
    <SiteThemeContext.Provider value={{ themeId, theme, setThemeId }}>
      {children}
    </SiteThemeContext.Provider>
  );
}

export function useSiteTheme() {
  return useContext(SiteThemeContext);
}
// ── This block replaces the closing bracket — append before it ──────────────
