"use client"

import { useLanyard, getStatusColor, getStatusText, getAvatarUrl } from "@/hooks/use-lanyard"
import { cn } from "@/lib/utils"
import { SpotifyCard } from "./spotify-card"
import { ActivityCard } from "./activity-card"
import { X } from "lucide-react"
import { useEffect, useRef } from "react"

interface ProfilePopupProps {
  isOpen: boolean
  onClose: () => void
}

export function ProfilePopup({ isOpen, onClose }: ProfilePopupProps) {
  const { data, isLoading } = useLanyard()
  const popupRef = useRef<HTMLDivElement>(null)

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Close on escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  if (isLoading) {
    return (
      <div 
        ref={popupRef}
        className="absolute bottom-14 left-2 z-50 w-[300px] animate-in fade-in slide-in-from-bottom-2 duration-200"
      >
        <div className="overflow-hidden rounded-lg bg-[var(--discord-darker)] shadow-xl">
          <div className="h-[60px] animate-pulse bg-[var(--discord-lighter)]" />
          <div className="p-4">
            <div className="h-16 w-16 animate-pulse rounded-full bg-[var(--discord-lighter)]" />
            <div className="mt-4 h-4 w-32 animate-pulse rounded bg-[var(--discord-lighter)]" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={popupRef}
      className="absolute bottom-14 left-2 z-50 w-[300px] animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      <div className="overflow-hidden rounded-lg bg-[var(--discord-darker)] shadow-xl">
        {/* Banner */}
        <div className="h-[60px] bg-gradient-to-r from-[#5865f2] to-[#eb459e]" />
        
        {/* Avatar Section */}
        <div className="relative px-4">
          <div className="absolute -top-8">
            <div className="relative">
              <img
                src={data ? getAvatarUrl(data.discord_user.id, data.discord_user.avatar) : ""}
                alt="Avatar"
                className="h-[80px] w-[80px] rounded-full border-[6px] border-[var(--discord-darker)]"
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
        <div className="max-h-[60vh] overflow-y-auto px-4 pb-4 pt-8">
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
