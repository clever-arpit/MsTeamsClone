import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeedState, Post, Comment } from '../../types';
import { demoPosts } from '../../data/demoData';

const initialState: FeedState = {
  posts: demoPosts,
  page: 1,
  limit: 10,
  hasMore: true,
  loading: false,
  error: null,
  selectedPost: null,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setPosts: (state, action: PayloadAction<{ posts: Post[]; page: number; hasMore: boolean }>) => {
      if (action.payload.page === 1) {
        state.posts = action.payload.posts;
      } else {
        state.posts = [...state.posts, ...action.payload.posts];
      }
      state.page = action.payload.page;
      state.hasMore = action.payload.hasMore;
      state.loading = false;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((p) => p.id !== action.payload);
    },
    likePost: (state, action: PayloadAction<string>) => {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post && !post.liked) {
        post.liked = true;
        post.likes += 1;
      }
    },
    unlikePost: (state, action: PayloadAction<string>) => {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post && post.liked) {
        post.liked = false;
        post.likes = Math.max(0, post.likes - 1);
      }
    },
    repostPost: (state, action: PayloadAction<string>) => {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) {
        post.shares += 1;
      }
    },
    addComment: (state, action: PayloadAction<{ postId: string; comment: Comment }>) => {
      const post = state.posts.find((p) => p.id === action.payload.postId);
      if (post) {
        post.comments.push(action.payload.comment);
        post.commentsCount += 1;
      }
    },
    removeComment: (state, action: PayloadAction<{ postId: string; commentId: string }>) => {
      const post = state.posts.find((p) => p.id === action.payload.postId);
      if (post) {
        post.comments = post.comments.filter((c) => c.id !== action.payload.commentId);
        post.commentsCount -= 1;
      }
    },
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
  },
});

export const {
  setLoading,
  setError,
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
  incrementPage,
} = feedSlice.actions;

export default feedSlice.reducer;
