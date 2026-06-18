import React from 'react';
import {
  Text,
  TextStyle,
  StyleProp,
  ColorValue,
  TouchableOpacity,
  TextProps,
} from 'react-native';
import Config from 'react-native-config';
import { isValidUrl, openUrl } from '../utils/Helper';
import { useTheme } from '../hooks/ThemeContext';

interface CustomTextProps {
  text?: string;
  fontSize?: number;
  fontWeight?: TextStyle['fontWeight'];
  fontStyle?: TextStyle['fontStyle'];
  color?: ColorValue;
  fontFamily?: TextStyle['fontFamily'];
  textAlign?: TextStyle['textAlign'];
  customStyle?: StyleProp<TextStyle>;
  numberOfLines?: TextProps['numberOfLines'];
  ellipsizeMode?: TextProps['ellipsizeMode'];
  onPress?: (() => void) | null;
}

const CustomText: React.FC<CustomTextProps> = ({
  text = '',
  fontSize = 15,
  fontWeight,
  fontStyle = 'normal',
  color = '',
  fontFamily = Config.FONT_FAMILY,
  textAlign = 'auto',
  customStyle = null,
  numberOfLines,
  ellipsizeMode,
  onPress = null,
}) => {
  const { colors } = useTheme();
  const hasUrl = text && isValidUrl(text);
  

  return hasUrl ? (
    <TouchableOpacity onPress={() => openUrl(text)}>
      <Text
        ellipsizeMode={ellipsizeMode}
        numberOfLines={numberOfLines}
        style={[
          {
            fontSize,
            fontWeight,
            color: colors.dark_blue,
            fontFamily,
            lineHeight: fontSize * 1.3,
            fontStyle,
          },
          customStyle,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  ) : onPress && !hasUrl ? (
    <TouchableOpacity onPress={onPress ?? undefined}>
      <Text
        ellipsizeMode={ellipsizeMode}
        numberOfLines={numberOfLines}
        style={[
          {
            fontSize,
            fontWeight,
            color: color ? color : colors.text,
            fontFamily,
            lineHeight: fontSize * 1.3,
            fontStyle,
            textAlign,
          },
          customStyle,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  ) : (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[
        {
          fontSize,
          fontWeight,
          color: color ? color : colors.text,
          fontFamily,
          lineHeight: fontSize * 1.3,
          fontStyle,
          textAlign,
        },
        customStyle,
      ]}
    >
      {text}
    </Text>
  );
};

export default CustomText;
