import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import CustomIcon from '../../components/CustomIcon';
import Icons from '../../utils/Icons';
import { SPACING, TYPOGRAPHY } from '../../styles';

const apps = [
  { label: 'Add app', icon: Icons.addIcon, color: '#7E84FF' },
  { label: 'Updates', icon: Icons.documentIcon, color: '#5D62CC' },
  { label: 'Bookings', icon: Icons.bookingsIcon, color: '#FFFFFF' },
  { label: 'Copilot', icon: Icons.aiIcon, color: '#FFFFFF' },
  { label: 'YouTube', icon: Icons.playIcon, color: '#FFFFFF' },
  { label: 'Calendar', icon: Icons.calendarIcon, color: '#0087B5' },
  { label: 'Whiteboard', icon: Icons.editorIcon, color: '#1741B7' },
  { label: 'Decisions', icon: Icons.selectedIcon, color: '#7E84FF' },
  { label: 'Workflows', icon: Icons.automationIcon, color: '#5D4DD0' },
  { label: 'Excel', icon: Icons.sheetsIcon, color: '#1F6C3B' },
  { label: 'Word', icon: Icons.fileIcon, color: '#244EA2' },
  { label: 'Shifts', icon: Icons.calendarIcon, color: '#6965A7' },
  { label: 'Camera', icon: Icons.cameraIcon, color: '#D22D55' },
  { label: 'Planner', icon: Icons.applicationsIcon, color: '#6C61D5' },
  { label: 'OneNote', icon: Icons.notesIcon, color: '#FFFFFF' },
  { label: 'Clipchamp', icon: Icons.playIcon, color: '#FFFFFF' },
];

const MoreScreen: React.FC = () => (
  <View style={styles.screen}>
    <View style={styles.handle} />
    <Text style={styles.reorder}>Reorder</Text>
    <FlatList
      data={apps}
      keyExtractor={item => item.label}
      numColumns={4}
      contentContainerStyle={styles.grid}
      renderItem={({ item }) => (
        <View style={styles.appCell}>
          <View style={[styles.appIcon, { backgroundColor: item.color }]}>
            <CustomIcon icon={item.icon} color={item.color === '#FFFFFF' ? '#5D62CC' : '#FFFFFF'} size={34} />
          </View>
          <Text numberOfLines={1} style={styles.appLabel}>
            {item.label}
          </Text>
        </View>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  appCell: {
    alignItems: 'center',
    flex: 1,
    marginBottom: SPACING.L,
  },
  appIcon: {
    alignItems: 'center',
    borderRadius: 10,
    height: 68,
    justifyContent: 'center',
    width: 68,
  },
  appLabel: {
    ...TYPOGRAPHY.BODY2,
    color: '#E8E8E8',
    marginTop: SPACING.S,
    maxWidth: 82,
  },
  grid: {
    paddingBottom: 100,
    paddingHorizontal: SPACING.M,
    paddingTop: SPACING.L,
  },
  handle: {
    alignSelf: 'center',
    backgroundColor: '#6E6E6E',
    borderRadius: 4,
    height: 8,
    marginTop: SPACING.M,
    width: 72,
  },
  reorder: {
    color: '#9CA0FF',
    fontSize: 16,
    fontWeight: '700',
    marginRight: SPACING.L,
    marginTop: SPACING.S,
    textAlign: 'right',
  },
  screen: {
    backgroundColor: '#202020',
    flex: 1,
  },
});

export default MoreScreen;
