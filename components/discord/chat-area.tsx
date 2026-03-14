"use client"

import { useLanyard, getAvatarUrl } from "@/hooks/use-lanyard"
import { Hash, Bell, Pin, Users, Search, Inbox, HelpCircle, PlusCircle, Gift, Sticker, Smile, Volume2, Music, Gamepad2, Code, User, Sparkles, ExternalLink, Github, Twitter, Mail } from "lucide-react"
import { SpotifyCard } from "./spotify-card"
import { ActivityCard } from "./activity-card"
import type { Channel } from "./discord-layout"

interface ChatAreaProps {
  channels: Channel[]
  activeChannel: string
}

// Channel content configurations
const channelContent: Record<string, { 
  description: string
  icon: React.ReactNode
  messages: Array<{ id: string; content: React.ReactNode; timestamp: string }>
}> = {
  welcome: {
    description: "Start here! Read the rules and introductions.",
    icon: <Sparkles className="h-10 w-10 text-white" />,
    messages: [
      { id: "1", content: "Hey there! Welcome to my personal Discord-style website.", timestamp: "Today at 12:00 PM" },
      { id: "2", content: "Feel free to explore the different channels to learn more about me!", timestamp: "Today at 12:01 PM" },
      { id: "3", content: "Use the channel sidebar on the left to navigate between sections.", timestamp: "Today at 12:02 PM" },
    ]
  },
  about: {
    description: "Learn more about me and what I do.",
    icon: <User className="h-10 w-10 text-white" />,
    messages: [
      { id: "1", content: "Hi, I'm Thien!", timestamp: "Today at 12:00 PM" },
      { id: "2", content: "I'm a developer who loves building cool stuff on the web.", timestamp: "Today at 12:01 PM" },
      { id: "3", content: "I enjoy working with modern technologies like React, Next.js, and TypeScript.", timestamp: "Today at 12:02 PM" },
      { id: "4", content: "When I'm not coding, you'll probably find me gaming or listening to music (check my Spotify status!).", timestamp: "Today at 12:03 PM" },
    ]
  },
  general: {
    description: "General chat and updates.",
    icon: <Hash className="h-10 w-10 text-white" />,
    messages: [
      { id: "1", content: "This is the general channel where I post updates and thoughts.", timestamp: "Today at 12:00 PM" },
      { id: "2", content: "Check out my live Discord status on the right sidebar - it shows what I'm currently up to!", timestamp: "Today at 12:01 PM" },
      { id: "3", content: "My Spotify activity is also displayed when I'm listening to music.", timestamp: "Today at 12:02 PM" },
    ]
  },
  projects: {
    description: "Check out my projects and work.",
    icon: <Code className="h-10 w-10 text-white" />,
    messages: [
      { id: "1", content: "Here are some of my projects:", timestamp: "Today at 12:00 PM" },
      { 
        id: "2", 
        content: (
          <div className="mt-2 rounded-lg border border-[var(--discord-lighter)] bg-[var(--discord-dark)] p-4">
            <h3 className="font-semibold text-[var(--discord-text)]">thien.gg</h3>
            <p className="text-sm text-[var(--discord-text-muted)]">This Discord-style personal website you&apos;re viewing right now!</p>
            <div className="mt-2 flex gap-2">
              <span className="rounded bg-[var(--discord-blurple)] px-2 py-0.5 text-xs text-white">Next.js</span>
              <span className="rounded bg-[var(--discord-blurple)] px-2 py-0.5 text-xs text-white">TypeScript</span>
              <span className="rounded bg-[var(--discord-blurple)] px-2 py-0.5 text-xs text-white">Tailwind</span>
            </div>
          </div>
        ),
        timestamp: "Today at 12:01 PM" 
      },
      { 
        id: "3", 
        content: (
          <div className="mt-2 rounded-lg border border-[var(--discord-lighter)] bg-[var(--discord-dark)] p-4">
            <h3 className="font-semibold text-[var(--discord-text)]">Tomo</h3>
            <p className="text-sm text-[var(--discord-text-muted)]">Check it out at /tomo</p>
            <a href="/tomo" className="mt-2 inline-flex items-center gap-1 text-sm text-[var(--discord-blurple)] hover:underline">
              Visit Tomo <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        ),
        timestamp: "Today at 12:02 PM" 
      },
    ]
  },
}

