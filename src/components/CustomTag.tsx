import { View } from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import { useTheme } from '../hooks/ThemeContext';

const CustomTag = ({ text = '' }) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 50,
        backgroundColor: colors.blue,
      }}
    >
      <CustomText text={text} fontSize={12} color={colors.white} />
    </View>
  );
};

export default CustomTag;
