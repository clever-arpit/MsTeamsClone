import React, { ReactNode } from 'react';
import { View, StyleSheet, ImageSourcePropType, ViewStyle } from 'react-native';
import Config from 'react-native-config';
import Icons from '../utils/Icons';
import { useTheme } from '../hooks/ThemeContext';
import SearchBar from './SearchBar';
import CustomText from './CustomText';
import IconButton from './IconButton';
import UserAvatar from './UserAvatar';
import CustomBadge from './CustomBadge';

type Props = {
  leftIcon?: string;
  backIconColor?: string;
  onBackPress?: () => void;
  onLeftPress?: () => void;

  title?: string;
  subTitle?: string;
  searchText?: string;

  rightIcon1?: ImageSourcePropType;
  rightIcon2?: ImageSourcePropType;
  rightIcon3?: ImageSourcePropType;
  rightIconBadge1?: number;
  customRight?: ReactNode;

  onRightPress1?: () => void;
  onRightPress2?: () => void;
  onRightPress3?: () => void;
  onChangeText?: (text: string) => void;
  onCancelSearch?: () => void;
  onClearSearch?: () => void;
  iconColor?: string;
  iconColor1?: string;
  iconSize?: number;
  borderBottom?: boolean;
  searchEnable?: boolean;
  backgroundColor?: string;
  customHeaderStyle?: ViewStyle;
};

const CustomHeader: React.FC<Props> = ({
  onBackPress,
  leftIcon,
  backIconColor,
  onLeftPress,

  title,
  subTitle,

  rightIcon1,
  rightIcon2,
  rightIcon3,
  rightIconBadge1,
  customRight,

  onRightPress1,
  onRightPress2,
  onRightPress3,
  iconColor,
  iconColor1,
  iconSize = 25,
  borderBottom = false,
  backgroundColor,
  searchEnable = false,
  searchText = '',
  onChangeText,
  onCancelSearch,
  onClearSearch,
  customHeaderStyle,
}) => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.header,
        customHeaderStyle,
        {
          backgroundColor: backgroundColor ?? colors.background,
        },
        borderBottom && {
          borderBottomColor: colors.item_border_color,
          borderBottomWidth: 1,
        },
      ]}
    >
      <View style={styles.headerContainer}>
        {onBackPress && (
          <IconButton
            icon={Icons.backIcon}
            iconColor={backIconColor ?? colors.header_icon_color}
            onPress={onBackPress}
            size={24}
            customBtnStyle={styles.leftIcon}
          />
        )}
        {(leftIcon || title) && onLeftPress && (
          <UserAvatar
            title={title}
            uri={leftIcon}
            onPress={onLeftPress}
            size={40}
            style={{ marginRight: 10 }}
          />
        )}

        {searchEnable && onChangeText ? (
          <SearchBar
            value={searchText}
            onChangeText={onChangeText}
            onCancel={onCancelSearch}
            onClear={onClearSearch}
            searchBarStyle={{ flex: 1, marginRight: 10 }}
          />
        ) : (
          <View style={styles.center}>
            {title && (
              <CustomText
                text={
                  title.length > 22 ? title.substring(0, 22) + '...' : title
                }
                fontSize={16}
                fontFamily={Config.FONT_FAMILY_SEMI}
              />
            )}
            {subTitle && (
              <CustomText
                text={
                  subTitle.length > 22
                    ? subTitle.substring(0, 22) + '...'
                    : subTitle
                }
                fontSize={14}
                color={colors.sub_title}
              />
            )}
          </View>
        )}

        <View style={styles.right}>
          {rightIcon1 && (
            <View>
              <IconButton
                icon={rightIcon1}
                iconColor={iconColor1 ?? iconColor}
                onPress={onRightPress1}
                size={iconSize}
              />
              <CustomBadge count={rightIconBadge1 ?? 0} style={styles.badge} />
            </View>
          )}
          {rightIcon2 && (
            <IconButton
              icon={rightIcon2}
              iconColor={iconColor}
              onPress={onRightPress2}
              size={iconSize}
            />
          )}
          {rightIcon3 && (
            <IconButton
              icon={rightIcon3}
              iconColor={iconColor}
              onPress={onRightPress3}
              size={iconSize}
            />
          )}
          {customRight && customRight}
        </View>
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 55,
    paddingBottom: 10,
    paddingHorizontal: 14,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    marginRight: 7,
  },
  center: {
    gap: 3,
    alignItems: 'flex-start',
  },
  right: {
    marginLeft: 'auto',
    flexDirection: 'row',
    gap: 17,
  },
  profile: {
    width: 35,
    height: 35,
    resizeMode: 'cover',
    borderRadius: 100,
  },
  icon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  badge: {
    position: 'absolute',
    top: -7,
    right: -12,
  },
});
