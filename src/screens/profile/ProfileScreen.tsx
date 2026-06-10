import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { logout } from '../../redux';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import CustomIcon from '../../components/CustomIcon';
import Tile from '../../components/Tile';
import Icons from '../../utils/Icons';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

const statusColor = {
  available: COLORS.SUCCESS,
  busy: COLORS.ERROR,
  away: COLORS.WARNING,
  offline: COLORS.TEXT_TERTIARY,
};

const ProfileScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.user.profile);
  const members = useAppSelector(state => state.teams.members);
  const calls = useAppSelector(state => state.teams.calls);
  const currentMember = members.find(member => member.id === profile?.id) ?? members[0];

  if (!profile || !currentMember) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Profile data is not available.</Text>
      </View>
    );
  }

  const initials = `${profile.firstName[0]}${profile.lastName[0]}`.toUpperCase();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
          <View
            style={[
              styles.presenceDot,
              { backgroundColor: statusColor[currentMember.status] },
            ]}
          />
        </View>
        <Text style={styles.name}>
          {profile.firstName} {profile.lastName}
        </Text>
        <Text style={styles.role}>{currentMember.role}</Text>
        <Text style={styles.department}>{currentMember.department}</Text>
        <View style={styles.statusPill}>
          <View
            style={[
              styles.statusMiniDot,
              { backgroundColor: statusColor[currentMember.status] },
            ]}
          />
          <Text style={styles.statusText}>{currentMember.status}</Text>
        </View>

        <View style={styles.actionRow}>
          <Pressable style={styles.primaryAction}>
            <CustomIcon icon={Icons.messageIcon} color={COLORS.TEXT_INVERSE} size={18} />
            <Text style={styles.primaryActionText}>Message</Text>
          </Pressable>
          <Pressable style={styles.secondaryAction}>
            <CustomIcon icon={Icons.callsIcon} color={COLORS.PRIMARY} size={18} />
            <Text style={styles.secondaryActionText}>Call</Text>
          </Pressable>
          <Pressable style={styles.secondaryAction}>
            <CustomIcon icon={Icons.cameraIcon} color={COLORS.PRIMARY} size={18} />
            <Text style={styles.secondaryActionText}>Meet</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact</Text>
        <Tile icon={Icons.emailIcon} label="Email" title={currentMember.email} />
        <Tile icon={Icons.phoneIcon} label="Mobile" title={currentMember.phone} />
        <Tile icon={Icons.locationIcon} label="Location" title={profile.location ?? 'Not set'} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.body}>{profile.about}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today</Text>
        {calls.slice(0, 2).map(call => (
          <View key={call.id} style={styles.meetingRow}>
            <View style={styles.meetingIcon}>
              <CustomIcon
                icon={call.type === 'video' ? Icons.cameraIcon : Icons.callsIcon}
                color={COLORS.PRIMARY}
                size={18}
              />
            </View>
            <View style={styles.meetingInfo}>
              <Text style={styles.meetingTitle}>
                {call.contact.firstName} {call.contact.lastName}
              </Text>
              <Text style={styles.meetingMeta}>
                {call.direction} call · {call.duration}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Organization</Text>
        {members.slice(1).map(member => (
          <View key={member.id} style={styles.orgRow}>
            <View style={styles.orgAvatar}>
              <Text style={styles.orgAvatarText}>
                {member.firstName[0]}
                {member.lastName[0]}
              </Text>
            </View>
            <View style={styles.orgInfo}>
              <Text style={styles.orgName}>
                {member.firstName} {member.lastName}
              </Text>
              <Text style={styles.orgRole}>{member.role}</Text>
            </View>
            <View
              style={[
                styles.orgStatus,
                { backgroundColor: statusColor[member.status] },
              ]}
            />
          </View>
        ))}
      </View>

      <Pressable style={styles.logoutButton} onPress={() => dispatch(logout())}>
        <CustomIcon icon={Icons.logoutIcon} color={COLORS.ERROR} size={18} />
        <Text style={styles.logoutText}>Sign out</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  actionRow: {
    flexDirection: 'row',
    gap: SPACING.S,
    marginTop: SPACING.M,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 48,
    height: 96,
    justifyContent: 'center',
    width: 96,
  },
  avatarText: {
    color: COLORS.TEXT_INVERSE,
    fontSize: 30,
    fontWeight: '700',
  },
  body: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.TEXT_SECONDARY,
  },
  content: {
    paddingBottom: SPACING.XL,
  },
  department: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.TEXT_SECONDARY,
    marginTop: 2,
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
  hero: {
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND,
    borderBottomColor: '#E4E4EE',
    borderBottomWidth: 1,
    padding: SPACING.L,
  },
  logoutButton: {
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND,
    borderColor: '#F2CCCC',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: SPACING.S,
    justifyContent: 'center',
    margin: SPACING.M,
    padding: SPACING.M,
  },
  logoutText: {
    color: COLORS.ERROR,
    fontWeight: '700',
  },
  meetingIcon: {
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY_LIGHT,
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  meetingInfo: {
    flex: 1,
    marginLeft: SPACING.M,
  },
  meetingMeta: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.TEXT_SECONDARY,
    textTransform: 'capitalize',
  },
  meetingRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: SPACING.M,
  },
  meetingTitle: {
    ...TYPOGRAPHY.SUBTITLE2,
    color: COLORS.TEXT_PRIMARY,
  },
  name: {
    ...TYPOGRAPHY.H2,
    color: COLORS.TEXT_PRIMARY,
    marginTop: SPACING.M,
  },
  orgAvatar: {
    alignItems: 'center',
    backgroundColor: COLORS.SECONDARY,
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  orgAvatarText: {
    color: COLORS.TEXT_INVERSE,
    fontSize: 12,
    fontWeight: '700',
  },
  orgInfo: {
    flex: 1,
    marginLeft: SPACING.M,
  },
  orgName: {
    ...TYPOGRAPHY.SUBTITLE2,
    color: COLORS.TEXT_PRIMARY,
  },
  orgRole: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.TEXT_SECONDARY,
  },
  orgRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: SPACING.M,
  },
  orgStatus: {
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  presenceDot: {
    borderColor: COLORS.BACKGROUND,
    borderRadius: 9,
    borderWidth: 3,
    bottom: 7,
    height: 18,
    position: 'absolute',
    right: 7,
    width: 18,
  },
  primaryAction: {
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 8,
    flex: 1,
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    paddingVertical: SPACING.S,
  },
  primaryActionText: {
    color: COLORS.TEXT_INVERSE,
    fontWeight: '700',
  },
  role: {
    ...TYPOGRAPHY.SUBTITLE2,
    color: COLORS.TEXT_PRIMARY,
    marginTop: SPACING.XS,
    textAlign: 'center',
  },
  screen: {
    backgroundColor: '#F7F7FB',
    flex: 1,
  },
  secondaryAction: {
    alignItems: 'center',
    borderColor: '#DAD9EA',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    paddingVertical: SPACING.S,
  },
  secondaryActionText: {
    color: COLORS.PRIMARY,
    fontWeight: '700',
  },
  section: {
    backgroundColor: COLORS.BACKGROUND,
    borderBottomColor: '#E4E4EE',
    borderBottomWidth: 1,
    marginTop: SPACING.S,
    padding: SPACING.M,
  },
  sectionTitle: {
    ...TYPOGRAPHY.H3,
    color: COLORS.TEXT_PRIMARY,
  },
  statusMiniDot: {
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  statusPill: {
    alignItems: 'center',
    backgroundColor: '#F2F2F8',
    borderRadius: 8,
    flexDirection: 'row',
    gap: 6,
    marginTop: SPACING.M,
    paddingHorizontal: SPACING.M,
    paddingVertical: 6,
  },
  statusText: {
    color: COLORS.TEXT_SECONDARY,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
});

export default ProfileScreen;
