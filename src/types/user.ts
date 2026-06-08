export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  headline?: string;
  about?: string;
  profileImage?: string;
  coverImage?: string;
  location?: string;
  website?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
}

export interface Experience {
  id: string;
  companyName: string;
  position: string;
  startDate: string;
  endDate?: string;
  isCurrentlyWorking: boolean;
  description?: string;
}

export interface Education {
  id: string;
  schoolName: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  grade?: string;
}

export interface Skill {
  id: string;
  name: string;
  endorsements: number;
  endorsed: boolean;
}

export interface UserState {
  profile: UserProfile | null;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  loading: boolean;
  error: string | null;
}
