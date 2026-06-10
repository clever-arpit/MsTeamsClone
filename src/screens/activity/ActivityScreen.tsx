import React, { useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { markActivityRead, markAllActivitiesRead } from '../../redux';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import CustomIcon from '../../components/CustomIcon';
import Icons from '../../utils/Icons';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';
import { TeamsActivity } from '../../types';

const iconForType = (type: TeamsActivity['type']) => {
  switch (type) {
    case 'mention':
      return Icons.priorityNotificationIcon ?? Icons.bellIcon;
    case 'meeting':
      return Icons.calendarIcon;
    case 'file':
      return Icons.fileIcon;
    case 'reaction':
      return Icons.heartIcon;
    default:
      return Icons.replyIcon;
  }
};

const ActivityScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const activities = useAppSelector(state => state.teams.activities);
  const unreadCount = useMemo(
    () => activities.filter(item => item.unread).length,
    [activities],
  );

  return (
    <View style={styles.screen}>
      <View style={styles.headerBand}>
        <View>
          <Text style={styles.title}>Activity</Text>
          <Text style={styles.subtitle}>{unreadCount} unread updates</Text>
        </View>
        <Pressable
          onPress={() => dispatch(markAllActivitiesRead())}
          style={styles.markButton}
        >
          <CustomIcon icon={Icons.readAllIcon} color={COLORS.PRIMARY} size={18} />
          <Text style={styles.markButtonText}>Read all</Text>
        </Pressable>
      </View>

      <FlatList
        data={activities}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => dispatch(markActivityRead(item.id))}
            style={[styles.row, item.unread && styles.unreadRow]}
          >
            <View style={styles.iconCircle}>
              <CustomIcon icon={iconForType(item.type)} color={COLORS.PRIMARY} size={20} />
            </View>
            <View style={styles.info}>
              <View style={styles.topRow}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                {item.unread ? <View style={styles.dot} /> : null}
              </View>
              <Text style={styles.body} numberOfLines={2}>
                {item.body}
              </Text>
              <Text style={styles.time}>
                {new Date(item.createdAt).toLocaleString('en', {
                  hour: 'numeric',
                  minute: '2-digit',
                  month: 'short',
                  day: 'numeric',
                })}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.TEXT_SECONDARY,
    marginTop: 4,
  },
  dot: {
    backgroundColor: COLORS.ERROR,
    borderRadius: 5,
    height: 10,
    marginLeft: SPACING.S,
    width: 10,
  },
  headerBand: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.M,
  },
  iconCircle: {
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY_LIGHT,
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  info: {
    flex: 1,
    marginLeft: SPACING.M,
  },
  itemTitle: {
    ...TYPOGRAPHY.SUBTITLE2,
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
  },
  list: {
    paddingBottom: SPACING.L,
  },
  markButton: {
    alignItems: 'center',
    borderColor: '#DAD9EA',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: SPACING.M,
    paddingVertical: SPACING.S,
  },
  markButtonText: {
    color: COLORS.PRIMARY,
    fontWeight: '700',
  },
  row: {
    backgroundColor: COLORS.BACKGROUND,
    borderBottomColor: '#EEEEF4',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: SPACING.M,
  },
  screen: {
    backgroundColor: '#F7F7FB',
    flex: 1,
  },
  subtitle: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.TEXT_SECONDARY,
    marginTop: 2,
  },
  time: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_TERTIARY,
    marginTop: SPACING.S,
  },
  title: {
    ...TYPOGRAPHY.H2,
    color: COLORS.TEXT_PRIMARY,
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  unreadRow: {
    borderLeftColor: COLORS.PRIMARY,
    borderLeftWidth: 4,
  },
});

export default ActivityScreen;
