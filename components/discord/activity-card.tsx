"use client"

import type { LanyardActivity } from "@/hooks/use-lanyard"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface ActivityCardProps {
  activity: LanyardActivity
  compact?: boolean
}

function formatElapsed(startTimestamp: number) {
  const elapsed = Date.now() - startTimestamp
  const hours = Math.floor(elapsed / 3600000)
  const minutes = Math.floor((elapsed % 3600000) / 60000)
  const seconds = Math.floor((elapsed % 60000) / 1000)
  
  if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} elapsed`
  }
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} elapsed`
}

function getActivityImage(activity: LanyardActivity) {
  if (activity.assets?.large_image) {
    if (activity.assets.large_image.startsWith("mp:external/")) {
      const url = activity.assets.large_image.replace("mp:external/", "")
      return `https://media.discordapp.net/external/${url}`
    }
    if (activity.application_id) {
      return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`
    }
  }
  return null
}

function getSmallImage(activity: LanyardActivity) {
  if (activity.assets?.small_image) {
    if (activity.assets.small_image.startsWith("mp:external/")) {
      const url = activity.assets.small_image.replace("mp:external/", "")
      return `https://media.discordapp.net/external/${url}`
    }
    if (activity.application_id) {
      return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.small_image}.png`
    }
  }
  return null
}

export function ActivityCard({ activity, compact = false }: ActivityCardProps) {
  const [elapsed, setElapsed] = useState("")
  const largeImage = getActivityImage(activity)
  const smallImage = getSmallImage(activity)

  useEffect(() => {
    if (activity.timestamps?.start) {
      setElapsed(formatElapsed(activity.timestamps.start))
      const interval = setInterval(() => {
        setElapsed(formatElapsed(activity.timestamps!.start!))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [activity.timestamps?.start])

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        {largeImage ? (
          <div className="relative">
            <img src={largeImage} alt={activity.name} className="h-12 w-12 rounded" />
            {smallImage && (
              <img
                src={smallImage}
                alt=""
                className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-[var(--discord-darker)]"
              />
            )}
          </div>
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded bg-[var(--discord-lighter)]">
            <span className="text-lg">🎮</span>
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-[var(--discord-text)]">
            {activity.name}
          </p>
          {activity.details && (
            <p className="truncate text-xs text-[var(--discord-text-muted)]">
              {activity.details}
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md overflow-hidden rounded-lg border-l-4 border-[var(--discord-blurple)] bg-[var(--discord-dark)]">
      <div className="flex gap-4 p-3">
        {largeImage ? (
          <div className="relative">
            <img src={largeImage} alt={activity.name} className="h-20 w-20 rounded" />
            {smallImage && (
              <img
                src={smallImage}
                alt=""
                className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-[3px] border-[var(--discord-dark)]"
              />
            )}
          </div>
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded bg-[var(--discord-lighter)]">
            <span className="text-3xl">🎮</span>
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <p className="mb-0.5 text-xs font-semibold uppercase text-[var(--discord-text-muted)]">
            Playing
          </p>
          <p className="truncate font-semibold text-[var(--discord-text)]">
            {activity.name}
          </p>
          {activity.details && (
            <p className="truncate text-sm text-[var(--discord-text-muted)]">
              {activity.details}
            </p>
          )}
          {activity.state && (
            <p className="truncate text-sm text-[var(--discord-text-muted)]">
              {activity.state}
            </p>
          )}
          {elapsed && (
            <p className="truncate text-sm text-[var(--discord-text-muted)]">
              {elapsed}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
