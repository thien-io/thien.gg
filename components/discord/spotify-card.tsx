"use client"

import type { SpotifyData } from "@/hooks/use-lanyard"
import { cn } from "@/lib/utils"

interface SpotifyCardProps {
  spotify: SpotifyData
  compact?: boolean
}

export function SpotifyCard({ spotify, compact = false }: SpotifyCardProps) {
  const progress = Math.min(
    ((Date.now() - spotify.timestamps.start) / (spotify.timestamps.end - spotify.timestamps.start)) * 100,
    100
  )

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <img
          src={spotify.album_art_url}
          alt={spotify.album}
          className="h-12 w-12 rounded"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-[var(--discord-text)]">
            {spotify.song}
          </p>
          <p className="truncate text-xs text-[var(--discord-text-muted)]">
            by {spotify.artist}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md overflow-hidden rounded-lg border-l-4 border-[#1DB954] bg-[var(--discord-dark)]">
      <div className="flex gap-4 p-3">
        <img
          src={spotify.album_art_url}
          alt={spotify.album}
          className="h-20 w-20 rounded"
        />
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <p className="mb-0.5 text-xs font-semibold uppercase text-[#1DB954]">
            Listening to Spotify
          </p>
          <a
            href={`https://open.spotify.com/track/${spotify.track_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate font-semibold text-[var(--discord-text)] hover:underline"
          >
            {spotify.song}
          </a>
          <p className="truncate text-sm text-[var(--discord-text-muted)]">
            by {spotify.artist}
          </p>
          <p className="truncate text-sm text-[var(--discord-text-muted)]">
            on {spotify.album}
          </p>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="px-3 pb-3">
        <div className="h-1 overflow-hidden rounded-full bg-[var(--discord-lighter)]">
          <div
            className="h-full bg-white transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
