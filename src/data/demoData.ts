import {
  AuthUser,
  Connection,
  ConnectionRecommendation,
  ConnectionRequest,
  Conversation,
  Education,
  Experience,
  Job,
  Message,
  Notification,
  Post,
  Skill,
  TeamMember,
  TeamsActivity,
  TeamsCall,
  TeamsChannel,
  TeamsFile,
  UserProfile,
} from '../types';

export const demoAuthUser: AuthUser = {
  id: 'user-1',
  email: 'arpit@msteamsclone.dev',
  firstName: 'Arpit',
  lastName: 'Dhiman',
  createdAt: '2026-01-10T09:00:00.000Z',
};

export const demoProfile: UserProfile = {
  ...demoAuthUser,
  headline: 'Senior React Native Engineer | Building thoughtful mobile products',
  about:
    'I build mobile experiences that feel fast, useful, and calm. Recently focused on React Native, product architecture, and practical AI workflows for teams.',
  location: 'Bengaluru, India',
  website: 'msteamsclone.dev/arpit',
  updatedAt: '2026-05-28T09:00:00.000Z',
  followersCount: 12840,
  followingCount: 842,
  postsCount: 24,
};

export const demoExperience: Experience[] = [
  {
    id: 'exp-1',
    companyName: 'Northstar Labs',
    position: 'Senior React Native Engineer',
    startDate: '2023-04-01',
    isCurrentlyWorking: true,
    description: 'Leading mobile platform work across auth, feed, notifications, and design systems.',
  },
  {
    id: 'exp-2',
    companyName: 'PixelForge',
    position: 'Frontend Engineer',
    startDate: '2020-08-01',
    endDate: '2023-03-01',
    isCurrentlyWorking: false,
    description: 'Built cross-platform product surfaces for creator and collaboration tools.',
  },
];

export const demoEducation: Education[] = [
  {
    id: 'edu-1',
    schoolName: 'Delhi Technological University',
    fieldOfStudy: 'Computer Science',
    startDate: '2016',
    endDate: '2020',
  },
];

export const demoSkills: Skill[] = [
  { id: 'skill-1', name: 'React Native', endorsements: 64, endorsed: true },
  { id: 'skill-2', name: 'Redux Toolkit', endorsements: 42, endorsed: true },
  { id: 'skill-3', name: 'Product Engineering', endorsements: 37, endorsed: false },
  { id: 'skill-4', name: 'TypeScript', endorsements: 58, endorsed: true },
];

export const demoPosts: Post[] = [
  {
    id: 'post-1',
    author: {
      id: 'user-1',
      firstName: 'Arpit',
      lastName: 'Dhiman',
      headline: 'Senior React Native Engineer',
    },
    content:
      'A polished mobile product is rarely one giant feature. It is hundreds of small decisions: loading states that reassure, navigation that remembers context, and screens that respect the user’s attention.',
    createdAt: '2026-05-31T10:30:00.000Z',
    updatedAt: '2026-05-31T10:30:00.000Z',
    likes: 186,
    comments: [],
    commentsCount: 18,
    shares: 11,
    liked: false,
  },
  {
    id: 'post-2',
    author: {
      id: 'user-2',
      firstName: 'Maya',
      lastName: 'Rao',
      headline: 'Design Lead at Northstar Labs',
    },
    content:
      'Good dashboards are quiet until the user needs them to speak. The best ones make comparison, status, and next action obvious without turning every pixel into a shout.',
    createdAt: '2026-05-30T14:20:00.000Z',
    updatedAt: '2026-05-30T14:20:00.000Z',
    likes: 412,
    comments: [],
    commentsCount: 33,
    shares: 27,
    liked: true,
  },
  {
    id: 'post-3',
    author: {
      id: 'user-3',
      firstName: 'Kabir',
      lastName: 'Mehta',
      headline: 'Engineering Manager | Mobile Platform',
    },
    content:
      'We moved our auth and profile flows to a typed Redux layer this week. The win was not just consistency; debugging got dramatically easier because every transition became visible.',
    createdAt: '2026-05-29T08:10:00.000Z',
    updatedAt: '2026-05-29T08:10:00.000Z',
    likes: 97,
    comments: [],
    commentsCount: 9,
    shares: 5,
    liked: false,
  },
];

