import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAppSelector } from '../../redux/hooks';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

type SearchResult = {
  id: string;
  title: string;
  subtitle: string;
  type: 'Person' | 'Post' | 'Job';
};

const SearchScreen: React.FC = () => {
  const posts = useAppSelector((state) => state.feed.posts);
  const jobs = useAppSelector((state) => state.jobs.jobs);
  const connections = useAppSelector((state) => state.connection.connections);
  const recommendations = useAppSelector((state) => state.connection.recommendations);
  const [query, setQuery] = useState('');

  const results = useMemo<SearchResult[]>(() => {
    const normalized = query.trim().toLowerCase();
    const people = [...connections.map((item) => item.user), ...recommendations.map((item) => item.user)].map((person) => ({
      id: `person-${person.id}`,
      title: `${person.firstName} ${person.lastName}`,
      subtitle: person.headline ?? person.location ?? 'LinkedIn member',
      type: 'Person' as const,
    }));
    const postResults = posts.map((post) => ({
      id: `post-${post.id}`,
      title: `${post.author.firstName} ${post.author.lastName}`,
      subtitle: post.content,
      type: 'Post' as const,
    }));
    const jobResults = jobs.map((job) => ({
      id: `job-${job.id}`,
      title: job.title,
      subtitle: `${job.companyName} • ${job.location}`,
      type: 'Job' as const,
    }));

    return [...people, ...postResults, ...jobResults].filter((item) => {
      if (!normalized) return true;
      return `${item.title} ${item.subtitle} ${item.type}`.toLowerCase().includes(normalized);
    });
  }, [connections, jobs, posts, query, recommendations]);

  return (
    <FlatList
      data={results}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.content}
      ListHeaderComponent={
        <View style={styles.header}>
          <TextInput
            autoFocus
            onChangeText={setQuery}
            placeholder="Search people, posts, jobs"
            placeholderTextColor={COLORS.TEXT_SECONDARY}
            style={styles.searchInput}
            value={query}
          />
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.resultRow}>
          <View style={styles.resultIcon}>
            <Text style={styles.resultIconText}>{item.type[0]}</Text>
          </View>
          <View style={styles.resultBody}>
            <Text style={styles.resultTitle}>{item.title}</Text>
            <Text style={styles.resultSubtitle} numberOfLines={2}>{item.subtitle}</Text>
          </View>
          <Text style={styles.resultType}>{item.type}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: COLORS.SURFACE,
    paddingBottom: SPACING.L,
  },
  header: {
    backgroundColor: COLORS.BACKGROUND,
    borderBottomColor: COLORS.DIVIDER,
    borderBottomWidth: 1,
    padding: SPACING.M,
  },
  searchInput: {
    backgroundColor: COLORS.PRIMARY_LIGHT,
    borderRadius: 6,
    color: COLORS.TEXT_PRIMARY,
    minHeight: 46,
    paddingHorizontal: SPACING.M,
  },
  resultRow: {
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND,
    borderBottomColor: COLORS.DIVIDER,
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: SPACING.M,
    padding: SPACING.M,
  },
  resultIcon: {
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY_DARK,
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  resultIconText: {
    color: COLORS.TEXT_INVERSE,
    fontWeight: '700',
  },
  resultBody: {
    flex: 1,
  },
  resultTitle: {
    ...TYPOGRAPHY.SUBTITLE2,
    color: COLORS.TEXT_PRIMARY,
  },
  resultSubtitle: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.TEXT_SECONDARY,
  },
  resultType: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.PRIMARY,
    fontWeight: '700',
  },
});

export default SearchScreen;
