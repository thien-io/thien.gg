import Link from "next/link";
import { Mail } from "lucide-react";
import { LikeButton } from "@/components/like-button";

const pages = [
  { label: "Home",      href: "/" },
  { label: "About",     href: "/about" },
  { label: "Blog",      href: "/blog" },
  { label: "Guestbook", href: "/guestbook" },
];

const life = [
  { label: "Music",  href: "/music" },
  { label: "Movies", href: "/movies" },
];

export function Footer() {
  return (
    <footer className="border-t border-border mt-16 md:mt-24">
      <div className="w-full max-w-5xl mx-auto px-8 md:px-16 py-12 md:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <p className="font-display text-xl font-light text-foreground mb-1">
              <span className="text-primary">thien</span><span className="text-foreground italic">.gg</span>
            </p>
            <p className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-4">
              Personal site
            </p>
            <a href="mailto:hello@thien.gg" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-3 h-3 shrink-0" />
              hello@thien.gg
            </a>
          </div>

          {/* Pages */}
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-4">Pages</p>
            <ul className="space-y-2">
              {pages.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Life */}
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-4">Life</p>
            <ul className="space-y-2">
              {life.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-6 flex items-center justify-between">
          <p className="font-mono text-[10px] text-muted-foreground/50" suppressHydrationWarning>
            © {new Date().getFullYear()} Thien.
          </p>
          <LikeButton />
        </div>
      </div>
    </footer>
  );
}
