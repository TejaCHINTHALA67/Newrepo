import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../services/api';
import { fallbackStartups } from '../seed/seedData';

export interface TeamMember { id: string; name: string; role: string; photo: string }
export interface Startup {
  id: string;
  ownerId: string;
  title: string;
  logo: string;
  banner: string;
  description: string;
  category: string;
  media: string[];
  website?: string;
  links?: Record<string, string>;
  team: TeamMember[];
  stats: { views: number; likes: number; bookmarks: number; followers: number };
  createdAt: number;
}

export const fetchStartups = createAsyncThunk<Startup[], { q?: string; category?: string; sort?: string } | undefined>(
  'startups/fetch',
  async (params, { rejectWithValue }) => {
    try {
      const res = await api.get('/startups', { params });
      return res.data as Startup[];
    } catch (e) {
      return fallbackStartups();
    }
  }
);

export const likeStartup = createAsyncThunk<{ startupId: string; likes: number }, { startupId: string; userId: string }>(
  'startups/like',
  async ({ startupId, userId }) => {
    const res = await api.post('/likes', { startupId, userId });
    return { startupId, likes: res.data.likes };
  }
);

export const bookmarkStartup = createAsyncThunk<{ startupId: string; bookmarks: number }, { startupId: string; userId: string }>(
  'startups/bookmark',
  async ({ startupId, userId }) => {
    const res = await api.post('/bookmarks', { startupId, userId });
    return { startupId, bookmarks: res.data.bookmarks };
  }
);

interface StartupsState {
  items: Startup[];
  loading: boolean;
  error?: string;
  selectedCategory?: string;
  search?: string;
}

const initialState: StartupsState = { items: [], loading: false };

const startupsSlice = createSlice({
  name: 'startups',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string | undefined>) {
      state.selectedCategory = action.payload;
    },
    setSearch(state, action: PayloadAction<string | undefined>) {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStartups.pending, (state) => { state.loading = true; })
      .addCase(fetchStartups.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchStartups.rejected, (state, action) => { state.loading = false; state.error = String(action.error.message || 'Failed'); })
      .addCase(likeStartup.fulfilled, (state, action) => {
        const s = state.items.find(x => x.id === action.payload.startupId);
        if (s) s.stats.likes = action.payload.likes;
      })
      .addCase(bookmarkStartup.fulfilled, (state, action) => {
        const s = state.items.find(x => x.id === action.payload.startupId);
        if (s) s.stats.bookmarks = action.payload.bookmarks;
      });
  }
});

export const { setCategory, setSearch } = startupsSlice.actions;
export default startupsSlice.reducer;