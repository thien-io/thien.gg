'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal, StaggerList, fadeUp, scaleIn } from '@/lib/animations';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Star, Filter, Clock, CheckCircle2, Bookmark, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

type ReadStatus = 'reading' | 'read' | 'want' | 'dropped';

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string[];
  status: ReadStatus;
  rating?: number;
  pages?: number;
  year?: number;
  cover: string; // gradient CSS
  review?: string;
  favorite?: boolean;
}

const BOOKS: Book[] = [
  { id:'1', title:'The Pragmatic Programmer', author:'Andrew Hunt & David Thomas', genre:['Tech','Programming'], status:'read', rating:9, pages:352, year:1999, cover:'linear-gradient(135deg,#1e3a5f,#2563eb)', review:'Changed how I think about software craftsmanship. Essential for every developer.', favorite:true },
  { id:'2', title:'Clean Code', author:'Robert C. Martin', genre:['Tech','Best Practices'], status:'read', rating:8, pages:431, year:2008, cover:'linear-gradient(135deg,#1f2937,#374151)', review:'Dense but worth it. Made me obsessive about naming and functions.' },
  { id:'3', title:'Atomic Habits', author:'James Clear', genre:['Self-Help','Productivity'], status:'read', rating:9, pages:320, year:2018, cover:'linear-gradient(135deg,#14532d,#15803d)', review:'Completely rewired how I build routines. The 1% better every day concept stuck with me.', favorite:true },
  { id:'4', title:'The Design of Everyday Things', author:'Don Norman', genre:['Design','UX'], status:'read', rating:8, pages:368, year:1988, cover:'linear-gradient(135deg,#7c2d12,#ea580c)', review:'I now notice bad design everywhere. Great for anyone building products.' },
  { id:'5', title:'Dune', author:'Frank Herbert', genre:['Sci-Fi','Fantasy'], status:'read', rating:10, pages:688, year:1965, cover:'linear-gradient(135deg,#78350f,#d97706)', favorite:true },
  { id:'6', title:'Ender\'s Game', author:'Orson Scott Card', genre:['Sci-Fi'], status:'read', rating:9, pages:352, year:1985, cover:'linear-gradient(135deg,#1e3a5f,#7c3aed)' },
  { id:'7', title:'System Design Interview', author:'Alex Xu', genre:['Tech','System Design'], status:'reading', pages:309, cover:'linear-gradient(135deg,#312e81,#4f46e5)' },
  { id:'8', title:'Zero to One', author:'Peter Thiel', genre:['Business','Startups'], status:'reading', pages:195, year:2014, cover:'linear-gradient(135deg,#1c1917,#57534e)' },
  { id:'9', title:'The Hitchhiker\'s Guide to the Galaxy', author:'Douglas Adams', genre:['Sci-Fi','Comedy'], status:'want', cover:'linear-gradient(135deg,#164e63,#0891b2)' },
  { id:'10', title:'Cracking the Coding Interview', author:'Gayle Laakmann McDowell', genre:['Tech','Interviews'], status:'want', pages:687, cover:'linear-gradient(135deg,#14532d,#16a34a)' },
  { id:'11', title:'Deep Work', author:'Cal Newport', genre:['Self-Help','Productivity'], status:'want', cover:'linear-gradient(135deg,#1e1b4b,#3730a3)' },
  { id:'12', title:'The Psychology of Money', author:'Morgan Housel', genre:['Finance','Self-Help'], status:'dropped', pages:256, cover:'linear-gradient(135deg,#713f12,#a16207)', review:'Good ideas but felt repetitive after the first half.' },
];

