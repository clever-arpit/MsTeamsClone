import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import React, { RefObject } from 'react';
import Config from 'react-native-config';
import { useSelector } from 'react-redux';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import Icons from '../utils/Icons';
import { fileType } from '../utils/Helper';
import IconButton from './IconButton';
import CustomText from './CustomText';
import { RootState } from '../redux/store';
import { useTheme } from '../hooks/ThemeContext';
import { MessageType } from '../types/EnumType';
import { MessageThread } from '../types/DataType';
import CustomAudioPlayer from './CustomAudioPlayer';

const IMAGE_SIZE = 40;
interface CustomMessageInputProps extends TextInputProps {
  inputRef?: RefObject<TextInput>;
  message: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onPressSend: () => void;
  onCancelReply?: () => void;
  onCancelNote?: () => void;
  onPressCamera?: () => void;
  onPressAttachment?: () => void;
  setMessage: (text: string) => void;
  replyVisible?: boolean;
  isNoteEnabled?: boolean;
  selectedMessage?: MessageThread | null;
  visibleAttachment?: boolean;
}

const CustomMessageInput: React.FC<CustomMessageInputProps> = ({
  onBlur,
  message,
  onFocus,
  inputRef,
  setMessage,
  onPressSend,
  replyVisible,
  onCancelReply,
  isNoteEnabled,
  onCancelNote,
  selectedMessage,
  onPressAttachment,
  visibleAttachment = true,
}) => {
  const { colors } = useTheme();
  const userProfile = useSelector(
    (state: RootState) => state.authUser.userProfile,
  );

  return (
    <KeyboardAvoidingView
      style={{
        borderTopColor: colors.item_border_color,
        borderTopWidth: replyVisible ? 0 : 1,
      }}
      behavior={'padding'}
      keyboardVerticalOffset={65}
    >
      {replyVisible && selectedMessage && (
        <View
          style={{
            paddingVertical: 7,
            paddingHorizontal: 15,
          }}
        >
          <View
            style={{
              gap: 5,
              padding: 10,
              borderRadius: 8,
              borderLeftWidth: 4,
              borderLeftColor: colors.blue,
              backgroundColor: colors.reply_message,
            }}
          >
            <View style={{ flexDirection: 'row', gap: 7 }}>
              <CustomText
                text={
                  selectedMessage?.sender?.employee_id ===
                    userProfile?.user_relation?.id
                    ? 'You'
                    : selectedMessage?.sender?.full_name ||
                    selectedMessage?.visitor?.full_name
                }
                fontSize={14}
                fontFamily={Config.FONT_FAMILY_SEMI}
              />
              <IconButton
                onPress={onCancelReply}
                icon={Icons.closeIcon}
                size={16}
                iconColor={colors.icon_color}
                customBtnStyle={{ marginLeft: 'auto' }}
              />
            </View>

            {selectedMessage.message_type === MessageType.TEXT || selectedMessage.message_type === MessageType.LOCATION ? (
              <CustomText
                text={
                  selectedMessage?.sub_messages[0]?.message?.length > 25
                    ? selectedMessage?.sub_messages[0]?.message?.substring(
                      0,
                      25,
                    ) + '...'
                    : selectedMessage?.sub_messages[0]?.message
                }
                fontSize={13}
                color={colors.light_text}
              />
            ) : selectedMessage?.message_type === MessageType.MEDIA ? (
              selectedMessage?.sub_messages?.map((media, index) => {
                if (
                  media.attachment?.file_extension &&
                  fileType(media.attachment?.file_extension) === 'image'
                ) {
                  return (
                    <Image
                      key={index}
                      source={{ uri: media.attachment?.file_path }}
                      style={styles.single}
                    />
                  );
                } else if (
                  media.attachment?.file_extension &&
                  fileType(media.attachment?.file_extension) === 'video'
                ) {
                  return (
                    <CustomText
                      key={index}
                      text={`Video.${selectedMessage.sub_messages[0].attachment?.file_extension}`}
                      color={colors.light_text}
                      fontSize={13}
                    />
                  );
                } else if (
                  media.attachment?.file_extension &&
                  fileType(media.attachment?.file_extension) === 'audio'
                ) {
                  return (
                    <CustomAudioPlayer
                      key={index}
                      uri={media.attachment.file_path}
                    />
                  );
                } else {
                  return (
                    <CustomText
                      key={index}
                      text={`Document.${selectedMessage.sub_messages[0].attachment?.file_extension}`}
                      color={colors.light_text}
                      fontSize={13}
                    />
                  );
                }
              })
            ) : null}
          </View>
        </View>
      )}
      {isNoteEnabled && (
        <View
          style={{
            paddingVertical: 7,
            paddingHorizontal: 20,
            backgroundColor: colors.stikyNote,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View style={{ width: '90%' }}>
            <CustomText
              text={`Type your internal note here. This note will not be sent to the recipient.`}
              color={colors.light_text}
              fontSize={13}
            />
          </View>
          <IconButton
            onPress={onCancelNote}
            icon={Icons.closeIcon}
            size={16}
            iconColor={colors.icon_color}
            customBtnStyle={{ marginLeft: 'auto' }}
          />
        </View>
      )}
      <View style={styles.componentView}>
        <View
          style={[styles.inputWrapper, { borderColor: colors.border_color }]}
        >
          <TextInput
            ref={inputRef}
            style={[styles.textInput, { color: colors.text }]}
            placeholderTextColor={colors.light_text}
            value={`${message}`}
            multiline
            placeholder="Type here..."
            onChangeText={setMessage}
            onFocus={onFocus}
            onBlur={onBlur}
            cursorColor={colors.cursor_color}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 'auto',
            gap: 10,
          }}
        >
          {!isNoteEnabled && visibleAttachment && (
            <IconButton
              onPress={onPressAttachment}
              icon={Icons.attachmentIcon}
              size={24}
              iconColor={colors.icon_color}
            />
          )}
          <IconButton
            onPress={onPressSend}
            icon={Icons.sendIcon}
            size={18}
            fontSize={14}
            iconColor={colors.white}
            customBtnStyle={{
              backgroundColor: colors.send_btn,
              borderRadius: 50,
              marginTop: 'auto',
            }}
            btnHeight={38}
            btnWidth={38}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CustomMessageInput;

const styles = StyleSheet.create({
  componentView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 30,
    marginVertical: 8,
    paddingHorizontal: 15,
  },
  inputWrapper: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 30,
    padding: 8,
    marginRight: 12,
  },
  textInput: {
    fontSize: 15,
    minHeight: 30,
    maxHeight: 120,
    borderRadius: 30,
    padding: 6,
    textAlignVertical: 'top',
  },
  single: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    resizeMode: 'cover',
    borderRadius: 8,
  },
});
