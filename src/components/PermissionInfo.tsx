import { SectionList, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import CustomModal from './CustomModal';
import { groupPermissionInfo } from '../utils/Constants';
import CustomText from './CustomText';
import Config from 'react-native-config';
import Icons from '../utils/Icons';
import IconButton from './IconButton';
import { useTheme } from '../hooks/ThemeContext';

export interface PermissionInfoProps {
  visible: boolean;
  onClose: () => void;
}

const PermissionInfo: FC<PermissionInfoProps> = ({ visible, onClose }) => {
  const { colors } = useTheme();
  const renderSectionHeader = ({ section }: { section: any }) => (
    <CustomText
      text={section.title}
      fontSize={16}
      fontFamily={Config.FONT_FAMILY_SEMI}
    />
  );

  const renderPermissionItem = ({ item }: { item: string }) => (
    <IconButton
      icon={Icons.dotCircleIcon}
      iconColor={colors.icon_color}
      text={item}
      fontSize={15}
      size={15}
    />
  );

  return (
    <CustomModal
      visible={visible}
      title={'Permission Info'}
      onClose={onClose}
      modalContainerStyle={{
        flex: 1,
        width: '100%',
        borderRadius: 0,
        paddingHorizontal: 14,
      }}
      modalContentStyle={{ flex: 1 }}
      back
      overlayClose={false}
    >
      <SectionList
        sections={groupPermissionInfo}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderPermissionItem}
        contentContainerStyle={{ alignItems: 'flex-start', gap: 15 }}
      />
    </CustomModal>
  );
};

export default PermissionInfo;
