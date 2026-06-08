import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../hooks/ThemeContext';
import CustomText from './CustomText';

interface CustomButtonProps {
  title?: string;
  fontSize?: number;
  backgroundColor?: string;
  onPress: (event: GestureResponderEvent) => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  loading?: boolean;
  height?: number;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  backgroundColor,
  disabled = false,
  loading = false,
  fontSize = 15,
  height = 42,
  textStyle,
}) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        buttonStyle,
        {
          backgroundColor: backgroundColor
            ? backgroundColor
            : colors.btn_background,
          height,
        },
      ]}
      activeOpacity={0.6}
    >
      {loading ? (
        <ActivityIndicator
          animating={loading}
          size={'small'}
          color={colors.white}
        />
      ) : (
        <CustomText
          text={title}
          fontSize={fontSize}
          color={colors.btn_color}
          customStyle={textStyle}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    gap: 7,
  },
});

export default CustomButton;
