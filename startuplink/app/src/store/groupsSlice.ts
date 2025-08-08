import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../services/api';

export interface GroupReply { id: string; authorId: string; body: string; createdAt: number }
export interface GroupThread { id: string; title: string; authorId: string; body: string; createdAt: number; replies: GroupReply[] }
export interface Group { id: string; name: string; description: string; followers: number; threads: GroupThread[] }

export const fetchGroups = createAsyncThunk<Group[]>(
  'groups/fetch',
  async () => {
    const res = await api.get('/groups');
    return res.data as Group[];
  }
);

const groupsSlice = createSlice({
  name: 'groups',
  initialState: { items: [] as Group[], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => { state.loading = true; })
      .addCase(fetchGroups.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchGroups.rejected, (state) => { state.loading = false; });
  }
});

export default groupsSlice.reducer;