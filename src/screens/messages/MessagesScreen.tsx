import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { addMessage, markMessageAsRead, updateConversation } from '../../redux';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Conversation, Message } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

const initials = (firstName: string, lastName: string) => `${firstName[0]}${lastName[0]}`.toUpperCase();

const MessagesScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const conversations = useAppSelector((state) => state.message.conversations);
  const messages = useAppSelector((state) => state.message.currentConversation);
  const user = useAppSelector((state) => state.auth.user);
  const [selectedConversationId, setSelectedConversationId] = useState(conversations[0]?.id ?? '');
  const [reply, setReply] = useState('');
  const [query, setQuery] = useState('');

  const selectedConversation = conversations.find((conversation) => conversation.id === selectedConversationId);

  const filteredConversations = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return conversations;
    return conversations.filter((conversation) =>
      `${conversation.participant.firstName} ${conversation.participant.lastName}`.toLowerCase().includes(normalized)
    );
  }, [conversations, query]);

  const visibleMessages = messages.filter((message) => message.conversationId === selectedConversationId);

  const selectConversation = (conversation: Conversation) => {
    setSelectedConversationId(conversation.id);
    dispatch(markMessageAsRead(conversation.id));
  };

  const sendReply = () => {
    if (!reply.trim() || !selectedConversation || !user) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      conversationId: selectedConversation.id,
      sender: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      receiver: selectedConversation.participant,
      content: reply.trim(),
      status: 'sent',
      createdAt: new Date().toISOString(),
    };

    dispatch(addMessage(message));
    dispatch(updateConversation({
      ...selectedConversation,
      lastMessage: message,
      unreadCount: 0,
      updatedAt: message.createdAt,
    }));
    setReply('');
  };

  const renderConversation = ({ item }: { item: Conversation }) => {
    const active = item.id === selectedConversationId;
    return (
      <Pressable style={[styles.row, active && styles.activeRow]} onPress={() => selectConversation(item)}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials(item.participant.firstName, item.participant.lastName)}</Text>
        </View>
        <View style={styles.messageInfo}>
          <View style={styles.topLine}>
            <Text style={styles.name}>{item.participant.firstName} {item.participant.lastName}</Text>
            <Text style={styles.time}>Now</Text>
          </View>
          <Text style={styles.preview} numberOfLines={2}>
            {item.lastMessage?.content ?? 'You have a new conversation waiting.'}
          </Text>
        </View>
        {item.unreadCount > 0 ? (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unreadCount}</Text>
          </View>
        ) : null}
      </Pressable>
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={filteredConversations}
        keyExtractor={(item) => item.id}
        renderItem={renderConversation}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <TextInput
              onChangeText={setQuery}
              placeholder="Search messages"
              placeholderTextColor={COLORS.TEXT_SECONDARY}
              style={styles.search}
              value={query}
            />
            <Text style={styles.sectionTitle}>Focused</Text>
          </View>
        }
      />

      {selectedConversation ? (
        <View style={styles.threadPanel}>
          <Text style={styles.threadTitle}>
            {selectedConversation.participant.firstName} {selectedConversation.participant.lastName}
          </Text>
          <View style={styles.threadMessages}>
            {visibleMessages.length > 0 ? visibleMessages.map((message) => {
              const mine = message.sender.id === user?.id;
              return (
                <View key={message.id} style={[styles.bubble, mine && styles.myBubble]}>
                  <Text style={[styles.bubbleText, mine && styles.myBubbleText]}>{message.content}</Text>
                </View>
              );
            }) : (
              <Text style={styles.emptyThread}>Start the conversation with a quick note.</Text>
            )}
          </View>
          <View style={styles.replyRow}>
            <TextInput
              onChangeText={setReply}
              placeholder="Write a message"
              placeholderTextColor={COLORS.TEXT_SECONDARY}
              style={styles.replyInput}
              value={reply}
            />
            <Pressable style={[styles.sendButton, !reply.trim() && styles.disabled]} onPress={sendReply}>
              <Text style={styles.sendText}>Send</Text>
            </Pressable>
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
  },
  listContent: {
    paddingBottom: SPACING.S,
  },
  header: {
    backgroundColor: COLORS.BACKGROUND,
    borderBottomColor: COLORS.DIVIDER,
    borderBottomWidth: 1,
    padding: SPACING.M,
  },
  search: {
    backgroundColor: COLORS.PRIMARY_LIGHT,
    borderRadius: 4,
    color: COLORS.TEXT_PRIMARY,
    minHeight: 42,
    paddingHorizontal: SPACING.M,
  },
  sectionTitle: {
    ...TYPOGRAPHY.SUBTITLE2,
    color: COLORS.TEXT_PRIMARY,
    marginTop: SPACING.M,
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
  activeRow: {
    backgroundColor: COLORS.PRIMARY_LIGHT,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.SECONDARY,
    borderRadius: 26,
    height: 52,
    justifyContent: 'center',
    width: 52,
  },
  avatarText: {
    color: COLORS.TEXT_INVERSE,
    fontWeight: '700',
  },
  messageInfo: {
    flex: 1,
  },
  topLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    ...TYPOGRAPHY.SUBTITLE2,
    color: COLORS.TEXT_PRIMARY,
  },
  time: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_TERTIARY,
  },
  preview: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.XS,
  },
  unreadBadge: {
    alignItems: 'center',
    backgroundColor: COLORS.SUCCESS,
    borderRadius: 10,
    height: 20,
    justifyContent: 'center',
    minWidth: 20,
  },
  unreadText: {
    color: COLORS.TEXT_INVERSE,
    fontSize: 12,
    fontWeight: '700',
  },
  threadPanel: {
    backgroundColor: COLORS.BACKGROUND,
    borderTopColor: COLORS.DIVIDER,
    borderTopWidth: 1,
    maxHeight: 280,
    padding: SPACING.M,
  },
  threadTitle: {
    ...TYPOGRAPHY.SUBTITLE2,
    color: COLORS.TEXT_PRIMARY,
  },
  threadMessages: {
    gap: SPACING.S,
    marginTop: SPACING.M,
  },
  bubble: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.SURFACE,
    borderRadius: 10,
    maxWidth: '82%',
    padding: SPACING.M,
  },
  myBubble: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.PRIMARY,
  },
  bubbleText: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.TEXT_PRIMARY,
  },
  myBubbleText: {
    color: COLORS.TEXT_INVERSE,
  },
  emptyThread: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.TEXT_SECONDARY,
  },
  replyRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SPACING.S,
    marginTop: SPACING.M,
  },
  replyInput: {
    backgroundColor: COLORS.SURFACE,
    borderRadius: 20,
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
    minHeight: 42,
    paddingHorizontal: SPACING.M,
  },
  sendButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 18,
    paddingHorizontal: SPACING.M,
    paddingVertical: SPACING.S,
  },
  disabled: {
    opacity: 0.45,
  },
  sendText: {
    color: COLORS.TEXT_INVERSE,
    fontWeight: '700',
  },
});

export default MessagesScreen;
