import React, { forwardRef, ReactNode, useCallback } from 'react';
import { useWindowDimensions, ViewStyle } from 'react-native';
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { useTheme } from '../hooks/ThemeContext';

interface CustomBottomSheetProps {
  children: ReactNode;
  onPressBackdrop?: () => void;
  bottomInset?: number;
  paddingBottom?: number;
  backdropBackgroundColor?: ViewStyle['backgroundColor'];
  snapPoints?: string[];
}

const CustomBottomSheet = forwardRef<BottomSheetModal, CustomBottomSheetProps>(
  ({ children, onPressBackdrop, bottomInset = 0, paddingBottom = 0, backdropBackgroundColor, snapPoints = ['30%', '40%'] }, ref) => {
    const { colors } = useTheme();
    const { width } = useWindowDimensions();

    const onChange = useCallback((index: number) => {
      if (index < 0 && onPressBackdrop) {
        console.log('onPressBackdrop-----', index);
        onPressBackdrop();
      }
    }, []);

    return (
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={ref}
          index={1}
          snapPoints={snapPoints}
          backdropComponent={props => (
            <BottomSheetBackdrop
              pressBehavior="close"
              {...props}
              style={{ bottom: bottomInset, width, backgroundColor: backdropBackgroundColor ?? colors.transparent5 }}
            />
          )}
          handleStyle={{
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
          }}
          handleIndicatorStyle={{ backgroundColor: colors.btn_background }}
          backgroundStyle={{
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            backgroundColor: colors.modal_background,
          }}
          containerStyle={{ width }}
          bottomInset={bottomInset}
          onChange={onChange}
        >
          <BottomSheetView
            style={{
              paddingBottom: paddingBottom,
            }}
          >
            {children}
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  },
);

export default CustomBottomSheet;