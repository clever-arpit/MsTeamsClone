import { Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

const CustomSwiper = ({
  children,
  onSwipeRight,
}: {
  children: React.ReactNode;
  onSwipeRight?: () => void;
}) => {
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .activeOffsetX([10, 1000])
    .failOffsetY([0, 0])
    .onUpdate(e => {
      translateX.value = Math.max(0, e.translationX);
    })
    .onEnd(() => {
      if (translateX.value > SWIPE_THRESHOLD) {
        onSwipeRight?.();
      }
      translateX.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </GestureDetector>
  );
};

export default CustomSwiper;
``;
