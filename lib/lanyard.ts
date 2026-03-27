'use client';

import { useState, useEffect } from 'react';

export interface LanyardActivity {
  id: string;
  name: string;
  type: number;
  state?: string;
  details?: string;
  timestamps?: { start?: number; end?: number };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
  application_id?: string;
}

export interface SpotifyData {
  track_id: string;
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
  timestamps: { start: number; end: number };
}

export interface LanyardData {
  discord_user: {
    id: string;
    username: string;
    discriminator: string;
    avatar: string | null;
    display_name?: string;
    global_name?: string;
  };
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  activities: LanyardActivity[];
  listening_to_spotify: boolean;
  spotify: SpotifyData | null;
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
}

export function useLanyard(userId: string) {
  const [data, setData] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const ws = new WebSocket('wss://api.lanyard.rest/socket');
    let heartbeatInterval: ReturnType<typeof setInterval>;

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.op === 1) {
        // Hello — send init and start heartbeat
        ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: userId } }));
        heartbeatInterval = setInterval(() => {
          ws.send(JSON.stringify({ op: 3 }));
        }, msg.d.heartbeat_interval);
      }

      if (msg.op === 0) {
        setData(msg.d);
        setLoading(false);
      }
    };

    ws.onerror = () => {
      setError('Failed to connect to Lanyard');
      setLoading(false);
      // Fallback: REST API
      fetch(`https://api.lanyard.rest/v1/users/${userId}`)
        .then((r) => r.json())
        .then((d) => { if (d.data) setData(d.data); })
        .catch(() => {});
    };

    return () => {
      clearInterval(heartbeatInterval);
      ws.close();
    };
  }, [userId]);

  return { data, loading, error };
}

export function getAvatarUrl(userId: string, avatar: string | null) {
  if (!avatar) return `https://cdn.discordapp.com/embed/avatars/${parseInt(userId) % 5}.png`;
  return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.${avatar.startsWith('a_') ? 'gif' : 'webp'}?size=256`;
}

export function getActivityImageUrl(activity: LanyardActivity, type: 'large' | 'small') {
  const image = type === 'large' ? activity.assets?.large_image : activity.assets?.small_image;
  if (!image) return null;
  if (image.startsWith('mp:external/')) {
    return `https://media.discordapp.net/external/${image.replace('mp:external/', '')}`;
  }
  if (activity.application_id) {
    return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${image}.webp`;
  }
  return null;
}

export const STATUS_COLORS: Record<string, string> = {
  online: '#23a55a',
  idle: '#f0b232',
  dnd: '#f23f42',
  offline: '#80848e',
};

export const STATUS_LABELS: Record<string, string> = {
  online: 'Online',
  idle: 'Idle',
  dnd: 'Do Not Disturb',
  offline: 'Offline',
};
