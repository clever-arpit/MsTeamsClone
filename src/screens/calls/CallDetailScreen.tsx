import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import CustomIcon from '../../components/CustomIcon';
import Icons from '../../utils/Icons';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';
import { TeamsCall } from '../../types';

const CallDetailScreen: React.FC<{ route: { params?: { call?: TeamsCall } } }> = ({
  route,
}) => {
  const call = route.params?.call;

  if (!call) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Call details are not available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.hero}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {call.contact.firstName[0]}
            {call.contact.lastName[0]}
          </Text>
        </View>
        <Text style={styles.name}>
          {call.contact.firstName} {call.contact.lastName}
        </Text>
        <Text style={styles.role}>{call.contact.role}</Text>
        <Text style={styles.meta}>
          {call.direction} {call.type} call · {call.duration}
        </Text>
        <View style={styles.actionRow}>
          <Pressable style={styles.primaryAction}>
            <CustomIcon icon={Icons.callsIcon} color={COLORS.TEXT_INVERSE} size={18} />
            <Text style={styles.primaryText}>Call back</Text>
          </Pressable>
          <Pressable style={styles.secondaryAction}>
            <CustomIcon icon={Icons.messageIcon} color={COLORS.PRIMARY} size={18} />
            <Text style={styles.secondaryText}>Chat</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Details</Text>
        <Text style={styles.body}>
          Started {new Date(call.createdAt).toLocaleString('en', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
          })}
        </Text>
        <Text style={styles.body}>Department: {call.contact.department}</Text>
        <Text style={styles.body}>Email: {call.contact.email}</Text>
        <Text style={styles.body}>Phone: {call.contact.phone}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionRow: {
    flexDirection: 'row',
    gap: SPACING.S,
    marginTop: SPACING.L,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 44,
    height: 88,
    justifyContent: 'center',
    width: 88,
  },
  avatarText: {
    color: COLORS.TEXT_INVERSE,
    fontSize: 28,
    fontWeight: '700',
  },
  body: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.S,
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
  meta: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.S,
    textTransform: 'capitalize',
  },
  name: {
    ...TYPOGRAPHY.H2,
    color: COLORS.TEXT_PRIMARY,
    marginTop: SPACING.M,
  },
  primaryAction: {
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: SPACING.L,
    paddingVertical: SPACING.S,
  },
  primaryText: {
    color: COLORS.TEXT_INVERSE,
    fontWeight: '700',
  },
  role: {
    ...TYPOGRAPHY.SUBTITLE2,
    color: COLORS.TEXT_PRIMARY,
    marginTop: 4,
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
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: SPACING.L,
    paddingVertical: SPACING.S,
  },
  secondaryText: {
    color: COLORS.PRIMARY,
    fontWeight: '700',
  },
  section: {
    backgroundColor: COLORS.BACKGROUND,
    marginTop: SPACING.S,
    padding: SPACING.M,
  },
  sectionTitle: {
    ...TYPOGRAPHY.H3,
    color: COLORS.TEXT_PRIMARY,
  },
});

export default CallDetailScreen;
