export interface PostAuthor {
  id: string;
  firstName: string;
  lastName: string;
  headline?: string;
  profileImage?: string;
}

export interface Comment {
  id: string;
  author: PostAuthor;
  text: string;
  createdAt: string;
  likes: number;
  liked: boolean;
}

export interface Post {
  id: string;
  author: PostAuthor;
  content: string;
  image?: string;
  video?: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: Comment[];
  commentsCount: number;
  shares: number;
  liked: boolean;
  commentedBy?: string[];
}

export interface CreatePostData {
  content: string;
  image?: string;
  video?: string;
}

export interface UpdatePostData {
  content: string;
  image?: string;
  video?: string;
}

export interface CreateCommentData {
  text: string;
  postId: string;
}

export interface FeedState {
  posts: Post[];
  page: number;
  limit: number;
  hasMore: boolean;
  loading: boolean;
  error: string | null;
  selectedPost: Post | null;
}
