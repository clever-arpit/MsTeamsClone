import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Avatar } from '../common';
import { Comment, Post } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';
import { formatCompactNumber, getInitials } from './feedUtils';
import PostActionButton from './PostActionButton';

interface PostCardProps {
  activeCommentPostId: string | null;
  commentDraft: string;
  currentUserInitials: string;
  isReposted: boolean;
  isSent: boolean;
  onChangeComment: (value: string) => void;
  onCommentPress: () => void;
  onLikePress: () => void;
  onPublishComment: () => void;
  onRepostPress: () => void;
  onSendPress: () => void;
  post: Post;
  repostedByName: string;
}

const PostCard: React.FC<PostCardProps> = ({
  activeCommentPostId,
  commentDraft,
  currentUserInitials,
  isReposted,
  isSent,
  onChangeComment,
  onCommentPress,
  onLikePress,
  onPublishComment,
  onRepostPress,
  onSendPress,
  post,
  repostedByName,
}) => {
  const latestComments = post.comments.slice(-2).reverse();
  const authorInitials = getInitials(post.author.firstName, post.author.lastName);
  const commentsVisible = activeCommentPostId === post.id;

  return (
    <View style={styles.card}>
      {isReposted ? <Text style={styles.repostNotice}>{repostedByName} reposted this</Text> : null}

      <View style={styles.header}>
        <Avatar initials={authorInitials} size="medium" />
        <View style={styles.authorBlock}>
          <Text style={styles.authorName}>
            {post.author.firstName} {post.author.lastName}
          </Text>
          <Text numberOfLines={1} style={styles.authorMeta}>
            {post.author.headline}
          </Text>
          <Text style={styles.authorMeta}>1d • 🌐</Text>
        </View>
        <Pressable style={styles.moreButton}>
          <Text style={styles.moreText}>•••</Text>
        </Pressable>
      </View>

      <Text style={styles.content}>{post.content}</Text>

      <View style={styles.statsRow}>
        <Text style={styles.statText}>👍 {formatCompactNumber(post.likes)}</Text>
        <Text style={styles.statText}>
          {post.commentsCount} comments • {post.shares} reposts
        </Text>
      </View>

      <View style={styles.actionRow}>
        <PostActionButton
          active={post.liked}
          icon={post.liked ? '👍' : '♡'}
          label={post.liked ? 'Liked' : 'Like'}
          onPress={onLikePress}
        />
        <PostActionButton
          active={commentsVisible}
          icon="💬"
          label="Comment"
          onPress={onCommentPress}
        />
        <PostActionButton
          active={isReposted}
          icon="↻"
          label="Repost"
          onPress={onRepostPress}
        />
        <PostActionButton
          active={isSent}
          icon="➤"
          label={isSent ? 'Sent' : 'Send'}
          onPress={onSendPress}
        />
      </View>

      {isSent ? (
        <View style={styles.feedbackBanner}>
          <Text style={styles.feedbackText}>Post shared to a demo conversation.</Text>
        </View>
      ) : null}

      {commentsVisible ? (
        <View style={styles.commentComposer}>
          <Avatar initials={currentUserInitials} size="small" />
          <TextInput
            multiline
            onChangeText={onChangeComment}
            placeholder="Write a thoughtful comment"
            placeholderTextColor={COLORS.TEXT_SECONDARY}
            style={styles.commentInput}
            value={commentDraft}
          />
          <Pressable onPress={onPublishComment} style={styles.commentPostButton}>
            <Text style={styles.commentPostText}>Post</Text>
          </Pressable>
        </View>
      ) : null}

      {latestComments.length > 0 ? (
        <View style={styles.commentsBlock}>
          {latestComments.map((comment: Comment) => (
            <View key={comment.id} style={styles.commentBubble}>
              <Text style={styles.commentAuthor}>
                {comment.author.firstName} {comment.author.lastName}
              </Text>
              <Text style={styles.commentText}>{comment.text}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.BACKGROUND,
    borderBottomColor: COLORS.DIVIDER,
    borderBottomWidth: 1,
    marginTop: SPACING.S,
    paddingHorizontal: SPACING.M,
    paddingTop: SPACING.SM,
    paddingBottom: SPACING.S,
  },
  repostNotice: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    fontWeight: '700',
    marginBottom: SPACING.S,
    marginLeft: 56,
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: SPACING.SM,
  },
  authorBlock: {
    flex: 1,
  },
  authorName: {
    ...TYPOGRAPHY.SUBTITLE2,
    color: COLORS.TEXT_PRIMARY,
  },
  authorMeta: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
  },
  moreButton: {
    alignItems: 'center',
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  moreText: {
    color: COLORS.TEXT_SECONDARY,
    fontWeight: '700',
  },
  content: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.TEXT_PRIMARY,
    marginTop: SPACING.SM,
  },
  statsRow: {
    borderBottomColor: COLORS.BORDER,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.SM,
    paddingBottom: SPACING.S,
  },
  statText: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
  },
  actionRow: {
    flexDirection: 'row',
  },
  feedbackBanner: {
    backgroundColor: COLORS.SUCCESS_LIGHT,
    borderRadius: 4,
    marginTop: SPACING.S,
    paddingHorizontal: SPACING.M,
    paddingVertical: SPACING.S,
  },
  feedbackText: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.SECONDARY,
  },
  commentComposer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: SPACING.S,
    marginTop: SPACING.SM,
  },
  commentInput: {
    backgroundColor: COLORS.SURFACE,
    borderRadius: 18,
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
    minHeight: 38,
    paddingHorizontal: SPACING.M,
    paddingVertical: SPACING.S,
  },
  commentPostButton: {
    borderColor: COLORS.PRIMARY,
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: SPACING.M,
    paddingVertical: SPACING.S,
  },
  commentPostText: {
    color: COLORS.PRIMARY,
    fontWeight: '700',
  },
  commentsBlock: {
    gap: SPACING.S,
    marginTop: SPACING.SM,
  },
  commentBubble: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.SURFACE,
    borderRadius: 8,
    maxWidth: '92%',
    padding: SPACING.SM,
  },
  commentAuthor: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '700',
  },
  commentText: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.TEXT_PRIMARY,
    marginTop: SPACING.XS,
  },
});

export default PostCard;
