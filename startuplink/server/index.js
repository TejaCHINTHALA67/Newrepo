import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 10);
const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, { cors: { origin: '*'} });

app.use(cors());
app.use(express.json({ limit: '2mb' }));

// ---- Seed Data (in-memory) ----
const categories = ['Tech', 'Health', 'Education', 'Finance', 'Climate', 'AI', 'SaaS', 'Consumer'];
const sampleImages = [
  'https://images.unsplash.com/photo-1518770660439-4636190af475',
  'https://images.unsplash.com/photo-1518779578993-ec3579fee39f',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
  'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df',
  'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984'
];

const users = Array.from({ length: 12 }).map((_, i) => ({
  id: nanoid(),
  name: `User ${i + 1}`,
  username: `user${i + 1}`,
  avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
  bio: 'Entrepreneur and builder passionate about innovation.',
  followers: Math.floor(Math.random() * 5000),
  following: Math.floor(Math.random() * 1000)
}));

const startups = Array.from({ length: 24 }).map((_, i) => {
  const owner = users[i % users.length].id;
  const category = categories[i % categories.length];
  const image = sampleImages[i % sampleImages.length];
  return {
    id: nanoid(),
    ownerId: owner,
    title: `Startup ${i + 1}`,
    logo: `https://api.dicebear.com/7.x/shapes/svg?seed=${i + 1}`,
    banner: image,
    description: 'A bold vision to reshape the industry with an elegant solution. Clear problem, sharp focus, and a path to scale.',
    category,
    media: [image + '&w=1200&q=80', sampleImages[(i + 3) % sampleImages.length] + '&w=1200&q=80'],
    website: 'https://example.com',
    links: { twitter: 'https://x.com/example', linkedin: 'https://linkedin.com/company/example' },
    team: [
      { id: nanoid(), name: 'Alex Johnson', role: 'CEO', photo: `https://i.pravatar.cc/150?img=${(i % 70) + 1}` },
      { id: nanoid(), name: 'Priya Singh', role: 'CTO', photo: `https://i.pravatar.cc/150?img=${(i % 70) + 2}` },
      { id: nanoid(), name: 'Luis Martinez', role: 'Product Lead', photo: `https://i.pravatar.cc/150?img=${(i % 70) + 3}` }
    ],
    stats: {
      views: 1000 + Math.floor(Math.random() * 5000),
      likes: 200 + Math.floor(Math.random() * 1500),
      bookmarks: 50 + Math.floor(Math.random() * 500),
      followers: 100 + Math.floor(Math.random() * 3000)
    },
    createdAt: Date.now() - Math.floor(Math.random() * 60 * 24 * 60 * 60 * 1000)
  };
});

const groups = categories.map((c, idx) => ({
  id: nanoid(),
  name: `${c} Founders`,
  description: `${c} sector discussions, resources, and founder support.`,
  followers: 50 + Math.floor(Math.random() * 3000),
  threads: Array.from({ length: 6 }).map((_, t) => ({
    id: nanoid(),
    title: `${c} thread ${t + 1}`,
    authorId: users[(idx + t) % users.length].id,
    body: 'Let s discuss key challenges and share practical tips for traction.',
    createdAt: Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000),
    replies: Array.from({ length: 3 }).map((__, r) => ({
      id: nanoid(),
      authorId: users[(idx + t + r + 1) % users.length].id,
      body: 'Great point! Here s what worked for us in early days.',
      createdAt: Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
    }))
  }))
}));

const updates = [];
const comments = [];
const likes = [];
const notifications = [];

// ---- Helpers ----
function notify(userId, payload) {
  const notif = { id: nanoid(), userId, ...payload, createdAt: Date.now(), read: false };
  notifications.push(notif);
  io.to(userId).emit('notification', notif);
}

// ---- Socket.io ----
io.on('connection', (socket) => {
  const { userId } = socket.handshake.query || {};
  if (userId) {
    socket.join(userId);
  }
});

// ---- API ----
app.get('/api/health', (req, res) => res.json({ ok: true }));

