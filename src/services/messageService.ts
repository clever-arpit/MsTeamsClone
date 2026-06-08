import api from './api';
import { Message, Conversation, SendMessageData, StartConversationData } from '../types';

export const messageService = {
  getConversations: async (page = 1, limit = 20): Promise<any> => {
    const response = await api.get('/messages/conversations', {
      params: { page, limit },
    });
    return response.data.data;
  },

  getConversation: async (conversationId: string, page = 1, limit = 50): Promise<any> => {
    const response = await api.get(`/messages/conversations/${conversationId}`, {
      params: { page, limit },
    });
    return response.data.data;
  },

  startConversation: async (data: StartConversationData): Promise<Conversation> => {
    const response = await api.post('/messages/conversations', data);
    return response.data.data;
  },

  sendMessage: async (data: SendMessageData): Promise<Message> => {
    const response = await api.post(`/messages/conversations/${data.conversationId}/messages`, {
      content: data.content,
      attachment: data.attachment,
    });
    return response.data.data;
  },

  markAsRead: async (conversationId: string): Promise<void> => {
    await api.patch(`/messages/conversations/${conversationId}/read`);
  },

  deleteMessage: async (conversationId: string, messageId: string): Promise<void> => {
    await api.delete(`/messages/conversations/${conversationId}/messages/${messageId}`);
  },

  deleteConversation: async (conversationId: string): Promise<void> => {
    await api.delete(`/messages/conversations/${conversationId}`);
  },

  searchMessages: async (conversationId: string, query: string): Promise<Message[]> => {
    const response = await api.get(`/messages/conversations/${conversationId}/search`, {
      params: { query },
    });
    return response.data.data;
  },
};
