import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { addComment, addPost, likePost, repostPost, unlikePost } from '../../redux';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { FeedComposer, getInitials, LinkedInNewsCard, PostCard } from '../../components/feed';
import { Post } from '../../types';
import { COLORS, SPACING } from '../../styles';

const FeedScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.feed.posts);
  const user = useAppSelector((state) => state.auth.user);
  const profile = useAppSelector((state) => state.user.profile);
  const [draft, setDraft] = useState('');
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [sentPostId, setSentPostId] = useState<string | null>(null);
  const [repostedPostIds, setRepostedPostIds] = useState<Record<string, boolean>>({});

  const userInitials = useMemo(
    () => getInitials(user?.firstName ?? profile?.firstName, user?.lastName ?? profile?.lastName),
    [profile?.firstName, profile?.lastName, user?.firstName, user?.lastName]
  );

  const author = {
    id: user?.id ?? 'user-1',
    firstName: user?.firstName ?? profile?.firstName ?? 'LinkedIn',
    lastName: user?.lastName ?? profile?.lastName ?? 'Member',
    headline: profile?.headline,
  };

  const publishPost = () => {
    if (!draft.trim()) return;

    dispatch(
      addPost({
        id: `post-${Date.now()}`,
        author,
        content: draft.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        likes: 0,
        comments: [],
        commentsCount: 0,
        shares: 0,
        liked: false,
      })
    );
    setDraft('');
  };

  const publishComment = (postId: string) => {
    const text = commentDrafts[postId]?.trim();
    if (!text) return;

    dispatch(
      addComment({
        postId,
        comment: {
          id: `comment-${Date.now()}`,
          author,
          text,
          createdAt: new Date().toISOString(),
          likes: 0,
          liked: false,
        },
      })
    );
    setCommentDrafts((current) => ({ ...current, [postId]: '' }));
  };

  const handleRepost = (postId: string) => {
    dispatch(repostPost(postId));
    setRepostedPostIds((current) => ({ ...current, [postId]: true }));
  };

  const renderPost = ({ item }: { item: Post }) => (
    <PostCard
      activeCommentPostId={activeCommentPostId}
      commentDraft={commentDrafts[item.id] ?? ''}
      currentUserInitials={userInitials}
      isReposted={Boolean(repostedPostIds[item.id])}
      isSent={sentPostId === item.id}
      onChangeComment={(text) => setCommentDrafts((current) => ({ ...current, [item.id]: text }))}
      onCommentPress={() => setActiveCommentPostId(activeCommentPostId === item.id ? null : item.id)}
      onLikePress={() => dispatch(item.liked ? unlikePost(item.id) : likePost(item.id))}
      onPublishComment={() => publishComment(item.id)}
      onRepostPress={() => handleRepost(item.id)}
      onSendPress={() => setSentPostId(item.id)}
      post={item}
      repostedByName={author.firstName}
    />
  );

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <FeedComposer
            draft={draft}
            initials={userInitials}
            onChangeDraft={setDraft}
            onPost={publishPost}
          />
          <LinkedInNewsCard />
        </>
      }
      contentContainerStyle={styles.listContent}
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={renderPost}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    backgroundColor: COLORS.SURFACE,
    paddingBottom: SPACING.L,
  },
});

export default FeedScreen;