app.get('/api/startups', (req, res) => {
  const { q, category, sort = 'recent' } = req.query;
  let result = [...startups];
  if (q) {
    const term = String(q).toLowerCase();
    result = result.filter(s => s.title.toLowerCase().includes(term) || s.description.toLowerCase().includes(term));
  }
  if (category) {
    result = result.filter(s => s.category === category);
  }
  if (sort === 'trending') {
    result.sort((a, b) => (b.stats.likes + b.stats.bookmarks + b.stats.views * 0.1) - (a.stats.likes + a.stats.bookmarks + a.stats.views * 0.1));
  } else {
    result.sort((a, b) => b.createdAt - a.createdAt);
  }
  res.json(result);
});

app.get('/api/startups/:id', (req, res) => {
  const s = startups.find(s => s.id === req.params.id);
  if (!s) return res.status(404).json({ error: 'Not found' });
  res.json(s);
});

app.post('/api/startups', (req, res) => {
  const { title, description, category, media = [], team = [], links = {}, ownerId } = req.body || {};
  const newStartup = {
    id: nanoid(),
    ownerId: ownerId || users[0].id,
    title,
    logo: `https://api.dicebear.com/7.x/shapes/svg?seed=${title?.slice(0, 8) || 'logo'}`,
    banner: media[0] || sampleImages[0],
    description,
    category,
    media,
    website: links.website || 'https://example.com',
    links,
    team: team.length ? team : [ { id: nanoid(), name: 'You', role: 'Founder', photo: users[0].avatar } ],
    stats: { views: 0, likes: 0, bookmarks: 0, followers: 0 },
    createdAt: Date.now()
  };
  startups.unshift(newStartup);
  res.status(201).json(newStartup);
});

app.post('/api/likes', (req, res) => {
  const { startupId, userId } = req.body || {};
  const s = startups.find(s => s.id === startupId);
  if (!s) return res.status(404).json({ error: 'Startup not found' });
  likes.push({ id: nanoid(), startupId, userId, createdAt: Date.now() });
  s.stats.likes += 1;
  notify(s.ownerId, { type: 'like', startupId, actorId: userId });
  res.json({ ok: true, likes: s.stats.likes });
});

app.post('/api/bookmarks', (req, res) => {
  const { startupId, userId } = req.body || {};
  const s = startups.find(s => s.id === startupId);
  if (!s) return res.status(404).json({ error: 'Startup not found' });
  s.stats.bookmarks += 1;
  res.json({ ok: true, bookmarks: s.stats.bookmarks });
});

app.get('/api/comments', (req, res) => {
  const { startupId } = req.query;
  const result = comments.filter(c => !startupId || c.startupId === startupId);
  res.json(result);
});

app.post('/api/comments', (req, res) => {
  const { startupId, userId, text } = req.body || {};
  const s = startups.find(s => s.id === startupId);
  if (!s) return res.status(404).json({ error: 'Startup not found' });
  const comment = { id: nanoid(), startupId, userId, text, createdAt: Date.now() };
  comments.push(comment);
  notify(s.ownerId, { type: 'comment', startupId, actorId: userId, text });
  res.status(201).json(comment);
});

app.get('/api/updates', (req, res) => {
  const { startupId } = req.query;
  const result = updates.filter(u => !startupId || u.startupId === startupId);
  res.json(result);
});

app.post('/api/updates', (req, res) => {
  const { startupId, userId, title, body, media = [] } = req.body || {};
  const s = startups.find(s => s.id === startupId);
  if (!s) return res.status(404).json({ error: 'Startup not found' });
  const update = { id: nanoid(), startupId, userId, title, body, media, createdAt: Date.now() };
  updates.unshift(update);
  // Simulate notifying followers (random subset for mock)
  users.slice(0, 6).forEach(u => notify(u.id, { type: 'update', startupId, updateId: update.id }));
  res.status(201).json(update);
});

app.get('/api/groups', (req, res) => {
  res.json(groups);
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/api/notifications', (req, res) => {
  const { userId } = req.query;
  const result = notifications.filter(n => !userId || n.userId === userId).sort((a, b) => b.createdAt - a.createdAt);
  res.json(result);
});

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Mock API running on http://localhost:${PORT}`);
});