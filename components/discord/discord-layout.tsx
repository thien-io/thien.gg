"use client"

import { useState } from "react"
import { ServerSidebar } from "./server-sidebar"
import { ChannelSidebar } from "./channel-sidebar"
import { ChatArea } from "./chat-area"
import { MemberSidebar } from "./member-sidebar"

export type Channel = {
  id: string
  name: string
  type: "text" | "voice"
  category: string
}

export const channels: Channel[] = [
  { id: "welcome", name: "welcome", type: "text", category: "INFO" },
  { id: "about", name: "about-me", type: "text", category: "INFO" },
  { id: "general", name: "general", type: "text", category: "CHAT" },
  { id: "projects", name: "projects", type: "text", category: "CHAT" },
  { id: "music", name: "music", type: "voice", category: "VOICE" },
  { id: "gaming", name: "gaming", type: "voice", category: "VOICE" },
]

export function DiscordLayout() {
  const [activeChannel, setActiveChannel] = useState<string>("welcome")

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[var(--discord-light)]">
      {/* Server List */}
      <ServerSidebar />
      
      {/* Channel List */}
      <ChannelSidebar 
        channels={channels}
        activeChannel={activeChannel}
        onChannelSelect={setActiveChannel}
      />
      
      {/* Main Chat Area */}
      <ChatArea 
        channels={channels}
        activeChannel={activeChannel}
      />
      
      {/* Member List */}
      <MemberSidebar />
    </div>
  )
}
