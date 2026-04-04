'use client';

import { useEffect } from 'react';

// Smooth scroll for the whole app using CSS scroll-behavior
// Also exports a hook for scroll-triggered number reveals

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default SmoothScrollProvider;
