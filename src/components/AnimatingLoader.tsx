import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ActivityIndicatorProps,
  Modal,
} from 'react-native';
import CustomText from './CustomText';
import { useTheme } from '../hooks/ThemeContext';

interface AnimatingLoaderProps extends Partial<ActivityIndicatorProps> {
  animating?: boolean;
  message?: string;
  size?: 'small' | 'large' | number;
}

const AnimatingLoader: React.FC<AnimatingLoaderProps> = ({
  animating = false,
  message = 'Loading...',
  size = 'large',
  ...props
}) => {
  const { colors } = useTheme();

  return (
    <Modal
      visible={animating}
      transparent
      animationType="fade"
      onRequestClose={() => {}}
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.wrapper,
            { backgroundColor: colors.loader_background },
          ]}
        >
          <ActivityIndicator
            color={colors.loader_color}
            size={size}
            animating={animating}
            {...props}
          />
          <CustomText
            text={message}
            fontSize={16}
            color={colors.loader_color}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AnimatingLoader;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  wrapper: {
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});
