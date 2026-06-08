import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.25;

const images = [
  'https://picsum.photos/id/10/600/400',
  'https://picsum.photos/id/20/600/400',
  'https://picsum.photos/id/30/600/400',
  'https://picsum.photos/id/40/600/400',
];

const CustomImageSwiper = () => {
  const [index, setIndex] = useState(0);
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .activeOffsetX([-10, 10])
    .failOffsetY([-10, 10])
    .onUpdate(e => {
      translateX.value = e.translationX;
    })
    .onEnd(() => {
      if (translateX.value > SWIPE_THRESHOLD && index > 0) {
        setIndex(i => i - 1);
      } else if (
        translateX.value < -SWIPE_THRESHOLD &&
        index < images.length - 1
      ) {
        setIndex(i => i + 1);
      }
      translateX.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.imageWrapper, animatedStyle]}>
          <Image source={{ uri: images[index] }} style={styles.image} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    width,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width - 20,
    height: 300,
    resizeMode: 'contain',
    borderRadius: 12,
  },
});

export default CustomImageSwiper;
