import api from './api';
import { UserProfile, Experience, Education, Skill } from '../types';

export const userService = {
  getProfile: async (userId: string): Promise<UserProfile> => {
    const response = await api.get(`/users/${userId}`);
    return response.data.data;
  },

  getCurrentProfile: async (): Promise<UserProfile> => {
    const response = await api.get('/users/me');
    return response.data.data;
  },

  updateProfile: async (userId: string, data: Partial<UserProfile>): Promise<UserProfile> => {
    const response = await api.patch(`/users/${userId}`, data);
    return response.data.data;
  },

  uploadProfileImage: async (userId: string, image: FormData): Promise<string> => {
    const response = await api.post(`/users/${userId}/profile-image`, image, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data.profileImage;
  },

  uploadCoverImage: async (userId: string, image: FormData): Promise<string> => {
    const response = await api.post(`/users/${userId}/cover-image`, image, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data.coverImage;
  },

  getExperience: async (userId: string): Promise<Experience[]> => {
    const response = await api.get(`/users/${userId}/experience`);
    return response.data.data;
  },

  addExperience: async (userId: string, experience: Omit<Experience, 'id'>): Promise<Experience> => {
    const response = await api.post(`/users/${userId}/experience`, experience);
    return response.data.data;
  },

  updateExperience: async (userId: string, experienceId: string, data: Partial<Experience>): Promise<Experience> => {
    const response = await api.patch(`/users/${userId}/experience/${experienceId}`, data);
    return response.data.data;
  },

  deleteExperience: async (userId: string, experienceId: string): Promise<void> => {
    await api.delete(`/users/${userId}/experience/${experienceId}`);
  },

  getEducation: async (userId: string): Promise<Education[]> => {
    const response = await api.get(`/users/${userId}/education`);
    return response.data.data;
  },

  addEducation: async (userId: string, education: Omit<Education, 'id'>): Promise<Education> => {
    const response = await api.post(`/users/${userId}/education`, education);
    return response.data.data;
  },

  updateEducation: async (userId: string, educationId: string, data: Partial<Education>): Promise<Education> => {
    const response = await api.patch(`/users/${userId}/education/${educationId}`, data);
    return response.data.data;
  },

  deleteEducation: async (userId: string, educationId: string): Promise<void> => {
    await api.delete(`/users/${userId}/education/${educationId}`);
  },

  getSkills: async (userId: string): Promise<Skill[]> => {
    const response = await api.get(`/users/${userId}/skills`);
    return response.data.data;
  },

  addSkill: async (userId: string, skillName: string): Promise<Skill> => {
    const response = await api.post(`/users/${userId}/skills`, { name: skillName });
    return response.data.data;
  },

  endorseSkill: async (userId: string, skillId: string): Promise<Skill> => {
    const response = await api.post(`/users/${userId}/skills/${skillId}/endorse`);
    return response.data.data;
  },

  deleteSkill: async (userId: string, skillId: string): Promise<void> => {
    await api.delete(`/users/${userId}/skills/${skillId}`);
  },

  searchUsers: async (query: string, page = 1, limit = 20): Promise<any> => {
    const response = await api.get('/users/search', {
      params: { query, page, limit },
    });
    return response.data.data;
  },
};
