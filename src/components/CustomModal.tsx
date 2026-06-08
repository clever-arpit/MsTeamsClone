import React from 'react';
import {
  Modal,
  View,
  ViewStyle,
  ModalProps,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import Config from 'react-native-config';
import CustomText from './CustomText';
import IconButton from './IconButton';
import Icons from '../utils/Icons';
import { insets } from '../hooks/insets';
import { useTheme } from '../hooks/ThemeContext';

interface CustomModalProps extends ModalProps {
  visible: boolean;
  headerShown?: boolean;
  back?: boolean;
  close?: boolean;
  onClose: () => void;
  overlayClose?: boolean;
  title?: string;
  subTitle?: string;
  children?: React.ReactNode;
  modalContainerStyle?: ViewStyle | object;
  modalContentStyle?: ViewStyle | object;
  offsetTop?: ViewStyle['marginTop'];
  headerRightIcon?: ImageSourcePropType;
  headerRightIconOnPress?: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  back = false,
  close = true,
  headerShown = true,
  onClose,
  overlayClose = true,
  title,
  subTitle,
  children,
  modalContainerStyle = {},
  modalContentStyle = {},
  offsetTop,
  headerRightIcon,
  headerRightIconOnPress,
  ...props
}) => {
  const { colors } = useTheme();

  const RenderComponent = overlayClose ? TouchableOpacity : View;

  return (
    <Modal
      animationType="fade"
      transparent
      statusBarTranslucent
      visible={visible}
      onRequestClose={onClose}
      {...props}
    >
      <RenderComponent
        onPress={() => {
          overlayClose && onClose;
        }}
        style={[styles.overlay, { backgroundColor: colors.transparent2 }]}
      >
        <View
          style={[
            styles.modalContainer,
            modalContainerStyle,
            {
              backgroundColor: colors.modal_background,
              paddingTop: offsetTop ? 21 : insets.top,
              marginTop: offsetTop ?? 0,
            },
          ]}
        >
          {headerShown && (
            <View style={styles.headerContainer}>
              <View style={styles.header}>
                {back && (
                  <IconButton
                    onPress={onClose}
                    icon={Icons.backIcon}
                    size={24}
                    iconColor={colors.header_icon_color}
                  />
                )}
                {title && (
                  <CustomText
                    text={title}
                    fontSize={16}
                    fontFamily={Config.FONT_FAMILY_SEMI}
                  />
                )}
                {!back && close && (
                  <IconButton
                    onPress={onClose}
                    icon={Icons.closeIcon}
                    size={22}
                    iconColor={colors.header_icon_color}
                    customBtnStyle={{ marginLeft: 'auto' }}
                  />
                )}
                {headerRightIcon && (
                  <View style={{ marginLeft: 'auto' }}>
                    <IconButton
                      icon={headerRightIcon}
                      size={26}
                      onPress={() =>
                        headerRightIconOnPress && headerRightIconOnPress()
                      }
                    />
                  </View>
                )}
              </View>
              {subTitle && <CustomText text={subTitle} fontSize={13} />}
            </View>
          )}

          <View style={[styles.modalContent, modalContentStyle]}>
            {children}
          </View>
        </View>
      </RenderComponent>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    borderRadius: 25,
    padding: 22,
    paddingBottom: 30,
  },
  modalContent: {
    width: '100%',
  },
  headerContainer: {
    gap: 25,
    paddingVertical: 11,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
});
