import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
  ViewStyle,
} from 'react-native';
import React from 'react';
import Config from 'react-native-config';
import CustomIcon from './CustomIcon';
import CustomText from './CustomText';
import IconButton from './IconButton';
import { useTheme } from '../hooks/ThemeContext';

interface TileProps {
  title: string;
  subTitle: string;
  icon?: ImageSourcePropType;
  iconSize?: number;
  rightIconSize?: number;
  rightIconColor?: string;
  rightIcon?: ImageSourcePropType;
  onPress?: () => void;
  onRightIconPress?: () => void;
  onChangeText?: (value: string) => void;
  editable?: boolean;
  customStyle?: ViewStyle;
  backgroundColor?: string;
  rightText?: string;
}

const CustomTile: React.FC<TileProps> = ({
  title,
  subTitle,
  icon,
  iconSize = 20,
  rightIcon,
  rightIconSize = 20,
  rightIconColor = '',
  onPress,
  onRightIconPress,
  customStyle = { gap: 4 },
  backgroundColor,
  rightText,
}) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      style={[
        styles.tile,
        {
          backgroundColor: backgroundColor ?? colors.item_background,
          borderColor: colors.item_border_color,
        },
      ]}
    >
      {icon && <CustomIcon icon={icon} color={colors.blue} size={iconSize} />}
      <View style={customStyle}>
        <CustomText text={title} fontFamily={Config.FONT_FAMILY_SEMI} />
        {rightText ? <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, justifyContent: 'space-between', width: '100%' }}>
          <CustomText text={subTitle} color={colors.light_text} fontSize={13} />
          <CustomText text={rightText} color={colors.light_text} fontSize={13} />
        </View> : <CustomText text={subTitle} color={colors.light_text} fontSize={13} />}
      </View>
      {rightIcon && (
        <IconButton
          icon={rightIcon}
          onPress={onRightIconPress}
          size={rightIconSize}
          iconColor={rightIconColor}
          customBtnStyle={{ marginLeft: 'auto' }}
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomTile;

const styles = StyleSheet.create({
  tile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
  },
});
