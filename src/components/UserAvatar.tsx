import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import { useTheme } from '../hooks/ThemeContext';
import { UserAvatarProps } from '../types/DataType';
import Icons from '../utils/Icons';
import { fileType, firstAlphabet } from '../utils/Helper';

const UserAvatar: React.FC<UserAvatarProps> = ({
  title,
  uri,
  icon,
  size = 42,
  fontSize = 15,
  onPress,
  style = {},
}) => {
  const { colors } = useTheme();
  const firstChar = title ? firstAlphabet(title) : null;

  const avatarStyle = [
    styles.avatar,
    { backgroundColor: colors.avatar_background, width: size, height: size },
    style,
  ];

  const avatarContent =
    uri && typeof uri === 'string' ? (
      <Image
        source={{ uri: uri }}
        style={[styles.image, { width: size, height: size }]}
      />
    ) : firstChar ? (
      <CustomText
        text={firstChar}
        color={colors.avatar_color}
        fontSize={fontSize}
      />
    ) : (
      <Image
        source={icon ?? Icons.userAvatar}
        style={[styles.image, { width: size, height: size }]}
      />
    );

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress} style={avatarStyle}>
      {avatarContent}
    </TouchableOpacity>
  );
};

export default UserAvatar;

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'cover',
    borderRadius: 100,
  },
});
