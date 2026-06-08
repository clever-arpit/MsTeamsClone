// Export store and hooks
export { store } from './store';
export type { RootState, AppDispatch } from './store';
export { useAppDispatch, useAppSelector } from './hooks';

// Export slice reducers
export { default as authReducer } from './slices/authSlice';
export { default as userReducer } from './slices/userSlice';
export { default as feedReducer } from './slices/feedSlice';
export { default as connectionReducer } from './slices/connectionSlice';
export { default as messageReducer } from './slices/messageSlice';
export { default as notificationReducer } from './slices/notificationSlice';
export { default as jobsReducer } from './slices/jobsSlice';
export { default as uiReducer } from './slices/uiSlice';

// Export slice actions with unique names to avoid re-export collisions.
export {
  setLoading as setAuthLoading,
  setError as setAuthError,
  loginSuccess,
  signupSuccess,
  logout,
  restoreSession,
  updateUser,
} from './slices/authSlice';
export {
  setLoading as setUserLoading,
  setError as setUserError,
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
} from './slices/userSlice';
export {
  setLoading as setFeedLoading,
  setError as setFeedError,
  setPosts,
  addPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  repostPost,
  addComment,
  removeComment,
  setSelectedPost,
  incrementPage as incrementFeedPage,
} from './slices/feedSlice';
export {
  setLoading as setConnectionLoading,
  setError as setConnectionError,
  setConnections,
  addConnection,
  removeConnection,
  setRequests,
  addRequest,
  removeRequest,
  setRecommendations,
  removeRecommendation,
  setSelectedConnection,
} from './slices/connectionSlice';
export {
  setLoading as setMessageLoading,
  setError as setMessageError,
  setConversations,
  updateConversation,
  removeConversation,
  setCurrentConversation,
  addMessage,
  removeMessage,
  setSelectedConversation,
  markAsRead as markMessageAsRead,
  incrementPage as incrementMessagePage,
} from './slices/messageSlice';
export {
  setLoading as setNotificationLoading,
  setError as setNotificationError,
  setNotifications,
  addNotification,
  removeNotification,
  markAsRead as markNotificationAsRead,
  markAllAsRead,
  setUnreadCount,
  incrementPage as incrementNotificationPage,
} from './slices/notificationSlice';
export {
  setLoading as setJobsLoading,
  setError as setJobsError,
  setSearchQuery as setJobsSearchQuery,
  setSelectedJob,
  saveJob,
  unsaveJob,
  applyToJob,
} from './slices/jobsSlice';
export { setTheme, setBottomTabIndex, setOnlineStatus, setModalOpen } from './slices/uiSlice';
