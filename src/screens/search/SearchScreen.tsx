import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { useAppSelector } from '../../redux/hooks';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

type ResultItem = { id: string; title: string; subtitle?: string; type: string };

const tabs = ['People', 'Chats', 'Files', 'Commands'] as const;

const SearchScreen: React.FC = () => {
  const posts = useAppSelector((state) => state.feed.posts);
  const connections = useAppSelector((state) => state.connection.connections);
  const messages = useAppSelector((state) => state.message.conversations);
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>('People');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (activeTab === 'People') {
      const people = connections.map((c) => ({
        id: `person-${c.user.id}`,
        title: `${c.user.firstName} ${c.user.lastName}`,
        subtitle: c.user.headline ?? c.user.location ?? 'Teams user',
        type: 'Person',
      }));
      return people.filter((p) => `${p.title} ${p.subtitle}`.toLowerCase().includes(q));
    }

    if (activeTab === 'Chats') {
      const convs = messages.map((conv) => ({
        id: `conv-${conv.id}`,
        title: `${conv.participant.firstName} ${conv.participant.lastName}`,
        subtitle: conv.lastMessage?.content ?? '',
        type: 'Chat',
      }));
      return convs.filter((c) => `${c.title} ${c.subtitle}`.toLowerCase().includes(q));
    }

    if (activeTab === 'Files') {
      // Placeholder: use posts as file-like items for demo
      const files = posts.map((p) => ({ id: `file-${p.id}`, title: p.content.slice(0, 40), subtitle: 'Document', type: 'File' }));
      return files.filter((f) => `${f.title} ${f.subtitle}`.toLowerCase().includes(q));
    }

    // Commands
    const commands = [
      { id: 'cmd-1', title: 'Start meeting', subtitle: 'Create a new meeting', type: 'Command' },
      { id: 'cmd-2', title: 'Share file', subtitle: 'Upload and share a file', type: 'Command' },
    ];
    return commands.filter((c) => `${c.title} ${c.subtitle}`.toLowerCase().includes(q));
  }, [activeTab, connections, messages, posts, query]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          autoFocus
          onChangeText={setQuery}
          placeholder="Search people, chats, files, commands"
          placeholderTextColor={COLORS.TEXT_SECONDARY}
          style={styles.searchInput}
          value={query}
        />

        <View style={styles.tabRow}>
          {tabs.map((t) => (
            <Pressable
              key={t}
              onPress={() => setActiveTab(t)}
              style={[styles.tabButton, activeTab === t && styles.tabActive]}
            >
              <Text style={[styles.tabText, activeTab === t && styles.tabTextActive]}>{t}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.resultRow}>
            <View style={styles.resultIcon}>
              <Text style={styles.resultIconText}>{item.type[0]}</Text>
            </View>
            <View style={styles.resultBody}>
              <Text style={styles.resultTitle}>{item.title}</Text>
              {item.subtitle ? <Text style={styles.resultSubtitle}>{item.subtitle}</Text> : null}
            </View>
            <Text style={styles.resultType}>{item.type}</Text>
          </View>
        )}
        ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyText}>No results</Text></View>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.SURFACE },
  header: { backgroundColor: COLORS.BACKGROUND, borderBottomColor: COLORS.DIVIDER, borderBottomWidth: 1, padding: SPACING.M },
  searchInput: { backgroundColor: COLORS.PRIMARY_LIGHT, borderRadius: 6, color: COLORS.TEXT_PRIMARY, minHeight: 46, paddingHorizontal: SPACING.M },
  tabRow: { flexDirection: 'row', gap: SPACING.S, marginTop: SPACING.M },
  tabButton: { paddingVertical: SPACING.S, paddingHorizontal: SPACING.M, borderRadius: 12, backgroundColor: 'transparent' },
  tabActive: { backgroundColor: COLORS.PRIMARY_LIGHT },
  tabText: { ...TYPOGRAPHY.SUBTITLE2, color: COLORS.TEXT_SECONDARY },
  tabTextActive: { color: COLORS.PRIMARY, fontWeight: '700' },
  listContent: { paddingBottom: SPACING.L },
  resultRow: { alignItems: 'center', backgroundColor: COLORS.BACKGROUND, borderBottomColor: COLORS.DIVIDER, borderBottomWidth: 1, flexDirection: 'row', gap: SPACING.M, padding: SPACING.M },
  resultIcon: { alignItems: 'center', backgroundColor: COLORS.PRIMARY_DARK, borderRadius: 22, height: 44, justifyContent: 'center', width: 44 },
  resultIconText: { color: COLORS.TEXT_INVERSE, fontWeight: '700' },
  resultBody: { flex: 1 },
  resultTitle: { ...TYPOGRAPHY.SUBTITLE2, color: COLORS.TEXT_PRIMARY },
  resultSubtitle: { ...TYPOGRAPHY.BODY2, color: COLORS.TEXT_SECONDARY },
  resultType: { ...TYPOGRAPHY.CAPTION, color: COLORS.PRIMARY, fontWeight: '700' },
  empty: { padding: SPACING.L, alignItems: 'center' },
  emptyText: { color: COLORS.TEXT_SECONDARY },
});

export default SearchScreen;
