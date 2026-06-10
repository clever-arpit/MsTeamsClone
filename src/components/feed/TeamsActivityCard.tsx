import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

const TeamsActivityCard: React.FC = () => (
  <View style={styles.container}>
    <View style={styles.headerRow}>
      <Text style={styles.title}>Activity</Text>
      <View style={styles.infoDot}>
        <Text style={styles.infoText}>i</Text>
      </View>
    </View>
    <View style={styles.story}>
      <Text style={styles.bullet}>•</Text>
      <View style={styles.storyBody}>
        <Text style={styles.storyTitle}>Your team deployed a new release</Text>
        <Text style={styles.storyMeta}>2h ago • 12 people notified</Text>
      </View>
    </View>
    <View style={styles.story}>
      <Text style={styles.bullet}>•</Text>
      <View style={styles.storyBody}>
        <Text style={styles.storyTitle}>Meeting notes shared in Project Alpha</Text>
        <Text style={styles.storyMeta}>6h ago • 5 people commented</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND,
    borderBottomColor: COLORS.DIVIDER,
    borderBottomWidth: 1,
    marginTop: SPACING.S,
    paddingHorizontal: SPACING.M,
    paddingVertical: SPACING.SM,
  },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.XS,
  },
  title: {
    ...TYPOGRAPHY.SUBTITLE2,
    color: COLORS.TEXT_PRIMARY,
  },
  infoDot: {
    alignItems: 'center',
    borderColor: COLORS.TEXT_SECONDARY,
    borderRadius: 9,
    borderWidth: 1,
    height: 18,
    justifyContent: 'center',
    width: 18,
  },
  infoText: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    fontWeight: '700',
  },
  story: {
    flexDirection: 'row',
    gap: SPACING.S,
    paddingVertical: SPACING.XS,
  },
  bullet: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 18,
    lineHeight: 20,
  },
  storyBody: {
    flex: 1,
  },
  storyTitle: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '700',
  },
  storyMeta: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
  },
});

export default TeamsActivityCard;
