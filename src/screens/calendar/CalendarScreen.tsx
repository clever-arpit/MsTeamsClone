import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import CustomIcon from '../../components/CustomIcon';
import Icons from '../../utils/Icons';
import { SPACING, TYPOGRAPHY } from '../../styles';

const days = [
  { day: 'S', date: '14' },
  { day: 'M', date: '15' },
  { day: 'T', date: '16' },
  { day: 'W', date: '17' },
  { day: 'T', date: '18', active: true },
  { day: 'F', date: '19' },
  { day: 'S', date: '20' },
];

const hours = ['3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm'];

const CalendarScreen: React.FC = () => {
  return (
    <View style={styles.screen}>
      <View style={styles.modeRow}>
        <Pressable style={styles.modePill}>
          <Text style={styles.modeText}>Agenda</Text>
        </Pressable>
        <Pressable style={[styles.modePill, styles.modePillActive]}>
          <Text style={[styles.modeText, styles.modeTextActive]}>Day</Text>
        </Pressable>
      </View>

      <View style={styles.weekRow}>
        {days.map(item => (
          <View key={`${item.day}-${item.date}`} style={styles.dayColumn}>
            <Text style={styles.dayLabel}>{item.day}</Text>
            <View style={[styles.dateCircle, item.active && styles.activeDate]}>
              <Text style={[styles.dateText, item.active && styles.activeDateText]}>
                {item.date}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.timeline}>
        <View style={styles.handle} />
        {hours.map(hour => (
          <View key={hour} style={styles.hourRow}>
            <Text style={styles.hourText}>{hour}</Text>
            <View style={styles.hourLine} />
          </View>
        ))}
        <View style={styles.nowRow}>
          <Text style={styles.nowText}>5:35 pm</Text>
          <View style={styles.nowDot} />
          <View style={styles.nowLine} />
        </View>
      </View>

      <Pressable style={styles.fab}>
        <CustomIcon icon={Icons.addIcon} color="#000000" size={34} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  activeDate: {
    backgroundColor: '#7E84FF',
  },
  activeDateText: {
    color: '#111111',
  },
  dateCircle: {
    alignItems: 'center',
    borderRadius: 32,
    height: 64,
    justifyContent: 'center',
    marginTop: SPACING.S,
    width: 64,
  },
  dateText: {
    color: '#E8E8E8',
    fontSize: 22,
  },
  dayColumn: {
    alignItems: 'center',
    flex: 1,
  },
  dayLabel: {
    color: '#777777',
    fontSize: 17,
  },
  fab: {
    alignItems: 'center',
    backgroundColor: '#7E84FF',
    borderRadius: 40,
    bottom: 56,
    height: 80,
    justifyContent: 'center',
    position: 'absolute',
    right: 32,
    width: 80,
  },
  handle: {
    alignSelf: 'center',
    backgroundColor: '#6E6E6E',
    borderRadius: 4,
    height: 8,
    marginBottom: SPACING.M,
    width: 72,
  },
  hourLine: {
    backgroundColor: '#343434',
    flex: 1,
    height: 1,
  },
  hourRow: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 92,
  },
  hourText: {
    ...TYPOGRAPHY.BODY2,
    color: '#A8A8A8',
    width: 68,
  },
  modePill: {
    backgroundColor: '#000000',
    borderColor: '#242424',
    borderRadius: 26,
    borderWidth: 1,
    paddingHorizontal: SPACING.L,
    paddingVertical: 12,
  },
  modePillActive: {
    backgroundColor: '#242044',
  },
  modeRow: {
    backgroundColor: '#141414',
    flexDirection: 'row',
    gap: SPACING.S,
    paddingHorizontal: SPACING.M,
    paddingVertical: SPACING.M,
  },
  modeText: {
    color: '#E8E8E8',
    fontSize: 18,
    fontWeight: '700',
  },
  modeTextActive: {
    color: '#9CA0FF',
  },
  nowDot: {
    backgroundColor: '#FF7B57',
    borderRadius: 6,
    height: 12,
    marginLeft: 2,
    width: 12,
  },
  nowLine: {
    backgroundColor: '#FF7B57',
    flex: 1,
    height: 1,
  },
  nowRow: {
    alignItems: 'center',
    flexDirection: 'row',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 334,
  },
  nowText: {
    color: '#FF7B57',
    fontSize: 14,
    width: 68,
  },
  screen: {
    backgroundColor: '#000000',
    flex: 1,
  },
  timeline: {
    backgroundColor: '#000000',
    borderTopColor: '#242424',
    borderTopWidth: 1,
    flex: 1,
    paddingTop: SPACING.M,
  },
  weekRow: {
    backgroundColor: '#000000',
    borderBottomColor: '#242424',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingBottom: SPACING.M,
    paddingHorizontal: SPACING.S,
  },
});

export default CalendarScreen;
