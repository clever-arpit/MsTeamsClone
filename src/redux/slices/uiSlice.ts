import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UIState {
  theme: 'light' | 'dark';
  bottomTabIndex: number;
  isOnline: boolean;
  isModalOpen: boolean;
}

const initialState: UIState = {
  theme: 'light',
  bottomTabIndex: 0,
  isOnline: true,
  isModalOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setBottomTabIndex: (state, action: PayloadAction<number>) => {
      state.bottomTabIndex = action.payload;
    },
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const { setTheme, setBottomTabIndex, setOnlineStatus, setModalOpen } = uiSlice.actions;

export default uiSlice.reducer;
