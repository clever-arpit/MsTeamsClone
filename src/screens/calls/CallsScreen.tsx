import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../../redux/hooks';
import CustomIcon from '../../components/CustomIcon';
import Icons from '../../utils/Icons';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

const filters = ['Speed dial', 'Recent'] as const;

const CallsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const calls = useAppSelector(state => state.teams.calls);
  const [filter, setFilter] = useState<(typeof filters)[number]>('Speed dial');

  const filtered = useMemo(() => {
    return filter === 'Recent' ? calls : [];
  }, [calls, filter]);

  return (
    <View style={styles.screen}>
      <View style={styles.filterRow}>
        {filters.map(item => (
          <Pressable
            key={item}
            onPress={() => setFilter(item)}
            style={[styles.filterChip, filter === item && styles.activeFilter]}
          >
            <Text
              style={[
                styles.filterText,
                filter === item && styles.activeFilterText,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <View style={styles.emptyIconStack}>
              <View style={styles.emptyBubbleSmall}>
                <CustomIcon icon={Icons.userIcon} color="#C07DFF" size={34} />
              </View>
              <View style={styles.emptyBubbleMid}>
                <CustomIcon icon={Icons.userIcon} color="#39B8FF" size={30} />
              </View>
              <View style={styles.emptyBubbleAdd}>
                <CustomIcon icon={Icons.addIcon} color="#575757" size={36} />
              </View>
            </View>
            <Text style={styles.emptyTitle}>Add your speed dial numbers</Text>
            <Text style={styles.emptyText}>
              When you add contacts to your speed dial, you'll see them here
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.row}
            onPress={() => navigation.navigate('CallDetail', { call: item })}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item.contact.firstName[0]}
                {item.contact.lastName[0]}
              </Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>
                {item.contact.firstName} {item.contact.lastName}
              </Text>
              <Text
                style={[
                  styles.meta,
                  item.direction === 'missed' && styles.missedText,
                ]}
              >
                {item.direction} {item.type} call · {item.duration}
              </Text>
              <Text style={styles.time}>
                {new Date(item.createdAt).toLocaleString('en', {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </Text>
            </View>
            <View style={styles.actions}>
              <Pressable style={styles.iconButton}>
                <CustomIcon
                  icon={Icons.callsIcon}
                  color={COLORS.PRIMARY}
                  size={19}
                />
              </Pressable>
              <Pressable style={styles.iconButton}>
                <CustomIcon
                  icon={Icons.cameraIcon}
                  color={COLORS.PRIMARY}
                  size={19}
                />
              </Pressable>
            </View>
          </Pressable>
        )}
      />
      <Pressable style={styles.fab}>
        <CustomIcon icon={Icons.phoneIcon} color="#ffffff" size={30} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    gap: SPACING.S,
  },
  activeFilter: {
    backgroundColor: '#7E84FF',
  },
  activeFilterText: {
    color: '#fff',
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.SECONDARY,
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  avatarText: {
    color: COLORS.TEXT_INVERSE,
    fontWeight: '700',
  },
  emptyBubbleAdd: {
    alignItems: 'center',
    backgroundColor: '#D8A21B',
    borderRadius: 40,
    height: 80,
    justifyContent: 'center',
    position: 'absolute',
    right: 8,
    top: 78,
    width: 80,
  },
  emptyBubbleMid: {
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 34,
    height: 68,
    justifyContent: 'center',
    left: 95,
    position: 'absolute',
    top: 57,
    width: 68,
  },
  emptyBubbleSmall: {
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 42,
    height: 84,
    justifyContent: 'center',
    left: 30,
    position: 'absolute',
    top: 24,
    width: 84,
  },
  emptyIconStack: {
    height: 170,
    width: 210,
  },
  emptyState: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    minHeight: 560,
    paddingHorizontal: SPACING.L,
  },
  emptyText: {
    ...TYPOGRAPHY.SUBTITLE1,
    color: '#9B9B9B',
    lineHeight: 31,
    marginTop: SPACING.M,
    maxWidth: 340,
    textAlign: 'center',
  },
  emptyTitle: {
    ...TYPOGRAPHY.H2,
    color: '#323232',
    marginTop: SPACING.L,
    textAlign: 'center',
  },
  fab: {
    alignItems: 'center',
    backgroundColor: '#7E84FF',
    borderRadius: 40,
    bottom: 56,
    height: 65,
    width: 65,
    justifyContent: 'center',
    position: 'absolute',
    right: 32,
  },
  filterChip: {
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingHorizontal: SPACING.L,
    paddingVertical: 12,
  },
  filterRow: {
    flexDirection: 'row',
    gap: SPACING.S,
    paddingHorizontal: SPACING.M,
    paddingTop: SPACING.M,
  },
  filterText: {
    color: '#000',
    fontSize: 20,
  },
  iconButton: {
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY_LIGHT,
    borderRadius: 19,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  info: {
    flex: 1,
    marginLeft: SPACING.M,
  },
  list: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 130,
  },
  meta: {
    ...TYPOGRAPHY.BODY2,
    color: '#787878',
    marginTop: 3,
    textTransform: 'capitalize',
  },
  missedText: {
    color: COLORS.ERROR,
  },
  name: {
    ...TYPOGRAPHY.SUBTITLE2,
    color: '#2e2e2e',
  },
  row: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#cdcdcd',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: SPACING.M,
  },
  screen: {
    flex: 1,
  },
  time: {
    ...TYPOGRAPHY.CAPTION,
    color: '#727272',
    marginTop: 4,
  },
});

export default CallsScreen;
