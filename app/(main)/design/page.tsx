'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal, StaggerList, fadeUp, scaleIn } from '@/lib/animations';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Palette, Filter, ExternalLink, X, ZoomIn, Eye, Heart, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

type DesignTag = 'UI/UX' | 'Brand' | 'Motion' | 'Illustration' | 'Print' | '3D';

interface DesignWork {
  id: string;
  title: string;
  category: DesignTag;
  year: number;
  tools: string[];
  desc: string;
  link?: string;
  likes: number;
  views: number;
  // CSS gradient as stand-in for real screenshots
  gradient: string;
  accent: string;
  featured?: boolean;
}

const WORKS: DesignWork[] = [
  { id:'1', title:'GameVault Dashboard', category:'UI/UX', year:2023, tools:['Figma','Framer'], desc:'A dark-mode analytics dashboard for game backlog tracking. Focused on data clarity and gaming aesthetics.', likes:284, views:1820, gradient:'linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#312e81 100%)', accent:'#818cf8', featured:true, link:'https://dribbble.com' },
  { id:'2', title:'thien.gg Rebrand', category:'Brand', year:2023, tools:['Figma','Illustrator'], desc:'Personal brand identity — logo, colour system, typography scale, and component library.', likes:156, views:932, gradient:'linear-gradient(135deg,#0d1117 0%,#1a1a2e 50%,#0d1b2a 100%)', accent:'#22c55e', featured:true },
  { id:'3', title:'Velocity App', category:'UI/UX', year:2023, tools:['Figma'], desc:'Fitness tracking mobile app with streak system, workout builder, and progress visualization.', likes:203, views:1410, gradient:'linear-gradient(135deg,#0f172a 0%,#1f2937 40%,#111827 100%)', accent:'#f97316' },
  { id:'4', title:'LoFi Radio Poster', category:'Print', year:2022, tools:['Illustrator','Photoshop'], desc:'Limited-run poster series for a lofi music collective. Hand-lettered elements with grain texture.', likes:178, views:890, gradient:'linear-gradient(135deg,#1c1917 0%,#292524 60%,#1c1917 100%)', accent:'#fbbf24' },
  { id:'5', title:'Orb Icons', category:'Illustration', year:2022, tools:['Illustrator','Figma'], desc:'60-icon system with a glassy 3D orb style. Available as SVG and Figma components.', likes:412, views:3240, gradient:'linear-gradient(135deg,#0c0a09 0%,#1c1917 60%,#0c0a09 100%)', accent:'#a78bfa', featured:true, link:'https://github.com' },
  { id:'6', title:'Pulse Branding', category:'Brand', year:2022, tools:['Figma','Illustrator'], desc:'Brand identity for a music streaming startup. Energetic, bold, and built around motion.', likes:234, views:1560, gradient:'linear-gradient(135deg,#0f0014 0%,#1a0030 60%,#2d0060 100%)', accent:'#e879f9' },
  { id:'7', title:'Loading Animations', category:'Motion', year:2023, tools:['After Effects','Lottie'], desc:'12-piece animation pack for web interfaces. Smooth, minimal, and highly customizable.', likes:367, views:2890, gradient:'linear-gradient(135deg,#0a0a14 0%,#0d1117 50%,#0a0a1e 100%)', accent:'#38bdf8' },
  { id:'8', title:'Chess 3D Set', category:'3D', year:2022, tools:['Blender','Substance'], desc:'Hand-crafted 3D chess set with PBR materials. Available in several colour variants.', likes:521, views:4200, gradient:'linear-gradient(135deg,#1a0a00 0%,#2d1800 50%,#1a0a00 100%)', accent:'#d97706', featured:true },
];

const SKILLS_DESIGN = [
  { tool: 'Figma',       level: 95, icon: '🎨' },
  { tool: 'Illustrator', level: 82, icon: '✏️' },
  { tool: 'Photoshop',   level: 78, icon: '📸' },
  { tool: 'After Effects', level: 65, icon: '🎬' },
  { tool: 'Blender',     level: 55, icon: '🧊' },
  { tool: 'Framer',      level: 88, icon: '⚡' },
];

