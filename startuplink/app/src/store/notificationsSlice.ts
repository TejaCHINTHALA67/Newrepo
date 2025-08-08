import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NotificationItem { id: string; userId: string; type: 'like' | 'comment' | 'update'; startupId: string; actorId?: string; updateId?: string; text?: string; createdAt: number; read: boolean }

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: { items: [] as NotificationItem[] },
  reducers: {
    addNotification(state, action: PayloadAction<NotificationItem>) {
      state.items.unshift(action.payload);
    },
    markAllRead(state) {
      state.items.forEach(n => { n.read = true; });
    }
  }
});

export const { addNotification, markAllRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;