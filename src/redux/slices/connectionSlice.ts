import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConnectionState, Connection, ConnectionRequest, ConnectionRecommendation } from '../../types';
import { demoConnections, demoRecommendations, demoRequests } from '../../data/demoData';

const initialState: ConnectionState = {
  connections: demoConnections,
  requests: demoRequests,
  recommendations: demoRecommendations,
  selectedConnection: null,
  loading: false,
  error: null,
};

const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setConnections: (state, action: PayloadAction<Connection[]>) => {
      state.connections = action.payload;
    },
    addConnection: (state, action: PayloadAction<Connection>) => {
      state.connections.push(action.payload);
    },
    removeConnection: (state, action: PayloadAction<string>) => {
      state.connections = state.connections.filter((c) => c.id !== action.payload);
    },
    setRequests: (state, action: PayloadAction<ConnectionRequest[]>) => {
      state.requests = action.payload;
    },
    addRequest: (state, action: PayloadAction<ConnectionRequest>) => {
      state.requests.push(action.payload);
    },
    removeRequest: (state, action: PayloadAction<string>) => {
      state.requests = state.requests.filter((r) => r.id !== action.payload);
    },
    setRecommendations: (state, action: PayloadAction<ConnectionRecommendation[]>) => {
      state.recommendations = action.payload;
    },
    removeRecommendation: (state, action: PayloadAction<string>) => {
      state.recommendations = state.recommendations.filter((r) => r.id !== action.payload);
    },
    setSelectedConnection: (state, action: PayloadAction<Connection | null>) => {
      state.selectedConnection = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setConnections,
  addConnection,
  removeConnection,
  setRequests,
  addRequest,
  removeRequest,
  setRecommendations,
  removeRecommendation,
  setSelectedConnection,
} = connectionSlice.actions;

export default connectionSlice.reducer;
