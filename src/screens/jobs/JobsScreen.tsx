import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { applyToJob, saveJob, setJobsSearchQuery, unsaveJob } from '../../redux';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Job } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

const JobsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { jobs, savedJobIds, appliedJobIds, searchQuery } = useAppSelector((state) => state.jobs);
  const [activeFilter, setActiveFilter] = useState<'all' | 'saved' | 'applied'>('all');

  const filteredJobs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesQuery =
        !query ||
        job.title.toLowerCase().includes(query) ||
        job.companyName.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.skills.some((skill) => skill.toLowerCase().includes(query));
      const matchesFilter =
        activeFilter === 'all' ||
        (activeFilter === 'saved' && job.saved) ||
        (activeFilter === 'applied' && job.applied);

      return matchesQuery && matchesFilter;
    });
  }, [activeFilter, jobs, searchQuery]);

  const renderJob = ({ item }: { item: Job }) => (
    <View style={styles.jobCard}>
      <View style={styles.companyLogo}>
        <Text style={styles.companyLogoText}>{item.companyName[0]}</Text>
      </View>
      <View style={styles.jobContent}>
        <View style={styles.jobTopRow}>
          <View style={styles.jobTitleBlock}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.company}>{item.companyName}</Text>
            <Text style={styles.meta}>{item.location} • {item.workMode} • {item.applicants} applicants</Text>
          </View>
          <Pressable onPress={() => dispatch(item.saved ? unsaveJob(item.id) : saveJob(item.id))}>
            <Text style={[styles.saveText, item.saved && styles.activeText]}>
              {item.saved ? 'Saved' : 'Save'}
            </Text>
          </Pressable>
        </View>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.skillRow}>
          {item.skills.map((skill) => (
            <Text key={skill} style={styles.skill}>{skill}</Text>
          ))}
        </View>
        <View style={styles.jobActions}>
          <Pressable
            style={[styles.applyButton, item.applied && styles.appliedButton]}
            onPress={() => dispatch(applyToJob(item.id))}
            disabled={item.applied}
          >
            <Text style={[styles.applyText, item.applied && styles.appliedText]}>
              {item.applied ? 'Applied' : 'Easy Apply'}
            </Text>
          </Pressable>
          {item.salaryRange ? <Text style={styles.salary}>{item.salaryRange}</Text> : null}
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={filteredJobs}
      keyExtractor={(item) => item.id}
      renderItem={renderJob}
      contentContainerStyle={styles.content}
      ListHeaderComponent={
        <>
          <View style={styles.headerPanel}>
            <Text style={styles.title}>Jobs for you</Text>
            <Text style={styles.subtitle}>
              {savedJobIds.length} saved • {appliedJobIds.length} applied
            </Text>
            <TextInput
              placeholder="Search job title, company, skill"
              placeholderTextColor={COLORS.TEXT_SECONDARY}
              onChangeText={(text) => dispatch(setJobsSearchQuery(text))}
              style={styles.searchInput}
              value={searchQuery}
            />
          </View>
          <View style={styles.filters}>
            {(['all', 'saved', 'applied'] as const).map((filter) => (
              <Pressable
                key={filter}
                style={[styles.filterButton, activeFilter === filter && styles.activeFilterButton]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text style={[styles.filterText, activeFilter === filter && styles.activeFilterText]}>
                  {filter === 'all' ? 'Recommended' : filter[0].toUpperCase() + filter.slice(1)}
                </Text>
              </Pressable>
            ))}
          </View>
        </>
      }
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No jobs found</Text>
          <Text style={styles.emptyText}>Try another keyword or filter.</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: COLORS.SURFACE,
    paddingBottom: SPACING.L,
  },
  headerPanel: {
    backgroundColor: COLORS.BACKGROUND,
    borderBottomColor: COLORS.DIVIDER,
    borderBottomWidth: 1,
    padding: SPACING.M,
  },
  title: {
    ...TYPOGRAPHY.H2,
    color: COLORS.TEXT_PRIMARY,
  },
  subtitle: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.XS,
  },
  searchInput: {
    backgroundColor: COLORS.PRIMARY_LIGHT,
    borderRadius: 6,
    color: COLORS.TEXT_PRIMARY,
    marginTop: SPACING.M,
    minHeight: 44,
    paddingHorizontal: SPACING.M,
  },
  filters: {
    backgroundColor: COLORS.BACKGROUND,
    borderBottomColor: COLORS.DIVIDER,
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: SPACING.S,
    padding: SPACING.M,
  },
  filterButton: {
    borderColor: COLORS.BORDER,
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: SPACING.M,
    paddingVertical: SPACING.S,
  },
  activeFilterButton: {
    backgroundColor: COLORS.SECONDARY,
    borderColor: COLORS.SECONDARY,
  },
  filterText: {
    color: COLORS.TEXT_SECONDARY,
    fontWeight: '700',
  },
  activeFilterText: {
    color: COLORS.TEXT_INVERSE,
  },
  jobCard: {
    backgroundColor: COLORS.BACKGROUND,
    borderBottomColor: COLORS.DIVIDER,
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: SPACING.M,
    padding: SPACING.M,
  },
  companyLogo: {
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY_LIGHT,
    height: 54,
    justifyContent: 'center',
    width: 54,
  },
  companyLogoText: {
    color: COLORS.PRIMARY,
    fontSize: 20,
    fontWeight: '700',
  },
  jobContent: {
    flex: 1,
  },
  jobTopRow: {
    flexDirection: 'row',
    gap: SPACING.M,
  },
  jobTitleBlock: {
    flex: 1,
  },
  jobTitle: {
    ...TYPOGRAPHY.SUBTITLE1,
    color: COLORS.PRIMARY,
  },
  company: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.TEXT_PRIMARY,
  },
  meta: {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.XS,
  },
  saveText: {
    color: COLORS.TEXT_SECONDARY,
    fontWeight: '700',
  },
  activeText: {
    color: COLORS.PRIMARY,
  },
  description: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.M,
  },
  skillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.S,
    marginTop: SPACING.M,
  },
  skill: {
    ...TYPOGRAPHY.CAPTION,
    backgroundColor: COLORS.SURFACE,
    borderRadius: 12,
    color: COLORS.TEXT_SECONDARY,
    overflow: 'hidden',
    paddingHorizontal: SPACING.S,
    paddingVertical: SPACING.XS,
  },
  jobActions: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.M,
  },
  applyButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 18,
    paddingHorizontal: SPACING.L,
    paddingVertical: SPACING.S,
  },
  appliedButton: {
    backgroundColor: COLORS.SUCCESS_LIGHT,
  },
  applyText: {
    color: COLORS.TEXT_INVERSE,
    fontWeight: '700',
  },
  appliedText: {
    color: COLORS.SUCCESS,
  },
  salary: {
    ...TYPOGRAPHY.SUBTITLE2,
    color: COLORS.SECONDARY,
  },
  emptyState: {
    alignItems: 'center',
    padding: SPACING.XL,
  },
  emptyTitle: {
    ...TYPOGRAPHY.SUBTITLE1,
    color: COLORS.TEXT_PRIMARY,
  },
  emptyText: {
    ...TYPOGRAPHY.BODY2,
    color: COLORS.TEXT_SECONDARY,
  },
});

export default JobsScreen;
