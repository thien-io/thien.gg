'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import {
  ScrollReveal, StaggerList, ParallaxHero, FloatingElement,
  MagneticHover, RevealText, AnimatedNumber, AnimatedBar,
  HoverCard, fadeUp, slideLeft, slideRight, scaleIn,
} from '@/lib/animations';
import { TennisHero } from '@/components/tennis-hero';
import { DiscordPresence } from '@/components/discord-presence';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  MapPin, Calendar, Trophy, Zap, Code2, Coffee,
  Heart, Star, ExternalLink, Gamepad2, Sparkles,
  MousePointer2, ArrowDown,
} from 'lucide-react';

const DISCORD_USER_ID = process.env.NEXT_PUBLIC_DISCORD_USER_ID ?? '';

const skills = ['Valorant', 'League of Legends', 'CS2', 'Elden Ring', 'Minecraft'];
const techStack = ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Supabase'];

const stats = [
  { label: 'Games Played', value: 200,  suffix: '+', icon: Trophy,   color: 'text-yellow-400' },
  { label: 'Hours Gamed',  value: 6900, suffix: '+', icon: Zap,      color: 'text-blue-400' },
  { label: 'Rank (Val)',   value: 0,    suffix: '',  icon: Star,     color: 'text-purple-400', text: 'Diamond' },
  { label: 'Coffee/Day',  value: 3,    suffix: '+', icon: Coffee,   color: 'text-amber-400' },
];

const links = [
  { label: 'GitHub',   href: 'https://github.com/thiengg', icon: Code2 },
  { label: 'Discord',  href: 'https://discord.gg/thiengg', icon: Heart },
];

export default function ProfilePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: pageRef });
  const bgParallax = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div ref={pageRef} className="space-y-12">

      {/* ── Tennis Hero with parallax ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <TennisHero />
        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-3 right-3 flex items-center gap-1.5 text-xs text-muted-foreground/60"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-3 h-3" />
          <span className="font-mono hidden sm:inline">scroll</span>
        </motion.div>
      </motion.div>

      {/* ── Hero profile card with parallax banner ─────────────────────────── */}
      <ScrollReveal variants={fadeUp}>
        <div className="relative rounded-2xl overflow-hidden border bg-card">
          {/* Parallax banner */}
          <div className="h-36 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/40 via-primary/20 to-transparent"
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, -40]) }}
            />
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 20px,currentColor 20px,currentColor 21px)' }}
            />
            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-primary/40"
                style={{ left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 25}%` }}
                animate={{ y: [0, -12, 0], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 3 + i * 0.5, delay: i * 0.4, repeat: Infinity }}
              />
            ))}
          </div>

          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-10 mb-4">
              <MagneticHover strength={0.15}>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/60 border-4 border-card flex items-center justify-center text-3xl font-bold text-primary-foreground shadow-xl glow-sm"
                >
                  T
                </motion.div>
              </MagneticHover>
              <div className="flex gap-2 pb-1 flex-wrap justify-end">
                {links.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border bg-background hover:bg-accent hover:border-primary/40 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <link.icon className="w-3.5 h-3.5" />
                    {link.label}
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold font-display gradient-text leading-none mb-1">
                <RevealText text="thien" />
              </h1>
              <p className="text-muted-foreground text-sm mb-3">
                aka <span className="text-foreground font-mono">thien.gg</span>
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Somewhere on Earth</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Joined 2021</span>
              </div>
            </div>

            <Separator className="my-4" />

            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
              Full-time gamer, part-time developer. I grind ranked, build side projects, and drink too
              much coffee. Welcome to my corner of the internet — stay a while.
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {[
                { icon: Trophy, label: 'Diamond Valorant' },
                { icon: Star, label: '3000h LoL' },
                { icon: Code2, label: 'Developer' },
              ].map(({ icon: Icon, label }) => (
                <motion.div key={label} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                  <Badge variant="secondary" className="gap-1 cursor-default">
                    <Icon className="w-3 h-3" /> {label}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ── Animated stats row ─────────────────────────────────────────────── */}
      <StaggerList className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={scaleIn}>
            <HoverCard>
              <Card className="text-center cursor-default">
                <CardContent className="pt-5 pb-4">
                  <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
                  <p className="text-2xl font-bold font-display">
                    {stat.text ? (
                      <span className={stat.color}>{stat.text}</span>
                    ) : (
                      <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                </CardContent>
              </Card>
            </HoverCard>
          </motion.div>
        ))}
      </StaggerList>

      {/* ── Content grid ───────────────────────────────────────────────────── */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left col */}
        <div className="lg:col-span-2 space-y-6">
          <ScrollReveal variants={slideLeft}>
            {DISCORD_USER_ID ? (
              <DiscordPresence userId={DISCORD_USER_ID} />
            ) : (
              <Card>
                <CardContent className="pt-6 text-center text-sm text-muted-foreground">
                  Set <code className="text-xs bg-muted px-1 py-0.5 rounded">NEXT_PUBLIC_DISCORD_USER_ID</code> to show presence
                </CardContent>
              </Card>
            )}
          </ScrollReveal>

          <ScrollReveal variants={slideLeft} delay={100}>
            <Card>
              <CardContent className="pt-5">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-primary" /> Currently Playing
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s, i) => (
                    <motion.div key={s} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                      <Badge variant="secondary" className="text-xs hover:bg-primary/20 transition-colors cursor-default">{s}</Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>

        {/* Right col */}
        <div className="lg:col-span-3 space-y-6">
          <ScrollReveal variants={slideRight}>
            <Card>
              <CardContent className="pt-5">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">About</h3>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Hey! I'm <strong className="text-foreground">Thien</strong> — a competitive gamer with a soft spot for indie titles and open-world RPGs.</p>
                  <p>Valorant and League are my dailies, but I rotate through whatever drops on Game Pass or goes on sale. Elden Ring holds GOTY for life.</p>
                  <p>This site is my little hub — check out the games I play, drop a message in the guestbook, or see if you can beat my typing score.</p>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal variants={slideRight} delay={80}>
            <Card>
              <CardContent className="pt-5">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-primary" /> Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((t, i) => (
                    <motion.span
                      key={t}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-muted text-muted-foreground border hover:border-primary/40 hover:text-foreground transition-colors cursor-default"
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal variants={slideRight} delay={160}>
            <Card>
              <CardContent className="pt-5">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">🖥️ Setup</h3>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  {[
                    ['Monitor', 'ASUS 240Hz 1440p'],
                    ['Mouse', 'G Pro X Superlight'],
                    ['Keyboard', 'Wooting 60HE'],
                    ['Headset', 'Sennheiser HD 599'],
                    ['GPU', 'RTX 4070 Ti'],
                    ['CPU', 'Ryzen 7 7800X3D'],
                  ].map(([k, v]) => (
                    <motion.div key={k} whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                      <dt className="text-muted-foreground text-xs">{k}</dt>
                      <dd className="font-medium text-sm">{v}</dd>
                    </motion.div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
