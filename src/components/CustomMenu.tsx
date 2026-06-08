import React, { useCallback } from 'react';
import { ImageSourcePropType, TouchableOpacity } from 'react-native';
import {
  Menu,
  MenuOption,
  MenuTrigger,
  MenuOptions,
} from 'react-native-popup-menu';
import Config from 'react-native-config';
import Icons from '../utils/Icons';
import { useTheme } from '../hooks/ThemeContext';
import CustomIcon from './CustomIcon';
import CustomText from './CustomText';

interface CustomMenuProps {
  actions?: { id: string; title: string }[];
  onPressAction?: (actionId: string) => void;
  text?: string;
  style?: any;
  size?: number;
  icon?: ImageSourcePropType;
}

const CustomMenu: React.FC<CustomMenuProps> = ({
  actions = [],
  onPressAction,
  text,
  style,
  size = 26,
  icon,
}) => {
  const { colors } = useTheme();

  const handlePressAction = useCallback(
    (eventId: string) => {
      onPressAction?.(eventId);
    },
    [onPressAction],
  );

  return (
    <Menu style={style}>
      <MenuTrigger
        customStyles={{ TriggerTouchableComponent: TouchableOpacity }}
      >
        {text ? (
          <CustomText text={text} color={colors.blue} />
        ) : (
          <CustomIcon
            icon={icon ?? Icons.verticalDotsIcon}
            size={size}
            color={colors.icon_color}
          />
        )}
      </MenuTrigger>

      <MenuOptions
        customStyles={{
          optionsContainer: {
            borderRadius: 10,
            padding: 10,
            width: '40%',
            backgroundColor: colors.menu_background
          },
          optionText: {
            fontFamily: Config.FONT_FAMILY,
            fontSize: 15,
            color: colors.text
          },
          OptionTouchableComponent: TouchableOpacity,
        }}
      >
        {actions?.map(action => (
          <MenuOption
            key={action.id}
            onSelect={() => handlePressAction(action?.id)}
            text={action?.title}
          />
        ))}
      </MenuOptions>
    </Menu>
  );
};

export default React.memo(CustomMenu);
