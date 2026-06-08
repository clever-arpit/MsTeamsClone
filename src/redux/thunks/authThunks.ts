import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services';
import { AuthCredentials, SignUpData } from '../../types';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials: AuthCredentials, { rejectWithValue }) => {
    try {
      const result = await authService.login(credentials);
      return result;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const signupThunk = createAsyncThunk(
  'auth/signup',
  async (data: SignUpData, { rejectWithValue }) => {
    try {
      const result = await authService.signup(data);
      return result;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      return null;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

export const verifyTokenThunk = createAsyncThunk(
  'auth/verifyToken',
  async (_, { rejectWithValue }) => {
    try {
      const isValid = await authService.verifyToken();
      if (isValid) {
        const user = await authService.getCurrentUser();
        return user;
      }
      return null;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Verification failed');
    }
  }
);
