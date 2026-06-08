import React from 'react';
import {
  View,
  StyleProp,
  TextStyle,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import { useTheme } from '../hooks/ThemeContext';
import CustomText from './CustomText';

interface CustomAttachmentButtonProps {
  title?: string;
  fontSize?: number;
  backgroundColor?: string;
  onPress: (event: GestureResponderEvent) => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  height?: number;
}

const CustomAttachmentButton: React.FC<CustomAttachmentButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  backgroundColor,
  fontSize = 14,
  textStyle,
}) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        buttonStyle,
        {
          backgroundColor: backgroundColor ?? colors.input_background,
          borderColor: colors.item_border_color,
        },
      ]}
      activeOpacity={0.6}
    >
      <View
        style={[
          styles.file,
          { backgroundColor: colors.choose_file_background },
        ]}
      >
        <CustomText
          text="Choose File"
          fontSize={fontSize}
          color={colors.text}
          customStyle={textStyle}
        />
      </View>
      <CustomText
        text={title}
        fontSize={fontSize}
        color={colors.text}
        customStyle={textStyle}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    gap: 7,
    borderWidth: 1,
    padding: 10,
  },
  file: {
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default CustomAttachmentButton;
