"use client"

import { cn } from "@/lib/utils"
import { useLanyard, getStatusColor, getAvatarUrl } from "@/hooks/use-lanyard"
import { Hash, Volume2, ChevronDown, Settings, Mic, Headphones } from "lucide-react"

const channels = [
  { id: "welcome", name: "welcome", type: "text", category: "INFO" },
  { id: "about", name: "about-me", type: "text", category: "INFO" },
  { id: "general", name: "general", type: "text", category: "CHAT", active: true },
  { id: "projects", name: "projects", type: "text", category: "CHAT" },
  { id: "music", name: "music", type: "voice", category: "VOICE" },
  { id: "gaming", name: "gaming", type: "voice", category: "VOICE" },
]

const categories = ["INFO", "CHAT", "VOICE"]

export function ChannelSidebar() {
  const { data, isLoading } = useLanyard()

  return (
    <div className="flex h-full w-60 flex-col bg-[var(--discord-dark)]">
      {/* Server Header */}
      <button className="flex h-12 items-center justify-between border-b border-[#1f2023] px-4 shadow-sm transition-colors hover:bg-[var(--discord-lighter)]">
        <span className="font-semibold text-[var(--discord-text)]">thien.gg</span>
        <ChevronDown className="h-4 w-4 text-[var(--discord-text)]" />
      </button>

      {/* Channel List */}
      <div className="flex-1 overflow-y-auto px-2 py-4">
        {categories.map((category) => (
          <div key={category} className="mb-4">
            <button className="mb-1 flex w-full items-center gap-1 px-1 text-xs font-semibold uppercase tracking-wide text-[var(--discord-channel-text)] hover:text-[var(--discord-text)]">
              <ChevronDown className="h-3 w-3" />
              {category}
            </button>
            {channels
              .filter((c) => c.category === category)
              .map((channel) => (
                <ChannelItem key={channel.id} channel={channel} />
              ))}
          </div>
        ))}
      </div>

      {/* User Area */}
      <div className="flex h-[52px] items-center gap-2 bg-[var(--discord-darker)] px-2">
        <div className="relative">
          {isLoading ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-[var(--discord-lighter)]" />
          ) : (
            <>
              <img
                src={data ? getAvatarUrl(data.discord_user.id, data.discord_user.avatar) : ""}
                alt="Avatar"
                className="h-8 w-8 rounded-full"
              />
              <div
                className={cn(
                  "absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-[3px] border-[var(--discord-darker)]",
                  getStatusColor(data?.discord_status || "offline")
                )}
              />
            </>
          )}
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="truncate text-sm font-medium text-[var(--discord-text)]">
            {data?.discord_user?.global_name || data?.discord_user?.username || "Loading..."}
          </p>
          <p className="truncate text-xs text-[var(--discord-text-muted)]">
            {data?.discord_user?.username || ""}
          </p>
        </div>
        <div className="flex gap-1">
          <button className="rounded p-1 text-[var(--discord-channel-text)] hover:bg-[var(--discord-lighter)] hover:text-[var(--discord-text)]">
            <Mic className="h-5 w-5" />
          </button>
          <button className="rounded p-1 text-[var(--discord-channel-text)] hover:bg-[var(--discord-lighter)] hover:text-[var(--discord-text)]">
            <Headphones className="h-5 w-5" />
          </button>
          <button className="rounded p-1 text-[var(--discord-channel-text)] hover:bg-[var(--discord-lighter)] hover:text-[var(--discord-text)]">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

function ChannelItem({ channel }: { channel: typeof channels[0] }) {
  const Icon = channel.type === "voice" ? Volume2 : Hash

  return (
    <button
      className={cn(
        "group flex w-full items-center gap-1.5 rounded px-2 py-1.5 text-[var(--discord-channel-text)] transition-colors hover:bg-[var(--discord-lighter)] hover:text-[var(--discord-text)]",
        channel.active && "bg-[var(--discord-lighter)] text-[var(--discord-text)]"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="truncate text-sm">{channel.name}</span>
    </button>
  )
}