export function ChatArea({ channels, activeChannel }: ChatAreaProps) {
  const { data } = useLanyard()
  const currentChannel = channels.find(c => c.id === activeChannel)
  const isVoiceChannel = currentChannel?.type === "voice"
  const content = channelContent[activeChannel]

  // Voice channel content
  if (isVoiceChannel) {
    return (
      <div className="flex flex-1 flex-col bg-[var(--discord-light)]">
        {/* Channel Header */}
        <ChannelHeader channelName={currentChannel?.name || ""} isVoice description={activeChannel === "music" ? "Share your favorite tunes" : "Game time!"} />
        
        {/* Voice Channel Content */}
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--discord-blurple)]">
            {activeChannel === "music" ? (
              <Music className="h-10 w-10 text-white" />
            ) : (
              <Gamepad2 className="h-10 w-10 text-white" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-[var(--discord-text)]">
            {activeChannel === "music" ? "Music Channel" : "Gaming Channel"}
          </h2>
          <p className="text-center text-[var(--discord-text-muted)]">
            {activeChannel === "music" 
              ? "This is where I hang out and listen to music. Check my Spotify status to see what I'm listening to!" 
              : "This is my gaming channel. Check my activity status to see what I'm playing!"}
          </p>
          
          {/* Show Spotify if in music channel */}
          {activeChannel === "music" && data?.listening_to_spotify && data.spotify && (
            <div className="mt-4 w-full max-w-md">
              <p className="mb-2 text-sm font-medium text-[var(--discord-text)]">Currently Playing:</p>
              <SpotifyCard spotify={data.spotify} />
            </div>
          )}
          
          {/* Show game activity if in gaming channel */}
          {activeChannel === "gaming" && data?.activities && data.activities.filter(a => a.type === 0).length > 0 && (
            <div className="mt-4 w-full max-w-md">
              <p className="mb-2 text-sm font-medium text-[var(--discord-text)]">Currently Playing:</p>
              {data.activities
                .filter(a => a.type === 0)
                .slice(0, 1)
                .map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col bg-[var(--discord-light)]">
      {/* Channel Header */}
      <ChannelHeader channelName={currentChannel?.name || ""} description={content?.description || ""} />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Welcome Message */}
        <div className="mb-8 rounded-lg">
          <div className="mb-2 flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[var(--discord-blurple)]">
            {content?.icon || <Hash className="h-10 w-10 text-white" />}
          </div>
          <h1 className="text-3xl font-bold text-[var(--discord-text)]">Welcome to #{currentChannel?.name}</h1>
          <p className="text-[var(--discord-text-muted)]">{content?.description || `This is the start of the #${currentChannel?.name} channel.`}</p>
        </div>

        {/* Messages */}
        <div className="space-y-4">
          {content?.messages.map((message) => (
            <div key={message.id} className="group flex gap-4 rounded px-2 py-0.5 hover:bg-[var(--discord-lighter)]/30">
              <img
                src={data ? getAvatarUrl(data.discord_user.id, data.discord_user.avatar) : "https://cdn.discordapp.com/embed/avatars/0.png"}
                alt="thien"
                className="h-10 w-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-medium text-[var(--discord-text)]">thien</span>
                  <span className="text-xs text-[var(--discord-text-muted)]">{message.timestamp}</span>
                </div>
                <div className="text-[var(--discord-text)]">{message.content}</div>
              </div>
            </div>
          ))}

          {/* Show Spotify in general channel */}
          {activeChannel === "general" && data?.listening_to_spotify && data.spotify && (
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

          {/* Show Activity in general channel */}
          {activeChannel === "general" && data?.activities && data.activities.filter(a => a.type !== 2 && a.type !== 4).length > 0 && (
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
            placeholder={`Message #${currentChannel?.name}`}
            className="flex-1 bg-transparent text-[var(--discord-text)] placeholder-[var(--discord-text-muted)] outline-none"
            disabled
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

function ChannelHeader({ channelName, description, isVoice = false }: { channelName: string; description: string; isVoice?: boolean }) {
  const Icon = isVoice ? Volume2 : Hash
  
  return (
    <div className="flex h-12 items-center justify-between border-b border-[var(--discord-dark)] px-4 shadow-sm">
      <div className="flex items-center gap-2">
        <Icon className="h-6 w-6 text-[var(--discord-channel-text)]" />
        <span className="font-semibold text-[var(--discord-text)]">{channelName}</span>
        <div className="mx-2 h-6 w-px bg-[var(--discord-lighter)]" />
        <span className="text-sm text-[var(--discord-text-muted)]">{description}</span>
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
  )
}
