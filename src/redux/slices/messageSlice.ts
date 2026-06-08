import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageState, Message, Conversation } from '../../types';
import { demoConversations, demoMessages } from '../../data/demoData';

const initialState: MessageState = {
  conversations: demoConversations,
  currentConversation: demoMessages,
  selectedConversationId: null,
  page: 1,
  hasMore: true,
  loading: false,
  error: null,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload;
    },
    updateConversation: (state, action: PayloadAction<Conversation>) => {
      const index = state.conversations.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.conversations[index] = action.payload;
      } else {
        state.conversations.unshift(action.payload);
      }
    },
    removeConversation: (state, action: PayloadAction<string>) => {
      state.conversations = state.conversations.filter((c) => c.id !== action.payload);
    },
    setCurrentConversation: (state, action: PayloadAction<{ messages: Message[]; page: number; hasMore: boolean }>) => {
      if (action.payload.page === 1) {
        state.currentConversation = action.payload.messages;
      } else {
        state.currentConversation = [...action.payload.messages, ...state.currentConversation];
      }
      state.page = action.payload.page;
      state.hasMore = action.payload.hasMore;
      state.loading = false;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.currentConversation.push(action.payload);
    },
    removeMessage: (state, action: PayloadAction<string>) => {
      state.currentConversation = state.currentConversation.filter((m) => m.id !== action.payload);
    },
    setSelectedConversation: (state, action: PayloadAction<string | null>) => {
      state.selectedConversationId = action.payload;
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const conversation = state.conversations.find((c) => c.id === action.payload);
      if (conversation) {
        conversation.unreadCount = 0;
      }
    },
    incrementPage: (state) => {
      state.page += 1;
    },
  },
});

export const {
  setLoading,
  setError,
  setConversations,
  updateConversation,
  removeConversation,
  setCurrentConversation,
  addMessage,
  removeMessage,
  setSelectedConversation,
  markAsRead,
  incrementPage,
} = messageSlice.actions;

export default messageSlice.reducer;
