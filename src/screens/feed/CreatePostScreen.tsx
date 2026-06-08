import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { addPost } from '../../redux';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

const initials = (firstName?: string, lastName?: string) =>
  `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase();

const CreatePostScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const profile = useAppSelector((state) => state.user.profile);
  const [content, setContent] = useState('');
  const [audience, setAudience] = useState<'anyone' | 'connections'>('anyone');

  const author = useMemo(
    () => ({
      id: user?.id ?? 'user-1',
      firstName: user?.firstName ?? profile?.firstName ?? 'LinkedIn',
      lastName: user?.lastName ?? profile?.lastName ?? 'Member',
      headline: profile?.headline,
    }),
    [profile?.firstName, profile?.headline, profile?.lastName, user?.firstName, user?.id, user?.lastName]
  );

  const publish = () => {
    if (!content.trim()) return;

    dispatch(
      addPost({
        id: `post-${Date.now()}`,
        author,
        content: content.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        likes: 0,
        comments: [],
        commentsCount: 0,
        shares: 0,
        liked: false,
      })
    );
    setContent('');
    navigation.navigate('FeedTab');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.authorRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials(author.firstName, author.lastName)}</Text>
        </View>
        <View style={styles.authorInfo}>
          <Text style={styles.name}>{author.firstName} {author.lastName}</Text>
          <View style={styles.audienceRow}>
            {(['anyone', 'connections'] as const).map((item) => (
              <Pressable
                key={item}
                onPress={() => setAudience(item)}
                style={[styles.audienceButton, audience === item && styles.activeAudience]}
              >
                <Text style={[styles.audienceText, audience === item && styles.activeAudienceText]}>
                  {item === 'anyone' ? 'Anyone' : 'Connections'}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      <TextInput
        autoFocus
        multiline
        onChangeText={setContent}
        placeholder="Share an update, insight, or opportunity"
        placeholderTextColor={COLORS.TEXT_TERTIARY}
        style={styles.editor}
        textAlignVertical="top"
        value={content}
      />

      <View style={styles.toolGrid}>
        <Text style={styles.tool}>Photo</Text>
        <Text style={styles.tool}>Video</Text>
        <Text style={styles.tool}>Document</Text>
        <Text style={styles.tool}>Poll</Text>
      </View>

      <Pressable style={[styles.postButton, !content.trim() && styles.disabled]} onPress={publish}>
        <Text style={styles.postButtonText}>Post</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  content: {
    padding: SPACING.M,
  },
  authorRow: {
    flexDirection: 'row',
    gap: SPACING.M,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY_DARK,
    borderRadius: 26,
    height: 52,
    justifyContent: 'center',
    width: 52,
  },
  avatarText: {
    color: COLORS.TEXT_INVERSE,
    fontWeight: '700',
  },
  authorInfo: {
    flex: 1,
  },
  name: {
    ...TYPOGRAPHY.SUBTITLE2,
    color: COLORS.TEXT_PRIMARY,
  },
  audienceRow: {
    flexDirection: 'row',
    gap: SPACING.S,
    marginTop: SPACING.S,
  },
  audienceButton: {
    borderColor: COLORS.BORDER,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: SPACING.M,
    paddingVertical: SPACING.XS,
  },
  activeAudience: {
    borderColor: COLORS.PRIMARY,
  },
  audienceText: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    fontWeight: '700',
  },
  activeAudienceText: {
    color: COLORS.PRIMARY,
  },
  editor: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 20,
    lineHeight: 28,
    minHeight: 260,
    paddingVertical: SPACING.L,
  },
  toolGrid: {
    borderTopColor: COLORS.BORDER,
    borderTopWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.S,
    paddingTop: SPACING.M,
  },
  tool: {
    ...TYPOGRAPHY.SUBTITLE2,
    backgroundColor: COLORS.SURFACE,
    borderRadius: 18,
    color: COLORS.TEXT_SECONDARY,
    overflow: 'hidden',
    paddingHorizontal: SPACING.M,
    paddingVertical: SPACING.S,
  },
  postButton: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 20,
    marginTop: SPACING.L,
    paddingHorizontal: SPACING.XL,
    paddingVertical: SPACING.S,
  },
  disabled: {
    opacity: 0.45,
  },
  postButtonText: {
    color: COLORS.TEXT_INVERSE,
    fontWeight: '700',
  },
});

export default CreatePostScreen;
