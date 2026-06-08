import React, { Ref } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ModalProps,
  TouchableOpacity,
} from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { TypeMenu } from '../types/DataType';
import { useTheme } from '../hooks/ThemeContext';
import CustomText from './CustomText';
import CustomIcon from './CustomIcon';
import CustomBottomSheet from './CustomBottomSheet';

interface ActionSheetProps extends ModalProps {
  ref: Ref<BottomSheetModal>;
  onClose: () => void;
  onSelect: (item: TypeMenu) => void;
  title?: string;
  iconSize?: number;
  iconColor?: string;
  menu?: TypeMenu[];
  bottomInset?: number;
  snapPoints?: string[];
}

const ActionSheet: React.FC<ActionSheetProps> = ({
  ref,
  onClose,
  onSelect,
  menu = [],
  iconSize = 20,
  iconColor = undefined,
  bottomInset = 0,
  snapPoints = ['50%'],
}) => {
  const { colors } = useTheme();
  return (
    <CustomBottomSheet
      ref={ref}
      bottomInset={bottomInset}
      snapPoints={snapPoints}
    >
      <View style={{ flex: 1 }}>
        <FlatList
          data={menu}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                onSelect(item);
                onClose();
              }}
              key={index}
              style={styles.btn}
              activeOpacity={0.6}
            >
              {item?.icon && (
                <CustomIcon
                  icon={item.icon}
                  size={iconSize}
                  color={iconColor}
                />
              )}
              <CustomText text={item?.label?.toString()} color={colors.text} />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 15 }}
          scrollEnabled={false}
        />
      </View>
    </CustomBottomSheet>
  );
};

export default ActionSheet;

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    gap: 10,
  },
});
