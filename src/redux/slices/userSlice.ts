import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, UserProfile, Experience, Education, Skill } from '../../types';
import { demoEducation, demoExperience, demoProfile, demoSkills } from '../../data/demoData';

const initialState: UserState = {
  profile: demoProfile,
  experience: demoExperience,
  education: demoEducation,
  skills: demoSkills,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    },
    setExperience: (state, action: PayloadAction<Experience[]>) => {
      state.experience = action.payload;
    },
    addExperience: (state, action: PayloadAction<Experience>) => {
      state.experience.push(action.payload);
    },
    updateExperience: (state, action: PayloadAction<Experience>) => {
      const index = state.experience.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.experience[index] = action.payload;
      }
    },
    removeExperience: (state, action: PayloadAction<string>) => {
      state.experience = state.experience.filter((e) => e.id !== action.payload);
    },
    setEducation: (state, action: PayloadAction<Education[]>) => {
      state.education = action.payload;
    },
    addEducation: (state, action: PayloadAction<Education>) => {
      state.education.push(action.payload);
    },
    updateEducation: (state, action: PayloadAction<Education>) => {
      const index = state.education.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.education[index] = action.payload;
      }
    },
    removeEducation: (state, action: PayloadAction<string>) => {
      state.education = state.education.filter((e) => e.id !== action.payload);
    },
    setSkills: (state, action: PayloadAction<Skill[]>) => {
      state.skills = action.payload;
    },
    addSkill: (state, action: PayloadAction<Skill>) => {
      state.skills.push(action.payload);
    },
    updateSkill: (state, action: PayloadAction<Skill>) => {
      const index = state.skills.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.skills[index] = action.payload;
      }
    },
    removeSkill: (state, action: PayloadAction<string>) => {
      state.skills = state.skills.filter((s) => s.id !== action.payload);
    },
  },
});

export const {
  setLoading,
  setError,
  setProfile,
  setExperience,
  addExperience,
  updateExperience,
  removeExperience,
  setEducation,
  addEducation,
  updateEducation,
  removeEducation,
  setSkills,
  addSkill,
  updateSkill,
  removeSkill,
} = userSlice.actions;

export default userSlice.reducer;
