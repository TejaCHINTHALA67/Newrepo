import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../services/api';

export interface User { id: string; name: string; username: string; avatar: string; bio: string; followers: number; following: number }

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetch',
  async () => {
    const res = await api.get('/users');
    return res.data as User[];
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: { items: [] as User[], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.loading = true; })
      .addCase(fetchUsers.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchUsers.rejected, (state) => { state.loading = false; });
  }
});

export default usersSlice.reducer;