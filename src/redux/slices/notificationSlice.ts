import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationState, Notification } from '../../types';
import { demoNotifications } from '../../data/demoData';

const initialState: NotificationState = {
  notifications: demoNotifications,
  page: 1,
  hasMore: true,
  unreadCount: demoNotifications.filter((notification) => !notification.read).length,
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setNotifications: (state, action: PayloadAction<{ notifications: Notification[]; page: number; hasMore: boolean; unreadCount: number }>) => {
      if (action.payload.page === 1) {
        state.notifications = action.payload.notifications;
      } else {
        state.notifications = [...state.notifications, ...action.payload.notifications];
      }
      state.page = action.payload.page;
      state.hasMore = action.payload.hasMore;
      state.unreadCount = action.payload.unreadCount;
      state.loading = false;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.read) {
        state.unreadCount += 1;
      }
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find((n) => n.id === action.payload);
      if (notification && !notification.read) {
        state.unreadCount -= 1;
      }
      state.notifications = state.notifications.filter((n) => n.id !== action.payload);
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find((n) => n.id === action.payload);
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount -= 1;
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((n) => {
        n.read = true;
      });
      state.unreadCount = 0;
    },
    setUnreadCount: (state, action: PayloadAction<number>) => {
      state.unreadCount = action.payload;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
  },
});

export const {
  setLoading,
  setError,
  setNotifications,
  addNotification,
  removeNotification,
  markAsRead,
  markAllAsRead,
  setUnreadCount,
  incrementPage,
} = notificationSlice.actions;

export default notificationSlice.reducer;