export const demoConnections: Connection[] = [
  {
    id: 'conn-1',
    connectedAt: '2025-11-18T09:00:00.000Z',
    user: {
      id: 'user-2',
      firstName: 'Maya',
      lastName: 'Rao',
      headline: 'Design Lead at Northstar Labs',
      location: 'Mumbai, India',
    },
  },
  {
    id: 'conn-2',
    connectedAt: '2025-09-21T09:00:00.000Z',
    user: {
      id: 'user-3',
      firstName: 'Kabir',
      lastName: 'Mehta',
      headline: 'Engineering Manager | Mobile Platform',
      location: 'Bengaluru, India',
    },
  },
];

export const demoRequests: ConnectionRequest[] = [
  {
    id: 'req-1',
    status: 'pending',
    createdAt: '2026-05-31T12:00:00.000Z',
    sender: {
      id: 'user-4',
      firstName: 'Naina',
      lastName: 'Kapoor',
      headline: 'Product Manager at Finbridge',
      location: 'Delhi, India',
    },
    receiver: {
      id: 'user-1',
      firstName: 'Arpit',
      lastName: 'Dhiman',
    },
  },
];

export const demoRecommendations: ConnectionRecommendation[] = [
  {
    id: 'rec-1',
    mutualConnections: 12,
    reason: 'Works in mobile product teams',
    user: {
      id: 'user-5',
      firstName: 'Ishaan',
      lastName: 'Sethi',
      headline: 'Staff Engineer at ScaleDesk',
      location: 'Pune, India',
    },
  },
  {
    id: 'rec-2',
    mutualConnections: 8,
    reason: 'Shares your interest in React Native',
    user: {
      id: 'user-6',
      firstName: 'Sara',
      lastName: 'Khan',
      headline: 'Founder, Launchlane',
      location: 'Hyderabad, India',
    },
  },
];

const demoMessageUser = {
  id: 'user-2',
  firstName: 'Maya',
  lastName: 'Rao',
  profileImage: undefined,
};

export const demoTeamMembers: TeamMember[] = [
  {
    id: 'user-1',
    firstName: 'Arpit',
    lastName: 'Dhiman',
    role: 'Senior React Native Engineer',
    department: 'Mobile Platform',
    status: 'available',
    email: 'arpit@msteamsclone.dev',
    phone: '+91 98765 43001',
  },
  {
    id: 'user-2',
    firstName: 'Maya',
    lastName: 'Rao',
    role: 'Design Lead',
    department: 'Product Design',
    status: 'busy',
    email: 'maya@msteamsclone.dev',
    phone: '+91 98765 43002',
  },
  {
    id: 'user-3',
    firstName: 'Kabir',
    lastName: 'Mehta',
    role: 'Engineering Manager',
    department: 'Mobile Platform',
    status: 'away',
    email: 'kabir@msteamsclone.dev',
    phone: '+91 98765 43003',
  },
  {
    id: 'user-4',
    firstName: 'Naina',
    lastName: 'Kapoor',
    role: 'Product Manager',
    department: 'Collaboration',
    status: 'available',
    email: 'naina@msteamsclone.dev',
    phone: '+91 98765 43004',
  },
  {
    id: 'user-5',
    firstName: 'Ishaan',
    lastName: 'Sethi',
    role: 'QA Lead',
    department: 'Release Quality',
    status: 'offline',
    email: 'ishaan@msteamsclone.dev',
    phone: '+91 98765 43005',
  },
];

