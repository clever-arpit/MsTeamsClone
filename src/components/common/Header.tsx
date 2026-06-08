import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

const Header: React.FC<{ title: string; rightComponent?: React.ReactNode }> = ({
  title,
  rightComponent,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {rightComponent && <View style={styles.right}>{rightComponent}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.M,
    paddingVertical: SPACING.M,
    backgroundColor: COLORS.BACKGROUND,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
  },
  title: {
    ...TYPOGRAPHY.SUBTITLE1,
    color: COLORS.TEXT_PRIMARY,
  },
  right: {
    flexDirection: 'row',
    gap: SPACING.M,
  },
});

export default Header;
