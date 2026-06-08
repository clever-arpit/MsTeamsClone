import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useCallback } from 'react';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  return {
    ...auth,
    dispatch,
  };
};

export const useFeed = () => {
  const feed = useAppSelector((state) => state.feed);
  return feed;
};

export const useProfile = () => {
  const user = useAppSelector((state) => state.user);
  return user;
};

export const useConnections = () => {
  const connections = useAppSelector((state) => state.connection);
  return connections;
};

export const useMessages = () => {
  const messages = useAppSelector((state) => state.message);
  return messages;
};

export const useNotifications = () => {
  const notifications = useAppSelector((state) => state.notification);
  return notifications;
};

export const useUI = () => {
  const ui = useAppSelector((state) => state.ui);
  return ui;
};
