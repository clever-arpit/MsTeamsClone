import React, { useMemo } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { markMessageAsRead, setTeamsSearchQuery } from '../../redux';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import CustomIcon from '../../components/CustomIcon';
import SearchInput from '../../components/SearchInput';
import Icons from '../../utils/Icons';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';
import { Conversation } from '../../types';

const initials = (firstName: string, lastName: string) =>
  `${firstName[0]}${lastName[0]}`.toUpperCase();

const formatTime = (value: string) =>
  new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit' }).format(
    new Date(value),
  );

const ConversationsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const conversations = useAppSelector(state => state.message.conversations);
  const channels = useAppSelector(state => state.teams.channels);
  const query = useAppSelector(state => state.teams.searchQuery);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return [...conversations]
      .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
      .filter(item => {
        const name = `${item.participant.firstName} ${item.participant.lastName}`.toLowerCase();
        return !normalized || name.includes(normalized) || item.lastMessage?.content.toLowerCase().includes(normalized);
      });
  }, [conversations, query]);

  const openChat = (conversation: Conversation) => {
    dispatch(markMessageAsRead(conversation.id));
    navigation.navigate('Messages', { conversationId: conversation.id });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.headerBand}>
        <Text style={styles.title}>Chat</Text>
        <Pressable style={styles.newChatButton}>
          <CustomIcon icon={Icons.editIcon} color={COLORS.TEXT_INVERSE} size={18} />
          <Text style={styles.newChatText}>New</Text>
        </Pressable>
      </View>

      <SearchInput
        value={query}
        onChangeText={value => dispatch(setTeamsSearchQuery(value))}
        placeholder="Search chats and channels"
        style={styles.search}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.channelRail}
      >
        {channels.map(channel => (
          <View key={channel.id} style={styles.channelChip}>
            <Text style={styles.channelTeam}>{channel.teamName}</Text>
            <Text style={styles.channelName}># {channel.channelName}</Text>
            {channel.unreadCount > 0 ? (
              <View style={styles.channelBadge}>
                <Text style={styles.badgeText}>{channel.unreadCount}</Text>
              </View>
            ) : null}
          </View>
        ))}
      </ScrollView>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable style={styles.row} onPress={() => openChat(item)}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {initials(item.participant.firstName, item.participant.lastName)}
              </Text>
            </View>
            <View style={styles.info}>
              <View style={styles.topRow}>
                <Text style={styles.name}>
                  {item.participant.firstName} {item.participant.lastName}
                </Text>
                <Text style={styles.time}>{formatTime(item.updatedAt)}</Text>
              </View>
              <Text style={styles.preview} numberOfLines={2}>
                {item.lastMessage?.content ?? 'Start a conversation'}
              </Text>
            </View>
            {item.unreadCount > 0 ? (
              <View style={styles.unreadBadge}>
                <Text style={styles.badgeText}>{item.unreadCount}</Text>
              </View>
            ) : null}
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  avatarText: {
    color: COLORS.TEXT_INVERSE,
    fontWeight: '700',
  },
  badgeText: {
    color: COLORS.TEXT_INVERSE,
    fontSize: 11,
    fontWeight: '700',
  },
  channelBadge: {
    alignItems: 'center',
    backgroundColor: COLORS.ERROR,
    borderRadius: 9,
    height: 18,
    justifyContent: 'center',
    minWidth: 18,
    paddingHorizontal: 5,
    position: 'absolute',
    right: 8,
    top: 8,
  },
  channelChip: {
    backgroundColor: COLORS.BACKGROUND,
    borderColor: '#E1E1EC',
    borderRadius: 8,
    borderWidth: 1,
    marginRight: SPACING.S,
    minWidth: 160,
    padding: SPACING.M,
  },
  channelName: {
    ...TYPOGRAPHY.SUBTITLE2,
    color: COLORS.TEXT_PRIMARY,
    marginTop: 2,
  },
  channelRail: {
    paddingHorizontal: SPACING.M,
    paddingVertical: SPACING.S,
  },
  channelTeam: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
  },
  headerBand: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.M,
    paddingTop: SPACING.M,
  },
  info: {
    flex: 1,
    marginLeft: SPACING.M,
  },
  list: {
    paddingBottom: SPACING.L,
  },
  name: {
    ...TYPOGRAPHY.SUBTITLE2,
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
  },
  newChatButton: {
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: SPACING.M,
    paddingVertical: SPACING.S,
  },
  newChatText: {
    color: COLORS.TEXT_INVERSE,
    fontWeight: '700',
  },
  preview: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.TEXT_SECONDARY,
    marginTop: 4,
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
  },
  title: {
    ...TYPOGRAPHY.H2,
    color: COLORS.TEXT_PRIMARY,
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  unreadBadge: {
    alignItems: 'center',
    backgroundColor: COLORS.ERROR,
    borderRadius: 10,
    justifyContent: 'center',
    minWidth: 20,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
});

export default ConversationsScreen;
