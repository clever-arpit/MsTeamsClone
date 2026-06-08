import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { useTheme } from '../hooks/ThemeContext';
import CustomText from './CustomText';

type FooterLoaderProps = {
  animating: boolean;
};

const FooterLoader: FC<FooterLoaderProps> = ({ animating = false }) => {
  const { colors } = useTheme();
  return animating ? (
    <View style={styles.container}>
      <ActivityIndicator
        color={colors.loader_color}
        size={'large'}
        animating={animating}
      />
      <CustomText
        text={'Loading more items...'}
        fontSize={16}
        color={colors.loader_color}
      />
    </View>
  ) : null;
};

export default FooterLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});
