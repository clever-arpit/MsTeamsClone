import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import { useTheme } from '../hooks/ThemeContext';
import CustomText from './CustomText';

type CustomBadgeProps = {
  size?: number;
  style?: ViewStyle;
  visible?: boolean;
  count: number;
};

const CustomBadge = ({ style, visible = true, count }: CustomBadgeProps) => {
  const { colors } = useTheme();
  if (!visible) return null;
  if (!count) return null;

  return (
    <View
      style={[
        { backgroundColor: colors.badge_background },
        style,
        styles.badge,
      ]}
    >
      <CustomText
        text={count > 99 ? '99+' : count?.toString()}
        fontSize={10}
        color={colors.white}
      />
    </View>
  );
};

export default CustomBadge;

const styles = StyleSheet.create({
  badge: {
    borderRadius: 50,
    height: 21,
    width: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
