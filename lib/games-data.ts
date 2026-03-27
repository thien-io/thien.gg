export interface Game {
  id: string;
  name: string;
  genre: string[];
  platform: string[];
  status: 'playing' | 'completed' | 'dropped' | 'want';
  hours?: number;
  rating?: number; // 1-10
  image: string;
  description?: string;
  favorite?: boolean;
}

export const games: Game[] = [
  {
    id: 'valorant',
    name: 'Valorant',
    genre: ['FPS', 'Tactical Shooter'],
    platform: ['PC'],
    status: 'playing',
    hours: 1200,
    rating: 9,
    image: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg',
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
    image: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/438100/header.jpg',
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
    image: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg',
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
    image: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1672970/header.jpg',
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
    image: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg',
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
    image: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/730/header.jpg',
    description: 'A classic that never gets old.',
  },
];
