import React, { memo } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  FlatListProps,
  RefreshControl,
  TouchableOpacity,
  ListRenderItemInfo,
} from 'react-native';
import UserAvatar from './UserAvatar';
import IconButton from './IconButton';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import { ListItem } from '../types/DataType';
import Icons from '../utils/Icons';
import { ThemeColors } from '../utils/theme';
import { formatTo12Hour } from '../utils/Helper';

type Props<T> = {
  data: T[];
  selectedItems?: T[];
  onPress: (item: ListItem) => void;
  onLongPress?: () => void;
  onVerticalDotPress?: () => void;
  onRefresh: () => void;
  refreshing?: boolean;
  bottomEnable?: boolean;
  showSelection?: boolean;
  pressable?: boolean;
  colors?: ThemeColors;
} & Omit<FlatListProps<T>, 'data' | 'renderItem'>;

const RenderFlatList = ({
  data,
  selectedItems,
  onPress,
  onLongPress,
  onRefresh,
  refreshing = false,
  bottomEnable = false,
  showSelection = false,
  onVerticalDotPress,
  colors,
  pressable = false,
  ...rest
}: Props<ListItem>) => {
  const RenderItemComponent = memo(({ item }: ListRenderItemInfo<ListItem>) => {
    return (
      <View style={styles.itemWrapper}>
        {showSelection && selectedItems && (
          <IconButton
            icon={
              selectedItems.includes(item)
                ? Icons.selectedIcon
                : Icons.unselectedIcon
            }
            size={20}
            onPress={() => onPress(item)}
          />
        )}
        <TouchableOpacity
          disabled={pressable}
          style={[
            styles.itemContainer,
            {
              borderColor: colors?.item_border_color,
              backgroundColor: colors?.item_background,
            },
          ]}
          onPress={() => onPress(item)}
          onLongPress={onLongPress}
          activeOpacity={0.6}
        >
          <View style={styles.topView}>
            <UserAvatar title={item.title} uri={item.title} />
            <View style={styles.midView}>
              <CustomText text={item.title} />
              <CustomText
                text={item.title}
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
          </View>
          {bottomEnable && (
            <View style={styles.bottomView}>
              <View style={styles.bottomLeftView}>
                <CustomText
                  text={formatTo12Hour(item.timestamp)}
                  fontSize={12}
                />
                <CustomText
                  text={formatTo12Hour(item.timestamp)}
                  fontSize={12}
                  color={colors?.light_text}
                />
              </View>
              <IconButton
                text={
                  item?.status == 1
                    ? 'Received'
                    : item?.status == 2
                    ? 'Outgoing'
                    : 'Missed'
                }
                textColor={
                  item?.status == 1
                    ? colors?.dark_blue
                    : item?.status == 2
                    ? colors?.dark_green
                    : colors?.dark_red
                }
                fontSize={12}
                customBtnStyle={{
                  backgroundColor:
                    item?.status == 1
                      ? colors?.light_blue
                      : item?.status == 2
                      ? colors?.light_green
                      : colors?.light_red,
                  paddingHorizontal: 10,
                  height: 26,
                }}
              />
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  });

  const RenderItem = (info: ListRenderItemInfo<ListItem>) => {
    return <RenderItemComponent {...info} />;
  };

  return (
    <FlatList
      data={data}
      renderItem={RenderItem}
      keyExtractor={(item, index) => index.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <CustomText text="Data not found!" fontSize={17} />
          <CustomButton
            title="Refresh"
            onPress={onRefresh}
            height={35}
            buttonStyle={{ width: 100, borderRadius: 50 }}
          />
        </View>
      )}
      showsVerticalScrollIndicator={false}
      {...rest}
    />
  );
};

export default RenderFlatList;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    padding: 16,
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
    gap: 10,
  },
  midView: {
    gap: 3,
    marginRight: 'auto',
  },
});
