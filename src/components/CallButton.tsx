import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  GestureResponderEvent,
  ImageSourcePropType,
} from 'react-native';
import { useTheme } from '../hooks/ThemeContext';
import CustomIcon from './CustomIcon';
import CustomText from './CustomText';
import { Font } from 'react-native-paper/lib/typescript/types';
import { FontWeight } from '../types/DataType';

interface CallButtonProps {
  icon: ImageSourcePropType;
  onPress?: (event: GestureResponderEvent) => void;
  text?: string;
  disabled?: boolean;
  fontFamily?: string;
  fontWeight?: FontWeight;
  fontSize?: number;
  iconSize?: number;
  iconColor?: string;
  bgColor?: string;
  size?: number;
}

const CallButton: React.FC<CallButtonProps> = ({
  icon,
  iconSize,
  iconColor,
  text,
  fontSize = 12,
  size = 65,
  fontWeight = '500',
  fontFamily,
  onPress,
  disabled = false,
  bgColor,
}) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            width: size,
            height: size,
            backgroundColor: bgColor ? bgColor : colors.inactive_color,
          },
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        <CustomIcon icon={icon} size={iconSize} color={iconColor} />
      </TouchableOpacity>
      {text && (
        <CustomText
          text={text}
          color={colors.light_text}
          fontSize={fontSize}
          fontWeight={fontWeight}
          fontFamily={fontFamily}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    gap: 8,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});

export default CallButton;
