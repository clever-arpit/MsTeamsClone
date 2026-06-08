import api from './api';
import { Notification } from '../types';

export const notificationService = {
  getNotifications: async (page = 1, limit = 20): Promise<any> => {
    const response = await api.get('/notifications', {
      params: { page, limit },
    });
    return response.data.data;
  },

  markAsRead: async (notificationId: string): Promise<void> => {
    await api.patch(`/notifications/${notificationId}/read`);
  },

  markAllAsRead: async (): Promise<void> => {
    await api.patch('/notifications/read-all');
  },

  deleteNotification: async (notificationId: string): Promise<void> => {
    await api.delete(`/notifications/${notificationId}`);
  },

  deleteAllNotifications: async (): Promise<void> => {
    await api.delete('/notifications');
  },

  getUnreadCount: async (): Promise<number> => {
    const response = await api.get('/notifications/unread-count');
    return response.data.data.count;
  },

  subscribeToNotifications: async (fcmToken: string): Promise<void> => {
    await api.post('/notifications/subscribe', { fcmToken });
  },
};
