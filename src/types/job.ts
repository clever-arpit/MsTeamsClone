export type JobWorkMode = 'remote' | 'hybrid' | 'onsite';

export interface Job {
  id: string;
  title: string;
  companyName: string;
  location: string;
  workMode: JobWorkMode;
  postedAt: string;
  applicants: number;
  salaryRange?: string;
  description: string;
  skills: string[];
  saved: boolean;
  applied: boolean;
}

export interface JobsState {
  jobs: Job[];
  savedJobIds: string[];
  appliedJobIds: string[];
  selectedJob: Job | null;
  searchQuery: string;
  loading: boolean;
  error: string | null;
}
