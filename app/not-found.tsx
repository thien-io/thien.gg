import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Swords } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-xl">
        <Swords className="w-8 h-8 text-white" />
      </div>
      <div>
        <h1 className="text-6xl font-bold font-display gradient-text mb-2">404</h1>
        <p className="text-muted-foreground">This page doesn&apos;t exist on thien.gg</p>
      </div>
      <Button asChild>
        <Link href="/">← Back to Profile</Link>
      </Button>
    </div>
  );
}
