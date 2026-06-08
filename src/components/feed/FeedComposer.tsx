import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Avatar } from '../common';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

interface FeedComposerProps {
  draft: string;
  initials: string;
  onChangeDraft: (value: string) => void;
  onPost: () => void;
}

const FeedComposer: React.FC<FeedComposerProps> = ({
  draft,
  initials,
  onChangeDraft,
  onPost,
}) => {
  const canPost = Boolean(draft.trim());

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Avatar initials={initials} size="medium" />
        <TextInput
          multiline
          onChangeText={onChangeDraft}
          placeholder="Start a post"
          placeholderTextColor={COLORS.TEXT_SECONDARY}
          style={styles.input}
          value={draft}
        />
      </View>
      <View style={styles.actions}>
        <Pressable style={styles.mediaButton}>
          <Text style={[styles.mediaIcon, styles.photoIcon]}>▧</Text>
          <Text style={styles.mediaText}>Photo</Text>
        </Pressable>
        <Pressable style={styles.mediaButton}>
          <Text style={[styles.mediaIcon, styles.videoIcon]}>▶</Text>
          <Text style={styles.mediaText}>Video</Text>
        </Pressable>
        <Pressable style={styles.mediaButton}>
          <Text style={[styles.mediaIcon, styles.articleIcon]}>≡</Text>
          <Text style={styles.mediaText}>Article</Text>
        </Pressable>
        <Pressable
          disabled={!canPost}
          onPress={onPost}
          style={[styles.postButton, !canPost && styles.disabledPostButton]}
        >
          <Text style={styles.postButtonText}>Post</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND,
    borderBottomColor: COLORS.DIVIDER,
    borderBottomWidth: 1,
    paddingHorizontal: SPACING.M,
    paddingVertical: SPACING.SM,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SPACING.SM,
  },
  input: {
    borderColor: COLORS.DIVIDER,
    borderRadius: 24,
    borderWidth: 1,
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
    minHeight: 48,
    paddingHorizontal: SPACING.M,
    paddingVertical: SPACING.S,
  },
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.SM,
  },
  mediaButton: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SPACING.XS,
    minHeight: 34,
  },
  mediaIcon: {
    fontSize: 16,
    fontWeight: '700',
  },
  photoIcon: {
    color: COLORS.SUCCESS,
  },
  videoIcon: {
    color: COLORS.INFO,
  },
  articleIcon: {
    color: COLORS.WARNING,
  },
  mediaText: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    fontWeight: '700',
  },
  postButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 18,
    paddingHorizontal: SPACING.M,
    paddingVertical: SPACING.S,
  },
  disabledPostButton: {
    opacity: 0.4,
  },
  postButtonText: {
    color: COLORS.TEXT_INVERSE,
    fontWeight: '700',
  },
});

export default FeedComposer;
