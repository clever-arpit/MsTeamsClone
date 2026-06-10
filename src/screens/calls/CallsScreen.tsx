import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../../redux/hooks';
import CustomIcon from '../../components/CustomIcon';
import SearchInput from '../../components/SearchInput';
import Icons from '../../utils/Icons';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

const filters = ['All', 'Missed', 'Video'] as const;

const CallsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const calls = useAppSelector(state => state.teams.calls);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return calls.filter(call => {
      const fullName = `${call.contact.firstName} ${call.contact.lastName}`.toLowerCase();
      const matchesQuery = !normalized || fullName.includes(normalized);
      const matchesFilter =
        filter === 'All' ||
        (filter === 'Missed' && call.direction === 'missed') ||
        (filter === 'Video' && call.type === 'video');
      return matchesQuery && matchesFilter;
    });
  }, [calls, filter, query]);

  return (
    <View style={styles.screen}>
      <View style={styles.headerBand}>
        <Text style={styles.title}>Calls</Text>
        <Pressable style={styles.dialButton}>
          <CustomIcon icon={Icons.dialpadIcon} color={COLORS.TEXT_INVERSE} size={18} />
          <Text style={styles.dialText}>Dial</Text>
        </Pressable>
      </View>
      <SearchInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search call history"
        style={styles.search}
      />
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
                <CustomIcon icon={Icons.callsIcon} color={COLORS.PRIMARY} size={19} />
              </Pressable>
              <Pressable style={styles.iconButton}>
                <CustomIcon icon={Icons.cameraIcon} color={COLORS.PRIMARY} size={19} />
              </Pressable>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    gap: SPACING.S,
  },
  activeFilter: {
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
  },
  activeFilterText: {
    color: COLORS.TEXT_INVERSE,
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
  dialButton: {
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: SPACING.M,
    paddingVertical: SPACING.S,
  },
  dialText: {
    color: COLORS.TEXT_INVERSE,
    fontWeight: '700',
  },
  filterChip: {
    borderColor: '#DAD9EA',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: SPACING.M,
    paddingVertical: SPACING.S,
  },
  filterRow: {
    flexDirection: 'row',
    gap: SPACING.S,
    padding: SPACING.M,
  },
  filterText: {
    color: COLORS.TEXT_SECONDARY,
    fontWeight: '700',
  },
  headerBand: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.M,
    paddingTop: SPACING.M,
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
    paddingBottom: SPACING.L,
  },
  meta: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.TEXT_SECONDARY,
    marginTop: 3,
    textTransform: 'capitalize',
  },
  missedText: {
    color: COLORS.ERROR,
  },
  name: {
    ...TYPOGRAPHY.SUBTITLE2,
    color: COLORS.TEXT_PRIMARY,
  },
  row: {
    alignItems: 'center',
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
  search: {
    margin: SPACING.M,
    marginBottom: 0,
  },
  time: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_TERTIARY,
    marginTop: 4,
  },
  title: {
    ...TYPOGRAPHY.H2,
    color: COLORS.TEXT_PRIMARY,
  },
});

export default CallsScreen;
