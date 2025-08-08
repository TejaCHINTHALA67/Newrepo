import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadBookmarks = createAsyncThunk<string[]>(
  'bookmarks/load',
  async () => {
    const raw = await AsyncStorage.getItem('bookmarks');
    return raw ? JSON.parse(raw) : [];
  }
);

export const toggleBookmark = createAsyncThunk<string[], { startupId: string }>(
  'bookmarks/toggle',
  async ({ startupId }, { getState }) => {
    const state: any = getState();
    const set: Set<string> = new Set(state.bookmarks.items);
    if (set.has(startupId)) set.delete(startupId); else set.add(startupId);
    const next = Array.from(set);
    await AsyncStorage.setItem('bookmarks', JSON.stringify(next));
    return next;
  }
);

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState: { items: [] as string[], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadBookmarks.fulfilled, (state, action) => { state.items = action.payload; })
      .addCase(toggleBookmark.fulfilled, (state, action) => { state.items = action.payload; });
  }
});

export default bookmarksSlice.reducer;