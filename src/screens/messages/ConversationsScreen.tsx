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
import { markMessageAsRead } from '../../redux';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import CustomIcon from '../../components/CustomIcon';
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
    navigation.navigate('Messages', {
      conversationId: conversation.id,
      subtitle: 'Last seen recently',
      title: `${conversation.participant.firstName} ${conversation.participant.lastName}`,
    });
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.channelRail}
      >
        {['Recent', 'Unread', 'Mentions', 'Threads'].map((item, index) => (
          <View key={item} style={[styles.channelChip, index === 0 && styles.activeChip]}>
            <CustomIcon
              icon={
                index === 0
                  ? Icons.returnRightIcon
                  : index === 1
                  ? Icons.muteNotificationIcon
                  : index === 2
                  ? Icons.emailIcon
                  : Icons.replyIcon
              }
              color="#E8E8E8"
              size={22}
            />
            <Text style={styles.channelName}>{item}</Text>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Favourites</Text>

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
      <Pressable style={styles.fab}>
        <CustomIcon icon={Icons.editIcon} color="#000000" size={28} />
      </Pressable>
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
  activeChip: {
    borderBottomColor: '#7E84FF',
    borderBottomWidth: 2,
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
    alignItems: 'center',
    backgroundColor: '#242424',
    borderRadius: 12,
    marginRight: SPACING.S,
    minWidth: 132,
    paddingHorizontal: SPACING.M,
    paddingVertical: SPACING.S,
  },
  channelName: {
    ...TYPOGRAPHY.BODY2,
    color: '#E8E8E8',
    marginTop: 6,
  },
  channelRail: {
    paddingHorizontal: SPACING.M,
    paddingVertical: SPACING.M,
  },
  info: {
    flex: 1,
    marginLeft: SPACING.M,
  },
  list: {
    paddingBottom: 108,
  },
  name: {
    ...TYPOGRAPHY.SUBTITLE2,
    color: '#F4F4F4',
    flex: 1,
  },
  fab: {
    alignItems: 'center',
    backgroundColor: '#7E84FF',
    borderRadius: 33,
    bottom: 28,
    height: 66,
    justifyContent: 'center',
    position: 'absolute',
    right: 28,
    width: 66,
  },
  preview: {
    ...TYPOGRAPHY.BODY2,
    color: '#9B9B9B',
    marginTop: 4,
  },
  row: {
    alignItems: 'center',
    backgroundColor: '#000000',
    flexDirection: 'row',
    padding: SPACING.M,
  },
  screen: {
    backgroundColor: '#000000',
    flex: 1,
  },
  sectionTitle: {
    ...TYPOGRAPHY.SUBTITLE1,
    color: '#F4F4F4',
    paddingHorizontal: SPACING.M,
    paddingBottom: SPACING.S,
  },
  time: {
    ...TYPOGRAPHY.CAPTION,
    color: '#9B9B9B',
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
