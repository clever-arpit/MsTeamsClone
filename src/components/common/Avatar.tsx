import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../styles';

interface AvatarProps {
  source?: { uri: string };
  initials?: string;
  size?: 'small' | 'medium' | 'large';
}

const Avatar: React.FC<AvatarProps> = ({ source, initials, size = 'medium' }) => {
  const sizeMap = {
    small: 32,
    medium: 48,
    large: 64,
  };

  const containerSize = sizeMap[size];

  if (source) {
    return (
      <Image
        source={source}
        style={[styles.image, { width: containerSize, height: containerSize }]}
      />
    );
  }

  return (
    <View
      style={[
        styles.container,
        { width: containerSize, height: containerSize },
      ]}
    >
      <Text
        style={[
          styles.initials,
          { fontSize: containerSize / 2.5 },
        ]}
      >
        {initials}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: COLORS.TEXT_INVERSE,
    fontWeight: '600',
  },
  image: {
    borderRadius: 50,
  },
});

export default Avatar;
