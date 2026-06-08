import { DimensionValue, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { useTheme } from '../hooks/ThemeContext';

interface ItemSeparatorProps {
  marginLeft?: DimensionValue;
  width?: DimensionValue;
}

const ItemSeparator: FC<ItemSeparatorProps> = ({width= '80%', marginLeft = '9%' }) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        height: 1,
        backgroundColor: colors.border_color,
        width: width,
        marginLeft: marginLeft,
      }}
    />
  );
};

export default ItemSeparator;
