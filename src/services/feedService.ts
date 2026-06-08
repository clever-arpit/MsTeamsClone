import api from './api';
import { Post, CreatePostData, UpdatePostData, CreateCommentData } from '../types';

export const feedService = {
  getFeed: async (page = 1, limit = 10): Promise<any> => {
    const response = await api.get('/posts', {
      params: { page, limit },
    });
    return response.data.data;
  },

  getPost: async (postId: string): Promise<Post> => {
    const response = await api.get(`/posts/${postId}`);
    return response.data.data;
  },

  getUserPosts: async (userId: string, page = 1, limit = 10): Promise<any> => {
    const response = await api.get(`/users/${userId}/posts`, {
      params: { page, limit },
    });
    return response.data.data;
  },

  createPost: async (data: CreatePostData): Promise<Post> => {
    const response = await api.post('/posts', data);
    return response.data.data;
  },

  updatePost: async (postId: string, data: UpdatePostData): Promise<Post> => {
    const response = await api.patch(`/posts/${postId}`, data);
    return response.data.data;
  },

  deletePost: async (postId: string): Promise<void> => {
    await api.delete(`/posts/${postId}`);
  },

  likePost: async (postId: string): Promise<void> => {
    await api.post(`/posts/${postId}/like`);
  },

  unlikePost: async (postId: string): Promise<void> => {
    await api.post(`/posts/${postId}/unlike`);
  },

  getComments: async (postId: string, page = 1, limit = 10): Promise<any> => {
    const response = await api.get(`/posts/${postId}/comments`, {
      params: { page, limit },
    });
    return response.data.data;
  },

  addComment: async (data: CreateCommentData): Promise<any> => {
    const response = await api.post(`/posts/${data.postId}/comments`, {
      text: data.text,
    });
    return response.data.data;
  },

  deleteComment: async (postId: string, commentId: string): Promise<void> => {
    await api.delete(`/posts/${postId}/comments/${commentId}`);
  },

  sharePost: async (postId: string): Promise<void> => {
    await api.post(`/posts/${postId}/share`);
  },
};
