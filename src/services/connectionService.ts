import api from './api';
import { Connection, ConnectionRequest, SendConnectionRequestData } from '../types';

export const connectionService = {
  getConnections: async (userId: string, page = 1, limit = 20): Promise<any> => {
    const response = await api.get(`/users/${userId}/connections`, {
      params: { page, limit },
    });
    return response.data.data;
  },

  getConnectionRequests: async (page = 1, limit = 20): Promise<any> => {
    const response = await api.get('/connections/requests', {
      params: { page, limit },
    });
    return response.data.data;
  },

  sendConnectionRequest: async (data: SendConnectionRequestData): Promise<ConnectionRequest> => {
    const response = await api.post('/connections/requests', data);
    return response.data.data;
  },

  acceptConnectionRequest: async (requestId: string): Promise<Connection> => {
    const response = await api.patch(`/connections/requests/${requestId}/accept`);
    return response.data.data;
  },

  rejectConnectionRequest: async (requestId: string): Promise<void> => {
    await api.patch(`/connections/requests/${requestId}/reject`);
  },

  removeConnection: async (connectionId: string): Promise<void> => {
    await api.delete(`/connections/${connectionId}`);
  },

  getConnectionStatus: async (userId: string): Promise<string> => {
    const response = await api.get(`/users/${userId}/connection-status`);
    return response.data.data.status;
  },

  getConnectionRecommendations: async (page = 1, limit = 20): Promise<any> => {
    const response = await api.get('/connections/recommendations', {
      params: { page, limit },
    });
    return response.data.data;
  },
};
