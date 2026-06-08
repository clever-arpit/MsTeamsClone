import React, { RefObject, memo } from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
  ImageSourcePropType,
  ViewStyle,
} from 'react-native';
import Config from 'react-native-config';
import Icons from '../utils/Icons';
import CustomText from './CustomText';
import { useTheme } from '../hooks/ThemeContext';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  inputIcon?: ImageSourcePropType;
  required?: boolean;
  color?: string;
  marginTop?: number;
  height?: number;
  isPasswordImage?: boolean;
  icon?: ImageSourcePropType;
  iconStyle?: object;
  inputRef?: RefObject<TextInput>;
  onChangeText?: (text: string) => void;
  showHide?: () => void;
  rememberMe?: boolean;
  error?: string;
  customStyleContainer?: ViewStyle;
  customStyleWrapper?: ViewStyle;
  inputStyle?: TextInputProps['style'];
  inputWidth?: ViewStyle['width'];
}

const CustomTextInputComponent: React.FC<CustomTextInputProps> = ({
  label,
  inputIcon,
  required = false,
  color,
  marginTop = 0,
  height = 45,
  inputWidth,
  isPasswordImage,
  icon,
  iconStyle,
  inputRef,
  onChangeText,
  showHide,
  rememberMe,
  secureTextEntry,
  multiline = false,
  error,
  customStyleContainer,
  customStyleWrapper,
  inputStyle,
  ...props
}) => {
  const { colors, mode } = useTheme();

  return (
    <View style={[customStyleContainer, { marginTop }]}>
      <View style={{ flexDirection: 'row', marginBottom: label ? 8 : 0 }}>
        {label && <CustomText text={label} color={colors.label_text} />}
        {required && <CustomText text=" *" color={colors.red} />}
      </View>

      <View
        style={[
          customStyleWrapper,
          styles.inputWrapper,
          {
            borderColor: colors.item_border_color,
            backgroundColor: color ?? colors.item_background,
            height: multiline ? 110 : height,
          },
        ]}
      >
        {inputIcon ? (
          <>
            <Image
              style={[styles.iconImage, { tintColor: colors.blue }]}
              source={inputIcon}
              resizeMode="contain"
            />
            <View
              style={{
                height: 22,
                backgroundColor: colors.border_color,
                width: 1,
                alignSelf: 'center',
              }}
            />
          </>
        ) : (
          <View style={{ marginLeft: 10 }} />
        )}

        <TextInput
          ref={inputRef}
          style={[
            inputStyle,
            {
              width:
                isPasswordImage || icon
                  ? '76%'
                  : inputWidth
                  ? inputWidth
                  : '90%',
              fontFamily: Config.FONT_FAMILY,
              fontSize: 15,
              color: colors.input_text,
              paddingHorizontal: inputIcon ? 8 : 5,
              textAlignVertical: 'top',
              justifyContent: 'center',
              height: multiline ? 110 : height,
            },
            multiline && { paddingTop: 10 },
          ]}
          onChangeText={onChangeText}
          placeholderTextColor={colors.placeholder_text}
          secureTextEntry={!!secureTextEntry}
          multiline={multiline}
          autoCapitalize="none"
          cursorColor={colors.cursor_color}
          {...props}
        />

        {!rememberMe && isPasswordImage && (
          <View style={styles.eyeView}>
            <TouchableOpacity onPress={showHide}>
              <Image
                style={styles.eye}
                tintColor={colors.light_icon_color}
                source={
                  secureTextEntry ? Icons.closeEyeIcon : Icons.openEyeIcon
                }
              />
            </TouchableOpacity>
          </View>
        )}

        {!rememberMe && icon && (
          <View style={styles.eyeView}>
            <TouchableOpacity onPress={showHide}>
              <Image
                style={[styles.eye, iconStyle]}
                tintColor={mode === 'dark' ? colors.white : colors.blue}
                source={icon}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {error && (
        <CustomText
          text={error}
          color={colors.red}
          fontSize={12}
          customStyle={{ marginTop: 5 }}
        />
      )}
    </View>
  );
};

const CustomTextInput = memo(CustomTextInputComponent);

export default CustomTextInput;

const styles = StyleSheet.create({
  iconImage: {
    alignSelf: 'center',
    marginHorizontal: 10,
    height: 19,
    width: 19,
  },
  eye: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  eyeView: {
    justifyContent: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
});
