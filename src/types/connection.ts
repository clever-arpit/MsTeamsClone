export interface ConnectionUser {
  id: string;
  firstName: string;
  lastName: string;
  headline?: string;
  profileImage?: string;
  location?: string;
}

export type ConnectionStatus = 'connected' | 'pending' | 'requested' | 'none';

export interface Connection {
  id: string;
  user: ConnectionUser;
  connectedAt: string;
}

export interface ConnectionRequest {
  id: string;
  sender: ConnectionUser;
  receiver: ConnectionUser;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface ConnectionRecommendation {
  id: string;
  user: ConnectionUser;
  mutualConnections: number;
  reason?: string;
}

export interface ConnectionState {
  connections: Connection[];
  requests: ConnectionRequest[];
  recommendations: ConnectionRecommendation[];
  selectedConnection: Connection | null;
  loading: boolean;
  error: string | null;
}

export interface SendConnectionRequestData {
  userId: string;
  message?: string;
}
