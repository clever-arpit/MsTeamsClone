import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { FC } from 'react';
import CustomText from './CustomText';
import { useTheme } from '../hooks/ThemeContext';

export interface CustomChipProps {
  text: string;
  style?: ViewStyle;
  textColor?: string;
  fontStyle?: TextStyle['fontStyle'];
  fontWeight?: TextStyle['fontWeight'];
  fontSize?: number;
  backgroundColor?: string;
  onPress?: () => void;
}

const CustomChip: FC<CustomChipProps> = ({
  text,
  style = {},
  textColor,
  fontStyle = 'normal',
  fontWeight = '400',
  fontSize = 14,
  backgroundColor,
  onPress,
}) => {
  const { colors } = useTheme();
  const color = textColor ? textColor : colors.text;
  return (
    <TouchableOpacity
      onPress={onPress ?? undefined}
      disabled={!onPress}
      style={[
        styles.container,
        style,
        { backgroundColor: backgroundColor ?? colors.green },
      ]}
    >
      <CustomText
        text={text}
        color={color}
        fontStyle={fontStyle}
        fontWeight={fontWeight}
        fontSize={fontSize}
      />
    </TouchableOpacity>
  );
};

export default CustomChip;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
  },
});
