"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden">
      <div className="w-full max-w-[64rem] mx-auto px-8 md:px-16">
        <div className="relative z-10 pointer-events-none select-none">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-10 hero-item"
             style={{ animationDelay: "0ms" }}>
            thien.gg
          </p>
          <h1 className="font-display font-light leading-[0.9] mb-10">
            <span className="block text-[clamp(2.8rem,7vw,7rem)] text-foreground hero-item"
                  style={{ animationDelay: "130ms" }}>Hey, I&apos;m</span>
            <span className="block text-[clamp(2.8rem,7vw,7rem)] italic text-primary hero-item"
                  style={{ animationDelay: "260ms" }}>Thien.</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-sm md:max-w-md mb-12 hero-item"
             style={{ animationDelay: "400ms" }}>
            Welcome. This is where I share what I&apos;m playing, reading, watching,
            and thinking about.
          </p>
          <div className="flex items-center gap-5 hero-item pointer-events-auto select-auto"
               style={{ animationDelay: "540ms" }}>
            <Link href="/about"
              className="px-6 py-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
              About me
            </Link>
            <Link href="/guestbook"
              className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-border">
              Sign the guestbook →
            </Link>
          </div>
        </div>
      </div>

      <style suppressHydrationWarning>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-item {
          opacity: 0;
          animation: heroFadeUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
}
