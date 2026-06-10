import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  demoTeamMembers,
  demoTeamsActivities,
  demoTeamsCalls,
  demoTeamsChannels,
  demoTeamsFiles,
} from '../../data/demoData';
import { TeamsState } from '../../types';

const initialState: TeamsState = {
  members: demoTeamMembers,
  activities: demoTeamsActivities,
  calls: demoTeamsCalls,
  files: demoTeamsFiles,
  channels: demoTeamsChannels,
  searchQuery: '',
  selectedFileId: null,
};

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    setTeamsSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    markActivityRead: (state, action: PayloadAction<string>) => {
      const activity = state.activities.find(item => item.id === action.payload);
      if (activity) {
        activity.unread = false;
      }
    },
    markAllActivitiesRead: state => {
      state.activities.forEach(item => {
        item.unread = false;
      });
    },
    toggleFileFavorite: (state, action: PayloadAction<string>) => {
      const file = state.files.find(item => item.id === action.payload);
      if (file) {
        file.favorite = !file.favorite;
      }
    },
    setSelectedFile: (state, action: PayloadAction<string | null>) => {
      state.selectedFileId = action.payload;
    },
  },
});

export const {
  markActivityRead,
  markAllActivitiesRead,
  setSelectedFile,
  setTeamsSearchQuery,
  toggleFileFavorite,
} = teamsSlice.actions;

export default teamsSlice.reducer;