function SkillBar({ tool, level, icon }: { tool: string; level: number; icon: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref}>
      <div className="flex items-center justify-between mb-1 text-sm">
        <span className="flex items-center gap-2">{icon} {tool}</span>
        <span className="text-muted-foreground text-xs font-mono">{level}%</span>
      </div>
      <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
        <motion.div className="h-full bg-primary rounded-full"
          initial={{ width: '0%' }}
          animate={vis ? { width: `${level}%` } : { width: '0%' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export default function DesignPage() {
  const [filter, setFilter] = useState<DesignTag | 'all'>('all');
  const [selected, setSelected] = useState<DesignWork | null>(null);

  const filtered = filter === 'all' ? WORKS : WORKS.filter(w => w.category === filter);
  const tags: DesignTag[] = ['UI/UX', 'Brand', 'Motion', 'Illustration', 'Print', '3D'];

  return (
    <div className="space-y-8 pb-10">
      <ScrollReveal variants={fadeUp}>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold font-display gradient-text flex items-center gap-2.5 flex-wrap">
            <Palette className="w-6 h-6 shrink-0" /> Design
          </h1>
          <p className="text-muted-foreground mt-1">UI/UX, branding, illustration, and motion work</p>
        </div>
      </ScrollReveal>

      {/* Stats */}
      <StaggerList className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: Layers, label:'Projects',  value: WORKS.length },
          { icon: Eye,    label:'Total Views', value:'15.9k' },
          { icon: Heart,  label:'Total Likes', value: WORKS.reduce((a,w)=>a+w.likes,0).toLocaleString() },
          { icon: Palette,label:'Tools',      value: 6 },
        ].map(s => (
          <motion.div key={s.label} variants={scaleIn}>
            <Card className="text-center hover:border-primary/30 transition-colors">
              <CardContent className="pt-4 pb-4">
                <s.icon className="w-4 h-4 mx-auto mb-1.5 text-primary" />
                <p className="text-2xl font-bold font-display">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </StaggerList>

      {/* Filters */}
      <ScrollReveal variants={fadeUp}>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Button variant={filter === 'all' ? 'default' : 'outline'} size="sm" className="h-8 text-xs" onClick={() => setFilter('all')}>
            All <span className="ml-1 opacity-60">{WORKS.length}</span>
          </Button>
          {tags.map(t => (
            <Button key={t} variant={filter === t ? 'default' : 'outline'} size="sm" className="h-8 text-xs"
              onClick={() => setFilter(t)}>
              {t} <span className="ml-1 opacity-60">{WORKS.filter(w=>w.category===t).length}</span>
            </Button>
          ))}
        </div>
      </ScrollReveal>

      {/* Masonry-ish grid */}
      <StaggerList className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(work => (
          <motion.div key={work.id} variants={scaleIn} className={work.featured ? 'sm:col-span-1' : ''}>
            <Card
              className="group overflow-hidden hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary/10"
              onClick={() => setSelected(work)}
            >
              {/* Preview */}
              <div className="relative h-40 overflow-hidden" style={{ background: work.gradient }}>
                {/* Decorative elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl opacity-20 border-2" style={{ borderColor: work.accent }} />
                  <div className="absolute w-32 h-32 rounded-full opacity-10 border" style={{ borderColor: work.accent }} />
                  <Palette className="w-8 h-8 opacity-30" style={{ color: work.accent }} />
                </div>
                {work.featured && (
                  <Badge className="absolute top-2 left-2 text-[10px]" style={{ background: work.accent, color: '#000' }}>
                    Featured
                  </Badge>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <ZoomIn className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardContent className="p-3">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-sm group-hover:text-primary transition-colors">{work.title}</h3>
                  <Badge variant="outline" className="text-[10px] shrink-0">{work.category}</Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{work.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {work.tools.slice(0, 2).map(t => <span key={t} className="text-[10px] text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">{t}</span>)}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-0.5"><Heart className="w-2.5 h-2.5" />{work.likes}</span>
                    <span className="flex items-center gap-0.5"><Eye className="w-2.5 h-2.5" />{work.views}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </StaggerList>

      {/* Tool skills */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ScrollReveal variants={fadeUp}>
          <Card>
            <CardContent className="pt-5">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Design Tools</h2>
              <div className="space-y-4">
                {SKILLS_DESIGN.map(s => <SkillBar key={s.tool} {...s} />)}
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
        <ScrollReveal variants={fadeUp}>
          <Card>
            <CardContent className="pt-5">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Design Principles</h2>
              <div className="space-y-3">
                {[
                  { principle: 'Function over form', desc: 'Beautiful design that works is better than art that confuses.' },
                  { principle: 'Accessibility first', desc: 'If it\'s not usable by everyone, it\'s not finished.' },
                  { principle: 'Design systems', desc: 'Consistency creates trust. Components over one-offs.' },
                  { principle: 'Motion with purpose', desc: 'Every animation should communicate something.' },
                ].map((p, i) => (
                  <div key={i} className="p-3 rounded-lg bg-muted/30 border border-border/50">
                    <p className="text-sm font-semibold text-primary">{p.principle}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{p.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-card border rounded-2xl overflow-hidden max-w-lg w-full shadow-2xl"
            >
              <div className="h-48 relative" style={{ background: selected.gradient }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Palette className="w-16 h-16 opacity-25" style={{ color: selected.accent }} />
                </div>
                <button onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-lg font-bold">{selected.title}</h2>
                  <Badge variant="outline">{selected.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{selected.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {selected.tools.map(t => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" />{selected.likes}</span>
                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{selected.views}</span>
                  </div>
                  {selected.link && (
                    <a href={selected.link} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                        <ExternalLink className="w-3.5 h-3.5" /> View Project
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
