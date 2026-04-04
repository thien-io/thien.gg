'use client';

import { useRef, useEffect, useState } from 'react';
import {
  motion, useInView, useScroll, useTransform, useSpring,
  useMotionValue, animate, type Variants,
} from 'framer-motion';

export { motion, useInView, useScroll, useTransform, useSpring, useMotionValue, animate };

// ─────────────────────────────────────────────────────────────────────────────
// VARIANTS
// ─────────────────────────────────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
export const fadeDown: Variants = {
  hidden:  { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};
export const slideLeft: Variants = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
export const slideRight: Variants = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
export const scaleUp: Variants = {
  hidden:  { opacity: 0, scale: 0.7, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
export const staggerFast: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.02 } },
};

// ─────────────────────────────────────────────────────────────────────────────
// SCROLL REVEAL — general wrapper
// ─────────────────────────────────────────────────────────────────────────────
export function ScrollReveal({
  children, variants = fadeUp, className, delay, once = true,
}: {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: '-64px' });

  const v = delay ? {
    ...variants,
    visible: {
      ...(variants.visible as object),
      transition: {
        ...((variants.visible as { transition?: object })?.transition ?? {}),
        delay: delay / 1000,
      },
    },
  } : variants;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={v}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STAGGER LIST
// ─────────────────────────────────────────────────────────────────────────────
export function StaggerList({
  children, className, fast,
}: {
  children: React.ReactNode;
  className?: string;
  fast?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-64px' });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fast ? staggerFast : staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PARALLAX — spring-physics based scroll parallax
// ─────────────────────────────────────────────────────────────────────────────
export function Parallax({
  children, speed = 0.25, className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const raw = useTransform(scrollYProgress, [0, 1], [-80 * speed, 80 * speed]);
  const y = useSpring(raw, { stiffness: 60, damping: 18, restDelta: 0.001 });
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PARALLAX BACKGROUND — for hero sections
// ─────────────────────────────────────────────────────────────────────────────
export function ParallaxHero({
  children, className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y       = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale   = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const springY = useSpring(y, { stiffness: 60, damping: 18 });

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <motion.div style={{ y: springY, opacity, scale }}>
        {children}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FLOATING ELEMENT — gentle float animation
// ─────────────────────────────────────────────────────────────────────────────
export function FloatingElement({
  children, delay = 0, className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAGNETIC HOVER — element follows cursor slightly
// ─────────────────────────────────────────────────────────────────────────────
export function MagneticHover({
  children, strength = 0.3, className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// REVEAL TEXT — characters stagger in
// ─────────────────────────────────────────────────────────────────────────────
export function RevealText({
  text, className, delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: delay + i * 0.03, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: ch === ' ' ? 'inline' : 'inline-block' }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COUNTER — rAF-based count-up on scroll
// ─────────────────────────────────────────────────────────────────────────────
export function AnimatedNumber({
  value, suffix = '', prefix = '', duration = 1.8,
}: {
  value: number; suffix?: string; prefix?: string; duration?: number;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const inView  = useInView(spanRef, { once: true });
  const hasRun  = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;
    const start = performance.now();
    const ms = duration * 1000;
    const tick = (now: number) => {
      const p = Math.min((now - start) / ms, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      if (spanRef.current)
        spanRef.current.textContent = `${prefix}${Math.round(eased * value).toLocaleString()}${suffix}`;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value, prefix, suffix, duration]);

  return <span ref={spanRef}>{prefix}0{suffix}</span>;
}

// ─────────────────────────────────────────────────────────────────────────────
// PROGRESS BAR — animated on scroll
// ─────────────────────────────────────────────────────────────────────────────
export function AnimatedBar({
  pct, color = 'hsl(var(--primary))', delay = 0, height = '0.6rem', rounded = true,
}: {
  pct: number; color?: string; delay?: number; height?: string; rounded?: boolean;
}) {
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div
      ref={ref}
      className="w-full bg-muted/50 overflow-hidden"
      style={{ height, borderRadius: rounded ? '999px' : '2px' }}
    >
      <motion.div
        className="h-full"
        style={{ background: color, borderRadius: rounded ? '999px' : '2px' }}
        initial={{ width: '0%' }}
        animate={inView ? { width: `${pct}%` } : { width: '0%' }}
        transition={{ duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOVER CARD — lifts on hover with spring
// ─────────────────────────────────────────────────────────────────────────────
export function HoverCard({
  children, className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -6, boxShadow: '0 20px 40px hsl(var(--primary)/0.15)' }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 280, damping: 18 }}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCROLL PROGRESS BAR — top of page
// ─────────────────────────────────────────────────────────────────────────────
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-primary z-50 origin-left"
      style={{ scaleX }}
    />
  );
}
