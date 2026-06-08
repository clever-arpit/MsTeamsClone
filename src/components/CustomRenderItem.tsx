import React, { memo } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import Config from 'react-native-config';
import CustomIcon from './CustomIcon';
import CustomText from './CustomText';
import IconButton from './IconButton';
import UserAvatar from './UserAvatar';
import Icons from '../utils/Icons';
import { employeeStatus } from '../utils/Constants';
import { formatChatTime, secondsToMinutes } from '../utils/Helper';
import { CallType } from '../types/EnumType';
import { useTheme } from '../hooks/ThemeContext';

type CustomRenderItemProps = {
  title: string;
  icon?: string;
  avatar?: ImageSourcePropType;
  subTitle: string;
  timestamp?: string;
  duration?: number;
  status?: number;
  onPress?: () => void;
  onLongPress?: () => void;
  showSelection?: boolean;
  disabled?: boolean;
  onVerticalDotPress?: () => void;
  bottomEnable?: boolean;
  isSelected?: boolean;
  presenceStatus?: number;
  customTopRight?: React.ReactElement | null;
  customBottom?: React.ReactElement;
};

const CustomRenderItem = memo(
  ({
    icon,
    title,
    avatar,
    status,
    onPress,
    subTitle,
    duration,
    timestamp,
    isSelected,
    onLongPress,
    showSelection,
    customTopRight,
    presenceStatus,
    disabled = false,
    customBottom,
    onVerticalDotPress,
    bottomEnable = false,
  }: CustomRenderItemProps) => {
    const { colors } = useTheme();
    return (
      <View style={styles.itemWrapper}>
        {showSelection && (
          <IconButton
            icon={isSelected ? Icons.selectedIcon : Icons.unselectedIcon}
            size={20}
            onPress={onPress}
          />
        )}
        <TouchableOpacity
          disabled={disabled}
          style={[
            styles.itemContainer,
            {
              borderColor: colors?.item_border_color,
              backgroundColor: colors?.item_background,
            },
          ]}
          onPress={onPress}
          onLongPress={onLongPress}
          activeOpacity={0.6}
        >
          <View style={styles.topView}>
            <View>
              <UserAvatar title={title} uri={icon} icon={avatar} />
              {presenceStatus && (
                <CustomIcon
                  icon={
                    employeeStatus.find(item => item.value === presenceStatus)
                      ?.icon ?? Icons.offlineIcon
                  }
                  size={16}
                  customStyle={{ position: 'absolute', right: -5, bottom: 5 }}
                />
              )}
            </View>
            <View style={styles.midView}>
              <CustomText text={title} fontFamily={Config.FONT_FAMILY_SEMI} />
              <CustomText
                text={subTitle}
                fontSize={14}
                color={colors?.light_text}
              />
            </View>
            {onVerticalDotPress && (
              <IconButton
                onPress={onVerticalDotPress}
                icon={Icons.verticalDotsIcon}
                size={24}
                iconColor={colors?.black}
                btnWidth={30}
                btnHeight={30}
                customBtnStyle={{ backgroundColor: colors?.avatar_background }}
              />
            )}
            {customTopRight && customTopRight}
          </View>
          {bottomEnable && (
            <View style={styles.bottomView}>
              <View style={styles.bottomLeftView}>
                {timestamp && (
                  <CustomText text={formatChatTime(timestamp)} fontSize={13} />
                )}
                <View
                  style={[
                    styles.borderSeparator,
                    { backgroundColor: colors.dark_gray },
                  ]}
                />
                {(duration || duration === 0) && (
                  <CustomText text={secondsToMinutes(duration)} fontSize={13} />
                )}
              </View>
              <IconButton
                text={
                  status === CallType.INCOMING
                    ? 'Received'
                    : status === CallType.OUTGOING
                    ? 'Outgoing'
                    : status === CallType.MISSED
                    ? 'Missed'
                    : status === CallType.REJECTED
                    ? 'Rejected'
                    : status === CallType.CANCELLED
                    ? 'Canceled'
                    : status === CallType.DECLINED
                    ? 'Declined'
                    : status === CallType.CONFERENCE
                    ? 'Conference'
                    : 'Completed elsewhere'
                }
                textColor={
                  status === CallType.INCOMING
                    ? colors?.dark_green
                    : status === CallType.OUTGOING
                    ? colors?.dark_blue
                    : status === CallType.MISSED
                    ? colors?.dark_red
                    : status === CallType.REJECTED
                    ? colors?.dark_red
                    : status === CallType.CANCELLED
                    ? colors?.dark_red
                    : status === CallType.DECLINED
                    ? colors?.dark_red
                    : status === CallType.CONFERENCE
                    ? colors?.dark_blue
                    : colors?.dark_red
                }
                iconColor={
                  status === CallType.INCOMING
                    ? colors?.dark_green
                    : status === CallType.OUTGOING
                    ? colors?.dark_blue
                    : status === CallType.MISSED
                    ? colors?.dark_red
                    : status === CallType.REJECTED
                    ? colors?.dark_red
                    : status === CallType.CANCELLED
                    ? colors?.dark_red
                    : status === CallType.DECLINED
                    ? colors?.dark_red
                    : status === CallType.CONFERENCE
                    ? colors?.dark_blue
                    : colors?.dark_red
                }
                icon={
                  status === CallType.INCOMING
                    ? Icons.receivedIcon
                    : status === CallType.OUTGOING
                    ? Icons.outgoingIcon
                    : status === CallType.MISSED
                    ? Icons.missedIcon
                    : status === CallType.REJECTED
                    ? Icons.missedIcon
                    : status === CallType.CANCELLED
                    ? Icons.missedIcon
                    : status === CallType.DECLINED
                    ? Icons.missedIcon
                    : status === CallType.CONFERENCE
                    ? Icons.outgoingIcon
                    : Icons.missedIcon
                }
                size={13}
                fontSize={12}
                customBtnStyle={{
                  backgroundColor:
                    status === CallType.INCOMING
                      ? colors?.light_green
                      : status === CallType.OUTGOING
                      ? colors?.light_blue
                      : status === CallType.MISSED
                      ? colors?.light_red
                      : status === CallType.REJECTED
                      ? colors?.light_red
                      : status === CallType.CANCELLED
                      ? colors?.light_red
                      : status === CallType.DECLINED
                      ? colors?.light_red
                      : status === CallType.CONFERENCE
                      ? colors?.light_blue
                      : colors?.light_red,
                  paddingHorizontal: 10,
                }}
                btnHeight={27}
              />
            </View>
          )}
          {customBottom && customBottom}
        </TouchableOpacity>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 15,
  },
  itemContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
  },
  topView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bottomView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomLeftView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  midView: {
    gap: 3,
    marginRight: 'auto',
  },
  borderSeparator: {
    height: 12,
    width: 1,
    borderRadius: 8,
  },
});

export default CustomRenderItem;
