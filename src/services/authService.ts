import api from './api';
import { LoginResponse, AuthCredentials, SignUpData } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
  login: async (credentials: AuthCredentials): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', credentials);
    const { token, refreshToken, user } = response.data.data;
    
    // Store tokens
    await AsyncStorage.setItem('authToken', token);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    
    return { token, refreshToken, user };
  },

  signup: async (data: SignUpData): Promise<LoginResponse> => {
    const response = await api.post('/auth/register', {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    });
    const { token, refreshToken, user } = response.data.data;
    
    // Store tokens
    await AsyncStorage.setItem('authToken', token);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    
    return { token, refreshToken, user };
  },

  logout: async (): Promise<void> => {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('refreshToken');
  },

  getCurrentUser: async () => {
    const response = await api.get('/users/me');
    return response.data.data;
  },

  verifyToken: async (): Promise<boolean> => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) return false;
      
      await api.get('/auth/verify');
      return true;
    } catch (error) {
      return false;
    }
  },
};
