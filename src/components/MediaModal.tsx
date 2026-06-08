import React from 'react';
import {
  View,
  Modal,
  Image,
  Platform,
  Keyboard,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  DeviceEventEmitter,
  useWindowDimensions,
} from 'react-native';
import Video from 'react-native-video';
import Carousel from 'react-native-reanimated-carousel';
import IconButton from './IconButton';
import CustomHeader from './CustomHeader';
import DataNotFound from './DataNotFound';
import Icons from '../utils/Icons';
import { fileType } from '../utils/Helper';
import { useTheme } from '../hooks/ThemeContext';
import SafeAreaContainer from './SafeAreaContainer';
import KeyboardAvoidingContainer from './KeyboardAvoidingContainer';

interface PickedFile {
  uri: string;
  type?: string;
  size?: number;
  filename?: string;
}

interface MediaModalProps {
  title?: string;
  message: string;
  pickedFile: PickedFile[];
  setMessageTxt: (text: string) => void;
  setPickedFile: (files: PickedFile[]) => void;
  onRequestClose: () => void;
  onRightPress1: () => void;
}

const MediaModal: React.FC<MediaModalProps> = ({
  title = '',
  message,
  pickedFile,
  setMessageTxt,
  onRequestClose,
  onRightPress1,
}) => {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  /** Render carousel for selected media */
  const renderModalView = () => {
    if (pickedFile.length === 0) return null;

    return (
      <Carousel
        loop={pickedFile.length > 1}
        width={width}
        autoPlay={pickedFile.length > 1}
        enabled={pickedFile.length > 1}
        scrollAnimationDuration={1000}
        data={pickedFile}
        renderItem={({ item, index }) => {
          const key = `${index}-${item.uri}`;

          const type = fileType(item.uri);

          if (type === 'image') {
            return (
              <Image
                key={key}
                source={{ uri: item.uri }}
                style={styles.image}
              />
            );
          }

          if (type === 'video') {
            return (
              <Video
                key={key}
                source={{ uri: item.uri }}
                style={styles.video}
                resizeMode="contain"
                controls
                onError={e => console.log('Video Error:', e)}
              />
            );
          }
          return <DataNotFound />;
        }}
      />
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent
      onRequestClose={onRequestClose}
      statusBarTranslucent={Platform.OS === 'ios'}
    >
      <SafeAreaContainer>
        <KeyboardAvoidingContainer>
          <CustomHeader
            title={title}
            rightIcon1={Icons.closeIcon}
            onRightPress1={onRightPress1}
          />

          <TouchableOpacity
            onPress={Keyboard.dismiss}
            activeOpacity={1}
            style={{ height: '85%' }}
          >
            {renderModalView()}
          </TouchableOpacity>

          {/* Input + Send section */}
          <View style={styles.bottomContainer}>
            <TextInput
              style={[
                styles.input,
                { borderColor: colors.border_color, color: colors.text },
              ]}
              multiline
              scrollEnabled
              onChangeText={setMessageTxt}
              value={message}
              placeholder="Type here..."
              placeholderTextColor={colors.placeholder_text}
            />

            <IconButton
              icon={Icons.sendIcon}
              size={25}
              iconColor={colors.icon_color}
              onPress={() => {
                DeviceEventEmitter.emit('sendFile', {
                  file: pickedFile,
                  message,
                });
              }}
              customBtnStyle={{ marginLeft: 'auto' }}
            />
          </View>
        </KeyboardAvoidingContainer>
      </SafeAreaContainer>
    </Modal>
  );
};

export default MediaModal;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  bottomContainer: {
    maxHeight: 100,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 15,
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
    minHeight: 50,
    paddingBottom: 5,
    fontSize: 14,
  },
});
