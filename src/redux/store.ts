import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import feedReducer from './slices/feedSlice';
import connectionReducer from './slices/connectionSlice';
import messageReducer from './slices/messageSlice';
import notificationReducer from './slices/notificationSlice';
import jobsReducer from './slices/jobsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
    message: messageReducer,
    notification: notificationReducer,
    jobs: jobsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/loginSuccess', 'auth/signupSuccess', 'auth/restoreSession'],
        ignoredPaths: ['auth.user', 'auth.token', 'auth.refreshToken'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
