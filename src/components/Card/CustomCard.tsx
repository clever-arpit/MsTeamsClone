import React, { FC, ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/ThemeContext';
import IconButton from '../IconButton';
import Icons from '../../utils/Icons';

type CustomCardProps = {
  children: ReactNode;
  onPress?: () => void;
  showSelection?: boolean;
  isSelected?: boolean;
  cardWrapperStyle?: ViewStyle;
  cardStyle?: ViewStyle;
};

const CustomCard: FC<CustomCardProps> = ({
  onPress,
  children,
  isSelected,
  showSelection,
  cardWrapperStyle,
  cardStyle,
}) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.itemWrapper, cardWrapperStyle]}>
      {showSelection && (
        <IconButton
          icon={isSelected ? Icons.selectedIcon : Icons.unselectedIcon}
          size={20}
          onPress={onPress}
        />
      )}
      <TouchableOpacity
        onPress={onPress}
        disabled={!onPress}
        style={[
          styles.card,
          cardStyle,
          {
            backgroundColor: colors.item_background,
            borderColor: colors.item_border_color,
          },
        ]}
      >
        {children}
      </TouchableOpacity>
    </View>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    gap: 6,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 15,
  },
});
