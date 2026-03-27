'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLanyard, getAvatarUrl, getActivityImageUrl, STATUS_COLORS, STATUS_LABELS } from '@/lib/lanyard';
import { cn } from '@/lib/utils';
import { Music2, Monitor, Smartphone } from 'lucide-react';

interface DiscordPresenceProps {
  userId: string;
  compact?: boolean;
}

function StatusDot({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn('inline-block rounded-full', className)}
      style={{ backgroundColor: STATUS_COLORS[status] ?? STATUS_COLORS.offline }}
    />
  );
}

export function DiscordPresence({ userId, compact = false }: DiscordPresenceProps) {
  const { data, loading } = useLanyard(userId);
  const [elapsed, setElapsed] = useState('');

  useEffect(() => {
    if (!data?.activities[0]?.timestamps?.start) return;
    const start = data.activities[0].timestamps.start;
    const interval = setInterval(() => {
      const diff = Date.now() - start;
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setElapsed(h > 0 ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}` : `${m}:${String(s).padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(interval);
  }, [data?.activities]);

  if (loading) {
    return (
      <div className="animate-pulse rounded-xl bg-muted h-20 w-full" />
    );
  }

  if (!data) return null;

  const { discord_user, discord_status, activities, listening_to_spotify, spotify } = data;
  const avatarUrl = getAvatarUrl(discord_user.id, discord_user.avatar);
  const displayName = discord_user.global_name || discord_user.display_name || discord_user.username;
  const mainActivity = activities.find(a => a.type === 0);

  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border">
        <div className="relative shrink-0">
          <Image src={avatarUrl} alt={displayName} width={32} height={32} className="rounded-full" unoptimized />
          <StatusDot
            status={discord_status}
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-card"
          />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">{displayName}</p>
          <p className="text-xs text-muted-foreground">{STATUS_LABELS[discord_status]}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      {/* Header strip */}
      <div className="h-16 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600" />

      <div className="px-4 pb-4">
        {/* Avatar */}
        <div className="relative -mt-8 mb-3 w-fit">
          <div className="rounded-full border-4 border-card overflow-hidden">
            <Image src={avatarUrl} alt={displayName} width={72} height={72} className="rounded-full" unoptimized />
          </div>
          <StatusDot
            status={discord_status}
            className="absolute bottom-1 right-1 w-4 h-4 border-2 border-card"
          />
        </div>

        <div className="mb-3">
          <h3 className="font-bold text-lg leading-none">{displayName}</h3>
          <p className="text-sm text-muted-foreground">@{discord_user.username}</p>
        </div>

        {/* Active on */}
        <div className="flex gap-1.5 mb-3">
          {data.active_on_discord_desktop && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
              <Monitor className="w-3 h-3" /> Desktop
            </div>
          )}
          {data.active_on_discord_mobile && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
              <Smartphone className="w-3 h-3" /> Mobile
            </div>
          )}
        </div>

        {/* Spotify */}
        {listening_to_spotify && spotify && (
          <div className="rounded-lg bg-[#1DB954]/10 border border-[#1DB954]/20 p-3 mb-3">
            <div className="flex items-center gap-1.5 text-[#1DB954] text-xs font-semibold mb-2">
              <Music2 className="w-3.5 h-3.5" />
              Listening to Spotify
            </div>
            <div className="flex gap-3">
              {spotify.album_art_url && (
                <Image src={spotify.album_art_url} alt={spotify.album} width={48} height={48} className="rounded shrink-0" unoptimized />
              )}
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{spotify.song}</p>
                <p className="text-xs text-muted-foreground truncate">by {spotify.artist}</p>
                <p className="text-xs text-muted-foreground truncate">{spotify.album}</p>
              </div>
            </div>
          </div>
        )}

        {/* Game activity */}
        {mainActivity && (
          <div className="rounded-lg bg-muted p-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Playing</p>
            <div className="flex gap-3">
              {mainActivity.assets?.large_image && (
                <div className="relative shrink-0">
                  <Image
                    src={getActivityImageUrl(mainActivity, 'large') ?? ''}
                    alt={mainActivity.assets.large_text ?? mainActivity.name}
                    width={48}
                    height={48}
                    className="rounded"
                    unoptimized
                  />
                  {mainActivity.assets?.small_image && (
                    <Image
                      src={getActivityImageUrl(mainActivity, 'small') ?? ''}
                      alt={mainActivity.assets.small_text ?? ''}
                      width={16}
                      height={16}
                      className="absolute -bottom-1 -right-1 rounded-full border border-card"
                      unoptimized
                    />
                  )}
                </div>
              )}
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{mainActivity.name}</p>
                {mainActivity.details && <p className="text-xs text-muted-foreground truncate">{mainActivity.details}</p>}
                {mainActivity.state && <p className="text-xs text-muted-foreground truncate">{mainActivity.state}</p>}
                {elapsed && <p className="text-xs text-muted-foreground">{elapsed} elapsed</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
