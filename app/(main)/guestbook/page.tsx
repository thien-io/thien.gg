'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal, StaggerList, fadeUp, scaleIn } from '@/lib/animations';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Send, Loader2, User, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface GuestEntry {
  id: number;
  name: string;
  message: string;
  avatar_url: string | null;
  created_at: string;
}

function Avatar({ name, url }: { name: string; url: string | null }) {
  const initials = name.slice(0, 2).toUpperCase();
  const colors = [
    'from-violet-500 to-indigo-600',
    'from-pink-500 to-rose-600',
    'from-cyan-500 to-blue-600',
    'from-green-500 to-emerald-600',
    'from-orange-500 to-amber-600',
  ];
  const color = colors[name.charCodeAt(0) % colors.length];

  if (url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={url} alt={name} className="w-10 h-10 rounded-full object-cover shrink-0" />
    );
  }

  return (
    <div
      className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-sm font-bold shrink-0`}
    >
      {initials}
    </div>
  );
}

export default function GuestbookPage() {
  const [entries, setEntries] = useState<GuestEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/guestbook')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setEntries(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong.');
        return;
      }

      setEntries((prev) => [data, ...prev]);
      setName('');
      setMessage('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <ScrollReveal variants={fadeUp}>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold font-display gradient-text flex items-center gap-2.5 flex-wrap">

            Guestbook
          </h1>
          <p className="text-muted-foreground mt-1">
            Leave a message! {entries.length > 0 && <span className="text-foreground font-semibold">{entries.length} messages so far.</span>}
          </p>
        </div>
      </ScrollReveal>

      {/* Form */}
      <ScrollReveal variants={fadeUp} delay={100}>
      <Card className="border-primary/20 bg-card/80">
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Sign the Guestbook
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground block mb-1.5">
                Your name <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="e.g. xXGamer42Xx"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={50}
                required
                disabled={submitting}
                className="max-w-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground block mb-1.5">
                Message <span className="text-destructive">*</span>
              </label>
              <Textarea
                placeholder="Say something nice… or not 😈"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={300}
                rows={3}
                required
                disabled={submitting}
              />
              <p className="text-xs text-muted-foreground mt-1 text-right">{message.length}/300</p>
            </div>

            {error && (
              <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {success && (
              <p className="text-sm text-online bg-online/10 border border-online/20 rounded-lg px-3 py-2">
                ✓ Message posted! Thanks for signing 🎉
              </p>
            )}

            <Button type="submit" disabled={submitting || !name.trim() || !message.trim()} className="gap-2">
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {submitting ? 'Posting...' : 'Post Message'}
            </Button>
          </form>
        </CardContent>
      </Card>
      </ScrollReveal>

      {/* Entries */}
      <ScrollReveal variants={fadeUp} delay={150}>
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          Messages
          {entries.length > 0 && (
            <Badge variant="secondary" className="font-mono">{entries.length}</Badge>
          )}
        </h2>

        {loading && (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        )}

        {!loading && entries.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No messages yet.</p>
            <p className="text-sm mt-1">Be the first to sign the guestbook!</p>
          </div>
        )}

        <div className="space-y-3">
          {entries.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="hover:border-primary/30 transition-colors duration-200">
                <CardContent className="pt-4 pb-4">
                  <div className="flex gap-3">
                    <Avatar name={entry.name} url={entry.avatar_url} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-semibold text-sm">{entry.name}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDistanceToNow(new Date(entry.created_at), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed break-words">
                        {entry.message}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      </ScrollReveal>
    </div>
  );
}
