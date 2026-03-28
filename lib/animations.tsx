'use client';

import { useRef } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  type Variants,
} from 'framer-motion';

export { motion, useInView, useScroll, useTransform, useSpring };

// ── Shared variants ───────────────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45, ease: 'easeOut' } },
};

export const slideLeft: Variants = {
  hidden:  { opacity: 0, x: -36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export const slideRight: Variants = {
  hidden:  { opacity: 0, x: 36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

// ── ScrollReveal ──────────────────────────────────────────────────────────────
export function ScrollReveal({
  children,
  variants = fadeUp,
  className,
  delay,
}: {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const variantsWithDelay = delay
    ? {
        ...variants,
        visible: {
          ...(variants.visible as object),
          transition: {
            ...((variants.visible as { transition?: object })?.transition ?? {}),
            delay: delay / 1000,
          },
        },
      }
    : variants;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variantsWithDelay}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── StaggerList ───────────────────────────────────────────────────────────────
export function StaggerList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Parallax ──────────────────────────────────────────────────────────────────
export function Parallax({
  children,
  speed = 0.3,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const raw = useTransform(scrollYProgress, [0, 1], [-60 * speed, 60 * speed]);
  const y = useSpring(raw, { stiffness: 80, damping: 20 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

// ── AnimatedNumber — counts up on scroll into view ────────────────────────────
export function AnimatedNumber({
  value,
  suffix = '',
  prefix = '',
  duration = 1.6,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <span ref={ref}>
      <motion.span
        ref={spanRef}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        onUpdate={({ opacity }) => {
          // no-op needed to trigger onUpdate
        }}
      >
        <motion.span
          initial={0 as unknown as undefined}
          animate={inView ? value : 0}
          transition={{ duration, ease: 'easeOut' }}
          onUpdate={(v: number) => {
            if (spanRef.current) {
              spanRef.current.textContent = `${prefix}${Math.round(v).toLocaleString()}${suffix}`;
            }
          }}
        />
      </motion.span>
    </span>
  );
}
