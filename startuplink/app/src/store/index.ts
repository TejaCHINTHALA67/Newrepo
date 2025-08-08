import { configureStore } from '@reduxjs/toolkit';
import startupsReducer from './startupsSlice';
import groupsReducer from './groupsSlice';
import usersReducer from './usersSlice';
import bookmarksReducer from './bookmarksSlice';
import notificationsReducer from './notificationsSlice';

export const store = configureStore({
  reducer: {
    startups: startupsReducer,
    groups: groupsReducer,
    users: usersReducer,
    bookmarks: bookmarksReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;