"use client"

import { useLanyard, getAvatarUrl, getStatusColor, getStatusText } from "@/hooks/use-lanyard"
import { Hash, Bell, Pin, Users, Search, Inbox, HelpCircle, PlusCircle, Gift, Sticker, Smile, Send } from "lucide-react"
import { SpotifyCard } from "./spotify-card"
import { ActivityCard } from "./activity-card"

export function ChatArea() {
  const { data, isLoading } = useLanyard()

  const messages = [
    {
      id: "1",
      author: "thien",
      avatar: data ? getAvatarUrl(data.discord_user.id, data.discord_user.avatar) : "",
      content: "Welcome to my personal space!",
      timestamp: "Today at 12:00 PM",
      isUser: true,
    },
    {
      id: "2",
      author: "thien",
      avatar: data ? getAvatarUrl(data.discord_user.id, data.discord_user.avatar) : "",
      content: "This website is designed to look like Discord. Check out my status on the right sidebar!",
      timestamp: "Today at 12:01 PM",
      isUser: true,
    },
    {
      id: "3",
      author: "thien",
      avatar: data ? getAvatarUrl(data.discord_user.id, data.discord_user.avatar) : "",
      content: "Feel free to explore the channels to learn more about me and my projects.",
      timestamp: "Today at 12:02 PM",
      isUser: true,
    },
  ]

  return (
    <div className="flex flex-1 flex-col bg-[var(--discord-light)]">
      {/* Channel Header */}
      <div className="flex h-12 items-center justify-between border-b border-[var(--discord-dark)] px-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Hash className="h-6 w-6 text-[var(--discord-channel-text)]" />
          <span className="font-semibold text-[var(--discord-text)]">general</span>
          <div className="mx-2 h-6 w-px bg-[var(--discord-lighter)]" />
          <span className="text-sm text-[var(--discord-text-muted)]">Welcome to thien.gg</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-[var(--discord-channel-text)] hover:text-[var(--discord-text)]">
            <Bell className="h-6 w-6" />
          </button>
          <button className="text-[var(--discord-channel-text)] hover:text-[var(--discord-text)]">
            <Pin className="h-6 w-6" />
          </button>
          <button className="text-[var(--discord-channel-text)] hover:text-[var(--discord-text)]">
            <Users className="h-6 w-6" />
          </button>
          <div className="flex h-6 items-center rounded bg-[var(--discord-dark)] px-2">
            <input
              type="text"
              placeholder="Search"
              className="w-32 bg-transparent text-sm text-[var(--discord-text)] placeholder-[var(--discord-text-muted)] outline-none"
            />
            <Search className="h-4 w-4 text-[var(--discord-text-muted)]" />
          </div>
          <button className="text-[var(--discord-channel-text)] hover:text-[var(--discord-text)]">
            <Inbox className="h-6 w-6" />
          </button>
          <button className="text-[var(--discord-channel-text)] hover:text-[var(--discord-text)]">
            <HelpCircle className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Welcome Message */}
        <div className="mb-8 rounded-lg">
          <div className="mb-2 flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[var(--discord-blurple)]">
            <Hash className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[var(--discord-text)]">Welcome to #general</h1>
          <p className="text-[var(--discord-text-muted)]">This is the start of the #general channel.</p>
        </div>

        {/* Messages */}
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="group flex gap-4 rounded px-2 py-0.5 hover:bg-[var(--discord-lighter)]/30">
              <img
                src={message.avatar || "https://cdn.discordapp.com/embed/avatars/0.png"}
                alt={message.author}
                className="h-10 w-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-medium text-[var(--discord-text)]">{message.author}</span>
                  <span className="text-xs text-[var(--discord-text-muted)]">{message.timestamp}</span>
                </div>
                <p className="text-[var(--discord-text)]">{message.content}</p>
              </div>
            </div>
          ))}

          {/* Spotify Embed */}
          {data?.listening_to_spotify && data.spotify && (
            <div className="group flex gap-4 rounded px-2 py-0.5 hover:bg-[var(--discord-lighter)]/30">
              <img
                src={data ? getAvatarUrl(data.discord_user.id, data.discord_user.avatar) : ""}
                alt="thien"
                className="h-10 w-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-medium text-[var(--discord-text)]">thien</span>
                  <span className="text-xs text-[var(--discord-text-muted)]">Now</span>
                </div>
                <p className="mb-2 text-[var(--discord-text)]">Currently listening to:</p>
                <SpotifyCard spotify={data.spotify} />
              </div>
            </div>
          )}

          {/* Activity Embed */}
          {data?.activities && data.activities.filter(a => a.type !== 2).length > 0 && (
            <div className="group flex gap-4 rounded px-2 py-0.5 hover:bg-[var(--discord-lighter)]/30">
              <img
                src={data ? getAvatarUrl(data.discord_user.id, data.discord_user.avatar) : ""}
                alt="thien"
                className="h-10 w-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-medium text-[var(--discord-text)]">thien</span>
                  <span className="text-xs text-[var(--discord-text-muted)]">Now</span>
                </div>
                <p className="mb-2 text-[var(--discord-text)]">Current activity:</p>
                {data.activities
                  .filter(a => a.type !== 2 && a.type !== 4)
                  .slice(0, 1)
                  .map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Message Input */}
      <div className="px-4 pb-6">
        <div className="flex items-center gap-2 rounded-lg bg-[var(--discord-lighter)] px-4 py-2.5">
          <button className="text-[var(--discord-channel-text)] hover:text-[var(--discord-text)]">
            <PlusCircle className="h-6 w-6" />
          </button>
          <input
            type="text"
            placeholder="Message #general"
            className="flex-1 bg-transparent text-[var(--discord-text)] placeholder-[var(--discord-text-muted)] outline-none"
          />
          <div className="flex items-center gap-2">
            <button className="text-[var(--discord-channel-text)] hover:text-[var(--discord-text)]">
              <Gift className="h-6 w-6" />
            </button>
            <button className="text-[var(--discord-channel-text)] hover:text-[var(--discord-text)]">
              <Sticker className="h-6 w-6" />
            </button>
            <button className="text-[var(--discord-channel-text)] hover:text-[var(--discord-text)]">
              <Smile className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
