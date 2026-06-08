import React from 'react';
import { View, StyleSheet, ImageSourcePropType } from 'react-native';
import IconButton from './IconButton';
import { useTheme } from '../hooks/ThemeContext';

interface SpeedDial {
  icon: ImageSourcePropType;
  btnSize?: number;
  iconSize?: number;
  iconColor?: string;
  onPress: () => void;
}

const SpeedDial: React.FC<SpeedDial> = ({
  icon,
  btnSize = 55,
  iconSize = 55,
  iconColor = '',
  onPress,
}) => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.wrapper,
        {
          shadowColor: colors.shadow_color,
        },
      ]}
    >
      {icon && (
        <IconButton
          icon={icon}
          iconColor={iconColor}
          onPress={onPress}
          size={iconSize}
          customBtnStyle={{
            borderRadius: 50,
            backgroundColor: colors.btn_background,
          }}
          btnWidth={btnSize}
          btnHeight={btnSize}
        />
      )}
    </View>
  );
};

export default SpeedDial;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    right: 40,
    bottom: 50,
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
});
