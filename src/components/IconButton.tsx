import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import CustomText from './CustomText';
import { IconButtonProps } from '../types/DataType';
import { useTheme } from '../hooks/ThemeContext';

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  rightIcon,
  iconColor,
  size = 32,
  rightIconSize = 32,
  text,
  leftText,
  fontSize = 14,
  textColor,
  onPress,
  btnWidth,
  btnHeight,
  customBtnStyle,
  fontFamily,
}) => {
  const { colors } = useTheme();
  const resolvedTextColor = textColor ?? colors.text;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      style={[styles.iconBtn, customBtnStyle, { width: btnWidth, height: btnHeight }]}
    >
      {leftText && (
        <CustomText
          text={leftText}
          fontSize={fontSize}
          color={resolvedTextColor}
          fontFamily={fontFamily}
        />
      )}

      {icon && (
        <Image
          source={icon}
          style={{
            width: size,
            height: size,
            tintColor: iconColor,
          }}
          resizeMode="contain"
        />
      )}

      {text && (
        <CustomText
          text={text}
          fontSize={fontSize}
          color={resolvedTextColor}
          fontFamily={fontFamily}
        />
      )}
      {rightIcon && (
        <Image
          source={rightIcon}
          style={{
            width: rightIconSize,
            height: rightIconSize,
            tintColor: iconColor,
          }}
          resizeMode="contain"
        />
      )}
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  iconBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 8,
  },
});
