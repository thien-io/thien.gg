"use client"

import useSWR from "swr"

export interface LanyardActivity {
  id: string
  name: string
  type: number
  state?: string
  details?: string
  timestamps?: {
    start?: number
    end?: number
  }
  assets?: {
    large_image?: string
    large_text?: string
    small_image?: string
    small_text?: string
  }
  application_id?: string
  created_at?: number
}

export interface SpotifyData {
  track_id: string
  timestamps: {
    start: number
    end: number
  }
  album: string
  album_art_url: string
  artist: string
  song: string
}

export interface LanyardData {
  spotify: SpotifyData | null
  listening_to_spotify: boolean
  discord_user: {
    id: string
    username: string
    avatar: string
    discriminator: string
    display_name: string
    global_name?: string
  }
  discord_status: "online" | "idle" | "dnd" | "offline"
  activities: LanyardActivity[]
  active_on_discord_web: boolean
  active_on_discord_desktop: boolean
  active_on_discord_mobile: boolean
}

export interface LanyardResponse {
  success: boolean
  data: LanyardData
}

const DISCORD_USER_ID = "251889136120758294"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useLanyard() {
  const { data, error, isLoading } = useSWR<LanyardResponse>(
    `https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`,
    fetcher,
    {
      refreshInterval: 5000,
      revalidateOnFocus: true,
    }
  )

  return {
    data: data?.data,
    isLoading,
    isError: error || (data && !data.success),
  }
}

export function getStatusColor(status: string) {
  switch (status) {
    case "online":
      return "bg-[#23a559]"
    case "idle":
      return "bg-[#f0b232]"
    case "dnd":
      return "bg-[#f23f43]"
    default:
      return "bg-[#80848e]"
  }
}

export function getStatusText(status: string) {
  switch (status) {
    case "online":
      return "Online"
    case "idle":
      return "Idle"
    case "dnd":
      return "Do Not Disturb"
    default:
      return "Offline"
  }
}

export function getAvatarUrl(userId: string, avatarHash: string | null) {
  if (!avatarHash) {
    return `https://cdn.discordapp.com/embed/avatars/0.png`
  }
  return `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.${avatarHash.startsWith("a_") ? "gif" : "png"}?size=256`
}
