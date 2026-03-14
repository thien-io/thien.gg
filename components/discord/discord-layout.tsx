"use client"

import { ServerSidebar } from "./server-sidebar"
import { ChannelSidebar } from "./channel-sidebar"
import { ChatArea } from "./chat-area"
import { MemberSidebar } from "./member-sidebar"

export function DiscordLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[var(--discord-light)]">
      {/* Server List */}
      <ServerSidebar />
      
      {/* Channel List */}
      <ChannelSidebar />
      
      {/* Main Chat Area */}
      <ChatArea />
      
      {/* Member List */}
      <MemberSidebar />
    </div>
  )
}
