import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Config from 'react-native-config';
import { useTheme } from '../hooks/ThemeContext';
import { openUrl, parseLocationMessage } from '../utils/Helper';
import Icons from '../utils/Icons';
import CustomText from './CustomText';
import CustomIcon from './CustomIcon';
import IconButton from './IconButton';

type CustomRenderLocationMessageProps = {
  message?: string;
};

const CustomRenderLocationMessage = ({
  message = '',
}: CustomRenderLocationMessageProps) => {
  const { colors } = useTheme();
  const location = useMemo(() => parseLocationMessage(message), [message]);
  const hasStructuredLocation =
    Boolean(location.name) ||
    Boolean(location.recipient) ||
    Boolean(location.address) ||
    Boolean(location.url) ||
    Boolean(location.map);

  if (!hasStructuredLocation) {
    return <CustomText text={message} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={[
            styles.iconWrapper,
            { backgroundColor: colors.border_color },
          ]}
        >
          <CustomIcon icon={Icons.locationIcon} size={18} color={colors.blue} />
        </View>
        <View style={styles.headerContent}>
          <CustomText
            text={location.name || 'Location'}
            fontSize={14}
            fontFamily={Config.FONT_FAMILY_SEMI}
          />
          {location.recipient ? (
            <CustomText
              text={location.recipient}
              fontSize={12}
              color={colors.light_text}
              customStyle={styles.wrapText}
            />
          ) : null}
        </View>
      </View>

      {location.address ? (
        <View style={styles.section}>
          <CustomText
            text="Address"
            fontSize={12}
            fontFamily={Config.FONT_FAMILY_SEMI}
          />
          <CustomText
            text={location.address}
            fontSize={13}
            customStyle={styles.wrapText}
          />
        </View>
      ) : null}

      {location.url || location.map ? (
        <View style={styles.actions}>
          {location.url ? (
            <IconButton
              onPress={() => openUrl(location.url)}
              icon={Icons.locationIcon}
              size={18}
              iconColor={colors.red}
              text="View Location"
              fontSize={12}
              customBtnStyle={styles.actionButton}
            />
          ) : null}
          {location.map ? (
            <IconButton
              onPress={() => openUrl(location.map)}
              icon={Icons.mapIcon}
              size={18}
              iconColor={colors.blue}
              text="Open in Maps"
              fontSize={12}
              customBtnStyle={styles.actionButton}
            />
          ) : null}
        </View>
      ) : null}
      {location.senderName && <CustomText
        text={`\n${location.senderName}`}
        fontSize={13}
        customStyle={styles.wrapText}
      />}
    </View>
  );
};

export default memo(CustomRenderLocationMessage);

const styles = StyleSheet.create({
  container: {
    gap: 10,
    minWidth: '100%'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  iconWrapper: {
    height: 32,
    width: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  headerContent: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  section: {
    gap: 4,
  },
  wrapText: {
    flexShrink: 1,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  actionButton: {
    justifyContent: 'flex-start',
  },
});
