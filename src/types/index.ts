// Re-export all types
export * from './auth';
export * from './user';
export * from './post';
export * from './connection';
export * from './message';
export * from './notification';
export * from './job';
export * from './teams';

export type AsyncStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}
