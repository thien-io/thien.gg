"use client"

import { cn } from "@/lib/utils"

const servers = [
  { id: "home", name: "Home", icon: null, isHome: true },
  { id: "thien", name: "thien.gg", icon: "T", color: "bg-[#5865f2]" },
]

export function ServerSidebar() {
  return (
    <div className="flex h-full w-[72px] flex-col items-center gap-2 bg-[var(--discord-darker)] py-3">
      {/* Home Button */}
      <ServerIcon server={servers[0]} isActive />
      
      <div className="mx-auto h-[2px] w-8 rounded-full bg-[var(--discord-lighter)]" />
      
      {/* Server List */}
      {servers.slice(1).map((server) => (
        <ServerIcon key={server.id} server={server} />
      ))}
      
      {/* Add Server Button */}
      <button className="group flex h-12 w-12 items-center justify-center rounded-[24px] bg-[var(--discord-light)] text-[#23a559] transition-all duration-200 hover:rounded-[16px] hover:bg-[#23a559] hover:text-white">
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}

function ServerIcon({ server, isActive = false }: { server: typeof servers[0]; isActive?: boolean }) {
  return (
    <div className="group relative flex items-center">
      {/* Active Indicator */}
      <div
        className={cn(
          "absolute -left-[4px] w-1 rounded-r-full bg-white transition-all duration-200",
          isActive ? "h-10" : "h-0 group-hover:h-5"
        )}
      />
      
      <button
        className={cn(
          "flex h-12 w-12 items-center justify-center transition-all duration-200",
          isActive ? "rounded-[16px]" : "rounded-[24px] hover:rounded-[16px]",
          server.isHome
            ? "bg-[var(--discord-blurple)] text-white"
            : server.color || "bg-[var(--discord-light)] text-white hover:bg-[var(--discord-blurple)]"
        )}
      >
        {server.isHome ? (
          <svg className="h-7 w-7" viewBox="0 0 28 20" fill="currentColor">
            <path d="M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0283 1.4184C10.819 0.934541 10.589 0.461744 10.3368 0C8.48074 0.31879 6.67902 0.881142 4.97867 1.67671C0.716133 8.05094 -0.438586 14.2575 0.138584 20.3758C2.19518 21.8954 4.5188 23.0513 6.98728 23.7846C7.52905 23.0508 8.01072 22.2728 8.42599 21.4582C7.64308 21.1707 6.88873 20.8159 6.17049 20.3985C6.36832 20.2529 6.5608 20.1024 6.74777 19.9519C12.0907 22.4432 17.9529 22.4432 23.236 19.9519C23.4247 20.1024 23.6172 20.2529 23.8134 20.3985C23.0918 20.8159 22.337 21.1707 21.5578 21.4582C21.9731 22.2728 22.4547 23.0508 22.9965 23.7846C25.4637 23.0513 27.7859 21.8954 29.8609 20.3758C30.5473 13.1928 28.8473 7.04458 23.0212 1.67671ZM9.68041 16.6947C8.24769 16.6947 7.07692 15.3812 7.07692 13.7805C7.07692 12.1798 8.21929 10.8663 9.68041 10.8663C11.1415 10.8663 12.3123 12.1798 12.2839 13.7805C12.2839 15.3812 11.1398 16.6947 9.68041 16.6947ZM20.3196 16.6947C18.8869 16.6947 17.7161 15.3812 17.7161 13.7805C17.7161 12.1798 18.8585 10.8663 20.3196 10.8663C21.7807 10.8663 22.9515 12.1798 22.9231 13.7805C22.9231 15.3812 21.7807 16.6947 20.3196 16.6947Z" />
          </svg>
        ) : (
          <span className="text-lg font-semibold">{server.icon}</span>
        )}
      </button>
    </div>
  )
}
