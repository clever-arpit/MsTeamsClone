import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { markNotificationAsRead } from '../../redux';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Notification } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

const initials = (firstName: string, lastName: string) => `${firstName[0]}${lastName[0]}`.toUpperCase();

const NotificationsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { notifications, unreadCount } = useAppSelector((state) => state.notification);

  const renderNotification = ({ item }: { item: Notification }) => (
    <Pressable
      style={[styles.row, !item.read && styles.unreadRow]}
      onPress={() => dispatch(markNotificationAsRead(item.id))}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials(item.actor.firstName, item.actor.lastName)}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.message}>
          <Text style={styles.actor}>{item.actor.firstName} {item.actor.lastName}</Text> {item.message}
        </Text>
        <Text style={styles.time}>Recent activity</Text>
      </View>
      {!item.read ? <View style={styles.dot} /> : null}
    </Pressable>
  );

  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id}
      renderItem={renderNotification}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.title}>Notifications</Text>
          <Text style={styles.subtitle}>{unreadCount} unread updates from your network</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.BACKGROUND,
    borderBottomColor: COLORS.DIVIDER,
    borderBottomWidth: 1,
    padding: SPACING.M,
  },
  title: {
    ...TYPOGRAPHY.H2,
    color: COLORS.TEXT_PRIMARY,
  },
  subtitle: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.S,
  },
  row: {
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND,
    borderBottomColor: COLORS.DIVIDER,
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: SPACING.M,
    padding: SPACING.M,
  },
  unreadRow: {
    backgroundColor: COLORS.PRIMARY_LIGHT,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY_DARK,
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  avatarText: {
    color: COLORS.TEXT_INVERSE,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  message: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.TEXT_PRIMARY,
  },
  actor: {
    fontWeight: '700',
  },
  time: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.XS,
  },
  dot: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 5,
    height: 10,
    width: 10,
  },
});

export default NotificationsScreen;
