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
  UserProfile,
} from '../types';

export const demoAuthUser: AuthUser = {
  id: 'user-1',
  email: 'arpit@linkedinclone.dev',
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
  website: 'linkedinclone.dev/arpit',
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
};

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
];

export const demoConversations: Conversation[] = [
  {
    id: 'conv-1',
    participant: demoMessageUser,
    lastMessage: demoMessages[0],
    unreadCount: 0,
    updatedAt: '2026-05-31T15:10:00.000Z',
  },
  {
    id: 'conv-2',
    participant: {
      id: 'user-3',
      firstName: 'Kabir',
      lastName: 'Mehta',
    },
    unreadCount: 2,
    updatedAt: '2026-05-31T08:45:00.000Z',
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
