'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  User, Gamepad2, BookOpen, Joystick, Menu, X, Swords,
  Github, Twitter, BarChart2, Circle, Keyboard,
  ChevronLeft, ChevronRight, Briefcase, Music2,
  Trophy, Palette, Dumbbell,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ThemePicker } from '@/components/theme-picker';

const NAV_GROUPS = [
  {
    label: 'Profile',
    items: [
      { href: '/',        label: 'Profile',   icon: User },
      { href: '/resume',  label: 'Resume',    icon: Briefcase },
      { href: '/stats',   label: 'Stats',     icon: BarChart2 },
    ],
  },
  {
    label: 'Life',
    items: [
      { href: '/shelf',   label: 'Bookshelf', icon: BookOpen },
      { href: '/music',   label: 'Music',     icon: Music2 },
      { href: '/sports',  label: 'Sports',    icon: Trophy },
      { href: '/fitness', label: 'Fitness',   icon: Dumbbell },
      { href: '/design',  label: 'Design',    icon: Palette },
    ],
  },
  {
    label: 'Games',
    items: [
      { href: '/games',     label: 'Games',     icon: Gamepad2 },
      { href: '/guestbook', label: 'Guestbook', icon: BookOpen },
      { href: '/type',      label: 'Type',      icon: Keyboard },
      { href: '/snake',     label: 'Snake',     icon: Joystick },
      { href: '/pong',      label: 'Pong',      icon: Circle },
    ],
  },
];

const ALL_NAV = NAV_GROUPS.flatMap(g => g.items);

const socialLinks = [
  { href: 'https://github.com',  label: 'GitHub',  icon: Github },
  { href: 'https://twitter.com', label: 'Twitter', icon: Twitter },
];

function NavItem({ href, label, icon: Icon, active, collapsed }: {
  href: string; label: string; icon: React.ElementType; active: boolean; collapsed: boolean;
}) {
  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={href} className={cn(
            'flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200',
            active ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                   : 'text-sidebar-foreground hover:bg-accent hover:text-accent-foreground'
          )}>
            <Icon className="w-5 h-5" />
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    );
  }
  return (
    <Link href={href} className={cn(
      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
      active ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
             : 'text-sidebar-foreground hover:bg-accent hover:text-accent-foreground'
    )}>
      <Icon className="w-4 h-4 shrink-0" />
      <span>{label}</span>
    </Link>
  );
}

function SidebarFooter({ collapsed }: { collapsed: boolean }) {
  return (
    <div className={cn('space-y-1', collapsed && 'flex flex-col items-center space-y-1')}>
      <div className={cn('flex gap-1.5 mb-1', collapsed ? 'flex-col items-center' : 'px-1')}>
        {socialLinks.map((link) => (
          <Tooltip key={link.href}>
            <TooltipTrigger asChild>
              <a href={link.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                <link.icon className="w-4 h-4" />
              </a>
            </TooltipTrigger>
            <TooltipContent side={collapsed ? 'right' : 'top'}>{link.label}</TooltipContent>
          </Tooltip>
        ))}
      </div>
      <div className={cn(collapsed ? 'flex justify-center' : 'px-1')}>
        <ThemePicker collapsed={collapsed} />
      </div>
    </div>
  );
}

// ── Mobile top bar ────────────────────────────────────────────────────────────
export function MobileTopBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="lg:hidden flex items-center gap-3 px-4 h-14 border-b border-border bg-sidebar shrink-0 sticky top-0 z-30">
        <button onClick={() => setOpen(true)}
          className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 flex-1 justify-center">
          <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
            <Swords className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <span className="font-bold text-sm tracking-tight">thien</span>
          <span className="font-bold text-sm tracking-tight text-primary">.gg</span>
        </div>
        <div className="w-9" />
      </div>

      {open && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setOpen(false)} />}

      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:hidden',
        open ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex items-center justify-between px-4 h-14 border-b border-sidebar-border shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shadow">
              <Swords className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-sm">thien</span>
            <span className="font-bold text-sm text-primary">.gg</span>
          </div>
          <button onClick={() => setOpen(false)}
            className="flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-3">
          {NAV_GROUPS.map(group => (
            <div key={group.label} className="mb-4">
              <p className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-widest px-3 mb-1">{group.label}</p>
              <div className="space-y-0.5">
                {group.items.map(item => (
                  <div key={item.href} onClick={() => setOpen(false)}>
                    <NavItem {...item} active={pathname === item.href} collapsed={false} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="px-3 pb-4 shrink-0 border-t border-sidebar-border pt-3">
          <SidebarFooter collapsed={false} />
        </div>
      </aside>
    </>
  );
}

// ── Desktop sidebar ───────────────────────────────────────────────────────────
export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn(
      'hidden lg:flex flex-col sticky top-0 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 shrink-0',
      collapsed ? 'w-[68px]' : 'w-56'
    )}>
      {/* Logo */}
      <div className={cn('flex items-center gap-3 px-4 h-14 border-b border-sidebar-border shrink-0', collapsed && 'justify-center')}>
        <div className="shrink-0 w-7 h-7 rounded-lg bg-primary flex items-center justify-center shadow-lg">
          <Swords className="w-3.5 h-3.5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div>
            <span className="font-bold text-sm tracking-tight">thien</span>
            <span className="font-bold text-sm tracking-tight text-primary">.gg</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className={cn('flex-1 overflow-y-auto px-3 py-3', collapsed && 'flex flex-col items-center')}>
        {collapsed ? (
          <div className="flex flex-col gap-0.5 w-full items-center">
            {ALL_NAV.map(item => (
              <NavItem key={item.href} {...item} active={pathname === item.href} collapsed={true} />
            ))}
          </div>
        ) : (
          NAV_GROUPS.map(group => (
            <div key={group.label} className="mb-4">
              <p className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-widest px-3 mb-1">{group.label}</p>
              <div className="space-y-0.5">
                {group.items.map(item => (
                  <NavItem key={item.href} {...item} active={pathname === item.href} collapsed={false} />
                ))}
              </div>
            </div>
          ))
        )}
      </nav>

      {/* Footer */}
      <div className={cn('px-3 pb-4 shrink-0 border-t border-sidebar-border pt-3', collapsed && 'flex flex-col items-center px-0')}>
        <SidebarFooter collapsed={collapsed} />
        <div className={cn('mt-2', collapsed ? 'flex justify-center' : 'px-1')}>
          <button onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            title={collapsed ? 'Expand' : 'Collapse'}>
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </aside>
  );
}
