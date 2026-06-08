export type NotificationType =
  | 'connection_request'
  | 'connection_accepted'
  | 'post_liked'
  | 'post_commented'
  | 'post_shared'
  | 'profile_viewed'
  | 'message'
  | 'endorsement';

export interface NotificationActor {
  id: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
}

export interface Notification {
  id: string;
  type: NotificationType;
  actor: NotificationActor;
  message: string;
  actionUrl?: string;
  read: boolean;
  createdAt: string;
  data?: Record<string, any>;
}

export interface NotificationState {
  notifications: Notification[];
  page: number;
  hasMore: boolean;
  unreadCount: number;
  loading: boolean;
  error: string | null;
}

export interface MarkNotificationAsReadData {
  notificationId: string;
}
