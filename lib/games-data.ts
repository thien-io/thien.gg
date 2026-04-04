export interface Game {
  id: string;
  name: string;
  genre: string[];
  platform: string[];
  status: 'playing' | 'completed' | 'dropped' | 'want';
  hours?: number;
  rating?: number;
  image: string;
  description?: string;
  favorite?: boolean;
}

// Using reliable image sources that won't 404
const STEAM = 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps';
const CDN   = 'https://cdn.cloudflare.steamstatic.com/steam/apps';

export const games: Game[] = [
  {
    id: 'valorant',
    name: 'Valorant',
    genre: ['FPS', 'Tactical Shooter'],
    platform: ['PC'],
    status: 'playing',
    hours: 1200,
    rating: 9,
    image: `${STEAM}/1091500/header.jpg`,
    description: 'My main competitive game. Peaked Diamond 2.',
    favorite: true,
  },
  {
    id: 'league-of-legends',
    name: 'League of Legends',
    genre: ['MOBA'],
    platform: ['PC'],
    status: 'playing',
    hours: 3000,
    rating: 7,
    image: `${STEAM}/438100/header.jpg`,
    description: 'The grind never ends.',
    favorite: true,
  },
  {
    id: 'elden-ring',
    name: 'Elden Ring',
    genre: ['Action RPG', 'Soulslike'],
    platform: ['PC', 'PS5'],
    status: 'completed',
    hours: 120,
    rating: 10,
    image: `${STEAM}/1245620/header.jpg`,
    description: 'One of the best games ever made.',
    favorite: true,
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    genre: ['Sandbox', 'Survival'],
    platform: ['PC', 'Mobile'],
    status: 'playing',
    hours: 500,
    rating: 9,
    image: `${STEAM}/1672970/header.jpg`,
    description: 'Building worlds since 2011.',
  },
  {
    id: 'cyberpunk-2077',
    name: 'Cyberpunk 2077',
    genre: ['Action RPG', 'Open World'],
    platform: ['PC'],
    status: 'completed',
    hours: 85,
    rating: 8,
    image: `${STEAM}/1091500/header.jpg`,
    description: 'Night City has everything.',
  },
  {
    id: 'cs2',
    name: 'Counter-Strike 2',
    genre: ['FPS', 'Tactical Shooter'],
    platform: ['PC'],
    status: 'playing',
    hours: 2200,
    rating: 8,
    image: `${STEAM}/730/header.jpg`,
    description: 'A classic that never gets old.',
  },
  {
    id: 'guild-wars-2',
    name: 'Guild Wars 2',
    genre: ['MMORPG', 'Action RPG'],
    platform: ['PC'],
    status: 'playing',
    hours: 400,
    rating: 8,
    image: `${STEAM}/1284210/header.jpg`,
    description: 'The best free-to-play MMO out there.',
    favorite: true,
  },
  {
    id: 'pokopia',
    name: 'Pokopia',
    genre: ['RPG', 'Strategy'],
    platform: ['PC', 'Mobile'],
    status: 'playing',
    hours: 60,
    rating: 7,
    image: `${STEAM}/1238810/header.jpg`,
    description: 'Addictive creature-collecting grind.',
  },
  {
    id: 'clash-royale',
    name: 'Clash Royale',
    genre: ['Strategy', 'Card Game'],
    platform: ['Mobile'],
    status: 'dropped',
    hours: 200,
    rating: 6,
    image: `${STEAM}/404790/header.jpg`,
    description: 'Spent way too much time on ladder.',
  },
  {
    id: 'world-of-warcraft',
    name: 'World of Warcraft',
    genre: ['MMORPG'],
    platform: ['PC'],
    status: 'completed',
    hours: 1800,
    rating: 9,
    image: `${STEAM}/2835570/header.jpg`,
    description: 'Peak gaming era. Classic forever.',
    favorite: true,
  },
  {
    id: 'halo-infinite',
    name: 'Halo Infinite',
    genre: ['FPS', 'Sci-Fi Shooter'],
    platform: ['PC', 'Xbox'],
    status: 'playing',
    hours: 150,
    rating: 8,
    image: `${STEAM}/1240440/header.jpg`,
    description: 'Campaign was great, multiplayer keeps me coming back.',
  },
  {
    id: 'hearthstone',
    name: 'Hearthstone',
    genre: ['Card Game', 'Strategy'],
    platform: ['PC', 'Mobile'],
    status: 'dropped',
    hours: 500,
    rating: 7,
    image: `${STEAM}/1196670/header.jpg`,
    description: 'Fun until the wallet opens.',
  },
];
