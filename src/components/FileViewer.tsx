import React, { ReactNode, useState } from 'react';
import {
  View,
  Modal,
  ModalProps,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import { FileType } from '../types/EnumType';
import { insets } from '../hooks/insets';
import { useTheme } from '../hooks/ThemeContext';
import CustomHeader from './CustomHeader';
import CustomAudioPlayer from './CustomAudioPlayer';
import CustomImageViewer from './CustomImageViewer';
import CustomVideoPlayer from './CustomVideoPlayer';
import SafeAreaContainer from './SafeAreaContainer';
import CustomMessageInput from './CustomMessageInput';
import KeyboardAvoidingContainer from './KeyboardAvoidingContainer';

interface FileViewerProps extends ModalProps {
  visible: boolean;
  title: string;
  uri: string;
  type: number;
  onClose: () => void;
  onRightPress1?: () => void;
  onRightPress2?: () => void;
  onSendPress?: (message: string) => void;
  rightIcon1?: ImageSourcePropType;
  rightIcon2?: ImageSourcePropType;
  customRight?: ReactNode;
  showInput?: boolean;
}

const FileViewer: React.FC<FileViewerProps> = ({
  visible,
  onClose,
  title,
  uri,
  type,
  rightIcon1,
  rightIcon2,
  onRightPress1,
  onRightPress2,
  onSendPress,
  customRight,
  showInput = false,
  ...props
}) => {
  const { colors } = useTheme();
  const [message, setMessage] = useState<string>('');

  return (
    <Modal
      animationType="fade"
      statusBarTranslucent
      transparent
      visible={visible}
      onRequestClose={onClose}
      {...props}
    >
      <SafeAreaContainer customStyle={{ flex: 1 }}>
        <CustomHeader
          onBackPress={onClose}
          title={title}
          rightIcon1={rightIcon1}
          rightIcon2={rightIcon2}
          onRightPress1={onRightPress1}
          onRightPress2={onRightPress2}
          customRight={customRight}
          iconColor={colors.icon_color}
          iconSize={22}
        />
        <KeyboardAvoidingContainer scrollEnabled={false}>
          <View
            style={{
              flex: 1,
              paddingBottom: 20,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 15,
                backgroundColor: colors.light_gray,
              }}
            >
              {type === FileType.IMAGE ? (
                <CustomImageViewer imageUri={uri} />
              ) : type === FileType.AUDIO ? (
                <CustomAudioPlayer uri={uri} sliderWidth="70%" />
              ) : (
                type === FileType.VIDEO && (
                  <CustomVideoPlayer
                    uri={uri}
                    title={title}
                    style={{ height: 220, width: 420 }}
                  />
                )
              )}
            </View>

            {showInput && (
              <CustomMessageInput
                message={message}
                setMessage={setMessage}
                onPressSend={() => {
                  onSendPress && onSendPress(message);
                  setMessage('');
                }}
                visibleAttachment={false}
              />
            )}
          </View>
        </KeyboardAvoidingContainer>
      </SafeAreaContainer>
    </Modal>
  );
};

export default FileViewer;
