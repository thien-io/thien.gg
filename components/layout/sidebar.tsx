'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  User,
  Gamepad2,
  BookOpen,
  Joystick,
  Moon,
  Sun,
  Menu,
  X,
  Swords,
  ExternalLink,
  Github,
  Twitter,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

const navItems = [
  { href: '/', label: 'Profile', icon: User },
  { href: '/games', label: 'Games', icon: Gamepad2 },
  { href: '/guestbook', label: 'Guestbook', icon: BookOpen },
  { href: '/snake', label: 'Snake', icon: Joystick },
];

const socialLinks = [
  { href: 'https://github.com', label: 'GitHub', icon: Github },
  { href: 'https://twitter.com', label: 'Twitter', icon: Twitter },
];

function NavItem({
  href,
  label,
  icon: Icon,
  active,
  collapsed,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
  collapsed: boolean;
}) {
  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className={cn(
              'flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200',
              active
                ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                : 'text-sidebar-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            <Icon className="w-5 h-5" />
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
        active
          ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
          : 'text-sidebar-foreground hover:bg-accent hover:text-accent-foreground'
      )}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <span>{label}</span>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <div className={cn('flex flex-col h-full', collapsed ? 'items-center' : '')}>
      {/* Logo */}
      <div className={cn('flex items-center gap-3 mb-6', collapsed ? 'justify-center' : 'px-1')}>
        <div className="relative shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <Swords className="w-4 h-4 text-white" />
          </div>
        </div>
        {!collapsed && (
          <div>
            <span className="font-bold text-base tracking-tight">thien</span>
            <span className="font-bold text-base tracking-tight text-primary">.gg</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className={cn('flex flex-col gap-1 flex-1', collapsed ? 'items-center w-full' : '')}>
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            active={pathname === item.href}
            collapsed={collapsed}
          />
        ))}
      </nav>

      <Separator className="my-4" />

      {/* Social links */}
      <div className={cn('flex gap-2 mb-4', collapsed ? 'flex-col items-center' : 'px-1')}>
        {socialLinks.map((link) => (
          <Tooltip key={link.href}>
            <TooltipTrigger asChild>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <link.icon className="w-4 h-4" />
              </a>
            </TooltipTrigger>
            <TooltipContent side={collapsed ? 'right' : 'top'}>{link.label}</TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* Theme toggle + collapse */}
      <div className={cn('flex gap-2', collapsed ? 'flex-col items-center' : 'px-1')}>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Sun className="w-4 h-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute w-4 h-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>

        {/* Collapse toggle - desktop only */}
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 hidden lg:flex"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <TooltipProvider>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile hamburger */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border p-4 transition-transform duration-300 lg:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <ScrollArea className="h-full">{sidebarContent}</ScrollArea>
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col sticky top-0 h-screen bg-sidebar border-r border-sidebar-border p-4 transition-all duration-300',
          collapsed ? 'w-[72px]' : 'w-60'
        )}
      >
        {sidebarContent}
      </aside>
    </TooltipProvider>
  );
}
