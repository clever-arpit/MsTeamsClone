import React from 'react';
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

  return (
    <View style={styles.screen}>
      <View style={styles.filterRail}>
        {['Unread', '@Mentions', 'Replies', 'Reactions'].map(item => (
          <Pressable
            key={item}
            onPress={() => item === 'Unread' && dispatch(markAllActivitiesRead())}
            style={styles.filterChip}
          >
            <Text style={styles.filterText}>{item}</Text>
          </Pressable>
        ))}
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
    color: '#9B9B9B',
    marginTop: 4,
  },
  dot: {
    backgroundColor: COLORS.ERROR,
    borderRadius: 5,
    height: 10,
    marginLeft: SPACING.S,
    width: 10,
  },
  filterChip: {
    backgroundColor: '#000000',
    borderColor: '#313131',
    borderRadius: 24,
    borderWidth: 1,
    marginRight: SPACING.S,
    paddingHorizontal: SPACING.L,
    paddingVertical: 10,
  },
  filterRail: {
    backgroundColor: '#141414',
    flexDirection: 'row',
    paddingHorizontal: SPACING.M,
    paddingVertical: SPACING.S,
  },
  filterText: {
    color: '#E8E8E8',
    fontSize: 18,
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
    color: '#F4F4F4',
    flex: 1,
  },
  list: {
    paddingBottom: 100,
  },
  row: {
    backgroundColor: '#000000',
    borderBottomColor: '#242424',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: SPACING.M,
  },
  screen: {
    backgroundColor: '#141414',
    flex: 1,
  },
  time: {
    ...TYPOGRAPHY.CAPTION,
    color: '#8F8F8F',
    marginTop: SPACING.S,
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