export const demoMessages: Message[] = [
  {
    id: 'msg-1',
    conversationId: 'conv-1',
    sender: demoMessageUser,
    receiver: demoAuthUser,
    content: 'Loved the new feed pass. The post composer feels much more real now.',
    status: 'read',
    createdAt: '2026-05-31T15:10:00.000Z',
  },
  {
    id: 'msg-2',
    conversationId: 'conv-1',
    sender: demoAuthUser,
    receiver: demoMessageUser,
    content: 'Great. I added the compact channel preview and cleaned up the unread states.',
    status: 'read',
    createdAt: '2026-05-31T15:13:00.000Z',
  },
  {
    id: 'msg-3',
    conversationId: 'conv-2',
    sender: {
      id: 'user-3',
      firstName: 'Kabir',
      lastName: 'Mehta',
    },
    receiver: demoAuthUser,
    content: 'Can you join the release sync before standup? We need one call on navigation polish.',
    status: 'delivered',
    createdAt: '2026-06-01T08:45:00.000Z',
  },
  {
    id: 'msg-4',
    conversationId: 'conv-3',
    sender: {
      id: 'user-4',
      firstName: 'Naina',
      lastName: 'Kapoor',
    },
    receiver: demoAuthUser,
    content: 'The customer demo is moved to 4 PM. I shared the updated brief in General.',
    status: 'delivered',
    createdAt: '2026-06-01T10:05:00.000Z',
  },
];

export const demoConversations: Conversation[] = [
  {
    id: 'conv-1',
    participant: demoMessageUser,
    lastMessage: demoMessages[1],
    unreadCount: 0,
    updatedAt: '2026-05-31T15:13:00.000Z',
  },
  {
    id: 'conv-2',
    participant: {
      id: 'user-3',
      firstName: 'Kabir',
      lastName: 'Mehta',
    },
    lastMessage: demoMessages[2],
    unreadCount: 2,
    updatedAt: '2026-06-01T08:45:00.000Z',
  },
  {
    id: 'conv-3',
    participant: {
      id: 'user-4',
      firstName: 'Naina',
      lastName: 'Kapoor',
    },
    lastMessage: demoMessages[3],
    unreadCount: 1,
    updatedAt: '2026-06-01T10:05:00.000Z',
  },
];

export const demoTeamsChannels: TeamsChannel[] = [
  {
    id: 'channel-1',
    teamName: 'Northstar Product',
    channelName: 'General',
    description: 'Announcements, planning notes, and release updates',
    unreadCount: 3,
  },
  {
    id: 'channel-2',
    teamName: 'Mobile Platform',
    channelName: 'RN Architecture',
    description: 'Navigation, state, and shared UI decisions',
    unreadCount: 6,
  },
  {
    id: 'channel-3',
    teamName: 'Customer Demo',
    channelName: 'Launch Room',
    description: 'Demo runbook, blockers, and account notes',
    unreadCount: 0,
  },
];

export const demoTeamsActivities: TeamsActivity[] = [
  {
    id: 'activity-1',
    actor: demoTeamMembers[3],
    title: 'Mentioned you in Launch Room',
    body: '@Arpit can you confirm the mobile build number before the customer walkthrough?',
    type: 'mention',
    unread: true,
    createdAt: '2026-06-01T10:22:00.000Z',
  },
  {
    id: 'activity-2',
    actor: demoTeamMembers[1],
    title: 'Reacted to your message',
    body: 'Maya liked your navigation polish update in RN Architecture.',
    type: 'reaction',
    unread: true,
    createdAt: '2026-06-01T09:48:00.000Z',
  },
  {
    id: 'activity-3',
    actor: demoTeamMembers[2],
    title: 'Meeting starts in 15 minutes',
    body: 'Release sync with Mobile Platform is scheduled for 11:00 AM.',
    type: 'meeting',
    unread: false,
    createdAt: '2026-06-01T09:35:00.000Z',
  },
  {
    id: 'activity-4',
    actor: demoTeamMembers[4],
    title: 'Shared a file',
    body: 'Ishaan uploaded QA Signoff Checklist.pdf to General.',
    type: 'file',
    unread: false,
    createdAt: '2026-05-31T17:20:00.000Z',
  },
];

