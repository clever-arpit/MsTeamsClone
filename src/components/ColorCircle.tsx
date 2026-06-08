import React, { FC } from 'react';
import { View } from 'react-native';
import { ColorCircleProps } from '../types/DataType';

const ColorCircle: FC<ColorCircleProps> = ({ colorCode, size = 17 }) => {
  return colorCode ? (
    <View
      style={{
        backgroundColor: colorCode,
        width: size,
        height: size,
        borderRadius: 20,
      }}
    />
  ) : null;
};

export default ColorCircle;
