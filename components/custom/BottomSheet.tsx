import {StyleSheet, Text} from 'react-native';

import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
  useAnimatedStyle,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated';

type Props = {
  onClose: () => void;
};

export function BottomSheet({onClose}: Props) {
  const offset = useSharedValue(0);

  function close() {
    offset.value = 0;
    onClose();
  }

  const pan = Gesture.Pan()
    .onChange(event => {
      const offsetDelta = event.changeY + offset.value;
      const clamp = Math.max(-20, offsetDelta);

      offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
    })
    .onFinalize(() => {
      if (offset.value < 220 / 3) {
        offset.value = withSpring(0);
      } else {
        offset.value = withTiming(220, {}, () => {
          runOnJS(close)();
        });
      }
    });

  const translateY = useAnimatedStyle(() => ({
    transform: [{translateY: offset.value}],
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[styles.container, translateY]}
        entering={SlideInDown.springify().damping(15)}
        exiting={SlideOutDown}>
        <Text style={styles.title}>----</Text>
        <Text style={styles.title}>OPÇÕES</Text>
      </Animated.View>
    </GestureDetector>
  );
}

export const styles = StyleSheet.create({
  container: {
    height: 220,
    width: '100%',
    backgroundColor: '#1E1F23',
    position: 'absolute',
    bottom: -20 * 1.3,
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    margin: 24,
  },
  dragIcon: {
    marginTop: 16,
    alignSelf: 'center',
  },
});
