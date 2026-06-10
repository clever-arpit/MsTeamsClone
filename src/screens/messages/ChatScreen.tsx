import React, { useMemo } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { addMessage, updateConversation } from '../../redux';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import ChatHeader from '../../components/common/ChatHeader';
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
  const route = useRoute<RouteProp<Record<string, { conversationId: string }>, string>>();
  const navigation = useNavigation();
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
      <ChatHeader
        onBack={() => navigation.goBack()}
        title={`${conversation.participant.firstName} ${conversation.participant.lastName}`}
        subtitle={`${participant?.status ?? 'available'} • ${participant?.role ?? 'Team member'}`}
      />

      <View style={styles.contextBar}>
        <CustomIcon icon={Icons.teamChatIcon} color={COLORS.PRIMARY} size={18} />
        <Text style={styles.contextText}>Northstar Product / General</Text>
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
    backgroundColor: COLORS.BACKGROUND,
    borderColor: '#EEEEF4',
    borderRadius: 8,
    borderWidth: 1,
    maxWidth: '82%',
    padding: SPACING.M,
  },
  bubbleText: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.TEXT_PRIMARY,
  },
  contextBar: {
    alignItems: 'center',
    backgroundColor: '#F7F7FB',
    borderBottomColor: '#E4E4EE',
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: SPACING.M,
    paddingVertical: SPACING.S,
  },
  contextText: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
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
    color: COLORS.TEXT_TERTIARY,
    marginTop: 6,
  },
  messageRow: {
    flexDirection: 'row',
    gap: SPACING.S,
    marginBottom: SPACING.M,
  },
  messagesList: {
    padding: SPACING.M,
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
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
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
    backgroundColor: '#F3F2F8',
    flex: 1,
  },
  sectionHeader: {
    alignItems: 'center',
    marginVertical: SPACING.S,
  },
  sectionHeaderText: {
    ...TYPOGRAPHY.CAPTION,
    backgroundColor: '#EDEDF7',
    borderRadius: 8,
    color: COLORS.TEXT_SECONDARY,
    overflow: 'hidden',
    paddingHorizontal: SPACING.S,
    paddingVertical: 3,
  },
  senderName: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    fontWeight: '700',
    marginBottom: 4,
  },
});

export default ChatScreen;
