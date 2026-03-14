"use client"

import { useLanyard, getStatusColor, getAvatarUrl } from "@/hooks/use-lanyard"
import { cn } from "@/lib/utils"
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
      <div className="px-4 pt-6 lg:pt-4">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--discord-channel-text)]">
          Owner - 1
        </h3>
      </div>

      {/* Member Item */}
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
              {/* Show custom status or activity */}
              {data?.activities?.[0]?.type === 4 && data.activities[0].state ? (
                <p className="truncate text-xs text-[var(--discord-text-muted)]">
                  {data.activities[0].state}
                </p>
              ) : data?.listening_to_spotify ? (
                <p className="truncate text-xs text-[#1DB954]">
                  Listening to Spotify
                </p>
              ) : data?.activities && data.activities.filter(a => a.type !== 2 && a.type !== 4).length > 0 ? (
                <p className="truncate text-xs text-[var(--discord-text-muted)]">
                  Playing {data.activities.filter(a => a.type !== 2 && a.type !== 4)[0].name}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