const STATUS_CFG: Record<ReadStatus, { label: string; icon: React.ElementType; color: string }> = {
  reading: { label: 'Reading',    icon: BookOpen,      color: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
  read:    { label: 'Read',       icon: CheckCircle2,  color: 'text-green-400 bg-green-400/10 border-green-400/20' },
  want:    { label: 'Want to Read', icon: Bookmark,    color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' },
  dropped: { label: 'Dropped',    icon: Clock,         color: 'text-muted-foreground bg-muted/50 border-border' },
};

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5">
      {[...Array(10)].map((_, i) => (
        <Star key={i} className={cn('w-2.5 h-2.5', i < n ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30')} />
      ))}
    </span>
  );
}

function BookCard({ book }: { book: Book }) {
  const [showReview, setShowReview] = useState(false);
  const cfg = STATUS_CFG[book.status];
  const Icon = cfg.icon;
  return (
    <Card className="group overflow-hidden hover:border-primary/40 transition-all duration-300">
      {/* Cover */}
      <div className="relative h-32 flex items-end p-3" style={{ background: book.cover }}>
        {book.favorite && <Star className="absolute top-2 right-2 w-4 h-4 fill-yellow-400 text-yellow-400" />}
        <div>
          <p className="text-white font-bold text-sm leading-tight line-clamp-2">{book.title}</p>
          <p className="text-white/70 text-xs">{book.author}</p>
        </div>
      </div>
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-2">
          <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1', cfg.color)}>
            <Icon className="w-2.5 h-2.5" />{cfg.label}
          </span>
          {book.rating && <Stars n={book.rating} />}
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {book.genre.slice(0, 2).map(g => <Badge key={g} variant="secondary" className="text-[10px] px-1.5 py-0">{g}</Badge>)}
        </div>
        {book.pages && (
          <p className="text-[10px] text-muted-foreground">{book.pages} pages{book.year ? ` · ${book.year}` : ''}</p>
        )}
        {book.review && (
          <button onClick={() => setShowReview(!showReview)} className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground hover:text-primary transition-colors">
            <Quote className="w-3 h-3" />Review
          </button>
        )}
        {showReview && book.review && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="text-[11px] text-muted-foreground italic mt-1.5 border-l-2 border-primary/40 pl-2"
          >
            {book.review}
          </motion.p>
        )}
      </CardContent>
    </Card>
  );
}

export default function ShelfPage() {
  const [filter, setFilter] = useState<ReadStatus | 'all'>('all');
  const filtered = filter === 'all' ? BOOKS : BOOKS.filter(b => b.status === filter);
  const readCount = BOOKS.filter(b => b.status === 'read').length;
  const pages = BOOKS.filter(b => b.status === 'read' && b.pages).reduce((a, b) => a + (b.pages ?? 0), 0);

  return (
    <div className="space-y-8 pb-10">
      <ScrollReveal variants={fadeUp}>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold font-display gradient-text flex items-center gap-2.5 flex-wrap">
            <BookOpen className="w-6 h-6 shrink-0" /> Bookshelf
          </h1>
          <p className="text-muted-foreground mt-1">Books I've read, am reading, and want to read</p>
        </div>
      </ScrollReveal>

      {/* Stats */}
      <StaggerList className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Books Read',    value: readCount,                icon: CheckCircle2 },
          { label: 'Pages Read',    value: pages.toLocaleString(),   icon: BookOpen },
          { label: 'Currently',     value: BOOKS.filter(b=>b.status==='reading').length, icon: Clock },
          { label: 'Want to Read',  value: BOOKS.filter(b=>b.status==='want').length,    icon: Bookmark },
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
          {(['all', 'reading', 'read', 'want', 'dropped'] as const).map(f => (
            <Button key={f} variant={filter === f ? 'default' : 'outline'} size="sm" className="h-8 text-xs capitalize"
              onClick={() => setFilter(f)}>
              {f === 'all' ? 'All' : STATUS_CFG[f as ReadStatus]?.label ?? f}
              <span className="ml-1.5 opacity-60">{f === 'all' ? BOOKS.length : BOOKS.filter(b => b.status === f).length}</span>
            </Button>
          ))}
        </div>
      </ScrollReveal>

      <StaggerList className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(book => (
          <motion.div key={book.id} variants={scaleIn}>
            <BookCard book={book} />
          </motion.div>
        ))}
      </StaggerList>
    </div>
  );
}
