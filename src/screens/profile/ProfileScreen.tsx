import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { logout } from '../../redux';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

const ProfileScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.user.profile);
  const experience = useAppSelector((state) => state.user.experience);
  const education = useAppSelector((state) => state.user.education);
  const skills = useAppSelector((state) => state.user.skills);

  if (!profile) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Profile data is not available.</Text>
      </View>
    );
  }

  const initials = `${profile.firstName[0]}${profile.lastName[0]}`.toUpperCase();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <View style={styles.cover} />
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <Text style={styles.name}>{profile.firstName} {profile.lastName}</Text>
        <Text style={styles.headline}>{profile.headline}</Text>
        <Text style={styles.location}>{profile.location} • {profile.website}</Text>

        <View style={styles.metricRow}>
          <Text style={styles.metric}>{profile.followersCount.toLocaleString()} followers</Text>
          <Text style={styles.metric}>{profile.followingCount.toLocaleString()} following</Text>
          <Text style={styles.metric}>{profile.postsCount} posts</Text>
        </View>

        <View style={styles.buttonRow}>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Open to</Text>
          </Pressable>
          <Pressable style={styles.outlineButton}>
            <Text style={styles.outlineButtonText}>Add section</Text>
          </Pressable>
          <Pressable style={styles.outlineButton} onPress={() => dispatch(logout())}>
            <Text style={styles.outlineButtonText}>Logout</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.body}>{profile.about}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {experience.map((item) => (
          <View key={item.id} style={styles.timelineItem}>
            <View style={styles.companyMark}>
              <Text style={styles.companyMarkText}>{item.companyName[0]}</Text>
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.itemTitle}>{item.position}</Text>
              <Text style={styles.itemMeta}>{item.companyName}</Text>
              <Text style={styles.itemMeta}>
                {item.startDate} - {item.isCurrentlyWorking ? 'Present' : item.endDate}
              </Text>
              <Text style={styles.body}>{item.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {education.map((item) => (
          <View key={item.id} style={styles.simpleItem}>
            <Text style={styles.itemTitle}>{item.schoolName}</Text>
            <Text style={styles.itemMeta}>{item.fieldOfStudy} • {item.startDate} - {item.endDate}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillGrid}>
          {skills.map((skill) => (
            <View key={skill.id} style={styles.skillPill}>
              <Text style={styles.skillText}>{skill.name}</Text>
              <Text style={styles.skillMeta}>{skill.endorsements}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  content: {
    paddingBottom: SPACING.L,
  },
  empty: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  emptyText: {
    ...TYPOGRAPHY.BODY1,
    color: COLORS.TEXT_SECONDARY,
  },
  heroCard: {
    backgroundColor: COLORS.BACKGROUND,
    borderBottomColor: COLORS.DIVIDER,
    borderBottomWidth: 1,
    padding: SPACING.M,
    paddingTop: 0,
  },
  cover: {
    backgroundColor: COLORS.PRIMARY_LIGHT,
    height: 112,
    marginHorizontal: -SPACING.M,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY_DARK,
    borderColor: COLORS.BACKGROUND,
    borderRadius: 48,
    borderWidth: 4,
    height: 96,
    justifyContent: 'center',
    marginTop: -48,
    width: 96,
  },
  avatarText: {
    color: COLORS.TEXT_INVERSE,
    fontSize: 30,
    fontWeight: '700',
  },
  name: {
    ...TYPOGRAPHY.H2,
    color: COLORS.TEXT_PRIMARY,
    marginTop: SPACING.S,
  },
  headline: {
    ...TYPOGRAPHY.BODY1,
    color: COLORS.TEXT_PRIMARY,
    marginTop: SPACING.XS,
  },
  location: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.S,
  },
  metricRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.M,
    marginTop: SPACING.M,
  },
  metric: {
    ...TYPOGRAPHY.SUBTITLE2,
    color: COLORS.PRIMARY,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.S,
    marginTop: SPACING.M,
  },
  primaryButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 20,
    paddingHorizontal: SPACING.L,
    paddingVertical: SPACING.S,
  },
  primaryButtonText: {
    color: COLORS.TEXT_INVERSE,
    fontWeight: '700',
  },
  outlineButton: {
    borderColor: COLORS.PRIMARY,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: SPACING.L,
    paddingVertical: SPACING.S,
  },
  outlineButtonText: {
    color: COLORS.PRIMARY,
    fontWeight: '700',
  },
  section: {
    backgroundColor: COLORS.BACKGROUND,
    borderBottomColor: COLORS.DIVIDER,
    borderBottomWidth: 1,
    marginTop: SPACING.S,
    padding: SPACING.M,
  },
  sectionTitle: {
    ...TYPOGRAPHY.H3,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.M,
  },
  body: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.XS,
  },
  timelineItem: {
    flexDirection: 'row',
    gap: SPACING.M,
    marginBottom: SPACING.M,
  },
  companyMark: {
    alignItems: 'center',
    backgroundColor: COLORS.SECONDARY_LIGHT,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  companyMarkText: {
    color: COLORS.SECONDARY,
    fontWeight: '700',
  },
  timelineContent: {
    flex: 1,
  },
  itemTitle: {
    ...TYPOGRAPHY.SUBTITLE2,
    color: COLORS.TEXT_PRIMARY,
  },
  itemMeta: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.TEXT_SECONDARY,
  },
  simpleItem: {
    marginBottom: SPACING.M,
  },
  skillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.S,
  },
  skillPill: {
    alignItems: 'center',
    borderColor: COLORS.BORDER,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    gap: SPACING.S,
    paddingHorizontal: SPACING.M,
    paddingVertical: SPACING.S,
  },
  skillText: {
    ...TYPOGRAPHY.SUBTITLE2,
    color: COLORS.TEXT_PRIMARY,
  },
  skillMeta: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
  },
});

export default ProfileScreen;
