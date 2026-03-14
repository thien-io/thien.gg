"use client"

import { useLanyard, getStatusColor, getStatusText, getAvatarUrl } from "@/hooks/use-lanyard"
import { cn } from "@/lib/utils"
import { SpotifyCard } from "./spotify-card"
import { ActivityCard } from "./activity-card"
import { X } from "lucide-react"

interface MemberSidebarProps {
  onClose?: () => void
}

export function MemberSidebar({ onClose }: MemberSidebarProps) {
  const { data, isLoading } = useLanyard()

  if (isLoading) {
    return (
      <div className="flex h-full w-60 flex-col bg-[var(--discord-dark)]">
        {/* Mobile close button */}
        <div className="flex h-12 items-center justify-between border-b border-[var(--discord-darker)] px-4 lg:hidden">
          <span className="font-semibold text-[var(--discord-text)]">Members</span>
          <button onClick={onClose} className="p-1 text-[var(--discord-channel-text)] hover:text-[var(--discord-text)]">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4">
          <div className="h-4 w-20 animate-pulse rounded bg-[var(--discord-lighter)]" />
        </div>
        <div className="px-2">
          <div className="flex items-center gap-3 rounded p-2">
            <div className="h-8 w-8 animate-pulse rounded-full bg-[var(--discord-lighter)]" />
            <div className="h-4 w-24 animate-pulse rounded bg-[var(--discord-lighter)]" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full w-60 flex-col bg-[var(--discord-dark)]">
      {/* Mobile close button */}
      <div className="flex h-12 items-center justify-between border-b border-[var(--discord-darker)] px-4 lg:hidden">
        <span className="font-semibold text-[var(--discord-text)]">Members</span>
        <button onClick={onClose} className="p-1 text-[var(--discord-channel-text)] hover:text-[var(--discord-text)]">
          <X className="h-5 w-5" />
        </button>
      </div>
      {/* Owner Section */}
      <div className="px-4 pt-6">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--discord-channel-text)]">
          Owner - 1
        </h3>
      </div>

      {/* User Profile Card */}
      <div className="px-2">
        <div className="group cursor-pointer rounded p-2 hover:bg-[var(--discord-lighter)]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={data ? getAvatarUrl(data.discord_user.id, data.discord_user.avatar) : ""}
                alt="Avatar"
                className="h-8 w-8 rounded-full"
              />
              <div
                className={cn(
                  "absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-[3px] border-[var(--discord-dark)] group-hover:border-[var(--discord-lighter)]",
                  getStatusColor(data?.discord_status || "offline")
                )}
              />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-[var(--discord-text)]">
                {data?.discord_user?.global_name || data?.discord_user?.username}
              </p>
              {data?.activities?.[0]?.type === 4 && data.activities[0].state && (
                <p className="truncate text-xs text-[var(--discord-text-muted)]">
                  {data.activities[0].state}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* User Profile Popup/Details */}
      <div className="mx-2 mt-4 overflow-hidden rounded-lg bg-[var(--discord-darker)]">
        {/* Banner */}
        <div className="h-15 bg-gradient-to-r from-[#5865f2] to-[#eb459e]" />
        
        {/* Avatar Section */}
        <div className="relative px-4">
          <div className="absolute -top-8">
            <div className="relative">
              <img
                src={data ? getAvatarUrl(data.discord_user.id, data.discord_user.avatar) : ""}
                alt="Avatar"
                className="h-20 w-20 rounded-full border-[6px] border-[var(--discord-darker)]"
              />
              <div
                className={cn(
                  "absolute bottom-1 right-1 h-6 w-6 rounded-full border-[4px] border-[var(--discord-darker)]",
                  getStatusColor(data?.discord_status || "offline")
                )}
              />
            </div>
          </div>
          
          {/* Badges placeholder */}
          <div className="flex justify-end pt-2">
            <div className="flex gap-1 rounded bg-[var(--discord-dark)] p-1">
              <div className="h-5 w-5 rounded bg-[var(--discord-blurple)]" title="Discord User" />
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="px-4 pb-4 pt-10">
          <h2 className="text-xl font-bold text-[var(--discord-text)]">
            {data?.discord_user?.global_name || data?.discord_user?.username}
          </h2>
          <p className="text-sm text-[var(--discord-text-muted)]">
            {data?.discord_user?.username}
          </p>
          
          {/* Custom Status */}
          {data?.activities?.[0]?.type === 4 && data.activities[0].state && (
            <p className="mt-2 text-sm text-[var(--discord-text)]">
              {data.activities[0].state}
            </p>
          )}

          <div className="my-3 h-px bg-[var(--discord-lighter)]" />

          {/* About Me */}
          <div className="mb-3">
            <h3 className="mb-1 text-xs font-bold uppercase text-[var(--discord-text)]">About Me</h3>
            <p className="text-sm text-[var(--discord-text-muted)]">
              Developer & Creator
            </p>
          </div>

          {/* Status */}
          <div className="mb-3">
            <h3 className="mb-1 text-xs font-bold uppercase text-[var(--discord-text)]">Status</h3>
            <div className="flex items-center gap-2">
              <div className={cn("h-3 w-3 rounded-full", getStatusColor(data?.discord_status || "offline"))} />
              <span className="text-sm text-[var(--discord-text-muted)]">
                {getStatusText(data?.discord_status || "offline")}
              </span>
            </div>
          </div>

          {/* Platform */}
          {(data?.active_on_discord_desktop || data?.active_on_discord_mobile || data?.active_on_discord_web) && (
            <div className="mb-3">
              <h3 className="mb-1 text-xs font-bold uppercase text-[var(--discord-text)]">Active On</h3>
              <div className="flex gap-2 text-sm text-[var(--discord-text-muted)]">
                {data?.active_on_discord_desktop && <span>Desktop</span>}
                {data?.active_on_discord_mobile && <span>Mobile</span>}
                {data?.active_on_discord_web && <span>Web</span>}
              </div>
            </div>
          )}

          {/* Spotify */}
          {data?.listening_to_spotify && data.spotify && (
            <div className="mb-3">
              <h3 className="mb-2 text-xs font-bold uppercase text-[var(--discord-text)]">Listening to Spotify</h3>
              <SpotifyCard spotify={data.spotify} compact />
            </div>
          )}

          {/* Activity */}
          {data?.activities && data.activities.filter(a => a.type !== 2 && a.type !== 4).length > 0 && (
            <div>
              <h3 className="mb-2 text-xs font-bold uppercase text-[var(--discord-text)]">Playing</h3>
              {data.activities
                .filter(a => a.type !== 2 && a.type !== 4)
                .slice(0, 1)
                .map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} compact />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