export const demoTeamsCalls: TeamsCall[] = [
  {
    id: 'call-1',
    contact: demoTeamMembers[2],
    type: 'video',
    direction: 'missed',
    duration: '0 min',
    createdAt: '2026-06-01T09:12:00.000Z',
  },
  {
    id: 'call-2',
    contact: demoTeamMembers[1],
    type: 'audio',
    direction: 'outgoing',
    duration: '18 min',
    createdAt: '2026-05-31T16:40:00.000Z',
  },
  {
    id: 'call-3',
    contact: demoTeamMembers[3],
    type: 'video',
    direction: 'incoming',
    duration: '32 min',
    createdAt: '2026-05-31T12:05:00.000Z',
  },
];

export const demoTeamsFiles: TeamsFile[] = [
  {
    id: 'file-1',
    name: 'Customer Demo Brief.docx',
    type: 'doc',
    owner: demoTeamMembers[3],
    channel: 'Launch Room',
    size: '1.8 MB',
    updatedAt: '2026-06-01T10:10:00.000Z',
    favorite: true,
  },
  {
    id: 'file-2',
    name: 'Mobile Release Tracker.xlsx',
    type: 'sheet',
    owner: demoTeamMembers[2],
    channel: 'RN Architecture',
    size: '742 KB',
    updatedAt: '2026-05-31T18:04:00.000Z',
    favorite: false,
  },
  {
    id: 'file-3',
    name: 'QA Signoff Checklist.pdf',
    type: 'pdf',
    owner: demoTeamMembers[4],
    channel: 'General',
    size: '920 KB',
    updatedAt: '2026-05-31T17:20:00.000Z',
    favorite: false,
  },
  {
    id: 'file-4',
    name: 'Chat IA Screens.png',
    type: 'image',
    owner: demoTeamMembers[1],
    channel: 'RN Architecture',
    size: '3.4 MB',
    updatedAt: '2026-05-30T14:00:00.000Z',
    favorite: true,
  },
];

export const demoNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'post_liked',
    actor: { id: 'user-2', firstName: 'Maya', lastName: 'Rao' },
    message: 'liked your post about polished mobile products.',
    read: false,
    createdAt: '2026-05-31T16:00:00.000Z',
  },
  {
    id: 'notif-2',
    type: 'connection_request',
    actor: { id: 'user-4', firstName: 'Naina', lastName: 'Kapoor' },
    message: 'sent you a connection request.',
    read: false,
    createdAt: '2026-05-31T12:00:00.000Z',
  },
  {
    id: 'notif-3',
    type: 'profile_viewed',
    actor: { id: 'user-6', firstName: 'Sara', lastName: 'Khan' },
    message: 'viewed your profile.',
    read: true,
    createdAt: '2026-05-30T11:00:00.000Z',
  },
];

export const demoJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Senior React Native Engineer',
    companyName: 'Northstar Labs',
    location: 'Bengaluru, India',
    workMode: 'hybrid',
    postedAt: '2026-05-31T09:00:00.000Z',
    applicants: 42,
    salaryRange: '₹38L - ₹55L',
    description: 'Own high-impact mobile surfaces across feed, auth, profile, and notification workflows.',
    skills: ['React Native', 'Redux Toolkit', 'TypeScript'],
    saved: true,
    applied: false,
  },
  {
    id: 'job-2',
    title: 'Mobile Product Engineer',
    companyName: 'Launchlane',
    location: 'Remote',
    workMode: 'remote',
    postedAt: '2026-05-30T09:00:00.000Z',
    applicants: 28,
    salaryRange: '₹30L - ₹44L',
    description: 'Build product-led mobile experiences for founders and operators.',
    skills: ['React Native', 'GraphQL', 'Design Systems'],
    saved: false,
    applied: false,
  },
  {
    id: 'job-3',
    title: 'Frontend Platform Lead',
    companyName: 'ScaleDesk',
    location: 'Pune, India',
    workMode: 'onsite',
    postedAt: '2026-05-29T09:00:00.000Z',
    applicants: 73,
    description: 'Lead shared UI architecture for web and mobile teams.',
    skills: ['TypeScript', 'Architecture', 'Mentoring'],
    saved: false,
    applied: true,
  },
];
