import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '../hooks/ThemeContext';

interface Divider {
  color?: string;
  customStyle?: ViewStyle | ViewStyle[];
}
const Divider: React.FC<Divider> = ({ color, customStyle }) => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        {
          height: 1,
          width: '100%',
          backgroundColor: color ? color : colors.divider_color,
        },
        customStyle,
      ]}
    />
  );
};

export default Divider;
