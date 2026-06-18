import React, { useMemo } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { addMessage, updateConversation } from '../../redux';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import MessageInput from '../../components/common/MessageInput';
import CustomIcon from '../../components/CustomIcon';
import Icons from '../../utils/Icons';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';
import { Message } from '../../types';

const groupByDate = (messages: Message[]) => {
  const groups: Record<string, Message[]> = {};
  messages.forEach(message => {
    const title = new Date(message.createdAt).toLocaleDateString('en', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    groups[title] = groups[title] || [];
    groups[title].push(message);
  });
  return Object.keys(groups).map(title => ({ title, data: groups[title] }));
};

const ChatScreen: React.FC = () => {
  const route =
    useRoute<RouteProp<Record<string, { conversationId: string }>, string>>();
  const dispatch = useAppDispatch();
  const conversationId = route.params?.conversationId;
  const conversations = useAppSelector(state => state.message.conversations);
  const messages = useAppSelector(state => state.message.currentConversation);
  const user = useAppSelector(state => state.auth.user);
  const members = useAppSelector(state => state.teams.members);

  const conversation = conversations.find(item => item.id === conversationId);
  const participant = members.find(item => item.id === conversation?.participant.id);
  const conversationMessages = messages.filter(item => item.conversationId === conversationId);
  const sections = useMemo(
    () => groupByDate(conversationMessages),
    [conversationMessages],
  );

  const handleSend = (text: string) => {
    if (!conversation || !user) {
      return;
    }
    const message: Message = {
      id: `msg-${Date.now()}`,
      conversationId: conversation.id,
      sender: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      receiver: conversation.participant,
      content: text,
      status: 'sent',
      createdAt: new Date().toISOString(),
    };

    dispatch(addMessage(message));
    dispatch(
      updateConversation({
        ...conversation,
        lastMessage: message,
        unreadCount: 0,
        updatedAt: message.createdAt,
      }),
    );
  };

  if (!conversation) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No conversation found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.contextBar}>
        <CustomIcon icon={Icons.teamChatIcon} color={COLORS.PRIMARY} size={18} />
        <Text style={styles.contextText}>
          {participant?.status ?? 'available'} ·{' '}
          {participant?.role ?? 'Team member'}
        </Text>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const mine = item.sender.id === user?.id;
          return (
            <View style={[styles.messageRow, mine && styles.myMessageRow]}>
              {!mine ? (
                <View style={styles.miniAvatar}>
                  <Text style={styles.miniAvatarText}>
                    {item.sender.firstName[0]}
                    {item.sender.lastName[0]}
                  </Text>
                </View>
              ) : null}
              <View style={[styles.bubble, mine && styles.myBubble]}>
                {!mine ? (
                  <Text style={styles.senderName}>
                    {item.sender.firstName} {item.sender.lastName}
                  </Text>
                ) : null}
                <Text style={[styles.bubbleText, mine && styles.myBubbleText]}>
                  {item.content}
                </Text>
                {item.content.includes('http') ? (
                  <View style={styles.linkPreview}>
                    <View style={styles.linkIcon}>
                      <CustomIcon icon={Icons.webIcon} color="#DADADA" size={20} />
                    </View>
                    <View style={styles.linkMeta}>
                      <Text style={styles.linkTitle}>AI agents and Expo overview</Text>
                      <Text style={styles.linkHost}>docs.expo.dev</Text>
                    </View>
                  </View>
                ) : null}
                <Text style={[styles.messageMeta, mine && styles.myMessageMeta]}>
                  {new Date(item.createdAt).toLocaleTimeString('en', {
                    hour: 'numeric',
                    minute: '2-digit',
                  })} · {item.status}
                </Text>
              </View>
            </View>
          );
        }}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
        contentContainerStyle={styles.messagesList}
      />

      <MessageInput onSend={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: '#242424',
    borderColor: '#343434',
    borderRadius: 18,
    borderWidth: 1,
    maxWidth: '82%',
    padding: SPACING.M,
  },
  bubbleText: {
    ...TYPOGRAPHY.BODY2,
    color: '#F4F4F4',
  },
  contextBar: {
    alignItems: 'center',
    backgroundColor: '#000000',
    borderBottomColor: '#242424',
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: SPACING.M,
    paddingVertical: SPACING.S,
  },
  contextText: {
    ...TYPOGRAPHY.CAPTION,
    color: '#9B9B9B',
    fontWeight: '600',
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
  messageMeta: {
    ...TYPOGRAPHY.CAPTION,
    color: '#8F8F8F',
    marginTop: 6,
  },
  messageRow: {
    flexDirection: 'row',
    gap: SPACING.S,
    marginBottom: SPACING.M,
  },
  messagesList: {
    padding: SPACING.M,
    paddingBottom: SPACING.L,
  },
  miniAvatar: {
    alignItems: 'center',
    backgroundColor: COLORS.SECONDARY,
    borderRadius: 15,
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  miniAvatarText: {
    color: COLORS.TEXT_INVERSE,
    fontSize: 11,
    fontWeight: '700',
  },
  myBubble: {
    backgroundColor: '#6264D8',
    borderColor: '#6264D8',
  },
  myBubbleText: {
    color: COLORS.TEXT_INVERSE,
  },
  myMessageMeta: {
    color: '#E7E7FF',
  },
  myMessageRow: {
    justifyContent: 'flex-end',
  },
  screen: {
    backgroundColor: '#000000',
    flex: 1,
  },
  sectionHeader: {
    alignItems: 'center',
    marginVertical: SPACING.S,
  },
  sectionHeaderText: {
    ...TYPOGRAPHY.CAPTION,
    backgroundColor: '#000000',
    borderRadius: 8,
    color: '#9B9B9B',
    overflow: 'hidden',
    paddingHorizontal: SPACING.S,
    paddingVertical: 3,
  },
  senderName: {
    ...TYPOGRAPHY.CAPTION,
    color: '#BDBDBD',
    fontWeight: '700',
    marginBottom: 4,
  },
  linkHost: {
    ...TYPOGRAPHY.BODY2,
    color: '#9B9B9B',
    marginTop: 2,
  },
  linkIcon: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    minHeight: 160,
  },
  linkMeta: {
    borderTopColor: '#3A3A3A',
    borderTopWidth: 1,
    padding: SPACING.M,
  },
  linkPreview: {
    backgroundColor: '#2A2A2A',
    borderColor: '#3A3A3A',
    borderRadius: 14,
    borderWidth: 1,
    marginTop: SPACING.M,
    overflow: 'hidden',
  },
  linkTitle: {
    ...TYPOGRAPHY.SUBTITLE2,
    color: '#F4F4F4',
  },
});

export default ChatScreen;
