import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import './globals.css';

export const metadata: Metadata = {
  title: 'thien.gg',
  description: 'Gamer profile — thien.gg',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: 'thien.gg',
    description: 'Gamer profile',
    url: 'https://thien.gg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
