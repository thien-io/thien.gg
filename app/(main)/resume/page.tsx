'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal, StaggerList, fadeUp, slideLeft, slideRight, scaleIn } from '@/lib/animations';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Briefcase, GraduationCap, Code2, Award, ExternalLink,
  Download, MapPin, Mail, Globe, Github, Linkedin,
  Star, Calendar, ChevronDown, ChevronUp,
} from 'lucide-react';

// ── Edit this data to personalise ────────────────────────────────────────────
const PROFILE = {
  name: 'Thien Nguyen',
  title: 'Software Engineer & Full-Stack Developer',
  location: 'Ho Chi Minh City, Vietnam',
  email: 'thien@thien.gg',
  website: 'https://thien.gg',
  github: 'github.com/thiengg',
  linkedin: 'linkedin.com/in/thiengg',
  summary: `Passionate full-stack developer and competitive gamer with 3+ years building 
    web applications. I love creating elegant solutions to complex problems, from React 
    frontends to Node.js backends. When I'm not coding, I'm grinding ranked in Valorant 
    or contributing to open-source projects.`,
};

const EXPERIENCE = [
  {
    company: 'Tech Startup Co.',
    role: 'Frontend Engineer',
    period: 'Jan 2023 – Present',
    location: 'Remote',
    bullets: [
      'Built and maintained React/Next.js applications serving 50k+ monthly active users',
      'Reduced page load time by 40% through code splitting and lazy loading optimization',
      'Led migration from JavaScript to TypeScript, improving codebase reliability',
      'Mentored 2 junior developers and conducted regular code reviews',
    ],
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
  },
  {
    company: 'Freelance',
    role: 'Full-Stack Developer',
    period: 'Jun 2021 – Dec 2022',
    location: 'Remote',
    bullets: [
      'Delivered 12+ web projects for clients across e-commerce, SaaS, and portfolio verticals',
      'Designed and implemented REST APIs and database schemas for 3 production applications',
      'Built a custom CMS reducing client content update time from hours to minutes',
    ],
    tech: ['React', 'Node.js', 'PostgreSQL', 'Figma', 'AWS'],
  },
];

const EDUCATION = [
  {
    school: 'University of Technology',
    degree: 'B.Sc. Computer Science',
    period: '2018 – 2022',
    gpa: '3.8 / 4.0',
    bullets: [
      'Dean\'s List all 4 years',
      'President of the Game Development Club',
      'Capstone project: AI-driven game analytics platform',
    ],
  },
];

const SKILLS = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'HTML/CSS'],
  Backend:  ['Node.js', 'Express', 'PostgreSQL', 'Supabase', 'Redis', 'REST APIs'],
  Tools:    ['Git', 'Docker', 'Figma', 'AWS', 'Vercel', 'Linux'],
  Languages:['TypeScript', 'Python', 'SQL', 'Bash', 'Rust (learning)'],
};

const PROJECTS = [
  {
    name: 'thien.gg',
    desc: 'Personal gamer profile site with typing test, mini-games, Discord integration, and 32 themes.',
    tech: ['Next.js', 'Supabase', 'Framer Motion'],
    link: 'https://thien.gg',
    stars: 128,
  },
  {
    name: 'GameVault',
    desc: 'Game backlog tracker with Steam API integration, social features, and analytics dashboard.',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    link: 'https://github.com/thiengg/gamevault',
    stars: 87,
  },
  {
    name: 'TypeRacer CLI',
    desc: 'Terminal-based typing race game in Rust with online multiplayer via WebSockets.',
    tech: ['Rust', 'WebSockets', 'SQLite'],
    link: 'https://github.com/thiengg/typeracer-cli',
    stars: 214,
  },
];

const AWARDS = [
  { title: 'HackUTM 2023 — 1st Place', org: 'University of Technology Malaysia', year: '2023' },
  { title: 'AWS Certified Developer', org: 'Amazon Web Services', year: '2022' },
  { title: 'Google Developer Student Club Lead', org: 'Google', year: '2021–2022' },
];

function Section({ title, icon: Icon, children }: {
  title: string; icon: React.ElementType; children: React.ReactNode;
}) {
  return (
    <ScrollReveal variants={fadeUp}>
      <div className="space-y-4">
        <div className="flex items-center gap-2.5">
          <Icon className="w-5 h-5 text-primary shrink-0" />
          <h2 className="text-xl font-bold font-display">{title}</h2>
          <Separator className="flex-1" />
        </div>
        {children}
      </div>
    </ScrollReveal>
  );
}

