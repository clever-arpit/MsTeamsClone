import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';
import Icons from '../../utils/Icons';
import CustomIcon from '../CustomIcon';

const ChatHeader: React.FC<{ onBack: () => void; title: string; subtitle?: string }> = ({ onBack, title, subtitle }) => (
  <View style={styles.container}>
    <View style={styles.leftRow}>
      <Pressable onPress={onBack} style={styles.backButton}>
        <CustomIcon icon={Icons.backIcon} color={COLORS.TEXT_PRIMARY} />
      </Pressable>
      <View style={styles.avatar}>
        <Image source={Icons.userAvatar} style={{ width: 36, height: 36 }} />
      </View>
      <View style={styles.nameBlock}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>

    <View style={styles.rightRow}>
      <Pressable style={styles.iconButton}>
        <CustomIcon icon={Icons.searchIcon} color={COLORS.TEXT_PRIMARY} />
      </Pressable>
      <Pressable style={styles.iconButton}>
        <CustomIcon icon={Icons.verticalDotsIcon} color={COLORS.TEXT_PRIMARY} />
      </Pressable>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: SPACING.M, backgroundColor: COLORS.BACKGROUND, borderBottomColor: COLORS.DIVIDER, borderBottomWidth: 1 },
  leftRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.S },
  backButton: { padding: 8 },
  avatar: { width: 40, height: 40, borderRadius: 20, overflow: 'hidden', marginLeft: 4 },
  nameBlock: { marginLeft: SPACING.S },
  title: { ...TYPOGRAPHY.SUBTITLE2, color: COLORS.TEXT_PRIMARY },
  subtitle: { ...TYPOGRAPHY.CAPTION, color: COLORS.TEXT_SECONDARY },
  rightRow: { flexDirection: 'row', gap: SPACING.S },
  iconButton: { padding: 8 },
});

export default ChatHeader;
