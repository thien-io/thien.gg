"use client"

import { useState } from "react"
import { ServerSidebar } from "./server-sidebar"
import { ChannelSidebar } from "./channel-sidebar"
import { ChatArea } from "./chat-area"
import { MemberSidebar } from "./member-sidebar"
import { Menu, X, Users } from "lucide-react"
import { cn } from "@/lib/utils"

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
  const [showChannelSidebar, setShowChannelSidebar] = useState(false)
  const [showMemberSidebar, setShowMemberSidebar] = useState(false)

  const handleChannelSelect = (channelId: string) => {
    setActiveChannel(channelId)
    setShowChannelSidebar(false) // Close sidebar on mobile after selection
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[var(--discord-light)]">
      {/* Mobile Overlay */}
      {(showChannelSidebar || showMemberSidebar) && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => {
            setShowChannelSidebar(false)
            setShowMemberSidebar(false)
          }}
        />
      )}

      {/* Server List - Hidden on mobile */}
      <div className="hidden md:block">
        <ServerSidebar />
      </div>
      
      {/* Channel List - Slide out on mobile */}
      <div className={cn(
        "fixed left-0 top-0 z-40 h-full transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 md:block",
        showChannelSidebar ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full">
          <div className="md:hidden">
            <ServerSidebar />
          </div>
          <ChannelSidebar 
            channels={channels}
            activeChannel={activeChannel}
            onChannelSelect={handleChannelSelect}
          />
        </div>
      </div>
      
      {/* Main Chat Area */}
      <ChatArea 
        channels={channels}
        activeChannel={activeChannel}
        onMenuClick={() => setShowChannelSidebar(true)}
        onMembersClick={() => setShowMemberSidebar(true)}
      />
      
      {/* Member List - Slide out on mobile */}
      <div className={cn(
        "fixed right-0 top-0 z-40 h-full transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0",
        showMemberSidebar ? "translate-x-0" : "translate-x-full lg:translate-x-0"
      )}>
        <MemberSidebar onClose={() => setShowMemberSidebar(false)} />
      </div>
    </div>
  )
}
