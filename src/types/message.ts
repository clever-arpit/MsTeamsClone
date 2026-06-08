export type MessageStatus = 'sent' | 'delivered' | 'read';

export interface MessageUser {
  id: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: MessageUser;
  receiver: MessageUser;
  content: string;
  attachment?: string;
  status: MessageStatus;
  createdAt: string;
  readAt?: string;
}

export interface Conversation {
  id: string;
  participant: MessageUser;
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: string;
}

export interface MessageState {
  conversations: Conversation[];
  currentConversation: Message[];
  selectedConversationId: string | null;
  page: number;
  hasMore: boolean;
  loading: boolean;
  error: string | null;
}

export interface SendMessageData {
  conversationId: string;
  content: string;
  attachment?: string;
}

export interface StartConversationData {
  userId: string;
  firstMessage: string;
}
