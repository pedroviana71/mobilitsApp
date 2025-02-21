import {StyleSheet, Text, View} from 'react-native';

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
import {COLORS} from '../../utils/styles';

type Props = {
  onClose: () => void;
  children: React.ReactNode;
  height: number;
};

export function BottomSheet({onClose, children, height}: Props) {
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
      if (offset.value < height / 6) {
        offset.value = withSpring(0);
      } else {
        offset.value = withTiming(height, {}, () => {
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
        style={[styles.container, translateY, {height: height}]}
        entering={SlideInDown.springify().damping(15)}
        exiting={SlideOutDown}>
        <View style={styles.pushSheet} />
        {children}
      </Animated.View>
    </GestureDetector>
  );
}

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: -20 * 1.3,
    alignItems: 'center',
    paddingTop: 16,
    shadowColor: COLORS.black80,
    elevation: 20,
    padding: 16,
  },
  pushSheet: {
    width: 40,
    height: 5,
    backgroundColor: COLORS.black20,
    borderRadius: 4,
    marginBottom: 24,
  },
  title: {
    color: COLORS.black80,
    fontSize: 18,
    fontWeight: 'bold',
    margin: 24,
  },
  dragIcon: {
    marginTop: 16,
    alignSelf: 'center',
  },
});
