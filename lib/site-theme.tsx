'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeId =
  | 'pixel'      // dark coder/pixel art  — default
  | 'terminal'   // green CRT phosphor
  | 'miami'      // Miami Vice hot pink + cyan
  | 'paper'      // light editorial serif
  | 'retro'      // warm amber DOS
  | 'nord'       // arctic cool blue-grey
  | 'synthwave'  // deep purple + electric blue 80s
  | 'dracula'    // classic Dracula IDE palette
  | 'solarized'  // Solarized Dark
  | 'forest'     // earthy deep green
  | 'sunset'     // warm orange-red dusk
  | 'ocean';     // deep sea teal-navy

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

export const THEMES: SiteTheme[] = [
  // ── 1. Pixel (default) ─────────────────────────────────────────────────────
  {
    id: 'pixel',
    label: 'Pixel',
    emoji: '👾',
    description: 'Dark coder aesthetic',
    darkMode: true,
    fonts: 'https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Share+Tech+Mono&family=Inter:wght@400;500;600;700&display=swap',
    fontBody: "'Inter', sans-serif",
    fontDisplay: "'Press Start 2P', monospace",
    fontMono: "'Share Tech Mono', monospace",
    vars: {
      '--background': '224 20% 7%',
      '--foreground': '210 20% 92%',
      '--card': '224 20% 10%',
      '--card-foreground': '210 20% 92%',
      '--popover': '224 20% 10%',
      '--popover-foreground': '210 20% 92%',
      '--primary': '145 80% 42%',
      '--primary-foreground': '0 0% 0%',
      '--secondary': '224 20% 15%',
      '--secondary-foreground': '210 20% 85%',
      '--muted': '224 20% 13%',
      '--muted-foreground': '215 15% 50%',
      '--accent': '224 20% 15%',
      '--accent-foreground': '210 20% 92%',
      '--destructive': '0 62% 50%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '224 20% 18%',
      '--input': '224 20% 18%',
      '--ring': '145 80% 42%',
      '--sidebar': '224 25% 5%',
      '--sidebar-foreground': '210 15% 65%',
      '--sidebar-border': '224 20% 13%',
      '--radius': '0.25rem',
      '--gradient-a': 'hsl(145,80%,42%)',
      '--gradient-b': 'hsl(174,80%,38%)',
      '--gradient-c': 'hsl(200,80%,45%)',
    },
  },

  // ── 2. Terminal ─────────────────────────────────────────────────────────────
  {
    id: 'terminal',
    label: 'Terminal',
    emoji: '💻',
    description: 'Green CRT phosphor',
    darkMode: true,
    fonts: 'https://fonts.googleapis.com/css2?family=VT323&family=Share+Tech+Mono&display=swap',
    fontBody: "'Share Tech Mono', monospace",
    fontDisplay: "'VT323', monospace",
    fontMono: "'Share Tech Mono', monospace",
    vars: {
      '--background': '120 5% 4%',
      '--foreground': '120 80% 72%',
      '--card': '120 5% 6%',
      '--card-foreground': '120 80% 72%',
      '--popover': '120 5% 6%',
      '--popover-foreground': '120 80% 72%',
      '--primary': '120 80% 55%',
      '--primary-foreground': '120 5% 4%',
      '--secondary': '120 5% 10%',
      '--secondary-foreground': '120 80% 60%',
      '--muted': '120 5% 8%',
      '--muted-foreground': '120 40% 45%',
      '--accent': '120 5% 10%',
      '--accent-foreground': '120 80% 72%',
      '--destructive': '0 70% 45%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '120 20% 14%',
      '--input': '120 20% 14%',
      '--ring': '120 80% 55%',
      '--sidebar': '120 5% 3%',
      '--sidebar-foreground': '120 60% 55%',
      '--sidebar-border': '120 20% 10%',
      '--radius': '0rem',
      '--gradient-a': 'hsl(120,80%,55%)',
      '--gradient-b': 'hsl(140,80%,50%)',
      '--gradient-c': 'hsl(160,80%,50%)',
    },
  },

  // ── 3. Miami Vice ───────────────────────────────────────────────────────────
  {
    id: 'miami',
    label: 'Miami Vice',
    emoji: '🌴',
    description: 'Hot pink & cyan neon',
    darkMode: true,
    fonts: 'https://fonts.googleapis.com/css2?family=Pacifico&family=Josefin+Sans:wght@400;600;700&family=Space+Mono:wght@400;700&display=swap',
    fontBody: "'Josefin Sans', sans-serif",
    fontDisplay: "'Pacifico', cursive",
    fontMono: "'Space Mono', monospace",
    vars: {
      '--background': '280 30% 7%',
      '--foreground': '300 20% 95%',
      '--card': '280 30% 10%',
      '--card-foreground': '300 20% 95%',
      '--popover': '280 30% 10%',
      '--popover-foreground': '300 20% 95%',
      '--primary': '320 100% 60%',
      '--primary-foreground': '0 0% 100%',
      '--secondary': '280 30% 15%',
      '--secondary-foreground': '300 20% 85%',
      '--muted': '280 30% 13%',
      '--muted-foreground': '280 15% 55%',
      '--accent': '185 100% 45%',
      '--accent-foreground': '0 0% 0%',
      '--destructive': '0 80% 55%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '280 25% 20%',
      '--input': '280 25% 20%',
      '--ring': '320 100% 60%',
      '--sidebar': '280 35% 5%',
      '--sidebar-foreground': '300 15% 70%',
      '--sidebar-border': '280 25% 14%',
      '--radius': '1.5rem',
      '--gradient-a': 'hsl(320,100%,60%)',
      '--gradient-b': 'hsl(280,80%,60%)',
      '--gradient-c': 'hsl(185,100%,45%)',
    },
  },

  // ── 4. Paper ────────────────────────────────────────────────────────────────
  {
    id: 'paper',
    label: 'Paper',
    emoji: '📄',
    description: 'Light editorial serif',
    darkMode: false,
    fonts: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Source+Serif+4:wght@400;600&family=IBM+Plex+Mono:wght@400;500&display=swap',
    fontBody: "'Source Serif 4', serif",
    fontDisplay: "'Playfair Display', serif",
    fontMono: "'IBM Plex Mono', monospace",
    vars: {
      '--background': '40 20% 97%',
      '--foreground': '30 10% 12%',
      '--card': '0 0% 100%',
      '--card-foreground': '30 10% 12%',
      '--popover': '0 0% 100%',
      '--popover-foreground': '30 10% 12%',
      '--primary': '20 80% 42%',
      '--primary-foreground': '0 0% 100%',
      '--secondary': '40 15% 92%',
      '--secondary-foreground': '30 10% 25%',
      '--muted': '40 15% 93%',
      '--muted-foreground': '30 8% 45%',
      '--accent': '40 15% 92%',
      '--accent-foreground': '30 10% 12%',
      '--destructive': '0 72% 48%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '35 12% 84%',
      '--input': '35 12% 84%',
      '--ring': '20 80% 42%',
      '--sidebar': '40 18% 94%',
      '--sidebar-foreground': '30 10% 30%',
      '--sidebar-border': '35 12% 86%',
      '--radius': '0.5rem',
      '--gradient-a': 'hsl(20,80%,42%)',
      '--gradient-b': 'hsl(30,70%,45%)',
      '--gradient-c': 'hsl(40,80%,48%)',
    },
  },

  // ── 5. Retro DOS ────────────────────────────────────────────────────────────
  {
    id: 'retro',
    label: 'Retro DOS',
    emoji: '🖥️',
    description: 'Amber DOS warmth',
    darkMode: true,
    fonts: 'https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Courier+Prime:wght@400;700&display=swap',
    fontBody: "'Courier Prime', monospace",
    fontDisplay: "'Press Start 2P', monospace",
    fontMono: "'Courier Prime', monospace",
    vars: {
      '--background': '30 15% 5%',
      '--foreground': '38 90% 70%',
      '--card': '30 15% 8%',
      '--card-foreground': '38 90% 70%',
      '--popover': '30 15% 8%',
      '--popover-foreground': '38 90% 70%',
      '--primary': '38 100% 58%',
      '--primary-foreground': '30 15% 5%',
      '--secondary': '30 15% 12%',
      '--secondary-foreground': '38 80% 60%',
      '--muted': '30 15% 10%',
      '--muted-foreground': '38 40% 45%',
      '--accent': '30 15% 12%',
      '--accent-foreground': '38 90% 70%',
      '--destructive': '0 80% 50%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '35 20% 16%',
      '--input': '35 20% 16%',
      '--ring': '38 100% 58%',
      '--sidebar': '30 15% 3%',
      '--sidebar-foreground': '38 70% 55%',
      '--sidebar-border': '35 18% 12%',
      '--radius': '0rem',
      '--gradient-a': 'hsl(38,100%,58%)',
      '--gradient-b': 'hsl(28,90%,52%)',
      '--gradient-c': 'hsl(18,85%,50%)',
    },
  },

  // ── 6. Nord ─────────────────────────────────────────────────────────────────
  {
    id: 'nord',
    label: 'Nord',
    emoji: '🌨️',
    description: 'Arctic cool blue',
    darkMode: true,
    fonts: 'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap',
    fontBody: "'Inter', sans-serif",
    fontDisplay: "'Syne', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    vars: {
      '--background': '220 16% 10%',
      '--foreground': '218 27% 88%',
      '--card': '222 16% 13%',
      '--card-foreground': '218 27% 88%',
      '--popover': '222 16% 13%',
      '--popover-foreground': '218 27% 88%',
      '--primary': '213 32% 52%',
      '--primary-foreground': '0 0% 100%',
      '--secondary': '222 16% 18%',
      '--secondary-foreground': '218 27% 80%',
      '--muted': '222 16% 16%',
      '--muted-foreground': '218 15% 52%',
      '--accent': '222 16% 20%',
      '--accent-foreground': '218 27% 88%',
      '--destructive': '354 42% 56%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '222 14% 20%',
      '--input': '222 14% 20%',
      '--ring': '213 32% 52%',
      '--sidebar': '222 18% 8%',
      '--sidebar-foreground': '218 20% 65%',
      '--sidebar-border': '222 14% 15%',
      '--radius': '0.6rem',
      '--gradient-a': 'hsl(213,32%,52%)',
      '--gradient-b': 'hsl(193,43%,67%)',
      '--gradient-c': 'hsl(178,36%,62%)',
    },
  },

  // ── 7. Synthwave ────────────────────────────────────────────────────────────
  {
    id: 'synthwave',
    label: 'Synthwave',
    emoji: '🌃',
    description: 'Deep purple electric 80s',
    darkMode: true,
    fonts: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@400;500;600&family=Share+Tech+Mono&display=swap',
    fontBody: "'Rajdhani', sans-serif",
    fontDisplay: "'Orbitron', sans-serif",
    fontMono: "'Share Tech Mono', monospace",
    vars: {
      '--background': '255 40% 5%',
      '--foreground': '255 20% 95%',
      '--card': '255 35% 8%',
      '--card-foreground': '255 20% 95%',
      '--popover': '255 35% 8%',
      '--popover-foreground': '255 20% 95%',
      '--primary': '280 100% 65%',
      '--primary-foreground': '0 0% 100%',
      '--secondary': '255 35% 13%',
      '--secondary-foreground': '255 20% 85%',
      '--muted': '255 35% 11%',
      '--muted-foreground': '255 15% 55%',
      '--accent': '195 100% 55%',
      '--accent-foreground': '0 0% 0%',
      '--destructive': '350 90% 55%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '255 30% 18%',
      '--input': '255 30% 18%',
      '--ring': '280 100% 65%',
      '--sidebar': '255 45% 4%',
      '--sidebar-foreground': '255 15% 65%',
      '--sidebar-border': '255 30% 13%',
      '--radius': '0.75rem',
      '--gradient-a': 'hsl(280,100%,65%)',
      '--gradient-b': 'hsl(320,100%,60%)',
      '--gradient-c': 'hsl(195,100%,55%)',
    },
  },

  // ── 8. Dracula ──────────────────────────────────────────────────────────────
  {
    id: 'dracula',
    label: 'Dracula',
    emoji: '🧛',
    description: 'Classic IDE dark theme',
    darkMode: true,
    fonts: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap',
    fontBody: "'Inter', sans-serif",
    fontDisplay: "'Fira Code', monospace",
    fontMono: "'Fira Code', monospace",
    vars: {
      '--background': '231 15% 13%',
      '--foreground': '60 30% 96%',
      '--card': '232 14% 16%',
      '--card-foreground': '60 30% 96%',
      '--popover': '232 14% 16%',
      '--popover-foreground': '60 30% 96%',
      '--primary': '265 89% 78%',
      '--primary-foreground': '231 15% 13%',
      '--secondary': '232 14% 21%',
      '--secondary-foreground': '60 30% 85%',
      '--muted': '232 14% 18%',
      '--muted-foreground': '232 10% 58%',
      '--accent': '135 94% 65%',
      '--accent-foreground': '231 15% 13%',
      '--destructive': '0 100% 67%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '232 14% 22%',
      '--input': '232 14% 22%',
      '--ring': '265 89% 78%',
      '--sidebar': '232 17% 11%',
      '--sidebar-foreground': '60 20% 70%',
      '--sidebar-border': '232 14% 18%',
      '--radius': '0.5rem',
      '--gradient-a': 'hsl(265,89%,78%)',
      '--gradient-b': 'hsl(326,100%,74%)',
      '--gradient-c': 'hsl(135,94%,65%)',
    },
  },

  // ── 9. Solarized Dark ───────────────────────────────────────────────────────
  {
    id: 'solarized',
    label: 'Solarized',
    emoji: '☀️',
    description: 'Classic Solarized Dark',
    darkMode: true,
    fonts: 'https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;600&family=Source+Serif+4:wght@400;600&display=swap',
    fontBody: "'Source Serif 4', serif",
    fontDisplay: "'Source Code Pro', monospace",
    fontMono: "'Source Code Pro', monospace",
    vars: {
      '--background': '193 80% 11%',
      '--foreground': '44 87% 72%',
      '--card': '192 81% 14%',
      '--card-foreground': '44 87% 72%',
      '--popover': '192 81% 14%',
      '--popover-foreground': '44 87% 72%',
      '--primary': '205 69% 49%',
      '--primary-foreground': '0 0% 100%',
      '--secondary': '192 81% 18%',
      '--secondary-foreground': '44 87% 65%',
      '--muted': '192 81% 16%',
      '--muted-foreground': '193 40% 45%',
      '--accent': '68 100% 30%',
      '--accent-foreground': '0 0% 100%',
      '--destructive': '1 71% 52%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '192 60% 20%',
      '--input': '192 60% 20%',
      '--ring': '205 69% 49%',
      '--sidebar': '193 85% 9%',
      '--sidebar-foreground': '44 60% 55%',
      '--sidebar-border': '192 60% 15%',
      '--radius': '0.4rem',
      '--gradient-a': 'hsl(205,69%,49%)',
      '--gradient-b': 'hsl(175,59%,40%)',
      '--gradient-c': 'hsl(68,100%,35%)',
    },
  },

  // ── 10. Forest ──────────────────────────────────────────────────────────────
  {
    id: 'forest',
    label: 'Forest',
    emoji: '🌲',
    description: 'Earthy deep green',
    darkMode: true,
    fonts: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Cabin:wght@400;600;700&family=Inconsolata:wght@400;500&display=swap',
    fontBody: "'Cabin', sans-serif",
    fontDisplay: "'Merriweather', serif",
    fontMono: "'Inconsolata', monospace",
    vars: {
      '--background': '140 20% 6%',
      '--foreground': '120 15% 88%',
      '--card': '140 20% 9%',
      '--card-foreground': '120 15% 88%',
      '--popover': '140 20% 9%',
      '--popover-foreground': '120 15% 88%',
      '--primary': '150 60% 42%',
      '--primary-foreground': '0 0% 100%',
      '--secondary': '140 20% 14%',
      '--secondary-foreground': '120 15% 80%',
      '--muted': '140 20% 12%',
      '--muted-foreground': '130 12% 50%',
      '--accent': '140 20% 14%',
      '--accent-foreground': '120 15% 88%',
      '--destructive': '5 65% 48%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '140 18% 18%',
      '--input': '140 18% 18%',
      '--ring': '150 60% 42%',
      '--sidebar': '140 25% 4%',
      '--sidebar-foreground': '120 10% 60%',
      '--sidebar-border': '140 18% 13%',
      '--radius': '0.35rem',
      '--gradient-a': 'hsl(150,60%,42%)',
      '--gradient-b': 'hsl(125,55%,38%)',
      '--gradient-c': 'hsl(80,60%,40%)',
    },
  },

  // ── 11. Sunset ──────────────────────────────────────────────────────────────
  {
    id: 'sunset',
    label: 'Sunset',
    emoji: '🌅',
    description: 'Warm orange-red dusk',
    darkMode: true,
    fonts: 'https://fonts.googleapis.com/css2?family=Righteous&family=Nunito:wght@400;600;700&family=Courier+Prime:wght@400;700&display=swap',
    fontBody: "'Nunito', sans-serif",
    fontDisplay: "'Righteous', cursive",
    fontMono: "'Courier Prime', monospace",
    vars: {
      '--background': '15 25% 6%',
      '--foreground': '30 30% 92%',
      '--card': '15 25% 9%',
      '--card-foreground': '30 30% 92%',
      '--popover': '15 25% 9%',
      '--popover-foreground': '30 30% 92%',
      '--primary': '22 100% 58%',
      '--primary-foreground': '0 0% 100%',
      '--secondary': '15 25% 14%',
      '--secondary-foreground': '30 25% 80%',
      '--muted': '15 25% 12%',
      '--muted-foreground': '20 15% 52%',
      '--accent': '350 85% 60%',
      '--accent-foreground': '0 0% 100%',
      '--destructive': '350 85% 52%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '15 22% 18%',
      '--input': '15 22% 18%',
      '--ring': '22 100% 58%',
      '--sidebar': '15 30% 4%',
      '--sidebar-foreground': '25 20% 60%',
      '--sidebar-border': '15 22% 13%',
      '--radius': '1rem',
      '--gradient-a': 'hsl(22,100%,58%)',
      '--gradient-b': 'hsl(350,85%,60%)',
      '--gradient-c': 'hsl(45,100%,55%)',
    },
  },

  // ── 12. Ocean ───────────────────────────────────────────────────────────────
  {
    id: 'ocean',
    label: 'Ocean',
    emoji: '🌊',
    description: 'Deep sea teal-navy',
    darkMode: true,
    fonts: 'https://fonts.googleapis.com/css2?family=Exo+2:wght@400;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap',
    fontBody: "'Inter', sans-serif",
    fontDisplay: "'Exo 2', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    vars: {
      '--background': '210 40% 7%',
      '--foreground': '195 30% 90%',
      '--card': '210 40% 10%',
      '--card-foreground': '195 30% 90%',
      '--popover': '210 40% 10%',
      '--popover-foreground': '195 30% 90%',
      '--primary': '185 75% 42%',
      '--primary-foreground': '0 0% 100%',
      '--secondary': '210 40% 15%',
      '--secondary-foreground': '195 25% 80%',
      '--muted': '210 40% 13%',
      '--muted-foreground': '200 20% 52%',
      '--accent': '210 40% 17%',
      '--accent-foreground': '195 30% 90%',
      '--destructive': '5 70% 52%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '210 35% 18%',
      '--input': '210 35% 18%',
      '--ring': '185 75% 42%',
      '--sidebar': '210 45% 5%',
      '--sidebar-foreground': '195 20% 62%',
      '--sidebar-border': '210 35% 13%',
      '--radius': '0.75rem',
      '--gradient-a': 'hsl(185,75%,42%)',
      '--gradient-b': 'hsl(200,70%,50%)',
      '--gradient-c': 'hsl(215,80%,55%)',
    },
  },
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
      link.id = 'site-theme-fonts';
      link.rel = 'stylesheet';
      link.href = theme.fonts;
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
