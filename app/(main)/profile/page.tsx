import { DiscordPresence } from '@/components/discord-presence';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  MapPin,
  Calendar,
  Trophy,
  Zap,
  Code2,
  Coffee,
  Heart,
  Star,
  ExternalLink,
} from 'lucide-react';

const DISCORD_USER_ID = process.env.NEXT_PUBLIC_DISCORD_USER_ID ?? '';

const skills = ['Valorant', 'League of Legends', 'CS2', 'Elden Ring', 'Minecraft'];
const techStack = ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Supabase'];

const stats = [
  { label: 'Games Played', value: '200+', icon: Trophy },
  { label: 'Hours Gamed', value: '6,900+', icon: Zap },
  { label: 'Rank (Val)', value: 'Diamond', icon: Star },
  { label: 'Coffee / Day', value: '3+', icon: Coffee },
];

const links = [
  { label: 'GitHub', href: 'https://github.com/thiengg', icon: Code2 },
  { label: 'Discord Server', href: 'https://discord.gg/thiengg', icon: Heart },
];

export default function ProfilePage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero section */}
      <div className="relative rounded-2xl overflow-hidden border bg-card">
        {/* Banner */}
        <div className="h-36 bg-gradient-to-r from-violet-900 via-indigo-900 to-blue-900 relative">
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.03) 20px, rgba(255,255,255,0.03) 40px)',
            }}
          />
        </div>

        <div className="px-6 pb-6">
          {/* Avatar placeholder (real avatar comes from Lanyard) */}
          <div className="flex items-end justify-between -mt-12 mb-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 border-4 border-card flex items-center justify-center text-3xl font-bold text-white shadow-xl">
              T
            </div>
            <div className="flex gap-2 pb-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border bg-background hover:bg-accent transition-colors"
                >
                  <link.icon className="w-3.5 h-3.5" />
                  {link.label}
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold font-display gradient-text leading-none mb-1">
                thien
              </h1>
              <p className="text-muted-foreground text-sm mb-3">aka <span className="text-foreground font-mono">thien.gg</span></p>

              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> Somewhere on Earth
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Joined 2021
                </span>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
            Full-time gamer, part-time developer. I grind ranked, build side projects, and drink too much
            coffee. Welcome to my corner of the internet — stay a while.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="secondary" className="gap-1">
              <Trophy className="w-3 h-3" /> Diamond Valorant
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Star className="w-3 h-3" /> 3000h LoL
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Code2 className="w-3 h-3" /> Developer
            </Badge>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="text-center">
            <CardContent className="pt-5 pb-4">
              <stat.icon className="w-5 h-5 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold font-display">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content grid */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left: Discord + skills */}
        <div className="lg:col-span-2 space-y-6">
          {DISCORD_USER_ID ? (
            <DiscordPresence userId={DISCORD_USER_ID} />
          ) : (
            <Card>
              <CardContent className="pt-6 text-center text-sm text-muted-foreground">
                Set <code className="text-xs bg-muted px-1 py-0.5 rounded">NEXT_PUBLIC_DISCORD_USER_ID</code> to show Discord presence
              </CardContent>
            </Card>
          )}

          {/* Games I play */}
          <Card>
            <CardContent className="pt-5">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4" /> Currently Playing
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <Badge key={s} variant="secondary" className="text-xs">
                    {s}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: About + tech */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardContent className="pt-5">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">About</h3>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Hey! I&apos;m <strong className="text-foreground">Thien</strong> — a competitive gamer with a soft spot
                  for indie titles and open-world RPGs. When I&apos;m not climbing ranked queues, I&apos;m building stuff
                  on the web.
                </p>
                <p>
                  Valorant and League are my dailies, but I rotate through whatever drops on Game Pass or
                  goes on sale. Elden Ring holds the GOTY crown for life in my book.
                </p>
                <p>
                  This site is my little hub — check out the games I play, drop a message in the
                  guestbook, or waste some time on Snake.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <Code2 className="w-4 h-4" /> Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-muted text-muted-foreground border border-border"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Setup card */}
          <Card>
            <CardContent className="pt-5">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">🖥️ Setup</h3>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                {[
                  ['Monitor', 'ASUS 240Hz 1440p'],
                  ['Mouse', 'Logitech G Pro X Superlight'],
                  ['Keyboard', 'Wooting 60HE'],
                  ['Headset', 'Sennheiser HD 599'],
                  ['GPU', 'RTX 4070 Ti'],
                  ['CPU', 'Ryzen 7 7800X3D'],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-muted-foreground text-xs">{k}</dt>
                    <dd className="font-medium text-sm">{v}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
