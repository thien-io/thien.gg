'use client';

import { Sidebar, MobileTopBar } from '@/components/layout/sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ScrollProgressBar } from '@/lib/animations';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <ScrollProgressBar />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <MobileTopBar />
          <main className="flex-1 overflow-x-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 lg:py-8"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </>
  );
}
