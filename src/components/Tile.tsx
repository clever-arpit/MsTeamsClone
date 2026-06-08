import { ImageSourcePropType, StyleSheet, View, ViewStyle } from 'react-native';
import React, { ReactNode } from 'react';
import CustomIcon from './CustomIcon';
import CustomText from './CustomText';
import IconButton from './IconButton';
import CustomTextInput from './CustomTextInput';
import { useTheme } from '../hooks/ThemeContext';

interface TileProps {
  icon?: ImageSourcePropType;
  label: string;
  title: string;
  iconSize?: number;
  fontSize?: number;
  rightIconSize?: number;
  rightIcon?: ImageSourcePropType;
  onRightIconPress?: () => void;
  onChangeText?: (value: string) => void;
  editable?: boolean;
  customRight?: ReactNode;
  customStyle?: ViewStyle;
}

const Tile: React.FC<TileProps> = ({
  icon,
  label,
  title,
  iconSize = 20,
  fontSize = 15,
  rightIcon,
  rightIconSize = 20,
  onRightIconPress,
  editable = false,
  onChangeText,
  customRight,
  customStyle,
}) => {
  const { colors } = useTheme();
  return title && !editable ? (
    <View style={styles.tile}>
      {icon && <CustomIcon icon={icon} color={colors.blue} size={iconSize} />}
      <View style={[styles.detail, customStyle]}>
        <View style={styles.label}>
          {label && (
            <CustomText
              text={label}
              color={colors.light_text}
              fontSize={fontSize}
            />
          )}
          {customRight && customRight}
        </View>
        <View style={{ maxWidth: '72%' }}>
          <CustomText text={title} fontSize={fontSize} />
        </View>
      </View>
      {rightIcon && (
        <IconButton
          icon={rightIcon}
          iconColor={colors.icon_color}
          onPress={onRightIconPress}
          size={rightIconSize}
          customBtnStyle={{ marginLeft: 'auto' }}
        />
      )}
    </View>
  ) : editable ? (
    <View style={styles.tile}>
      {icon && <CustomIcon icon={icon} color={colors.blue} size={iconSize} />}
      <CustomTextInput
        label={label}
        placeholder={'Signature'}
        value={title}
        onChangeText={onChangeText}
        inputWidth={'75%'}
      />
      {rightIcon && (
        <IconButton
          icon={rightIcon}
          iconColor={colors.icon_color}
          onPress={onRightIconPress}
          size={rightIconSize}
          customBtnStyle={{ marginLeft: 'auto', marginTop: 22 }}
        />
      )}
    </View>
  ) : null;
};

export default Tile;

const styles = StyleSheet.create({
  tile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginTop: 12,
  },
  detail: {
    flex: 1,
    gap: 4,
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
