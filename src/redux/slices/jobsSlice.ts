import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { demoJobs } from '../../data/demoData';
import { Job, JobsState } from '../../types';

const initialState: JobsState = {
  jobs: demoJobs,
  savedJobIds: demoJobs.filter((job) => job.saved).map((job) => job.id),
  appliedJobIds: demoJobs.filter((job) => job.applied).map((job) => job.id),
  selectedJob: null,
  searchQuery: '',
  loading: false,
  error: null,
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedJob: (state, action: PayloadAction<Job | null>) => {
      state.selectedJob = action.payload;
    },
    saveJob: (state, action: PayloadAction<string>) => {
      const job = state.jobs.find((item) => item.id === action.payload);
      if (job && !job.saved) {
        job.saved = true;
        state.savedJobIds.push(job.id);
      }
    },
    unsaveJob: (state, action: PayloadAction<string>) => {
      const job = state.jobs.find((item) => item.id === action.payload);
      if (job) {
        job.saved = false;
      }
      state.savedJobIds = state.savedJobIds.filter((id) => id !== action.payload);
    },
    applyToJob: (state, action: PayloadAction<string>) => {
      const job = state.jobs.find((item) => item.id === action.payload);
      if (job && !job.applied) {
        job.applied = true;
        state.appliedJobIds.push(job.id);
      }
    },
  },
});

export const {
  setLoading,
  setError,
  setSearchQuery,
  setSelectedJob,
  saveJob,
  unsaveJob,
  applyToJob,
} = jobsSlice.actions;

export default jobsSlice.reducer;
