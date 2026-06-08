import React, { useEffect, useRef } from 'react';
import {
  Easing,
  Animated,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import Config from 'react-native-config';
import { useTheme } from '../hooks/ThemeContext';
import { insets } from '../hooks/insets';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CustomStatusBarProps {
  visible: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  bgColor?: string;
  text?: string;
  fontSize?: number;
  height?: number;
}

const CustomStatusBar: React.FC<CustomStatusBarProps> = ({
  visible,
  onPress,
  text,
  fontSize = 13,
  height = 30,
}) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (visible) {
      animationRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0.3,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      );

      animationRef.current.start();
    } else {
      animationRef.current?.stop();
      animationRef.current = null;
      fadeAnim.setValue(1);
    }

    return () => {
      animationRef.current?.stop();
      animationRef.current = null;
    };
  }, [visible, fadeAnim]);

  if (!visible) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.bar,
        {
          backgroundColor: colors.status_bar_background,
          height,
          marginTop: insets.top,
        },
      ]}
      activeOpacity={0.8}
    >
      <Animated.Text
        style={[
          styles.text,
          {
            opacity: fadeAnim,
            fontSize,
            color: colors.white,
          },
        ]}
      >
        {text ?? 'Calling...'}
      </Animated.Text>
    </TouchableOpacity>
  );
};

export default CustomStatusBar;

const styles = StyleSheet.create({
  bar: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: Config.FONT_FAMILY,
  },
});
