import { Hero } from "@/components/hero";
import { ScrollReveal } from "@/components/scroll-reveal";
import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
    });

  return (
    <div>
      <Hero />

      <div className="content-wrap">
      <div className="h-px bg-border/50 mx-8 md:mx-16" />

      {/* About */}
      <section className="px-8 md:px-16 py-16 md:py-32">
        <div className="max-w-xl">
          <ScrollReveal>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-8">
              About
            </p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 className="font-display text-4xl md:text-5xl font-light leading-tight mb-8 text-foreground">
              Builder, reader,<br />
              <em className="text-primary">perpetual learner.</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <div className="space-y-4 text-muted-foreground leading-relaxed max-w-md">
              <p>
                I build things for the web and spend my off hours reading,
                watching films, and playing games. This site is a window into
                what I&apos;m into right now.
              </p>
              <p>
                Explore the blog for things I&apos;ve been thinking about, check
                out the games if you want to waste a few minutes, or browse the
                library for what I&apos;ve been reading.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={240}>
            <div className="flex gap-4 mt-8">
              <Link href="/about"
                className="font-mono text-[11px] uppercase tracking-wider text-primary hover:opacity-70 transition-opacity">
                Full story →
              </Link>
              <Link href="/blog"
                className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors">
                Read the blog →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="h-px bg-border/50 mx-8 md:mx-16" />

      {/* Recent posts */}
      <section className="px-8 md:px-16 py-16 md:py-24">
        <ScrollReveal className="mb-10 flex items-end justify-between max-w-xl">
          <div>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-3">
              Writing
            </p>
            <h2 className="font-display text-3xl font-light text-foreground">
              From the blog
            </h2>
          </div>
          <Link href="/blog"
            className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors mb-1">
            All posts →
          </Link>
        </ScrollReveal>

        <div className="max-w-xl space-y-px">
          {recentPosts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 80}>
              <Link href={`/blog/${post.slug}`}
                className="block group py-5 border-b border-border/40 hover:bg-primary/10 -mx-3 px-3 rounded-xl transition-colors">
                <div className="flex items-start justify-between gap-4 mb-1.5">
                  <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <span className="font-mono text-[10px] text-muted-foreground/60 shrink-0 tabular-nums pt-0.5">
                    {formatDate(post.date)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{post.summary}</p>
                <div className="flex gap-1.5 mt-3">
                  {post.tags.map(tag => (
                    <span key={tag}
                      className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/50 bg-muted px-2 py-0.5 rounded-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <div className="h-px bg-border/50 mx-8 md:mx-16" />

      {/* Contact */}
      <section className="px-8 md:px-16 py-16 md:py-24">
        <ScrollReveal>
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-8">Contact</p>
          <h2 className="font-display text-3xl md:text-4xl font-light text-foreground mb-4">
            Get in touch.
          </h2>
          <p className="text-muted-foreground max-w-sm leading-relaxed mb-8">
            Have a question, want to chat, or just want to say hi.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:hello@thien.gg"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/10 transition-all font-mono text-sm text-foreground"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              Send an email
            </a>
            <Link
              href="/guestbook"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/10 transition-all font-mono text-sm text-foreground"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
              Write in guestbook
            </Link>
          </div>
        </ScrollReveal>
      </section>
      </div>
    </div>
  );
}
