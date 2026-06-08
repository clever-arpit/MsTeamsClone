import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

interface PostActionButtonProps {
  active?: boolean;
  icon: string;
  label: string;
  onPress: () => void;
}

const PostActionButton: React.FC<PostActionButtonProps> = ({
  active = false,
  icon,
  label,
  onPress,
}) => (
  <Pressable onPress={onPress} style={styles.button}>
    <Text style={[styles.icon, active && styles.active]}>{icon}</Text>
    <Text style={[styles.label, active && styles.active]}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flex: 1,
    gap: SPACING.XS,
    justifyContent: 'center',
    minHeight: 52,
  },
  icon: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 20,
  },
  label: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    fontWeight: '700',
  },
  active: {
    color: COLORS.PRIMARY,
  },
});

export default PostActionButton;
