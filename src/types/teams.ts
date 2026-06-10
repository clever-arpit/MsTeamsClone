export type PresenceStatus = 'available' | 'busy' | 'away' | 'offline';

export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  status: PresenceStatus;
  email: string;
  phone: string;
}

export interface TeamsActivity {
  id: string;
  actor: TeamMember;
  title: string;
  body: string;
  type: 'mention' | 'reply' | 'meeting' | 'file' | 'reaction';
  unread: boolean;
  createdAt: string;
}

export interface TeamsCall {
  id: string;
  contact: TeamMember;
  type: 'audio' | 'video';
  direction: 'incoming' | 'outgoing' | 'missed';
  duration: string;
  createdAt: string;
}

export interface TeamsFile {
  id: string;
  name: string;
  type: 'doc' | 'sheet' | 'pdf' | 'image';
  owner: TeamMember;
  channel: string;
  size: string;
  updatedAt: string;
  favorite: boolean;
}

export interface TeamsChannel {
  id: string;
  teamName: string;
  channelName: string;
  description: string;
  unreadCount: number;
}

export interface TeamsState {
  members: TeamMember[];
  activities: TeamsActivity[];
  calls: TeamsCall[];
  files: TeamsFile[];
  channels: TeamsChannel[];
  searchQuery: string;
  selectedFileId: string | null;
}
