import { StyleSheet, Dimensions } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_HEIGHT = 300;

const clamp = (value: number, min: number, max: number) => {
  'worklet';
  return Math.min(Math.max(value, min), max);
};

const CustomImageViewer = ({ imageUri }: { imageUri: string }) => {
  if (!imageUri) return null;

  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const lastScale = useSharedValue(1);
  const lastX = useSharedValue(0);
  const lastY = useSharedValue(0);

  const pinchGesture = Gesture.Pinch()
    .onUpdate(e => {
      scale.value = clamp(lastScale.value * e.scale, 1, 4);
    })
    .onEnd(() => {
      lastScale.value = scale.value;
    });

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      const scaledWidth = SCREEN_WIDTH * scale.value;
      const scaledHeight = IMAGE_HEIGHT * scale.value;

      const maxX = Math.max(0, (scaledWidth - SCREEN_WIDTH) / 2);
      const maxY = Math.max(0, (scaledHeight - IMAGE_HEIGHT) / 2);

      translateX.value = clamp(lastX.value + e.translationX, -maxX, maxX);
      translateY.value = clamp(lastY.value + e.translationY, -maxY, maxY);
    })
    .onEnd(() => {
      lastX.value = translateX.value;
      lastY.value = translateY.value;
    });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      if (scale.value > 1) {
        scale.value = withSpring(1);
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        lastScale.value = 1;
        lastX.value = 0;
        lastY.value = 0;
      } else {
        scale.value = withSpring(2);
        lastScale.value = 2;
      }
    });

  const singleTap = Gesture.Tap()
    .numberOfTaps(1)
    .onEnd(() => {
      scale.value = withSpring(1);
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      lastScale.value = 1;
      lastX.value = 0;
      lastY.value = 0;
    });

  const gesture = Gesture.Simultaneous(
    pinchGesture,
    panGesture,
    Gesture.Exclusive(doubleTap, singleTap),
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Animated.Image
          source={{ uri: imageUri }}
          style={[styles.image, animatedStyle]}
        />
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: SCREEN_WIDTH,
    height: IMAGE_HEIGHT,
    resizeMode: 'contain',
  },
});

export default CustomImageViewer;
