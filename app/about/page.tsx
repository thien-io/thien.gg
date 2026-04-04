import { ScrollTimeline } from "@/components/scroll-timeline";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ParallaxSection } from "@/components/parallax-section";

export default function AboutPage() {
  return (
    <div>
      <section className="relative px-8 md:px-16 pt-28 pb-14 md:pt-32 md:pb-36 overflow-hidden">
        <ParallaxSection
          speed={0.12}
          className="absolute inset-0 flex items-start justify-end pointer-events-none select-none pr-6 md:pr-12 pt-12 overflow-hidden"
        >
          <span className="font-display text-[22vw] font-light leading-none whitespace-nowrap opacity-[0.03]">
            story
          </span>
        </ParallaxSection>

        <div className="relative z-10 max-w-xl">
          <ScrollReveal>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-8">
              About
            </p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h1 className="font-display text-5xl md:text-6xl font-light leading-tight mb-10">
              The story<br />
              <em className="text-primary">so far.</em>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <div className="space-y-5 text-muted-foreground leading-relaxed max-w-md">
              <p>
                I grew up in Connecticut, studied at UConn, and found my way
                into building things for the web. The through line has always
                been curiosity and a love of learning.
              </p>
              <p>
                These days I spend my time writing code, reading books, watching
                films, and listening to music. This site is where I document
                whatever I&apos;m into at any given moment.
              </p>
              <p>
                Based in Connecticut. Always curious. Reach me at{" "}
                <a href="mailto:hello@thien.gg"
                  className="text-primary hover:opacity-70 transition-opacity">
                  hello@thien.gg
                </a>.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="h-px bg-border/50 mx-8 md:mx-16" />

      <section className="px-8 md:px-16 py-16 md:py-36">
        <ScrollReveal className="mb-14">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-3">
            Timeline
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-light text-foreground">
            Where I&apos;ve been
          </h2>
        </ScrollReveal>
        <div className="max-w-lg">
          <ScrollTimeline />
        </div>
      </section>
    </div>
  );
}
