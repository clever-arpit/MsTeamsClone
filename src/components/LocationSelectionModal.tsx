import React, { memo, useCallback, useMemo } from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import Config from 'react-native-config';
import { useTheme } from '../hooks/ThemeContext';
import { openUrl } from '../utils/Helper';
import Icons from '../utils/Icons';
import CustomModal from './CustomModal';
import CustomText from './CustomText';
import IconButton from './IconButton';
import CustomGroupCard from './Card/CustomCard';
import FooterLoader from './FooterLoader';
import DataNotFound from './DataNotFound';
import ContentLoader from './ContentLoader';

type LocationSelectionModalProps = {
  visible: boolean;
  onClose: () => void;
  locationList: any[];
  selectedLocation: any | null;
  onSelectLocation: (item: any) => void;
  onSendLocation: (item: any) => void;
  modalContainerStyle?: ViewStyle | object;
  headerRightIconOnPress: () => void;
  onRefresh: () => void;
  refreshing: boolean;
  noData: boolean;
  isLoadMore?: boolean;
  isLoading?: boolean;
};

const LocationSelectionModal: React.FC<LocationSelectionModalProps> = ({
  visible,
  onClose,
  locationList,
  selectedLocation,
  onSelectLocation,
  onSendLocation,
  modalContainerStyle,
  headerRightIconOnPress,
  onRefresh,
  refreshing,
  noData,
  isLoadMore = false,
  isLoading = false,
}) => {
  const { colors } = useTheme();

  const isSendVisible = useMemo(
    () => Boolean(selectedLocation?.id),
    [selectedLocation],
  );

  const handleSendLocation = useCallback(() => {
    if (selectedLocation?.id) {
      onSendLocation(selectedLocation);
    }
  }, [onSendLocation, selectedLocation]);

  const keyExtractor = useCallback(
    (item: any, index: number) =>
      `${item.key ?? item.id ?? 'location'}-${index}`,
    [],
  );


  const renderLocationsItem = useCallback(
    ({ item }: any) => {
      const selected = selectedLocation?.id === item.id;
      const recipientDetails = [
        item?.recipient_name,
        item?.recipient_email,
        item?.recipient_mobile_number,
      ]
        .filter(Boolean)
        .join(' | ');

      const coordinates = [
        item?.address?.latitude,
        item?.address?.longitude,
      ]
        .filter(Boolean)
        .join(', ');

      return (
        <View
          style={[
            styles.locationCardWrapper,
            {
              borderColor: selected ? colors.blue : colors.border_color,
            },
          ]}
        >
          <CustomGroupCard
            key={item.id}
            onPress={() => {
              onSelectLocation(item);
            }}
          >
            <View style={styles.locationRow}>
              <View
                style={[
                  styles.locationIconWrapper,
                  { backgroundColor: colors.border_color },
                ]}
              >
                <Image
                  source={Icons.locationIcon}
                  style={styles.locationIcon}
                />
              </View>
              <View style={styles.locationTextWrapper}>
                <CustomText
                  text={item?.location_name}
                  fontSize={14}
                  fontFamily={Config.FONT_FAMILY_SEMI}
                  customStyle={styles.locationPrimaryText}
                />
                {item?.address?.complete_address && <CustomText
                  text={item?.address?.complete_address}
                  fontSize={13}
                  fontFamily={Config.FONT_FAMILY}
                  customStyle={styles.locationSecondaryText}
                />}
                {recipientDetails && <CustomText
                  text={recipientDetails}
                  fontSize={13}
                  customStyle={styles.locationSecondaryText}
                />}
                {coordinates && <View style={styles.locationCoordinateWrapper}>
                  <IconButton
                    icon={Icons.dotCircleIcon}
                    size={10}
                    iconColor={colors.blue}
                    text={coordinates}
                  />
                </View>}
              </View>
            </View>
          </CustomGroupCard>
          <View style={styles.locationActionRow}>
            {item?.location_url && (
              <IconButton
                onPress={() => openUrl(item?.location_url)}
                icon={Icons.locationIcon}
                size={20}
                iconColor={colors.red}
                text="View Location"
              />
            )}
            {item?.address?.google_maps_url && (
              <IconButton
                onPress={() => openUrl(item?.address?.google_maps_url)}
                icon={Icons.mapIcon}
                size={20}
                iconColor={colors.blue}
                text="Open in maps"
              />
            )}
          </View>
        </View>
      );
    },
    [
      colors.blue,
      colors.border_color,
      colors.red,
      onSelectLocation,
      selectedLocation,
    ],
  );

  const renderLocationList = useMemo(() => {
    if (locationList.length && !noData) {
      return (
        <FlatList
          data={locationList}
          renderItem={renderLocationsItem}
          onRefresh={onRefresh}
          refreshing={refreshing}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.locationListContent}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<FooterLoader animating={isLoadMore} />}
        />
      );
    } else if (!locationList.length && noData) {
      return <DataNotFound />;
    } else if (isLoading) {
      return <ContentLoader />;
    } else {
      return <ContentLoader />;
    }
  }, [
    isLoadMore,
    isLoading,
    keyExtractor,
    locationList,
    noData,
    onRefresh,
    refreshing,
    renderLocationsItem,
  ]);

  return (
    <CustomModal
      visible={visible}
      title={'Locations'}
      onClose={onClose}
      modalContainerStyle={modalContainerStyle}
      modalContentStyle={styles.modalContent}
      headerRightIcon={Icons.addIcon}
      headerRightIconOnPress={headerRightIconOnPress}
      back
      overlayClose={false}
    >
      {renderLocationList}
      {isSendVisible && (
        <View
          style={[
            styles.sendButtonWrapper,
            { backgroundColor: colors.border_color },
          ]}
        >
          <IconButton
            onPress={handleSendLocation}
            icon={Icons.sendIcon}
            size={20}
            iconColor={colors.blue}
          />
        </View>
      )}
    </CustomModal>
  );
};

export default memo(LocationSelectionModal);

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    gap: 15,
    paddingTop: 10,
  },
  locationListContent: {
    paddingBottom: 12,
  },
  locationCardWrapper: {
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 8,
  },
  locationRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  locationIconWrapper: {
    height: 30,
    width: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  locationIcon: {
    height: 20,
    width: 20,
  },
  locationTextWrapper: {
    flex: 1,
    minWidth: 0,
    gap: 5,
  },
  locationPrimaryText: {
    flexShrink: 1,
  },
  locationSecondaryText: {
    flexShrink: 1,
  },
  locationCoordinateWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  locationActionRow: {
    margin: 5,
    gap: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  sendButtonWrapper: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
