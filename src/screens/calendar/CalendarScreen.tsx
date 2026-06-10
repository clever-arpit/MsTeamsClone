import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

const CalendarScreen: React.FC = () => {
  const [meetings, setMeetings] = useState<{ id: string; title: string; time: string }[]>([]);

  const addMeeting = () => {
    const next = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    setMeetings((m) => [{ id: `m-${Date.now()}`, title: 'New meeting', time: next }, ...m]);
  };

  return (
    <View style={styles.screen}>
      <Pressable style={styles.add} onPress={addMeeting}><Text style={styles.addText}>Schedule meeting</Text></Pressable>
      <FlatList
        data={meetings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{new Date(item.time).toLocaleString()}</Text>
          </View>
        )}
        ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyText}>No meetings scheduled</Text></View>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.SURFACE },
  add: { backgroundColor: COLORS.PRIMARY, padding: SPACING.M, margin: SPACING.M, borderRadius: 8, alignItems: 'center' },
  addText: { color: COLORS.TEXT_INVERSE, fontWeight: '700' },
  row: { padding: SPACING.M, borderBottomColor: COLORS.DIVIDER, borderBottomWidth: 1 },
  title: { ...TYPOGRAPHY.SUBTITLE2, color: COLORS.TEXT_PRIMARY },
  subtitle: { ...TYPOGRAPHY.CAPTION, color: COLORS.TEXT_SECONDARY, marginTop: SPACING.XS },
  empty: { alignItems: 'center', padding: SPACING.L },
  emptyText: { color: COLORS.TEXT_SECONDARY },
});

export default CalendarScreen;