export default function ResumePage() {
  const [expandedJob, setExpandedJob] = useState<number | null>(0);

  return (
    <div className="space-y-10 pb-10 max-w-3xl">
      <ScrollReveal variants={fadeUp}>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold font-display gradient-text flex items-center gap-2.5 flex-wrap">
            <Briefcase className="w-6 h-6 shrink-0" /> Resume
          </h1>
          <p className="text-muted-foreground mt-1">My professional background and projects</p>
        </div>
      </ScrollReveal>

      {/* Header card */}
      <ScrollReveal variants={scaleIn}>
        <Card className="overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-primary/30 via-primary/10 to-transparent" />
          <CardContent className="pt-0 px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-10 mb-4 gap-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/60 border-4 border-card flex items-center justify-center text-3xl font-bold text-primary-foreground shadow-xl font-display">
                T
              </div>
              <Button variant="outline" className="gap-2 w-fit" size="sm">
                <Download className="w-4 h-4" /> Download PDF
              </Button>
            </div>
            <h2 className="text-2xl font-bold font-display">{PROFILE.name}</h2>
            <p className="text-primary font-medium mb-3">{PROFILE.title}</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{PROFILE.summary}</p>
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Mail className="w-3.5 h-3.5" />{PROFILE.email}
              </a>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />{PROFILE.location}
              </span>
              <a href={PROFILE.website} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Globe className="w-3.5 h-3.5" />thien.gg
              </a>
              <a href={`https://${PROFILE.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Github className="w-3.5 h-3.5" />{PROFILE.github.split('/')[1]}
              </a>
              <a href={`https://${PROFILE.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Linkedin className="w-3.5 h-3.5" />LinkedIn
              </a>
            </div>
          </CardContent>
        </Card>
      </ScrollReveal>

      {/* Experience */}
      <Section title="Experience" icon={Briefcase}>
        <div className="space-y-3">
          {EXPERIENCE.map((job, i) => (
            <Card key={i} className="overflow-hidden transition-all duration-200 hover:border-primary/30">
              <button
                className="w-full text-left p-4 sm:p-5"
                onClick={() => setExpandedJob(expandedJob === i ? null : i)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold">{job.role}</h3>
                      <span className="text-primary font-medium text-sm">@ {job.company}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{job.period}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                    </div>
                  </div>
                  {expandedJob === i
                    ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
                    : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
                  }
                </div>
              </button>

              <AnimatedCollapse open={expandedJob === i}>
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 space-y-3 border-t border-border/50 pt-3">
                  <ul className="space-y-1.5">
                    {job.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-1.5 shrink-0">▸</span>{b}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {job.tech.map(t => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
                  </div>
                </div>
              </AnimatedCollapse>
            </Card>
          ))}
        </div>
      </Section>

      {/* Education */}
      <Section title="Education" icon={GraduationCap}>
        {EDUCATION.map((edu, i) => (
          <Card key={i}>
            <CardContent className="pt-5 pb-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="font-bold">{edu.degree}</h3>
                  <p className="text-primary font-medium text-sm">{edu.school}</p>
                  <p className="text-xs text-muted-foreground mt-1">{edu.period} · GPA: {edu.gpa}</p>
                </div>
              </div>
              <ul className="mt-3 space-y-1">
                {edu.bullets.map((b, bi) => (
                  <li key={bi} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-1.5 shrink-0">▸</span>{b}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </Section>

      {/* Skills */}
      <Section title="Skills" icon={Code2}>
        <div className="grid sm:grid-cols-2 gap-3">
          {Object.entries(SKILLS).map(([category, skills]) => (
            <Card key={category}>
              <CardContent className="pt-4 pb-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">{category}</p>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map(s => <Badge key={s} variant="outline" className="text-xs">{s}</Badge>)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section title="Projects" icon={Code2}>
        <StaggerList className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PROJECTS.map((proj, i) => (
            <motion.div key={i} variants={scaleIn}>
              <Card className="h-full hover:border-primary/40 transition-colors duration-200 group">
                <CardContent className="pt-4 pb-4 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-sm group-hover:text-primary transition-colors">{proj.name}</h3>
                    <a href={proj.link} target="_blank" rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <p className="text-xs text-muted-foreground flex-1 mb-3 leading-relaxed">{proj.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {proj.tech.slice(0, 2).map(t => <Badge key={t} variant="secondary" className="text-[10px] px-1.5 py-0">{t}</Badge>)}
                    </div>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{proj.stars}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </StaggerList>
      </Section>

      {/* Awards */}
      <Section title="Awards & Certifications" icon={Award}>
        <div className="space-y-2">
          {AWARDS.map((award, i) => (
            <Card key={i} className="hover:border-primary/30 transition-colors">
              <CardContent className="pt-3 pb-3 flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-sm">{award.title}</p>
                  <p className="text-xs text-muted-foreground">{award.org}</p>
                </div>
                <Badge variant="outline" className="text-xs shrink-0">{award.year}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}

function AnimatedCollapse({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      initial={false}
      animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      style={{ overflow: 'hidden' }}
    >
      {children}
    </motion.div>
  );
}
