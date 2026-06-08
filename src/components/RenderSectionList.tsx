import React, { memo, useRef } from 'react';
import {
  View,
  StyleSheet,
  SectionList,
  RefreshControl,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SectionListRenderItemInfo,
} from 'react-native';
import Icons from '../utils/Icons';
import { ThemeColors } from '../utils/theme';
import { formatTo12Hour } from '../utils/Helper';
import { ChatSection, MessageThread } from '../types/DataType';
import UserAvatar from './UserAvatar';
import CustomText from './CustomText';
import SectionFooter from './SectionFooter';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import CustomIcon from './CustomIcon';
import { MessageStatus } from '../types/EnumType';

let isMore: boolean = true;

type RenderSectionListProps = {
  sections?: ChatSection[];
  selectedItems?: MessageThread[];
  onPress: (item: MessageThread) => void; //required
  onLongPress?: () => void;
  onVerticalDotPress?: () => void;
  onRefresh: (refresh: boolean) => void; //required
  refreshing?: boolean;
  bottomEnable?: boolean;
  showSelection?: boolean;
  pressable?: boolean;
  colors: ThemeColors; //required
};

const RenderSectionList: React.FC<RenderSectionListProps> = ({
  sections = [],
  selectedItems,
  onPress,
  onLongPress,
  onRefresh,
  refreshing = false,
  showSelection = false,
  onVerticalDotPress,
  colors,
  pressable = false,
}) => {
  const userProfile = useSelector(
    (state: RootState) => state.authUser.userProfile,
  );
  console.log('userProfile----', userProfile);
  const sectionListRef = useRef<SectionList<MessageThread, ChatSection> | null>(
    null,
  );

  const loadMore = () => {
    isMore = false;
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    // use offsetY if needed
  };

  const RenderItemComponent = memo(
    ({ item, index }: { item: MessageThread; index: number }) => {
      const isSender =
        item?.sender?.employee_id === userProfile?.user_relation?.id;
      return (
        <View
          style={[
            styles.itemWrapper,
            { alignSelf: isSender ? 'flex-end' : 'flex-start' },
          ]}
        >
          {!isSender && (
            <UserAvatar
              title={item.sender?.full_name}
              icon={Icons.userAvatar}
              size={35}
              fontSize={12}
            />
          )}
          <TouchableOpacity
            disabled={pressable}
            style={[
              styles.itemContainer,
              {
                borderColor: isSender
                  ? colors.sender_border
                  : colors.item_border_color,
                backgroundColor: isSender
                  ? colors.sender_message_background
                  : colors.receiver_message_background,
                borderTopRightRadius: isSender ? 0 : 15,
                borderTopLeftRadius: isSender ? 15 : 0,
                borderRadius: 15,
              },
            ]}
            onPress={() => onPress(item)}
            onLongPress={onLongPress}
            activeOpacity={0.6}
          >
            <View style={styles.messageWrapper}>
              {item.sub_messages?.length > 0 &&
                item.sub_messages.map((item, index) => (
                  <CustomText key={`${item}-${index}`} text={item.message} />
                ))}
              <CustomText
                text={formatTo12Hour(item.created_at)}
                fontSize={11}
                color={colors.light_text}
                customStyle={{ alignSelf: 'flex-end' }}
              />
              <CustomIcon
                icon={
                  item?.message_status === MessageStatus.DELIVERED
                    ? Icons.undeliveredIcon
                    : item?.message_status === MessageStatus.SENT
                    ? Icons.deliveredIcon
                    : item?.message_status === MessageStatus.PENDING
                    ? Icons.pendingIcon
                    : item?.message_status === MessageStatus.FAILED
                    ? Icons.undeliveredIcon
                    : Icons.undeliveredIcon
                }
                size={16}
                color={colors.icon_color}
              />
            </View>
          </TouchableOpacity>
          {isSender && (
            <UserAvatar
              title={item.sender?.full_name}
              icon={Icons.userAvatar}
              size={35}
              fontSize={12}
            />
          )}
        </View>
      );
    },
  );

  const renderChats = ({
    item,
    index,
  }: SectionListRenderItemInfo<MessageThread, ChatSection>) => {
    return <RenderItemComponent item={item} index={index} />;
  };

  return (
    <SectionList
      ref={sectionListRef}
      onEndReached={loadMore}
      onScroll={handleScroll}
      refreshControl={
        <RefreshControl
          onRefresh={() => onRefresh(true)}
          refreshing={refreshing}
          tintColor={colors.blue}
        />
      }
      keyExtractor={(item, index) => `${item}-${index}`}
      showsVerticalScrollIndicator={false}
      stickySectionHeadersEnabled
      inverted
      sections={sections}
      renderItem={renderChats}
      renderSectionFooter={({ section: { title } }) => (
        <SectionFooter title={title} colors={colors} />
      )}
    />
  );
};

export default RenderSectionList;

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
    marginBottom: 20,
    gap: 15,
  },
  itemContainer: {
    maxWidth: '72%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    gap: 10,
  },
  messageWrapper: {
    gap: 10,
  },
});
