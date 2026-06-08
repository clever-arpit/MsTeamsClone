import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import CustomText from './CustomText';
import { useTheme } from '../hooks/ThemeContext';
import { TextButtonProps } from '../types/DataType';
import Config from 'react-native-config';

const TextButton: React.FC<TextButtonProps> = ({
  text,
  fontSize = 14,
  textColor,
  fontFamily = Config.FONT_FAMILY,
  onPress,
  customStyle,
}) => {
  const { colors } = useTheme();
  const resolvedTextColor = textColor ?? colors.text;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.textBtn, customStyle]}>
      {text && (
        <CustomText
          text={text}
          fontSize={fontSize}
          color={resolvedTextColor}
          fontFamily={fontFamily}
        />
      )}
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  textBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 8,
  },
});
