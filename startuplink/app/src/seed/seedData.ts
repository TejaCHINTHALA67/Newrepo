import dayjs from 'dayjs';
import { Startup } from '../store/startupsSlice';

const categories = ['Tech', 'Health', 'Education', 'Finance', 'Climate', 'AI', 'SaaS', 'Consumer'];
const images = [
  'https://images.unsplash.com/photo-1518770660439-4636190af475',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df'
];

export function fallbackStartups(): Startup[] {
  return Array.from({ length: 20 }).map((_, i) => ({
    id: `local_${i}`,
    ownerId: `user_${i % 5}`,
    title: `Local Startup ${i + 1}`,
    logo: `https://api.dicebear.com/7.x/shapes/svg?seed=${i + 1}`,
    banner: images[i % images.length],
    description: 'Offline seed: a clean mock of a compelling venture.',
    category: categories[i % categories.length],
    media: [images[i % images.length]],
    links: {},
    website: 'https://example.com',
    team: [
      { id: `t_${i}_1`, name: 'Alex Johnson', role: 'CEO', photo: `https://i.pravatar.cc/150?img=${(i % 70) + 1}` },
      { id: `t_${i}_2`, name: 'Priya Singh', role: 'CTO', photo: `https://i.pravatar.cc/150?img=${(i % 70) + 2}` }
    ],
    stats: { views: 100 + i * 10, likes: 20 + i * 2, bookmarks: 5 + i, followers: 50 + i * 3 },
    createdAt: dayjs().subtract(i, 'day').valueOf()
  }));
}